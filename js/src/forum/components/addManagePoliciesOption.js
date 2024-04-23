import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import FieldSet from 'flarum/common/components/FieldSet';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';

export default function () {
  extend(SettingsPage.prototype, 'settingsItems', function (items) {
    const policies = app.store.all('fof-terms-policies').filter((policy) => policy.data.attributes.optional);

    let policyState = app.session.user.fofTermsPoliciesState();

    items.add(
      'policies',
      <FieldSet label={'Policies'}>
        {policies.map((policy) => {
          return (
            <div class={'Fof-Terms-Policy-User-Settings-Management'}>
              <Switch
                state={policyState[policy.id()].is_accepted}
                onchange={(value) => {
                  policyState[policy.id()].is_accepted = value;
                  this[policy.form_key()] = value;
                  app
                    .request({
                      url: app.forum.attribute('apiUrl') + policy.apiEndpoint() + (this[policy.form_key()] ? '/accept' : '/decline'),
                      method: 'POST',
                    })
                    .then((updated) => {
                      app.store.pushPayload(updated);
                      m.redraw();
                    });
                }}
              >
                <a href={policy.url() ? policy.url() : ''}>{policy.name()}</a>
              </Switch>
            </div>
          );
        })}
      </FieldSet>,
      -200
    );
  });
}
