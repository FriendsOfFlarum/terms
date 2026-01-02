import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import ItemList from 'flarum/common/utils/ItemList';
import sortByAttribute from '../common/helpers/sortByAttribute';
import Policy from '../common/models/Policy';

interface SignUpModalWithPolicies extends SignUpModal {
  fofTermsPolicies?: Policy[];
  [key: string]: any;
}

export default function () {
  extend('flarum/forum/components/SignUpModal', 'oninit', function (this: SignUpModalWithPolicies) {
    this.fofTermsPolicies = sortByAttribute(app.store.all<Policy>('fof-terms-policies'));

    this.fofTermsPolicies?.forEach((policy) => {
      this[policy.form_key()] = false;
    });
  });

  extend('flarum/forum/components/SignUpModal', 'fields', function (this: SignUpModalWithPolicies, fields: ItemList<unknown>) {
    const legalText = app.forum.attribute<string>('fof-terms.signup-legal-text');

    if (legalText) {
      fields.add(
        'fof-terms-legal-text',
        <div className="Form-group">
          <div className="FoF-Terms-SignUp-Legal Alert">{legalText}</div>
        </div>
      );
    }

    this.fofTermsPolicies?.forEach((policy) => {
      fields.add(
        'fof-terms-policy-' + policy.id(),
        <div className="Form-group">
          <div className="FoF-Terms-Check FoF-Terms-Check--signup">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this[policy.form_key()] as boolean}
                onchange={() => {
                  this[policy.form_key()] = !this[policy.form_key()];
                }}
                disabled={(this as any).loading}
              />
              {app.translator.trans('fof-terms.forum.signup.i-accept', {
                policy: policy.name(),
                a: policy.url() ? <a href={policy.url()} target="_blank" /> : <span />,
              })}
            </label>
          </div>
        </div>
      );
    });
  });

  extend('flarum/forum/components/SignUpModal', 'submitData', function (this: SignUpModalWithPolicies, data: Record<string, unknown>) {
    this.fofTermsPolicies?.forEach((policy) => {
      data[policy.form_key()] = this[policy.form_key()];
    });
  });
}
