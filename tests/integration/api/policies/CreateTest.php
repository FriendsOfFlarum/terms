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

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Terms\Policy;
use Illuminate\Support\Arr;
use PHPUnit\Framework\Attributes\Test;

class CreateTest extends TestCase
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
        ]);
    }

    #[Test]
    public function admin_can_create_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'attributes' => [
                            'name' => 'Terms of Service',
                            'url' => 'https://example.com/terms',
                            'updateMessage' => 'Please review our updated terms',
                            'termsUpdatedAt' => '2024-01-01T00:00:00Z',
                            'optional' => false,
                        ],
                    ],
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(201, $response->getStatusCode(), $body);

        $policy = Policy::firstOrFail();
        $data = json_decode($body, true);

        $this->assertEquals('Terms of Service', $policy->name);
        $this->assertEquals('https://example.com/terms', $policy->url);
        $this->assertEquals('Terms of Service', Arr::get($data, 'data.attributes.name'));
        $this->assertEquals('https://example.com/terms', Arr::get($data, 'data.attributes.url'));
        $this->assertEquals(false, Arr::get($data, 'data.attributes.optional'));
    }

    #[Test]
    public function cannot_create_policy_without_name()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'attributes' => [
                            'url' => 'https://example.com/terms',
                        ],
                    ],
                ],
            ])
        );

        $body = (string) $response->getBody();

        $this->assertEquals(422, $response->getStatusCode(), $body);
        $this->assertJson($body);

        $errors = json_decode($body, true)['errors'] ?? [];
        $this->assertNotEmpty($errors);
        $this->assertEquals('422', $errors[0]['status']);
    }

    #[Test]
    public function normal_user_cannot_create_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 2,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'attributes' => [
                            'name' => 'Terms of Service',
                        ],
                    ],
                ],
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());
    }

    #[Test]
    public function guest_cannot_create_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'attributes' => [
                            'name' => 'Terms of Service',
                        ],
                    ],
                ],
            ])
        );

        // Guest receives 400 for missing CSRF token, not 401
        $this->assertContains($response->getStatusCode(), [400, 401]);
    }

    #[Test]
    public function can_create_optional_policy()
    {
        $response = $this->send(
            $this->request('POST', '/api/fof-terms-policies', [
                'authenticatedAs' => 1,
                'json' => [
                    'data' => [
                        'type' => 'fof-terms-policies',
                        'attributes' => [
                            'name' => 'Privacy Policy',
                            'optional' => true,
                        ],
                    ],
                ],
            ])
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(201, $response->getStatusCode(), $body);

        $policy = Policy::firstOrFail();
        $data = json_decode($body, true);

        $this->assertEquals('Privacy Policy', $policy->name);
        $this->assertTrue((bool) $policy->optional);
        $this->assertTrue((bool) Arr::get($data, 'data.attributes.optional'));
    }
}
