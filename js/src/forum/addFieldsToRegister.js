import { extend } from 'flarum/extend';
import app from 'flarum/app';
import SignUpModal from 'flarum/components/SignUpModal';
import sortByAttribute from '../common/helpers/sortByAttribute';

/* global m */

export default function () {
    extend(SignUpModal.prototype, 'oninit', function () {
        this.fofTermsPolicies = sortByAttribute(app.store.all('fof-terms-policies'));

        this.fofTermsPolicies.forEach((policy) => {
            this[policy.form_key()] = false;
        });
    });

    extend(SignUpModal.prototype, 'fields', function (fields) {
        const legalText = app.forum.attribute('fof-terms.signup-legal-text');

        if (legalText) {
            fields.add('fof-terms-legal-text', m('.Form-group', m('.FoF-Terms-SignUp-Legal.Alert', legalText)));
        }

        this.fofTermsPolicies.forEach((policy) => {
            fields.add(
                'fof-terms-policy-' + policy.id(),
                m(
                    '.Form-group',
                    m(
                        '.FoF-Terms-Check.FoF-Terms-Check--signup',
                        m('label.checkbox', [
                            m('input', {
                                type: 'checkbox',
                                checked: this[policy.form_key()],
                                onchange: () => {
                                    this[policy.form_key()] = !this[policy.form_key()];
                                },
                                disabled: this.loading,
                            }),
                            app.translator.trans('fof-terms.forum.signup.i-accept', {
                                policy: policy.name(),
                                a: policy.url()
                                    ? m('a', {
                                          href: policy.url(),
                                          target: '_blank',
                                      })
                                    : m('span'),
                            }),
                        ])
                    )
                )
            );
        });
    });

    extend(SignUpModal.prototype, 'submitData', function (data) {
        this.fofTermsPolicies.forEach((policy) => {
            data[policy.form_key()] = this[policy.form_key()];
        });
    });
}
