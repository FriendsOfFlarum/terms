import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import FieldSet from 'flarum/common/components/FieldSet';
import Switch from 'flarum/common/components/Switch';
import Link from 'flarum/common/components/Link';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import Policy from '../../common/models/Policy';

async function updatePolicy(policy: Policy, value: boolean): Promise<void> {
  const endpoint = `${app.forum.attribute('apiUrl')}${policy.apiEndpoint()}${value ? '/accept' : '/decline'}`;
  const updated: any = await app.request({
    url: endpoint,
    method: 'POST',
  });
  app.store.pushPayload(updated);
}

interface SettingsPageWithPolicies extends SettingsPage {
  [key: string]: any;
}

export default function () {
  extend(SettingsPage.prototype, 'settingsItems', function (this: SettingsPageWithPolicies, items: ItemList<Mithril.Children>) {
    const optionalPolicies = app.store.all<Policy>('fof-terms-policies').filter((policy) => policy.optional());
    if (!optionalPolicies.length) {
      return;
    }

    const policyState = app.session.user?.fofTermsPoliciesState() as Record<string, any> | undefined;

    if (!policyState) {
      return;
    }

    items.add(
      'policies',
      <FieldSet label={app.translator.trans('fof-terms.forum.user_settings.optional_policies_label')}>
        {optionalPolicies.map((policy) => {
          const policyId = policy.id();
          const state = policyId && policyState ? policyState[policyId] : undefined;
          const is_accepted = state?.is_accepted || false;

          return (
            <div className="Fof-Terms-Policy-User-Settings-Management">
              <Switch
                state={is_accepted}
                onchange={async (value: boolean) => {
                  const policyId = policy.id();
                  if (policyId && policyState) {
                    policyState[policyId].is_accepted = value;
                  }
                  this[policy.form_key()] = value;
                  await updatePolicy(policy, value);
                  m.redraw();
                }}
              >
                {' '}
                {policy.url() ? (
                  <Link target="_blank" href={policy.url()}>
                    {policy.name()}
                  </Link>
                ) : (
                  policy.name()
                )}
              </Switch>
            </div>
          );
        })}
      </FieldSet>,
      -99
    );
  });
}
