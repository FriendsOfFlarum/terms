import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import sortByAttribute from 'flagrow/terms/helpers/sortByAttribute';

export default class AcceptPoliciesModal extends Modal {
    init() {
        super.init();

        app.store.all('flagrow-terms-policies').forEach(policy => {
            this[policy.form_key()] = m.prop(false);
        });
    }

    title() {
        return app.translator.trans('flagrow-terms.forum.accept-modal.title');
    }

    content() {
        return m('.Modal-body', this.body());
    }

    body() {
        const policies = sortByAttribute(app.store.all('flagrow-terms-policies').filter(policy => {
            const state = app.session.user.flagrowTermsPoliciesState()[policy.id()];

            return !state || state.has_update;
        }));

        if (policies.length === 0) {
            return Button.component({
                children: app.translator.trans('flagrow-terms.forum.accept-modal.close'),
                onclick() {
                    app.modal.close();
                },
            });
        }

        return policies.map(policy => m('div', [
            m('h2', policy.name()),
            (app.forum.attribute('flagrow-terms.hide-updated-at') ? null : m('p', policy.terms_updated_at() ? app.translator.trans('flagrow-terms.forum.accept-modal.updated-at', {
                date: moment(policy.terms_updated_at()).format(app.forum.attribute('flagrow-terms.date-format')),
            }) : app.translator.trans('flagrow-terms.forum.accept-modal.updated-recently'))),
            (policy.update_message() ? m('p', policy.update_message()) : null),
            m('.Form-group', m('.Flagrow-Terms-Check.Flagrow-Terms-Check--login', m('label.checkbox', [
                m('input', {
                    type: 'checkbox',
                    bidi: this[policy.form_key()],
                }),
                app.translator.trans('flagrow-terms.forum.accept-modal.i-accept', {
                    policy: policy.name(),
                    a: policy.url() ? m('a', {
                        href: policy.url(),
                        target: '_blank',
                    }) : m('span'),
                }),
            ]))),
            Button.component({
                className: 'Button Button--primary',
                children: app.translator.trans('flagrow-terms.forum.accept-modal.accept'),
                disabled: !this[policy.form_key()](),
                onclick: () => {
                    app.request({
                        url: app.forum.attribute('apiUrl') + policy.apiEndpoint() + '/accept',
                        method: 'POST',
                        errorHandler: this.onerror.bind(this)
                    }).then(updated => {
                        app.store.pushPayload(updated);

                        // If this was the last policy to accept, close the modal
                        if (policies.length === 1) {
                            app.modal.close();
                        }

                        m.redraw();
                    });
                },
            }),
        ]));
    }
}
