<?php

namespace Flagrow\Terms\Middlewares;

use Flagrow\Terms\Validators\RegisterPolicyValidator;
use Flarum\Api\ExceptionHandler\IlluminateValidationExceptionHandler;
use Flarum\Api\JsonApiResponse;
use Illuminate\Validation\ValidationException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Tobscure\JsonApi\Document;
use Zend\Diactoros\Uri;

class RegisterMiddleware implements MiddlewareInterface
{

    /**
     * Process an incoming server request and return a response, optionally delegating
     * response creation to a handler.
     * @param Request $request
     * @param RequestHandlerInterface $handler
     * @return Response
     */
    public function process(Request $request, RequestHandlerInterface $handler): Response
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

        return $handler->handle($request);
    }
}
