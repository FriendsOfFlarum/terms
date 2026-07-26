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
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Terms\Policy;
use PHPUnit\Framework\Attributes\Test;

/**
 * The per-user policy state fields lazy-loaded each user's accepted policies,
 * issuing one pivot query per serialized user. On a discussion list viewed by
 * an actor who can see policy states, that meant one query per distinct user
 * on the page. These tests pin the batched behaviour: the pivot table must be
 * queried a constant number of times regardless of how many users appear.
 */
class PolicyStateQueryCountTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-terms');

        $users = [$this->normalUser()];
        $discussions = [];

        // Five discussions, each started and last posted by a different user.
        for ($i = 0; $i < 5; $i++) {
            $userId = 3 + $i;

            $users[] = [
                'id'                 => $userId,
                'username'           => 'poster'.$userId,
                'email'              => 'poster'.$userId.'@machine.local',
                'is_email_confirmed' => 1,
                'password'           => 'foobar',
            ];

            $discussions[] = [
                'id'                  => 1 + $i,
                'title'               => 'Discussion '.$i,
                'created_at'          => Carbon::createFromDate(2024, 1, 1 + $i)->toDateTimeString(),
                'last_posted_at'      => Carbon::createFromDate(2024, 1, 1 + $i)->toDateTimeString(),
                'user_id'             => $userId,
                'last_posted_user_id' => $userId,
                'comment_count'       => 1,
            ];
        }

        $this->prepareDatabase([
            User::class       => $users,
            Discussion::class => $discussions,
            Policy::class     => [
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
        ]);
    }

    /**
     * @return array{int, array} Pivot query count and the decoded response body.
     */
    private function listDiscussionsCountingPivotQueries(int $actorId): array
    {
        $this->app();

        $db = $this->database();
        $db->flushQueryLog();
        $db->enableQueryLog();

        $response = $this->send(
            $this->request('GET', '/api/discussions', ['authenticatedAs' => $actorId])
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

    #[Test]
    public function policy_state_is_loaded_with_a_constant_number_of_queries_for_privileged_actors()
    {
        [$pivotQueries, $body] = $this->listDiscussionsCountingPivotQueries(1);

        // Sanity: the state fields were actually serialized for the included users.
        $serializedStates = 0;

        foreach ($body['included'] ?? [] as $resource) {
            if ($resource['type'] === 'users' && isset($resource['attributes']['fofTermsPoliciesState'])) {
                $serializedStates++;
            }
        }

        $this->assertGreaterThanOrEqual(5, $serializedStates, 'Expected policy state to be serialized for the discussion authors.');

        // One eager load per relation path that materializes users (authors
        // via the primary models, last posters via the relationship buffer) —
        // constant regardless of how many users appear on the page.
        $this->assertSame(
            2,
            $pivotQueries,
            "Policy state must be eager loaded per relation path, not one query per user (got $pivotQueries for 5 users)."
        );
    }

    #[Test]
    public function permission_checks_on_serialized_users_do_not_query_per_user()
    {
        // Simulate what other extensions do in the wild (e.g. a per-user
        // serializer flag calling $user->hasPermission()): each such call runs
        // the permission group processor, which needs that user's accepted
        // policies. Without eager loading this was one pivot query per user.
        $this->extend(
            (new Extend\ApiResource(UserResource::class))->fields(fn () => [
                Schema\Boolean::make('fofTermsTestPerUserPermission')
                    ->get(fn (User $user) => $user->hasPermission('viewForum')),
            ])
        );

        [$pivotQueries] = $this->listDiscussionsCountingPivotQueries(1);

        $this->assertLessThanOrEqual(
            3,
            $pivotQueries,
            "Per-user permission checks must be served by the eager-loaded relation, not one pivot query per user (got $pivotQueries for 5 users)."
        );
    }

    #[Test]
    public function policy_state_is_not_loaded_per_user_for_unprivileged_actors()
    {
        [$pivotQueries, $body] = $this->listDiscussionsCountingPivotQueries(2);

        // Sanity: a normal user sees no one else's policy state.
        foreach ($body['included'] ?? [] as $resource) {
            if ($resource['type'] === 'users' && $resource['id'] !== '2') {
                $this->assertArrayNotHasKey('fofTermsPoliciesState', $resource['attributes'] ?? []);
            }
        }

        // Two constant eager loads (authors + last posters), plus the
        // PermissionGroupProcessor checking the actor's own acceptance state
        // to enforce the guest downgrade — never one query per user.
        $this->assertSame(
            3,
            $pivotQueries,
            'Pivot queries must stay constant (eager loads + the actor\'s own enforcement check), not grow per user.'
        );
    }
}
