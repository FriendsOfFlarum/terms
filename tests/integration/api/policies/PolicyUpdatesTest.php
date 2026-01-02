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

class PolicyUpdatesTest extends TestCase
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
            ],
            'fof_terms_policy_user' => [
                [
                    'policy_id' => 1,
                    'user_id' => 2,
                    'accepted_at' => Carbon::parse('2024-01-01 10:00:00'),
                    'is_accepted' => true,
                ],
            ],
        ]);
    }

    #[Test]
    public function user_policy_state_shows_has_update_when_policy_updated()
    {
        // Update the policy via API (as admin)
        $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'termsUpdatedAt' => '2024-06-01T00:00:00Z',
                        ],
                    ],
                ],
            ])
        );

        // Get the user with their policy state
        $response = $this->send(
            $this->request('GET', '/api/users/2', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $this->assertEquals(200, $response->getStatusCode(), $body);

        $data = json_decode($body, true);
        $policyState = Arr::get($data, 'data.attributes.fofTermsPoliciesState');

        $this->assertArrayHasKey('1', $policyState);
        $this->assertTrue($policyState['1']['has_update']);
    }

    #[Test]
    public function user_policy_state_shows_no_update_when_policy_not_updated()
    {
        // User accepted on 2024-01-01, policy also dated 2024-01-01
        $response = $this->send(
            $this->request('GET', '/api/users/2', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $this->assertEquals(200, $response->getStatusCode(), $body);

        $data = json_decode($body, true);
        $policyState = Arr::get($data, 'data.attributes.fofTermsPoliciesState');

        $this->assertArrayHasKey('1', $policyState);
        $this->assertFalse($policyState['1']['has_update']);
    }

    #[Test]
    public function accepting_updated_policy_clears_has_update_flag()
    {
        // Update the policy via API
        $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'termsUpdatedAt' => '2024-06-01T00:00:00Z',
                        ],
                    ],
                ],
            ])
        );

        // Accept the updated policy
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/accept', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(200, $response->getStatusCode());

        // Get user state
        $response = $this->send(
            $this->request('GET', '/api/users/2', [
                'authenticatedAs' => 2,
            ])
        );

        $data = json_decode($response->getBody()->getContents(), true);
        $policyState = Arr::get($data, 'data.attributes.fofTermsPoliciesState');

        $this->assertArrayHasKey('1', $policyState);
        $this->assertFalse($policyState['1']['has_update']);
    }

    #[Test]
    public function user_must_accept_shows_true_when_unaccepted_required_policies_exist()
    {
        // Create a new required policy via API
        $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'attributes' => [
                            'name' => 'New Terms',
                            'url' => 'https://example.com/new-terms',
                            'termsUpdatedAt' => Carbon::now()->toIso8601String(),
                            'optional' => false,
                            'sort' => 1,
                        ],
                    ],
                ],
            ])
        );

        $response = $this->send(
            $this->request('GET', '/api/users/2', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        $this->assertTrue(Arr::get($data, 'data.attributes.fofTermsPoliciesMustAccept'));
    }

    #[Test]
    public function user_must_accept_shows_true_when_required_policy_has_update()
    {
        // Update the required policy via API
        $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'termsUpdatedAt' => '2024-06-01T00:00:00Z',
                        ],
                    ],
                ],
            ])
        );

        $response = $this->send(
            $this->request('GET', '/api/users/2', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        $this->assertTrue(Arr::get($data, 'data.attributes.fofTermsPoliciesMustAccept'));
    }

    #[Test]
    public function user_must_accept_shows_false_when_all_required_policies_accepted()
    {
        $response = $this->send(
            $this->request('GET', '/api/users/2', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        $this->assertFalse(Arr::get($data, 'data.attributes.fofTermsPoliciesMustAccept'));
    }

    #[Test]
    public function optional_policy_updates_do_not_require_acceptance()
    {
        // Create an optional policy via API
        $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'attributes' => [
                            'name' => 'Optional Policy',
                            'url' => 'https://example.com/optional',
                            'termsUpdatedAt' => Carbon::now()->toIso8601String(),
                            'optional' => true,
                            'sort' => 1,
                        ],
                    ],
                ],
            ])
        );

        $response = $this->send(
            $this->request('GET', '/api/users/2', [
                'authenticatedAs' => 2,
            ])
        );

        $body = $response->getBody()->getContents();
        $data = json_decode($body, true);

        // User should not be required to accept since only optional policy is new/updated
        $this->assertFalse(Arr::get($data, 'data.attributes.fofTermsPoliciesMustAccept'));
    }
}
