<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Tests\integration\middleware;

use Carbon\Carbon;
use Flarum\Extend;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Terms\Policy;
use PHPUnit\Framework\Attributes\Test;

class RegisterMiddlewareTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extend(
            (new Extend\Csrf())->exemptRoute('register')
        );

        $this->extension('fof-terms');

        $this->prepareDatabase([
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

        // Warm up the policy cache to ensure fresh data
        $policyRepo = $this->app()->getContainer()->make(\FoF\Terms\Repositories\PolicyRepository::class);
        $policyRepo->clearCache();
        $policyRepo->all(); // Load policies into cache
    }

    #[Test]
    public function cannot_register_without_accepting_required_policies()
    {
        $response = $this->send(
            $this->request('POST', '/register', [
                'json' => [
                    'username' => 'test',
                    'email'    => 'test@example.com',
                    'password' => 'password123',
                    // Not accepting required policy
                    'fof_terms_policy_2' => true,
                ],
            ])
        );

        $body = (string) $response->getBody();

        $this->assertEquals(422, $response->getStatusCode(), $body);

        // User should not be created
        $this->assertNull(User::where('username', 'test')->first());
    }

    #[Test]
    public function can_register_with_required_policies_accepted()
    {
        $response = $this->send(
            $this->request('POST', '/register', [
                'json' => [
                    'username'           => 'test',
                    'email'              => 'test@example.com',
                    'password'           => 'password123',
                    'fof_terms_policy_1' => true, // Required policy
                    'fof_terms_policy_2' => true, // Optional policy
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(201, $response->getStatusCode(), $body);

        // User should be created
        $user = User::where('username', 'test')->first();
        $this->assertNotNull($user);

        // Both policies should be accepted
        $acceptedPolicies = $user->fofTermsPolicies()->wherePivot('is_accepted', true)->get();
        $this->assertCount(2, $acceptedPolicies);
    }

    #[Test]
    public function can_register_without_accepting_optional_policies()
    {
        $response = $this->send(
            $this->request('POST', '/register', [
                'json' => [
                    'username'           => 'test',
                    'email'              => 'test@example.com',
                    'password'           => 'password123',
                    'fof_terms_policy_1' => true, // Required policy
                    // Not accepting optional policy 2
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(201, $response->getStatusCode(), $body);

        // User should be created
        $user = User::where('username', 'test')->first();
        $this->assertNotNull($user);

        // Only required policy should be accepted
        $acceptedPolicies = $user->fofTermsPolicies()->wherePivot('is_accepted', true)->get();
        $this->assertCount(1, $acceptedPolicies);
        $this->assertEquals(1, $acceptedPolicies->first()->id);

        // Optional policy should be declined
        $declinedPolicies = $user->fofTermsPolicies()->wherePivot('is_accepted', false)->get();
        $this->assertCount(1, $declinedPolicies);
        $this->assertEquals(2, $declinedPolicies->first()->id);
    }

    #[Test]
    public function middleware_only_affects_register_endpoint()
    {
        // Test that other endpoints are not affected
        $response = $this->send(
            $this->request('GET', '/api/fof-terms-policies')
        );

        // Should work normally
        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function register_with_all_required_policies_accepted()
    {
        $response = $this->send(
            $this->request('POST', '/register', [
                'json' => [
                    'username'           => 'newuser',
                    'email'              => 'newuser@example.com',
                    'password'           => 'securepassword',
                    'fof_terms_policy_1' => true,
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(201, $response->getStatusCode(), $body);

        $user = User::where('username', 'newuser')->first();
        $this->assertNotNull($user);

        // Check that acceptance was recorded
        $policy = $user->fofTermsPolicies()->find(1);
        $this->assertNotNull($policy);
        $this->assertTrue((bool) $policy->pivot->is_accepted);
        $this->assertNotNull($policy->pivot->accepted_at);
    }
}
