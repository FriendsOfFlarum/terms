<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Tests\integration\api\policies;

use Carbon\Carbon;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Terms\Policy;
use Illuminate\Support\Arr;
use PHPUnit\Framework\Attributes\Test;

class AcceptTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-terms');

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
            ],
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
                [
                    'id'               => 2,
                    'name'             => 'Privacy Policy',
                    'url'              => 'https://example.com/privacy',
                    'update_message'   => null,
                    'terms_updated_at' => Carbon::parse('2024-01-01'),
                    'optional'         => true,
                    'sort'             => 1,
                ],
            ],
        ]);
    }

    #[Test]
    public function user_can_accept_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        // The response should be a user resource with updated policy state
        $data = json_decode($body, true);
        $this->assertEquals('users', Arr::get($data, 'data.type'));
        $this->assertEquals('2', Arr::get($data, 'data.id'));

        // Check database state
        $user = User::find(2);
        $acceptedPolicies = $user->fofTermsPolicies()->wherePivot('is_accepted', true)->get();
        $this->assertCount(1, $acceptedPolicies);
        $this->assertEquals(1, $acceptedPolicies->first()->id);
    }

    #[Test]
    public function user_can_accept_optional_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/2/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        $user = User::find(2);
        $acceptedPolicies = $user->fofTermsPolicies()->wherePivot('is_accepted', true)->get();
        $this->assertCount(1, $acceptedPolicies);
        $this->assertEquals(2, $acceptedPolicies->first()->id);
    }

    #[Test]
    public function guest_cannot_accept_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/accept')
        );

        // Guest receives 400 for missing CSRF token, not 401
        $this->assertContains($response->getStatusCode(), [400, 401]);
    }

    #[Test]
    public function accepting_nonexistent_policy_returns_404()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/999/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(404, $response->getStatusCode());
    }

    #[Test]
    public function accepting_policy_multiple_times_updates_timestamp()
    {
        // First acceptance
        $response1 = $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response1->getStatusCode());

        $user = User::find(2);
        $firstAcceptedAt = $user->fofTermsPolicies()->find(1)->pivot->accepted_at;

        // Wait a moment and accept again
        sleep(1);

        $response2 = $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response2->getStatusCode());

        $user = User::find(2);
        $secondAcceptedAt = $user->fofTermsPolicies()->find(1)->pivot->accepted_at;

        $this->assertNotEquals($firstAcceptedAt, $secondAcceptedAt);
        $this->assertTrue($secondAcceptedAt > $firstAcceptedAt);
    }

    #[Test]
    public function response_includes_user_policy_state()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $data = json_decode($response->getBody()->getContents(), true);

        // The user resource should include the policy state
        $attributes = Arr::get($data, 'data.attributes');
        $this->assertArrayHasKey('fofTermsPoliciesState', $attributes);

        $policyState = $attributes['fofTermsPoliciesState'];
        $this->assertArrayHasKey('1', $policyState);
        $this->assertTrue((bool) $policyState['1']['is_accepted']);
    }
}
