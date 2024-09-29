<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Middlewares;

use Flarum\Foundation\ErrorHandling\ExceptionHandler\IlluminateValidationExceptionHandler;
use Flarum\Foundation\ErrorHandling\JsonApiFormatter;
use Flarum\User\User;
use FoF\Terms\Repositories\PolicyRepository;
use FoF\Terms\Validators\RegisterPolicyValidator;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class RegisterMiddleware implements MiddlewareInterface
{
    /**
     * Process an incoming server request and return a response, optionally delegating
     * response creation to a handler.
     *
     * @param Request                 $request
     * @param RequestHandlerInterface $handler
     *
     * @return Response
     */
    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        // Compare if the current path is the register endpoint
        if ($request->getUri()->getPath() !== '/register') {
            return $handler->handle($request);
        }

        /**
         * @var RegisterPolicyValidator $validator
         */
        $validator = resolve(RegisterPolicyValidator::class);

        try {
            $validator->assertValid($request->getParsedBody());
        } catch (ValidationException $exception) {
            /**
             * @var IlluminateValidationExceptionHandler $handler
             */
            $handler = resolve(IlluminateValidationExceptionHandler::class);

            // We need to handle/format the error ourselves because the front-end (forum) doesn't have that error handler
            // Only the API-end has it (that's where the remaining of the sign up / login logic is)
            $error = $handler->handle($exception);

            return (new JsonApiFormatter())->format($error, $request);
        }

        $response = $handler->handle($request);
        if ($response->getStatusCode() < 400) {
            $response->getBody()->rewind();
            $payload = json_decode($response->getBody()->getContents(), true);

            /** @var User $user */
            $user = User::find(Arr::get($payload, 'data.id'));

            /**
             * @var PolicyRepository $policies
             */
            $policies = resolve(PolicyRepository::class);

            $requestBody = $request->getParsedBody();

            foreach ($policies->all() as $policy) {
                if (isset($requestBody['fof_terms_policy_'.$policy->id]) && $requestBody['fof_terms_policy_'.$policy->id] === true) {
                    $policies->accept($user, $policy);
                } else {
                    $policies->declineOptional($user, $policy);
                }
            }
        }

        return $response;
    }
}
