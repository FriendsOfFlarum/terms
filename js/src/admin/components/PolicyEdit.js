import app from 'flarum/admin/app';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import ItemList from 'flarum/common/utils/ItemList';
import withAttr from 'flarum/common/utils/withAttr';
import Button from 'flarum/common/components/Button';

/* global m, dayjs */

export default class PolicyEdit {
    oninit(vnode) {
        this.policy = vnode.attrs.policy;
        this.dirty = false;
        this.processing = false;
        this.toggleFields = false;

        if (this.policy === null) {
            this.initNewField();
        }
    }

    initNewField() {
        this.policy = app.store.createRecord('fof-terms-policies', {
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

        return app.translator.trans('fof-terms.admin.buttons.new-policy');
    }

    view() {
        return m('.FoF-Terms-Policiy-Box', [
            this.policy.exists ? m('span.fas.fa-arrows-alt.FoF-Terms-Policiy-Box--handle.js-policy-handle') : null,
            m(
                '.Button.Button--block.FoF-Terms-Policiy-Header',
                {
                    onclick: () => {
                        this.toggleFields = !this.toggleFields;
                    },
                },
                [
                    m('.FoF-Terms-Policiy-Header-Title', this.boxTitle()),
                    m('div', [
                        this.policy.exists ? [app.translator.trans('fof-terms.admin.buttons.edit-policy'), ' '] : null,
                        icon(this.toggleFields ? 'fas fa-chevron-up' : 'fas fa-chevron-down'),
                    ]),
                ]
            ),
            this.toggleFields ? this.viewFields() : null,
        ]);
    }

    viewFields() {
        return m(
            'form.FoF-Terms-Policiy-Body',
            {
                onsubmit: this.savePolicy.bind(this),
            },
            [
                this.fields().toArray(),
                m('.ButtonGroup', [
                    Button.component(
                        {
                            type: 'submit',
                            className: 'Button Button--primary',
                            loading: this.processing,
                            disabled: !this.readyToSave(),
                        },
                        app.translator.trans('fof-terms.admin.buttons.' + (this.policy.exists ? 'save' : 'add') + '-policy')
                    ),
                    this.policy.exists
                        ? Button.component(
                              {
                                  type: 'submit',
                                  className: 'Button Button--danger',
                                  loading: this.processing,
                                  onclick: this.deletePolicy.bind(this),
                              },
                              app.translator.trans('fof-terms.admin.buttons.delete-policy')
                          )
                        : '',
                ]),
            ]
        );
    }

    fields() {
        const fields = new ItemList();

        fields.add(
            'name',
            m('.Form-group', [
                m('label', app.translator.trans('fof-terms.admin.policies.name')),
                m('input.FormControl', {
                    type: 'text',
                    value: this.policy.name(),
                    oninput: withAttr('value', this.updateAttribute.bind(this, 'name')),
                }),
                m('.helpText', app.translator.trans('fof-terms.admin.policies.name-help')),
            ]),
            100
        );

        fields.add(
            'url',
            m('.Form-group', [
                m('label', app.translator.trans('fof-terms.admin.policies.url')),
                m('input.FormControl', {
                    type: 'url',
                    value: this.policy.url(),
                    oninput: withAttr('value', this.updateAttribute.bind(this, 'url')),
                }),
                m('.helpText', app.translator.trans('fof-terms.admin.policies.url-help')),
            ]),
            95
        );

        fields.add(
            'update-message',
            m('.Form-group', [
                m('label', app.translator.trans('fof-terms.admin.policies.update-message')),
                m('textarea.FormControl', {
                    value: this.policy.update_message(),
                    oninput: withAttr('value', this.updateAttribute.bind(this, 'update_message')),
                }),
                m('.helpText', app.translator.trans('fof-terms.admin.policies.update-message-help')),
            ]),
            90
        );

        fields.add(
            'terms-updated-at',
            m('.Form-group', [
                m('label', app.translator.trans('fof-terms.admin.policies.terms-updated-at')),
                m('.FoF-Terms-Input-Group', [
                    m('input.FormControl', {
                        type: 'text',
                        value: this.policy.terms_updated_at(),
                        oninput: withAttr('value', this.updateAttribute.bind(this, 'terms_updated_at')),
                        placeholder: app.translator.trans('fof-terms.admin.policies.terms-updated-at-placeholder'),
                    }),
                    Button.component(
                        {
                            className: 'Button Button--primary',
                            onclick: () => {
                                // We set the milliseconds to zero because it might otherwise give the impression
                                // that we store them, when in fact the date will be stored in a MySQL TIMESTAMP column
                                this.updateAttribute('terms_updated_at', dayjs().millisecond(0).toISOString());
                            },
                        },
                        app.translator.trans('fof-terms.admin.buttons.set-to-now')
                    ),
                ]),
                m('.helpText', app.translator.trans('fof-terms.admin.policies.terms-updated-at-help')),
            ]),
            85
        );

        if (this.policy.exists) {
            fields.add(
                'export-url',
                m('.Form-group', [
                    m('label', app.translator.trans('fof-terms.admin.policies.export-url')),
                    m(
                        '.ButtonGroup',
                        ['json', 'csv'].map((format) =>
                            m(
                                'a.Button.FoF-Terms-Export-Button',
                                {
                                    href: app.forum.attribute('apiUrl') + '/fof/terms/policies/' + this.policy.id() + '/export.' + format,
                                    target: '_blank',
                                },
                                format.toUpperCase()
                            )
                        )
                    ),
                    m(
                        '.helpText',
                        app.translator.trans('fof-terms.admin.policies.export-url-help', {
                            a: m('a', {
                                href: 'https://github.com/FriendsOfFlarum/terms/wiki/Export-url',
                                target: '_blank',
                            }),
                        })
                    ),
                ]),
                80
            );
        }

        return fields;
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

    savePolicy(event) {
        event.preventDefault();

        this.processing = true;

        const createNewRecord = !this.policy.exists;

        this.policy
            .save(this.policy.data.attributes)
            .then(() => {
                if (createNewRecord) {
                    this.initNewField();
                    this.toggleFields = false;
                }

                this.processing = false;
                this.dirty = false;

                m.redraw();
            })
            .catch((err) => {
                this.processing = false;

                throw err;
            });
    }

    deletePolicy() {
        if (
            !confirm(
                extractText(
                    app.translator.trans('fof-terms.admin.messages.delete-policy-confirmation', {
                        name: this.policy.name(),
                    })
                )
            )
        ) {
            return;
        }

        this.processing = true;

        this.policy
            .delete()
            .then(() => {
                this.processing = false;

                m.redraw();
            })
            .catch((err) => {
                this.processing = false;

                throw err;
            });
    }
}
