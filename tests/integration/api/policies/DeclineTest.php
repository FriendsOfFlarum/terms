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

class DeclineTest extends TestCase
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
                    'id' => 1,
                    'name' => 'Terms of Service',
                    'url' => 'https://example.com/terms',
                    'update_message' => null,
                    'terms_updated_at' => Carbon::parse('2024-01-01'),
                    'optional' => false,
                    'sort' => 0,
                ],
                [
                    'id' => 2,
                    'name' => 'Privacy Policy',
                    'url' => 'https://example.com/privacy',
                    'update_message' => null,
                    'terms_updated_at' => Carbon::parse('2024-01-01'),
                    'optional' => true,
                    'sort' => 1,
                ],
            ],
        ]);
    }

    #[Test]
    public function user_can_decline_optional_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/2/decline', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        // The response should be a user resource
        $data = json_decode($body, true);
        $this->assertEquals('users', Arr::get($data, 'data.type'));
        $this->assertEquals('2', Arr::get($data, 'data.id'));

        // Check database state - declined optional policy
        $user = User::find(2);
        $declinedPolicies = $user->fofTermsPolicies()->wherePivot('is_accepted', false)->get();
        $this->assertCount(1, $declinedPolicies);
        $this->assertEquals(2, $declinedPolicies->first()->id);
    }

    #[Test]
    public function user_cannot_decline_required_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/decline', [
                'authenticatedAs' => 2,
            ])
        );

        // Should fail with validation error
        $this->assertEquals(422, $response->getStatusCode());
    }

    #[Test]
    public function guest_cannot_decline_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/2/decline')
        );

        // Guest receives 400 for missing CSRF token, not 401
        $this->assertContains($response->getStatusCode(), [400, 401]);
    }

    #[Test]
    public function declining_nonexistent_policy_returns_404()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/999/decline', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(404, $response->getStatusCode());
    }

    #[Test]
    public function can_decline_previously_accepted_optional_policy()
    {
        // First accept the policy
        $this->send(
            $this->request('POST', '/api/fof-terms-policies/2/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $user = User::find(2);
        $this->assertTrue((bool) $user->fofTermsPolicies()->find(2)->pivot->is_accepted);

        // Now decline it
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/2/decline', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        $user = User::find(2);
        $policy = $user->fofTermsPolicies()->find(2);
        $this->assertFalse((bool) $policy->pivot->is_accepted);
    }

    #[Test]
    public function response_includes_user_policy_state()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/2/decline', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $this->assertEquals(200, $response->getStatusCode(), $body);

        $data = json_decode($body, true);

        // The user resource should include the policy state
        $attributes = Arr::get($data, 'data.attributes');
        $this->assertNotNull($attributes, 'Response attributes should not be null');
        $this->assertArrayHasKey('fofTermsPoliciesState', $attributes);

        $policyState = $attributes['fofTermsPoliciesState'];
        $this->assertArrayHasKey('2', $policyState);
        $this->assertFalse((bool) $policyState['2']['is_accepted']);
    }
}
