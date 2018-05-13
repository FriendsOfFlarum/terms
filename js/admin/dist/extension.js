'use strict';

System.register('flagrow/terms/addPermissions', ['flarum/extend', 'flarum/app', 'flarum/components/PermissionGrid'], function (_export, _context) {
    "use strict";

    var extend, app, PermissionGrid;

    _export('default', function () {
        extend(PermissionGrid.prototype, 'moderateItems', function (items) {
            items.add('flagrow-terms-see-user-policies-state', {
                icon: 'paperclip',
                label: app.translator.trans('flagrow-terms.admin.permissions.see-user-policies-state'),
                permission: 'flagrow-terms.see-user-policies-state'
            });

            items.add('flagrow-terms-postpone-policies-accept', {
                icon: 'paperclip',
                label: app.translator.trans('flagrow-terms.admin.permissions.postpone-policies-accept'),
                permission: 'flagrow-terms.postpone-policies-accept'
            });

            items.add('flagrow-terms-export-policies', {
                icon: 'paperclip',
                label: app.translator.trans('flagrow-terms.admin.permissions.export-policies'),
                permission: 'flagrow-terms.export-policies'
            });
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsPermissionGrid) {
            PermissionGrid = _flarumComponentsPermissionGrid.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/terms/components/PolicyEdit', ['flarum/app', 'flarum/helpers/icon', 'flarum/Component', 'flarum/components/Button'], function (_export, _context) {
    "use strict";

    var app, icon, Component, Button, PolicyEdit;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }],
        execute: function () {
            PolicyEdit = function (_Component) {
                babelHelpers.inherits(PolicyEdit, _Component);

                function PolicyEdit() {
                    babelHelpers.classCallCheck(this, PolicyEdit);
                    return babelHelpers.possibleConstructorReturn(this, (PolicyEdit.__proto__ || Object.getPrototypeOf(PolicyEdit)).apply(this, arguments));
                }

                babelHelpers.createClass(PolicyEdit, [{
                    key: 'init',
                    value: function init() {
                        this.policy = this.props.policy;
                        this.dirty = false;
                        this.processing = false;
                        this.toggleFields = false;

                        if (this.policy === null) {
                            this.initNewField();
                        }
                    }
                }, {
                    key: 'initNewField',
                    value: function initNewField() {
                        this.policy = app.store.createRecord('flagrow-terms-policies', {
                            attributes: {
                                name: '',
                                url: '',
                                update_message: '',
                                terms_updated_at: ''
                            }
                        });
                    }
                }, {
                    key: 'boxTitle',
                    value: function boxTitle() {
                        if (this.policy.exists) {
                            return this.policy.name();
                        }

                        return app.translator.trans('flagrow-terms.admin.buttons.new-policy');
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return m('.Flagrow-Terms-Policiy-Box', [this.policy.exists ? m('span.fa.fa-arrows.Flagrow-Terms-Policiy-Box--handle.js-policy-handle') : null, m('.Button.Button--block.Flagrow-Terms-Policiy-Header', {
                            onclick: function onclick() {
                                _this2.toggleFields = !_this2.toggleFields;
                            }
                        }, [m('.Flagrow-Terms-Policiy-Header-Title', this.boxTitle()), m('div', [this.policy.exists ? [app.translator.trans('flagrow-terms.admin.buttons.edit-policy'), ' '] : null, icon(this.toggleFields ? 'chevron-up' : 'chevron-down')])]), this.toggleFields ? this.viewFields() : null]);
                    }
                }, {
                    key: 'viewFields',
                    value: function viewFields() {
                        var _this3 = this;

                        return m('form.Flagrow-Terms-Policiy-Body', [m('.Form-group', [m('label', app.translator.trans('flagrow-terms.admin.policies.name')), m('input.FormControl', {
                            type: 'text',
                            value: this.policy.name(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'name'))
                        }), m('.helpText', app.translator.trans('flagrow-terms.admin.policies.name-help'))]), m('.Form-group', [m('label', app.translator.trans('flagrow-terms.admin.policies.url')), m('input.FormControl', {
                            type: 'url',
                            value: this.policy.url(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'url'))
                        }), m('.helpText', app.translator.trans('flagrow-terms.admin.policies.url-help'))]), m('.Form-group', [m('label', app.translator.trans('flagrow-terms.admin.policies.update-message')), m('textarea.FormControl', {
                            value: this.policy.update_message(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'update_message'))
                        }), m('.helpText', app.translator.trans('flagrow-terms.admin.policies.update-message-help'))]), m('.Form-group', [m('label', app.translator.trans('flagrow-terms.admin.policies.terms-updated-at')), m('input.FormControl', {
                            type: 'text',
                            value: this.policy.terms_updated_at(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'terms_updated_at')),
                            placeholder: app.translator.trans('flagrow-terms.admin.policies.terms-updated-at-placeholder')
                        }), m('.helpText', app.translator.trans('flagrow-terms.admin.policies.terms-updated-at-help'))]), this.policy.exists ? m('.Form-group', [m('label', app.translator.trans('flagrow-terms.admin.policies.export-url')), m('.ButtonGroup', ['json', 'csv'].map(function (format) {
                            return m('a.Button.Flagrow-Terms-Export-Button', {
                                href: app.forum.attribute('apiUrl') + '/flagrow/terms/policies/' + _this3.policy.id() + '/export.' + format,
                                target: '_blank'
                            }, format.toUpperCase());
                        })), m('.helpText', app.translator.trans('flagrow-terms.admin.policies.export-url-help', {
                            a: m('a', {
                                href: 'https://github.com/flagrow/terms/wiki/Export-url',
                                target: '_blank'
                            })
                        }))]) : null, m('.ButtonGroup', [Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-terms.admin.buttons.' + (this.policy.exists ? 'save' : 'add') + '-policy'),
                            loading: this.processing,
                            disabled: !this.readyToSave(),
                            onclick: this.savePolicy.bind(this)
                        }), this.policy.exists ? Button.component({
                            type: 'submit',
                            className: 'Button Button--danger',
                            children: app.translator.trans('flagrow-terms.admin.buttons.delete-policy'),
                            loading: this.processing,
                            onclick: this.deletePolicy.bind(this)
                        }) : ''])]);
                    }
                }, {
                    key: 'updateAttribute',
                    value: function updateAttribute(attribute, value) {
                        this.policy.pushAttributes(babelHelpers.defineProperty({}, attribute, value));

                        this.dirty = true;
                    }
                }, {
                    key: 'readyToSave',
                    value: function readyToSave() {
                        return this.dirty;
                    }
                }, {
                    key: 'savePolicy',
                    value: function savePolicy() {
                        var _this4 = this;

                        this.processing = true;

                        var createNewRecord = !this.policy.exists;

                        this.policy.save(this.policy.data.attributes).then(function () {
                            if (createNewRecord) {
                                _this4.initNewField();
                                _this4.toggleFields = false;
                            }

                            _this4.processing = false;
                            _this4.dirty = false;

                            m.redraw();
                        }).catch(function (err) {
                            _this4.processing = false;

                            throw err;
                        });
                    }
                }, {
                    key: 'deletePolicy',
                    value: function deletePolicy() {
                        var _this5 = this;

                        if (!confirm(app.translator.trans('flagrow-terms.admin.messages.delete-policy-confirmation', {
                            name: this.policy.name()
                        }).join(''))) {
                            return;
                        }

                        this.processing = true;

                        this.policy.delete().then(function () {
                            _this5.processing = false;

                            m.redraw();
                        }).catch(function (err) {
                            _this5.processing = false;

                            throw err;
                        });
                    }
                }]);
                return PolicyEdit;
            }(Component);

            _export('default', PolicyEdit);
        }
    };
});;
'use strict';

System.register('flagrow/terms/components/PolicyList', ['flarum/app', 'flarum/Component', 'flagrow/terms/components/PolicyEdit', 'flagrow/terms/helpers/sortByAttribute'], function (_export, _context) {
    "use strict";

    var app, Component, PolicyEdit, sortByAttribute, PolicyList;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flagrowTermsComponentsPolicyEdit) {
            PolicyEdit = _flagrowTermsComponentsPolicyEdit.default;
        }, function (_flagrowTermsHelpersSortByAttribute) {
            sortByAttribute = _flagrowTermsHelpersSortByAttribute.default;
        }],
        execute: function () {
            PolicyList = function (_Component) {
                babelHelpers.inherits(PolicyList, _Component);

                function PolicyList() {
                    babelHelpers.classCallCheck(this, PolicyList);
                    return babelHelpers.possibleConstructorReturn(this, (PolicyList.__proto__ || Object.getPrototypeOf(PolicyList)).apply(this, arguments));
                }

                babelHelpers.createClass(PolicyList, [{
                    key: 'init',
                    value: function init() {
                        app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/flagrow/terms/policies'
                        }).then(function (result) {
                            app.store.pushPayload(result);

                            m.redraw();
                        });
                    }
                }, {
                    key: 'config',
                    value: function config() {
                        var _this2 = this;

                        this.$('.js-policies-container').sortable({
                            handle: '.js-policy-handle'
                        }).on('sortupdate', function () {
                            var sorting = _this2.$('.js-policy-data').map(function () {
                                return $(this).data('id');
                            }).get();

                            _this2.updateSort(sorting);
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var policies = app.store.all('flagrow-terms-policies');

                        var fieldsList = [];

                        sortByAttribute(policies).forEach(function (policy) {
                            // Build array of fields to show.
                            fieldsList.push(m('.js-policy-data', {
                                key: policy.id(),
                                'data-id': policy.id()
                            }, PolicyEdit.component({
                                policy: policy
                            })));
                        });

                        return m('div', [m('h2', app.translator.trans('flagrow-terms.admin.titles.policies')), m('.Flagrow-Terms-Policies-Container', [m('.js-policies-container', fieldsList), PolicyEdit.component({
                            key: 'new',
                            policy: null
                        })])]);
                    }
                }, {
                    key: 'updateSort',
                    value: function updateSort(sorting) {
                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/flagrow/terms/policies/order',
                            data: {
                                sort: sorting
                            }
                        }).then(function (result) {
                            // Update sort attributes
                            app.store.pushPayload(result);

                            m.redraw();
                        });
                    }
                }]);
                return PolicyList;
            }(Component);

            _export('default', PolicyList);
        }
    };
});;
'use strict';

System.register('flagrow/terms/components/TermsSettingsModal', ['flarum/app', 'flarum/components/SettingsModal', 'flarum/components/Switch', 'flagrow/terms/components/PolicyList'], function (_export, _context) {
    "use strict";

    var app, SettingsModal, Switch, PolicyList, settingsPrefix, translationPrefix, TermsSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flagrowTermsComponentsPolicyList) {
            PolicyList = _flagrowTermsComponentsPolicyList.default;
        }],
        execute: function () {
            settingsPrefix = 'flagrow-terms.';
            translationPrefix = 'flagrow-terms.admin.settings.';

            TermsSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(TermsSettingsModal, _SettingsModal);

                function TermsSettingsModal() {
                    babelHelpers.classCallCheck(this, TermsSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, (TermsSettingsModal.__proto__ || Object.getPrototypeOf(TermsSettingsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(TermsSettingsModal, [{
                    key: 'title',
                    value: function title() {
                        return app.translator.trans(translationPrefix + 'title');
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.signup-legal-text')), m('textarea.FormControl', {
                            bidi: this.setting(settingsPrefix + 'signup-legal-text')
                        })]), m('.Form-group', [m('label', Switch.component({
                            state: this.setting(settingsPrefix + 'hide-updated-at')() > 0,
                            onchange: this.setting(settingsPrefix + 'hide-updated-at'),
                            children: app.translator.trans(translationPrefix + 'field.hide-updated-at')
                        }))]), m('.Form-group', [m('label', app.translator.trans(translationPrefix + 'field.date-format')), m('input[type=text].FormControl', {
                            bidi: this.setting(settingsPrefix + 'date-format'),
                            placeholder: 'YYYY-MM-DD'
                        }), m('.helpText', app.translator.trans(translationPrefix + 'field.date-format-help', {
                            a: m('a', {
                                href: 'https://momentjs.com/docs/#/displaying/format/',
                                target: '_blank'
                            })
                        }))]), PolicyList.component()];
                    }
                }]);
                return TermsSettingsModal;
            }(SettingsModal);

            _export('default', TermsSettingsModal);
        }
    };
});;
'use strict';

System.register('flagrow/terms/helpers/sortByAttribute', [], function (_export, _context) {
    "use strict";

    _export('default', function (items) {
        var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'sort';

        return items.sort(function (a, b) {
            return a[attr]() - b[attr]();
        });
    });

    return {
        setters: [],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/terms/main', ['flarum/app', 'flagrow/terms/models/Policy', 'flagrow/terms/components/TermsSettingsModal', 'flagrow/terms/addPermissions'], function (_export, _context) {
    "use strict";

    var app, Policy, TermsSettingsModal, addPermissions;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowTermsModelsPolicy) {
            Policy = _flagrowTermsModelsPolicy.default;
        }, function (_flagrowTermsComponentsTermsSettingsModal) {
            TermsSettingsModal = _flagrowTermsComponentsTermsSettingsModal.default;
        }, function (_flagrowTermsAddPermissions) {
            addPermissions = _flagrowTermsAddPermissions.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-terms', function (app) {
                app.store.models['flagrow-terms-policies'] = Policy;

                app.extensionSettings['flagrow-terms'] = function () {
                    return app.modal.show(new TermsSettingsModal());
                };

                addPermissions();
            });
        }
    };
});;
'use strict';

System.register('flagrow/terms/models/Policy', ['flarum/Model', 'flarum/utils/mixin', 'flarum/utils/computed'], function (_export, _context) {
    "use strict";

    var Model, mixin, computed, Policy;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }, function (_flarumUtilsComputed) {
            computed = _flarumUtilsComputed.default;
        }],
        execute: function () {
            Policy = function (_mixin) {
                babelHelpers.inherits(Policy, _mixin);

                function Policy() {
                    babelHelpers.classCallCheck(this, Policy);
                    return babelHelpers.possibleConstructorReturn(this, (Policy.__proto__ || Object.getPrototypeOf(Policy)).apply(this, arguments));
                }

                babelHelpers.createClass(Policy, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return '/flagrow/terms/policies' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Policy;
            }(mixin(Model, {
                sort: Model.attribute('sort'),
                name: Model.attribute('name'),
                url: Model.attribute('url'),
                update_message: Model.attribute('update_message'),
                terms_updated_at: Model.attribute('terms_updated_at', Model.transformDate),
                form_key: computed('id', function (id) {
                    return 'flagrow_terms_policy_' + id;
                })
            }));

            _export('default', Policy);
        }
    };
});