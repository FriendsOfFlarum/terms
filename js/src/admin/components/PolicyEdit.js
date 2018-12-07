import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';

export default class PolicyEdit extends Component {
    init() {
        this.policy = this.props.policy;
        this.dirty = false;
        this.processing = false;
        this.toggleFields = false;

        if (this.policy === null) {
            this.initNewField();
        }
    }

    initNewField() {
        this.policy = app.store.createRecord('flagrow-terms-policies', {
            attributes: {
                name: '',
                url: '',
                update_message: '',
                terms_updated_at: '',
            },
        });
    }

    boxTitle() {
        if (this.policy.exists) {
            return this.policy.name();
        }

        return app.translator.trans('flagrow-terms.admin.buttons.new-policy');
    }

    view() {
        return m('.Flagrow-Terms-Policiy-Box', [
            (this.policy.exists ? m('span.fas.fa-arrows-alt.Flagrow-Terms-Policiy-Box--handle.js-policy-handle') : null),
            m('.Button.Button--block.Flagrow-Terms-Policiy-Header', {
                onclick: () => {
                    this.toggleFields = !this.toggleFields;
                },
            }, [
                m('.Flagrow-Terms-Policiy-Header-Title', this.boxTitle()),
                m('div', [
                    (this.policy.exists ? [
                        app.translator.trans('flagrow-terms.admin.buttons.edit-policy'),
                        ' ',
                    ] : null),
                    icon(this.toggleFields ? 'fas fa-chevron-up' : 'fas fa-chevron-down'),
                ]),
            ]),
            (this.toggleFields ? this.viewFields() : null),
        ]);
    }

    viewFields() {
        return m('form.Flagrow-Terms-Policiy-Body', [
            m('.Form-group', [
                m('label', app.translator.trans('flagrow-terms.admin.policies.name')),
                m('input.FormControl', {
                    type: 'text',
                    value: this.policy.name(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'name')),
                }),
                m('.helpText', app.translator.trans('flagrow-terms.admin.policies.name-help')),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans('flagrow-terms.admin.policies.url')),
                m('input.FormControl', {
                    type: 'url',
                    value: this.policy.url(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'url')),
                }),
                m('.helpText', app.translator.trans('flagrow-terms.admin.policies.url-help')),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans('flagrow-terms.admin.policies.update-message')),
                m('textarea.FormControl', {
                    value: this.policy.update_message(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'update_message')),
                }),
                m('.helpText', app.translator.trans('flagrow-terms.admin.policies.update-message-help')),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans('flagrow-terms.admin.policies.terms-updated-at')),
                m('.Flagrow-Terms-Input-Group', [
                    m('input.FormControl', {
                        type: 'text',
                        value: this.policy.terms_updated_at(),
                        oninput: m.withAttr('value', this.updateAttribute.bind(this, 'terms_updated_at')),
                        placeholder: app.translator.trans('flagrow-terms.admin.policies.terms-updated-at-placeholder'),
                    }),
                    Button.component({
                        className: 'Button Button--primary',
                        onclick: () => {
                            this.updateAttribute('terms_updated_at', moment().milliseconds(0).toISOString());
                        },
                        children: app.translator.trans('flagrow-terms.admin.buttons.set-to-now'),
                    }),
                ]),
                m('.helpText', app.translator.trans('flagrow-terms.admin.policies.terms-updated-at-help')),
            ]),
            (this.policy.exists ? m('.Form-group', [
                m('label', app.translator.trans('flagrow-terms.admin.policies.export-url')),
                m('.ButtonGroup', ['json', 'csv'].map(format => m('a.Button.Flagrow-Terms-Export-Button', {
                    href: app.forum.attribute('apiUrl') + '/flagrow/terms/policies/' + this.policy.id() + '/export.' + format,
                    target: '_blank',
                }, format.toUpperCase()))),
                m('.helpText', app.translator.trans('flagrow-terms.admin.policies.export-url-help', {
                    a: m('a', {
                        href: 'https://github.com/flagrow/terms/wiki/Export-url',
                        target: '_blank',
                    }),
                })),
            ]) : null),
            m('.ButtonGroup', [
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    children: app.translator.trans('flagrow-terms.admin.buttons.' + (this.policy.exists ? 'save' : 'add') + '-policy'),
                    loading: this.processing,
                    disabled: !this.readyToSave(),
                    onclick: this.savePolicy.bind(this),
                }),
                (this.policy.exists ? Button.component({
                    type: 'submit',
                    className: 'Button Button--danger',
                    children: app.translator.trans('flagrow-terms.admin.buttons.delete-policy'),
                    loading: this.processing,
                    onclick: this.deletePolicy.bind(this),
                }) : ''),
            ]),
        ]);
    }

    updateAttribute(attribute, value) {
        this.policy.pushAttributes({
            [attribute]: value,
        });

        this.dirty = true;
    }

    readyToSave() {
        return this.dirty;
    }

    savePolicy() {
        this.processing = true;

        const createNewRecord = !this.policy.exists;

        this.policy.save(this.policy.data.attributes).then(() => {
            if (createNewRecord) {
                this.initNewField();
                this.toggleFields = false;
            }

            this.processing = false;
            this.dirty = false;

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }

    deletePolicy() {
        if (!confirm(app.translator.trans('flagrow-terms.admin.messages.delete-policy-confirmation', {
                name: this.policy.name(),
            }).join(''))) {
            return;
        }

        this.processing = true;

        this.policy.delete().then(() => {
            this.processing = false;

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }
}
