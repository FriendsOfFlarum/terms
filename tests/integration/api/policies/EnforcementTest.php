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
use PHPUnit\Framework\Attributes\Test;

class EnforcementTest extends TestCase
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
            ],
            'discussions' => [
                [
                    'id'            => 1,
                    'title'         => 'Test Discussion',
                    'slug'          => 'test-discussion',
                    'created_at'    => Carbon::now(),
                    'user_id'       => 1,
                    'first_post_id' => 1,
                    'comment_count' => 1,
                ],
            ],
            'posts' => [
                [
                    'id'            => 1,
                    'discussion_id' => 1,
                    'created_at'    => Carbon::now(),
                    'user_id'       => 1,
                    'type'          => 'comment',
                    'content'       => '<t><p>First post</p></t>',
                ],
            ],
        ]);
    }

    protected function populateDatabase(): void
    {
        parent::populateDatabase();

        // User has accepted the initial policy
        $user = User::find(2);
        $user->fofTermsPolicies()->attach(1, [
            'accepted_at' => Carbon::parse('2024-02-01'),
            'is_accepted' => true,
        ]);
    }

    #[Test]
    public function user_can_post_when_policies_are_accepted()
    {
        // User has accepted policy, should be able to post
        $response = $this->send(
            $this->request('POST', '/api/posts', [
                'authenticatedAs' => 2,
                'json'            => [
                    'data' => [
                        'type'       => 'posts',
                        'attributes' => [
                            'content' => 'This is a test post',
                        ],
                        'relationships' => [
                            'discussion' => [
                                'data' => [
                                    'type' => 'discussions',
                                    'id'   => '1',
                                ],
                            ],
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());
    }

    #[Test]
    public function user_cannot_post_when_new_required_policy_exists()
    {
        // Create a new required policy
        $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'fof-terms-policies',
                        'attributes' => [
                            'name'           => 'New Privacy Policy',
                            'url'            => 'https://example.com/privacy',
                            'termsUpdatedAt' => Carbon::now()->toIso8601String(),
                            'optional'       => false,
                            'sort'           => 1,
                        ],
                    ],
                ],
            ])
        );

        // User should not be able to post without accepting the new policy
        $response = $this->send(
            $this->request('POST', '/api/posts', [
                'authenticatedAs' => 2,
                'json'            => [
                    'data' => [
                        'type'       => 'posts',
                        'attributes' => [
                            'content' => 'This should be blocked',
                        ],
                        'relationships' => [
                            'discussion' => [
                                'data' => [
                                    'type' => 'discussions',
                                    'id'   => '1',
                                ],
                            ],
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    public function user_cannot_post_when_policy_is_updated()
    {
        // Update the existing policy
        $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'fof-terms-policies',
                        'id'         => '1',
                        'attributes' => [
                            'termsUpdatedAt' => Carbon::now()->toIso8601String(),
                        ],
                    ],
                ],
            ])
        );

        // User should not be able to post without accepting the updated policy
        $response = $this->send(
            $this->request('POST', '/api/posts', [
                'authenticatedAs' => 2,
                'json'            => [
                    'data' => [
                        'type'       => 'posts',
                        'attributes' => [
                            'content' => 'This should be blocked',
                        ],
                        'relationships' => [
                            'discussion' => [
                                'data' => [
                                    'type' => 'discussions',
                                    'id'   => '1',
                                ],
                            ],
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    public function user_can_post_after_accepting_updated_policy()
    {
        // Update the existing policy
        $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'fof-terms-policies',
                        'id'         => '1',
                        'attributes' => [
                            'termsUpdatedAt' => Carbon::now()->toIso8601String(),
                        ],
                    ],
                ],
            ])
        );

        // Accept the updated policy
        $this->send(
            $this->request('POST', '/api/fof-terms-policies/1/accept', [
                'authenticatedAs' => 2,
            ])
        );

        // User should now be able to post
        $response = $this->send(
            $this->request('POST', '/api/posts', [
                'authenticatedAs' => 2,
                'json'            => [
                    'data' => [
                        'type'       => 'posts',
                        'attributes' => [
                            'content' => 'This should work now',
                        ],
                        'relationships' => [
                            'discussion' => [
                                'data' => [
                                    'type' => 'discussions',
                                    'id'   => '1',
                                ],
                            ],
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());
    }

    #[Test]
    public function optional_policy_updates_do_not_block_posting()
    {
        // Create a new optional policy
        $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'fof-terms-policies',
                        'attributes' => [
                            'name'           => 'Optional Marketing Policy',
                            'url'            => 'https://example.com/marketing',
                            'termsUpdatedAt' => Carbon::now()->toIso8601String(),
                            'optional'       => true,
                            'sort'           => 1,
                        ],
                    ],
                ],
            ])
        );

        // User should still be able to post without accepting optional policy
        $response = $this->send(
            $this->request('POST', '/api/posts', [
                'authenticatedAs' => 2,
                'json'            => [
                    'data' => [
                        'type'       => 'posts',
                        'attributes' => [
                            'content' => 'This should work',
                        ],
                        'relationships' => [
                            'discussion' => [
                                'data' => [
                                    'type' => 'discussions',
                                    'id'   => '1',
                                ],
                            ],
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());
    }

    #[Test]
    public function admin_can_post_without_accepting_policies()
    {
        // Create a new required policy
        $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'fof-terms-policies',
                        'attributes' => [
                            'name'           => 'New Policy',
                            'url'            => 'https://example.com/new',
                            'termsUpdatedAt' => Carbon::now()->toIso8601String(),
                            'optional'       => false,
                            'sort'           => 1,
                        ],
                    ],
                ],
            ])
        );

        // Admin should be able to post regardless of policy acceptance
        $response = $this->send(
            $this->request('POST', '/api/posts', [
                'authenticatedAs' => 1,
                'json'            => [
                    'data' => [
                        'type'       => 'posts',
                        'attributes' => [
                            'content' => 'Admin post',
                        ],
                        'relationships' => [
                            'discussion' => [
                                'data' => [
                                    'type' => 'discussions',
                                    'id'   => '1',
                                ],
                            ],
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(201, $response->getStatusCode());
    }
}
