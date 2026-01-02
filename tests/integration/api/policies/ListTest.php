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

class ListTest extends TestCase
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
                    'update_message'   => 'Updated privacy policy',
                    'terms_updated_at' => Carbon::parse('2024-06-01'),
                    'optional'         => true,
                    'sort'             => 1,
                ],
            ],
        ]);
    }

    #[Test]
    public function can_list_policies()
    {
        $response = $this->send(
            $this->request('GET', '/api/fof-terms-policies')
        );

        $body = $response->getBody()->getContents();

        $this->assertEquals(200, $response->getStatusCode(), $body);

        $data = json_decode($body, true);
        $policies = Arr::get($data, 'data');

        $this->assertIsArray($policies);
        $this->assertCount(2, $policies);

        $this->assertEquals('fof-terms-policies', $policies[0]['type']);
        $this->assertEquals('Terms of Service', $policies[0]['attributes']['name']);
        $this->assertEquals(false, $policies[0]['attributes']['optional']);

        $this->assertEquals('Privacy Policy', $policies[1]['attributes']['name']);
        $this->assertEquals(true, $policies[1]['attributes']['optional']);
    }

    #[Test]
    public function guests_can_see_policies()
    {
        $response = $this->send(
            $this->request('GET', '/api/fof-terms-policies')
        );

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody()->getContents(), true);
        $policies = Arr::get($data, 'data');

        $this->assertCount(2, $policies);
    }

    #[Test]
    public function policies_include_correct_attributes()
    {
        $response = $this->send(
            $this->request('GET', '/api/fof-terms-policies')
        );

        $data = json_decode($response->getBody()->getContents(), true);
        $policy = Arr::get($data, 'data.0.attributes');

        $this->assertArrayHasKey('name', $policy);
        $this->assertArrayHasKey('url', $policy);
        $this->assertArrayHasKey('updateMessage', $policy);
        $this->assertArrayHasKey('termsUpdatedAt', $policy);
        $this->assertArrayHasKey('optional', $policy);
        $this->assertArrayHasKey('sort', $policy);
    }

    #[Test]
    public function policies_are_sorted_by_sort_column()
    {
        $response = $this->send(
            $this->request('GET', '/api/fof-terms-policies', [
                'queryParams' => [
                    'sort' => 'sort',
                ],
            ])
        );

        $data = json_decode($response->getBody()->getContents(), true);
        $policies = Arr::get($data, 'data');

        // First policy should have sort = 0, second should have sort = 1
        $this->assertEquals(0, $policies[0]['attributes']['sort']);
        $this->assertEquals(1, $policies[1]['attributes']['sort']);
    }
}
