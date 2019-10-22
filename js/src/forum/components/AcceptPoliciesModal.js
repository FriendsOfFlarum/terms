import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import sortByAttribute from '../../common/helpers/sortByAttribute';

/* global m, moment */

export default class AcceptPoliciesModal extends Modal {
    init() {
        super.init();

        app.store.all('fof-terms-policies').forEach(policy => {
            this[policy.form_key()] = m.prop(false);
        });
    }

    title() {
        return app.translator.trans('fof-terms.forum.accept-modal.title');
    }

    content() {
        return m('.Modal-body', this.body());
    }

    body() {
        const policies = sortByAttribute(app.store.all('fof-terms-policies').filter(policy => {
            const state = app.session.user.fofTermsPoliciesState()[policy.id()];

            return !state || state.has_update;
        }));

        if (policies.length === 0) {
            return Button.component({
                className: 'Button',
                children: app.translator.trans('fof-terms.forum.accept-modal.close'),
                onclick() {
                    app.modal.close();
                },
            });
        }

        return policies.map(policy => m('div', [
            m('h2', policy.name()),
            (app.forum.attribute('fof-terms.hide-updated-at') ? null : m('p', policy.terms_updated_at() ? app.translator.trans('fof-terms.forum.accept-modal.updated-at', {
                date: moment(policy.terms_updated_at()).format(app.forum.attribute('fof-terms.date-format')),
            }) : app.translator.trans('fof-terms.forum.accept-modal.updated-recently'))),
            (policy.update_message() ? m('p', policy.update_message()) : null),
            m('.Form-group', m('.FoF-Terms-Check.FoF-Terms-Check--login', m('label.checkbox', [
                m('input', {
                    type: 'checkbox',
                    bidi: this[policy.form_key()],
                }),
                app.translator.trans('fof-terms.forum.accept-modal.i-accept', {
                    policy: policy.name(),
                    a: policy.url() ? m('a', {
                        href: policy.url(),
                        target: '_blank',
                    }) : m('span'),
                }),
            ]))),
            Button.component({
                className: 'Button Button--primary',
                children: app.translator.trans('fof-terms.forum.accept-modal.accept'),
                disabled: !this[policy.form_key()](),
                onclick: () => {
                    // We need to save the "must accept" property before performing the request
                    // Because an updated user serializer will be returned
                    const hadToAcceptToInteract = app.session.user.fofTermsPoliciesMustAccept();

                    app.request({
                        url: app.forum.attribute('apiUrl') + policy.apiEndpoint() + '/accept',
                        method: 'POST',
                        errorHandler: this.onerror.bind(this)
                    }).then(updated => {
                        app.store.pushPayload(updated);

                        // If this was the last policy to accept, close the modal
                        if (policies.length === 1) {
                            if (hadToAcceptToInteract) {
                                // If the user was previously not allowed to interact with the forum,
                                // we refresh to get updated permissions in the frontend
                                window.location.reload();
                            } else {
                                app.modal.close();
                            }
                        }

                        m.redraw();
                    });
                },
            }),
        ]));
    }
}
