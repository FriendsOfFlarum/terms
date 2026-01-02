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

class UpdateTest extends TestCase
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
        ]);
    }

    #[Test]
    public function admin_can_update_policy()
    {
        $response = $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'name' => 'Updated Terms',
                            'updateMessage' => 'We have updated our terms',
                        ],
                    ],
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        $policy = Policy::find(1);
        $data = json_decode($body, true);

        $this->assertEquals('Updated Terms', $policy->name);
        $this->assertEquals('We have updated our terms', $policy->update_message);
        $this->assertEquals('Updated Terms', Arr::get($data, 'data.attributes.name'));
        $this->assertEquals('We have updated our terms', Arr::get($data, 'data.attributes.updateMessage'));
    }

    #[Test]
    public function admin_can_change_policy_optional_status()
    {
        $response = $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'optional' => true,
                        ],
                    ],
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        $policy = Policy::find(1);
        $data = json_decode($body, true);

        $this->assertTrue((bool) $policy->optional);
        $this->assertTrue((bool) Arr::get($data, 'data.attributes.optional'));
    }

    #[Test]
    public function normal_user_cannot_update_policy()
    {
        $response = $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'name' => 'Hacked Terms',
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());

        $policy = Policy::find(1);
        $this->assertEquals('Terms of Service', $policy->name);
    }

    #[Test]
    public function guest_cannot_update_policy()
    {
        $response = $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'name' => 'Hacked Terms',
                        ],
                    ],
                ],
            ])
        );

        // Guest receives 400 for missing CSRF token, not 401
        $this->assertContains($response->getStatusCode(), [400, 401]);
    }

    #[Test]
    public function can_update_terms_updated_at()
    {
        $newDate = '2024-12-01T10:00:00Z';

        $response = $this->send(
            $this->request('PATCH', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'id' => '1',
                        'attributes' => [
                            'termsUpdatedAt' => $newDate,
                        ],
                    ],
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        $policy = Policy::find(1);
        $this->assertNotNull($policy->terms_updated_at);
        $this->assertEquals('2024-12-01', $policy->terms_updated_at->format('Y-m-d'));
    }
}
