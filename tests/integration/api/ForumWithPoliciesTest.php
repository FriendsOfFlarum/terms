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
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Terms\Policy;
use Illuminate\Support\Arr;
use PHPUnit\Framework\Attributes\Test;

class ForumWithPoliciesTest extends TestCase
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
    public function forum_endpoint_includes_policies()
    {
        $response = $this->send(
            $this->request('GET', '/api')
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        $data = json_decode($body, true);

        // Check if policies are included
        $included = Arr::get($data, 'included', []);
        $policies = array_filter($included, fn ($item) => $item['type'] === 'fof-terms-policies');

        $this->assertCount(2, $policies);
    }

    #[Test]
    public function forum_endpoint_includes_policy_permission()
    {
        $response = $this->send(
            $this->request('GET', '/api', [
                'authenticatedAs' => 1,
            ])
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        // Admin should have permission to see user policies state
        $canSee = Arr::get($data, 'data.attributes.fof-terms.canSeeUserPoliciesState');
        $this->assertNotNull($canSee, 'Permission attribute should be present');
        $this->assertTrue((bool) $canSee);
    }

    #[Test]
    public function forum_endpoint_shows_policies_sorted_by_sort_column()
    {
        $response = $this->send(
            $this->request('GET', '/api')
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        $included = Arr::get($data, 'included', []);
        $policies = array_values(array_filter($included, fn ($item) => $item['type'] === 'fof-terms-policies'));

        // Policies should be sorted by sort column
        $this->assertEquals(0, $policies[0]['attributes']['sort']);
        $this->assertEquals(1, $policies[1]['attributes']['sort']);
        $this->assertEquals('Terms of Service', $policies[0]['attributes']['name']);
        $this->assertEquals('Privacy Policy', $policies[1]['attributes']['name']);
    }

    #[Test]
    public function guest_can_see_policies_in_forum_endpoint()
    {
        $response = $this->send(
            $this->request('GET', '/api')
        );

        $body = $response->getBody()->getContents();
        $this->assertEquals(200, $response->getStatusCode(), $body);

        $data = json_decode($body, true);
        $included = Arr::get($data, 'included', []);
        $policies = array_filter($included, fn ($item) => $item['type'] === 'fof-terms-policies');

        // Guests should still see policies
        $this->assertCount(2, $policies);
    }

    #[Test]
    public function policies_included_have_correct_attributes()
    {
        $response = $this->send(
            $this->request('GET', '/api')
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        $included = Arr::get($data, 'included', []);
        $policies = array_values(array_filter($included, fn ($item) => $item['type'] === 'fof-terms-policies'));

        $policy = $policies[0]['attributes'];

        $this->assertArrayHasKey('name', $policy);
        $this->assertArrayHasKey('url', $policy);
        $this->assertArrayHasKey('optional', $policy);
        $this->assertArrayHasKey('sort', $policy);
        $this->assertArrayHasKey('termsUpdatedAt', $policy);
    }

    #[Test]
    public function normal_user_cannot_see_user_policies_state_permission()
    {
        $response = $this->send(
            $this->request('GET', '/api', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        // Normal user should not have permission
        $canSee = Arr::get($data, 'data.attributes.fof-terms.canSeeUserPoliciesState');
        $this->assertNotNull($canSee, 'Permission attribute should be present');
        $this->assertFalse((bool) $canSee);
    }
}
