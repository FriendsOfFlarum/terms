<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Tests\integration\api;

use Carbon\Carbon;
use Flarum\Api\Resource\UserResource;
use Flarum\Api\Schema;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Post\Post;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Terms\Policy;
use PHPUnit\Framework\Attributes\Test;

/**
 * Checking a permission of a user runs the permission group processor, which
 * needs that user's accepted policies. Other extensions do that for every user
 * they serialize (e.g. whether a user can be ignored), including users reached
 * through relations this extension doesn't know to eager load. The accepted
 * policies of the users a request has loaded are then fetched together, rather
 * than one query per user.
 */
class PolicyStateForLoadedUsersTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    private const EDITORS = [3, 4, 5, 6, 7, 8];

    // Hasn't accepted the policy, so is restricted to what guests can do.
    private const UNACCEPTED_EDITOR = 3;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-terms');

        // What another extension does for each user it serializes.
        $this->extend(
            (new Extend\ApiResource(UserResource::class))->fields(fn () => [
                Schema\Boolean::make('fofTermsTestCanStartDiscussion')
                    ->get(fn (User $user) => $user->hasPermission('startDiscussion')),
            ])
        );
    }

    protected function allowedRepeatedQueries(): array
    {
        return [
            // The simulated extension's own permission check loads each user's
            // groups; that cost is the checking extension's, not this one's.
            'group_user',
        ];
    }

    #[Test]
    public function users_reached_through_any_relation_have_their_policies_loaded_together(): void
    {
        $this->prepareThread(withPolicy: true);

        [$pivotQueries, $body] = $this->listPostsWithEditors();

        // The actor's own check as the request starts, before anyone else is
        // loaded; the post authors' eager load; and one load for every editor
        // together. Not one query per editor.
        $this->assertSame(3, $pivotQueries, "Accepted policies were loaded per user ($pivotQueries queries for ".count(self::EDITORS).' editors).');

        // Loading them together doesn't change whose permissions are restricted.
        $canStart = $this->editorsCanStartDiscussion($body);
        $this->assertFalse($canStart[self::UNACCEPTED_EDITOR]);
        foreach (array_diff(self::EDITORS, [self::UNACCEPTED_EDITOR]) as $editor) {
            $this->assertTrue($canStart[$editor], "Editor $editor accepted the policy, so keeps their permissions.");
        }
    }

    #[Test]
    public function without_policies_no_ones_accepted_policies_are_loaded(): void
    {
        $this->prepareThread(withPolicy: false);

        [$pivotQueries, $body] = $this->listPostsWithEditors();

        // Only the post authors' eager load, which runs regardless: with
        // nothing to accept, no one's permissions need their accepted policies.
        $this->assertSame(1, $pivotQueries, 'With nothing to accept, permission checks should look nothing up.');
        $this->assertNotContains(false, $this->editorsCanStartDiscussion($body));
    }

    /**
     * A discussion of posts by the normal user, each last edited by a different user.
     */
    private function prepareThread(bool $withPolicy): void
    {
        $users = [$this->normalUser()];
        $posts = [];
        $accepted = [];

        foreach (self::EDITORS as $i => $editor) {
            $users[] = [
                'id'                 => $editor,
                'username'           => 'editor'.$editor,
                'email'              => 'editor'.$editor.'@machine.local',
                'is_email_confirmed' => 1,
                'password'           => 'foobar',
            ];

            $posts[] = [
                'id'             => $i + 1,
                'number'         => $i + 1,
                'discussion_id'  => 1,
                'user_id'        => 2,
                'type'           => 'comment',
                'content'        => '<t><p>Post '.($i + 1).'</p></t>',
                'created_at'     => Carbon::parse('2024-03-01'),
                'edited_at'      => Carbon::parse('2024-03-02'),
                'edited_user_id' => $editor,
            ];

            if ($editor !== self::UNACCEPTED_EDITOR) {
                $accepted[] = ['user_id' => $editor, 'policy_id' => 1, 'accepted_at' => Carbon::parse('2024-02-01'), 'is_accepted' => true];
            }
        }

        $accepted[] = ['user_id' => 2, 'policy_id' => 1, 'accepted_at' => Carbon::parse('2024-02-01'), 'is_accepted' => true];

        $this->prepareDatabase(array_merge([
            User::class       => $users,
            Discussion::class => [
                ['id' => 1, 'title' => 'Edited posts', 'created_at' => Carbon::parse('2024-03-01'), 'user_id' => 2, 'first_post_id' => 1, 'comment_count' => count(self::EDITORS)],
            ],
            Post::class => $posts,
        ], $withPolicy ? [
            Policy::class => [
                [
                    'id'               => 1,
                    'name'             => 'Terms of Service',
                    'url'              => 'https://example.com/terms',
                    'update_message'   => null,
                    'terms_updated_at' => Carbon::parse('2024-01-01'),
                    'optional'         => false,
                    'sort'             => 0,
                ],
            ],
            'fof_terms_policy_user' => $accepted,
        ] : []));
    }

    /**
     * @return array{int, array} Pivot query count and the decoded response body.
     */
    private function listPostsWithEditors(): array
    {
        $this->app();

        $db = $this->database();
        $db->flushQueryLog();
        $db->enableQueryLog();

        $response = $this->send(
            $this->request('GET', '/api/posts', ['authenticatedAs' => 2])
                ->withQueryParams(['filter' => ['discussion' => 1], 'include' => 'editedUser'])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $count = 0;

        foreach ($db->getQueryLog() as $query) {
            if (stripos($query['query'], 'fof_terms_policy_user') !== false) {
                $count++;
            }
        }

        $db->flushQueryLog();

        return [$count, json_decode($response->getBody()->getContents(), true)];
    }

    /**
     * @return array<int, bool> each editor's id, and whether they can start a discussion
     */
    private function editorsCanStartDiscussion(array $body): array
    {
        $canStart = [];

        foreach ($body['included'] ?? [] as $resource) {
            if ($resource['type'] === 'users' && in_array((int) $resource['id'], self::EDITORS, true)) {
                $canStart[(int) $resource['id']] = $resource['attributes']['fofTermsTestCanStartDiscussion'];
            }
        }

        $this->assertCount(count(self::EDITORS), $canStart, 'Every editor should be included.');

        return $canStart;
    }
}
