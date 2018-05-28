<?php

namespace Flagrow\Terms\Middlewares;

use Flagrow\Terms\Validators\RegisterPolicyValidator;
use Flarum\Api\Handler\IlluminateValidationExceptionHandler;
use Flarum\Api\JsonApiResponse;
use Illuminate\Contracts\Validation\ValidationException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Zend\Diactoros\Uri;
use Zend\Stratigility\MiddlewareInterface;

class RegisterMiddleware implements MiddlewareInterface
{
    public function __invoke(Request $request, Response $response, callable $out = null)
    {
        // Get the register endpoint for this Flarum
        $registerUri = new Uri(app()->url('register'));

        // Compare if the current path is the register endpoint
        // We only compare the path and not the host, that way even if Flarum redirects aren't set up correctly
        // and Flarum is accessed via the wrong hostname this middleware will still run
        if ($request->getUri()->getPath() === $registerUri->getPath()) {
            /**
             * @var $validator RegisterPolicyValidator
             */
            $validator = app(RegisterPolicyValidator::class);

            try {
                $validator->assertValid($request->getParsedBody());
            } catch (ValidationException $exception) {
                /**
                 * @var $handler IlluminateValidationExceptionHandler
                 */
                $handler = app(IlluminateValidationExceptionHandler::class);

                // We need to handle/format the error ourselves because the front-end (forum) doesn't have that error handler
                // Only the API-end has it (that's where the remaining of the sign up / login logic is)
                $response = $handler->handle($exception);

                $document = new Document();
                $document->setErrors($response->getErrors());

                return new JsonApiResponse($document, $response->getStatus());
            }
        }

        return $out ? $out($request, $response) : $response;
    }
}
