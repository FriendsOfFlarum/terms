import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SignUpModal from 'flarum/components/SignUpModal';
import sortByAttribute from '../common/helpers/sortByAttribute';

export default function () {
    extend(SignUpModal.prototype, 'init', function () {
        this.flagrowTermsPolicies = sortByAttribute(app.store.all('flagrow-terms-policies'));

        this.flagrowTermsPolicies.forEach(policy => {
            this[policy.form_key()] = m.prop(false);
        });
    });

    extend(SignUpModal.prototype, 'fields', function (fields) {
        const legalText = app.forum.attribute('flagrow-terms.signup-legal-text');

        if (legalText) {
            fields.add('flagrow-terms-legal-text', m('.Form-group', m('.Flagrow-Terms-SignUp-Legal.Alert', legalText)));
        }

        this.flagrowTermsPolicies.forEach(policy => {
            fields.add('flagrow-terms-policy-' + policy.id(), m('.Form-group', m('.Flagrow-Terms-Check.Flagrow-Terms-Check--signup', m('label.checkbox', [
                m('input', {
                    type: 'checkbox',
                    bidi: this[policy.form_key()],
                    disabled: this.loading,
                }),
                app.translator.trans('flagrow-terms.forum.signup.i-accept', {
                    policy: policy.name(),
                    a: policy.url() ? m('a', {
                        href: policy.url(),
                        target: '_blank',
                    }) : m('span'),
                }),
            ]))));
        });
    });

    extend(SignUpModal.prototype, 'submitData', function (data) {
        this.flagrowTermsPolicies.forEach(policy => {
            data[policy.form_key()] = this[policy.form_key()]();
        });
    });
}
