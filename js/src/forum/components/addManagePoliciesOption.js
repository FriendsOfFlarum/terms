import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import FieldSet from 'flarum/common/components/FieldSet';
import Switch from 'flarum/common/components/Switch';
import Link from 'flarum/common/components/Link';

async function updatePolicy(policy, value) {
  const endpoint = `${app.forum.attribute('apiUrl')}${policy.apiEndpoint()}${value ? '/accept' : '/decline'}`;
  const updated = await app.request({
    url: endpoint,
    method: 'POST',
  });
  app.store.pushPayload(updated);
}

export default function () {
  extend(SettingsPage.prototype, 'settingsItems', function (items) {
    const policies = app.store.all('fof-terms-policies').filter((policy) => policy.optional());
    if (!policies.length) {
      return;
    }

    let policyState = app.session.user.fofTermsPoliciesState();

    items.add(
      'policies',
      <FieldSet label={'Policies'}>
        {policies.map((policy) => {
          const { is_accepted } = policyState[policy.id()];
          return (
            <div class={'Fof-Terms-Policy-User-Settings-Management'}>
              <Switch
                state={is_accepted}
                onchange={async (value) => {
                  policyState[policy.id()].is_accepted = value;
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
      -200
    );
  });
}
