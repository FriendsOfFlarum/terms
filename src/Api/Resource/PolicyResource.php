<?php

namespace FoF\Terms\Api\Resource;

use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Api\Serializer;
use Flarum\Api\Sort\SortColumn;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Terms\Policy;
use FoF\Terms\Repositories\PolicyRepository;
use Tobyz\JsonApiServer\Context as JsonApiContext;

use function Tobyz\JsonApiServer\json_api_response;

/**
 * @extends Resource\AbstractDatabaseResource<Policy>
 */
class PolicyResource extends Resource\AbstractDatabaseResource
{
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected PolicyRepository $policies
    ) {
    }
    public function type(): string
    {
        return 'fof-terms-policies';
    }

    public function model(): string
    {
        return Policy::class;
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Index::make(),

            Endpoint\Create::make()
                ->authenticated()
                ->can('administrate'),

            Endpoint\Update::make()
                ->authenticated()
                ->can('administrate'),

            Endpoint\Delete::make()
                ->authenticated()
                ->can('administrate'),

            Endpoint\Show::make(),

            Endpoint\Endpoint::make('accept')
                ->route('POST', '/{id}/accept')
                ->authenticated()
                ->action(function (Context $context) {
                    $policy = $this->policies->findOrFail($context->modelId);
                    $actor = $context->getActor();

                    $actor->assertRegistered();

                    $this->policies->accept($actor, $policy);

                    return $actor;
                })
                ->response(function (Context $context, $user) {
                    // Get the UserResource from the API
                    $userResource = $context->api->getResource('users');

                    // Create a new serializer with UserResource context
                    $serializer = new Serializer($context);
                    $serializer->addPrimary(
                        $userResource,
                        $user,
                        []
                    );

                    [$primary, $included] = $serializer->serialize();

                    $document = ['data' => $primary[0]];
                    if (count($included)) {
                        $document['included'] = $included;
                    }

                    return json_api_response($document);
                }),

            Endpoint\Endpoint::make('decline')
                ->route('POST', '/{id}/decline')
                ->authenticated()
                ->action(function (Context $context) {
                    $policy = $this->policies->findOrFail($context->modelId);
                    $actor = $context->getActor();

                    $actor->assertRegistered();

                    // Only optional policies can be declined
                    if (!$policy->optional) {
                        throw new \Flarum\Foundation\ValidationException([
                            'policy' => 'Cannot decline a required policy'
                        ]);
                    }

                    $this->policies->declineOptional($actor, $policy);

                    return $actor;
                })
                ->response(function (Context $context, $user) {
                    // Get the UserResource from the API
                    $userResource = $context->api->getResource('users');

                    // Create a new serializer with UserResource context
                    $serializer = new Serializer($context);
                    $serializer->addPrimary(
                        $userResource,
                        $user,
                        []
                    );

                    [$primary, $included] = $serializer->serialize();

                    $document = ['data' => $primary[0]];
                    if (count($included)) {
                        $document['included'] = $included;
                    }

                    return json_api_response($document);
                }),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Integer::make('sort')
                ->writable(),

            Schema\Str::make('name')
                ->requiredOnCreate()
                ->minLength(1)
                ->maxLength(255)
                ->writable(),

            Schema\Str::make('url')
                ->maxLength(255)
                ->nullable()
                ->writable(),

            Schema\Str::make('updateMessage')
                ->property('update_message')
                ->nullable()
                ->writable(),

            Schema\DateTime::make('termsUpdatedAt')
                ->property('terms_updated_at')
                ->nullable()
                ->writable()
                ->get(function (Policy $policy) {
                    if ($this->settings->get('fof-terms.hide-updated-at')) {
                        return null;
                    }

                    return $policy->terms_updated_at;
                }),

            Schema\Boolean::make('optional')
                ->writable(),

            Schema\Arr::make('additionalInfo')
                ->property('additional_info')
                ->writable()
                ->nullable(),

            Schema\DateTime::make('createdAt')
                ->property('created_at'),

            Schema\DateTime::make('updatedAt')
                ->property('updated_at'),

            Schema\Relationship\ToMany::make('users')
                ->type('users')
                ->includable(),
        ];
    }

    public function sorts(): array
    {
        return [
            SortColumn::make('sort'),
            SortColumn::make('createdAt'),
            SortColumn::make('updatedAt'),
        ];
    }

    public function saving(object $model, JsonApiContext $context): ?object
    {
        $this->policies->clearCache();

        return parent::saving($model, $context);
    }

    public function deleting(object $model, JsonApiContext $context): void
    {
        $this->policies->clearCache();

        parent::deleting($model, $context);
    }
}
