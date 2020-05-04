<?php

namespace FoF\Terms\Controllers;

use Carbon\Carbon;
use Flarum\User\AssertPermissionTrait;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;
use Laminas\Diactoros\Response\JsonResponse;
use Laminas\Diactoros\Response\TextResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class PolicyExportController implements RequestHandlerInterface
{
    use AssertPermissionTrait;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    /**
     * @param ServerRequestInterface $request
     * @return ResponseInterface
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $id = array_get($request->getQueryParams(), 'id');
        $format = array_get($request->getQueryParams(), 'format');
        $rawInclude = array_get($request->getQueryParams(), 'include');

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

        $this->assertCan($request->getAttribute('actor'), 'export', $policy);

        $data = $policy->users()->orderBy('fof_terms_policy_user.accepted_at')->get()->map(function ($user) use ($include) {
            /**
             * @var $user User
             */

            return array_only([
                'id' => $user->id,
                'email' => $user->email,
                'username' => $user->username,
                'display_name' => $user->display_name,
                'joined_at' => $user->joined_at->toIso8601String(),
                'accepted_at' => Carbon::parse($user->pivot->accepted_at)->toIso8601String(),
            ], $include);
        });

        switch ($format) {
            case 'csv':
                $handle = fopen('php://memory', 'rb+');

                if (count($data) > 0 && !array_get($request->getQueryParams(), 'no-csv-headers')) {
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
