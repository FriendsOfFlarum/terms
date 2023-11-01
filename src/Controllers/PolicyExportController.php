<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Controllers;

use Carbon\Carbon;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Laminas\Diactoros\Response\TextResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class PolicyExportController implements RequestHandlerInterface
{
    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    /**
     * @param ServerRequestInterface $request
     *
     * @throws PermissionDeniedException
     *
     * @return ResponseInterface
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        $format = Arr::get($request->getQueryParams(), 'format');
        $rawInclude = Arr::get($request->getQueryParams(), 'include');

        if ($rawInclude) {
            $include = explode(',', $rawInclude);
        } else {
            $include = [
                'email',
                'joined_at',
                'accepted_at',
            ];
        }

        $policy = $this->policies->findOrFail($id);

        $actor = RequestUtil::getActor($request);
        $actor->assertCan('export', $policy);

        $data = $policy->users()->orderBy('fof_terms_policy_user.accepted_at')->get()->map(function (User $user) use ($include) {
            return Arr::only([
                'id'           => $user->id,
                'email'        => $user->email,
                'username'     => $user->username,
                'display_name' => $user->display_name,
                'joined_at'    => $user->joined_at->toIso8601String(),
                /** @phpstan-ignore-next-line */
                'accepted_at'  => Carbon::parse($user->pivot->accepted_at)->toIso8601String(),
            ], $include);
        });

        switch ($format) {
            case 'csv':
                $handle = fopen('php://memory', 'rb+');

                if (count($data) > 0 && !Arr::get($request->getQueryParams(), 'no-csv-headers')) {
                    fputcsv($handle, array_keys($data[0]));
                }

                foreach ($data as $entry) {
                    fputcsv($handle, $entry);
                }

                rewind($handle);
                $output = stream_get_contents($handle);
                fclose($handle);

                return new TextResponse($output, 200, [
                    'Content-Type' => 'text/csv',
                ]);
            default:
                return new JsonResponse($data);
        }
    }
}
