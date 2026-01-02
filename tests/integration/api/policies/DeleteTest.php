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

class DeleteTest extends TestCase
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
    public function admin_can_delete_policy()
    {
        $response = $this->send(
            $this->request('DELETE', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 1,
            ])
        );

        $this->assertEquals(204, $response->getStatusCode());
        $this->assertNull(Policy::find(1));
    }

    #[Test]
    public function normal_user_cannot_delete_policy()
    {
        $response = $this->send(
            $this->request('DELETE', '/api/fof-terms-policies/1', [
                'authenticatedAs' => 2,
            ])
        );

        $this->assertEquals(403, $response->getStatusCode());
        $this->assertNotNull(Policy::find(1));
    }

    #[Test]
    public function guest_cannot_delete_policy()
    {
        $response = $this->send(
            $this->request('DELETE', '/api/fof-terms-policies/1')
        );

        // Guest receives 400 for missing CSRF token, not 401
        $this->assertContains($response->getStatusCode(), [400, 401]);
        $this->assertNotNull(Policy::find(1));
    }

    #[Test]
    public function deleting_nonexistent_policy_returns_404()
    {
        $response = $this->send(
            $this->request('DELETE', '/api/fof-terms-policies/999', [
                'authenticatedAs' => 1,
            ])
        );

        $this->assertEquals(404, $response->getStatusCode());
    }
}
