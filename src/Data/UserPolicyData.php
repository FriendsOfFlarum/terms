<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Terms\Data;

use Blomstra\Gdpr\Data\Type;
use Carbon\Carbon;
use FoF\Terms\Policy;
use FoF\Terms\Repositories\PolicyRepository;
use Illuminate\Database\Eloquent\Collection;

class UserPolicyData extends Type
{
    public function export(): ?array
    {
        $exportData = [];

        $policyRepository = resolve(PolicyRepository::class);

        $policyRepository->all()->each(function (Policy $policy) use (&$exportData) {
            $exportData[] = ["terms/policy-{$policy->id}.json" => $this->encodeForExport($this->constructExportData($policy))];
        });

        return $exportData;
    }

    protected function constructExportData(Policy $policy): array
    {
        /**
         * @var Collection $userPolicies
         *
         * @phpstan-ignore-next-line
         */
        $userPolicies = $this->user->fofTermsPolicies->keyBy('id');

        $accepted_at = $userPolicies->has($policy->id) ? Carbon::parse($userPolicies->get($policy->id)->pivot->accepted_at) : null;
        $has_update = !$accepted_at || (($policy->terms_updated_at !== null) && $policy->terms_updated_at->gt($accepted_at));

        return [
            'name'             => $policy->name,
            'url'              => $policy->url,
            'created_at'       => $policy->created_at,
            'update_message'   => $policy->update_message,
            'terms_updated_at' => $policy->terms_updated_at,
            'accepted_at'      => $accepted_at,
            'has_update'       => $has_update,
            'must_accept'      => $has_update && !$this->user->can('postponeAccept', $policy),
        ];
    }

    public static function anonymizeDescription(): string
    {
        return self::deleteDescription();
    }

    public function anonymize(): void
    {
        $this->delete();
    }

    public function delete(): void
    {
        $policyRepository = resolve(PolicyRepository::class);
        $policyRepository->declineAll($this->user);
    }
}
