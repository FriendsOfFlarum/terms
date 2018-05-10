import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SignUpModal from 'flarum/components/SignUpModal';
import sortByAttribute from 'flagrow/terms/helpers/sortByAttribute';

export default function () {
    extend(SignUpModal.prototype, 'init', function () {
        this.flagrowTermsPolicies = sortByAttribute(app.store.all('flagrow-terms-policies'));

        this.flagrowTermsPolicies.forEach(policy => {
            this[policy.form_key()] = m.prop(false);
        });
    });

    extend(SignUpModal.prototype, 'body', function (children) {
        let additionalContent = [];

        const legalText = app.forum.attribute('flagrow-terms.signup-legal-text');

        if (legalText) {
            additionalContent.push(m('.Form-group', m('.Flagrow-Terms-SignUp-Legal.Alert', legalText)));
        }

        this.flagrowTermsPolicies.forEach(policy => {
            additionalContent.push(m('.Form-group', m('.Flagrow-Terms-Check.Flagrow-Terms-Check--signup', m('label.checkbox', [
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

        let fieldsAdded = false;

        // Add the new content inside the Form element, at the second-to-last position (last is submit button)
        children.forEach(child => {
            // Only ever add the fields once
            // Otherwise there could be some Mithril templating issues
            if (fieldsAdded) {
                return;
            }

            if (child.attrs && child.attrs.className && child.attrs.className.indexOf('Form') !== -1) {
                child.children.splice(child.children.length - 1, 0, additionalContent);

                fieldsAdded = true;
            }
        });

        if (!fieldsAdded) {
            console.error('Could not insert flagrow/terms fields into SignUpModal');
        }
    });

    extend(SignUpModal.prototype, 'submitData', function (data) {
        this.flagrowTermsPolicies.forEach(policy => {
            data[policy.form_key()] = this[policy.form_key()]();
        });
    });
}
