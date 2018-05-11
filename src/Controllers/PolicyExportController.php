<?php

namespace Flagrow\Terms\Controllers;

use Carbon\Carbon;
use Flagrow\Terms\Repositories\PolicyRepository;
use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Core\User;
use Flarum\Http\Controller\ControllerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\JsonResponse;
use Zend\Diactoros\Response\TextResponse;

class PolicyExportController implements ControllerInterface
{
    use AssertPermissionTrait;

    protected $policies;

    public function __construct(PolicyRepository $policies)
    {
        $this->policies = $policies;
    }

    public function handle(ServerRequestInterface $request)
    {
        $id = array_get($request->getQueryParams(), 'id');
        $format = array_get($request->getQueryParams(), 'format');
        $rawInclude = array_get($request->getQueryParams(), 'include');

        if ($rawInclude) {
            $include = explode(',', $rawInclude);
        } else {
            $include = [
                'email',
                'join_time',
                'accepted_at',
            ];
        }

        $policy = $this->policies->findOrFail($id);

        $this->assertCan($request->getAttribute('actor'), 'export', $policy);

        $data = $policy->users()->orderBy('flagrow_terms_policy_user.accepted_at')->get()->map(function ($user) use ($include) {
            /**
             * @var $user User
             */

            return array_only([
                'id' => $user->id,
                'email' => $user->email,
                'username' => $user->username,
                'join_time' => $user->join_time->toIso8601String(),
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
