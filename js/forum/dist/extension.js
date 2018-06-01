'use strict';

System.register('flagrow/terms/addAcceptModal', ['flarum/app', 'flarum/extend', 'flarum/components/Page', 'flarum/components/IndexPage', 'flagrow/terms/components/AcceptPoliciesModal'], function (_export, _context) {
    "use strict";

    var app, extend, Page, IndexPage, AcceptPoliciesModal;

    _export('default', function () {
        var initialized = false;

        extend(Page.prototype, 'init', function () {
            if (initialized) {
                return;
            }

            // We only show the modal if the first page loaded was the index page
            // And that new updates are available
            // And that the user *must* accept them
            if (app.current instanceof IndexPage) {
                var user = app.session.user;

                if (user && user.flagrowTermsPoliciesMustAccept()) {
                    app.modal.show(new AcceptPoliciesModal());
                }
            }

            initialized = true;
        });
    });

    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
        }, function (_flagrowTermsComponentsAcceptPoliciesModal) {
            AcceptPoliciesModal = _flagrowTermsComponentsAcceptPoliciesModal.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/terms/addFieldsToRegister', ['flarum/extend', 'flarum/app', 'flarum/components/SignUpModal', 'flagrow/terms/helpers/sortByAttribute'], function (_export, _context) {
    "use strict";

    var extend, app, SignUpModal, sortByAttribute;

    _export('default', function () {
        extend(SignUpModal.prototype, 'init', function () {
            var _this = this;

            this.flagrowTermsPolicies = sortByAttribute(app.store.all('flagrow-terms-policies'));

            this.flagrowTermsPolicies.forEach(function (policy) {
                _this[policy.form_key()] = m.prop(false);
            });
        });

        extend(SignUpModal.prototype, 'body', function (children) {
            var _this2 = this;

            var additionalContent = [];

            var legalText = app.forum.attribute('flagrow-terms.signup-legal-text');

            if (legalText) {
                additionalContent.push(m('.Form-group', m('.Flagrow-Terms-SignUp-Legal.Alert', legalText)));
            }

            this.flagrowTermsPolicies.forEach(function (policy) {
                additionalContent.push(m('.Form-group', m('.Flagrow-Terms-Check.Flagrow-Terms-Check--signup', m('label.checkbox', [m('input', {
                    type: 'checkbox',
                    bidi: _this2[policy.form_key()],
                    disabled: _this2.loading
                }), app.translator.trans('flagrow-terms.forum.signup.i-accept', {
                    policy: policy.name(),
                    a: policy.url() ? m('a', {
                        href: policy.url(),
                        target: '_blank'
                    }) : m('span')
                })]))));
            });

            var fieldsAdded = false;

            // Add the new content inside the Form element, at the second-to-last position (last is submit button)
            children.forEach(function (child) {
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
            var _this3 = this;

            this.flagrowTermsPolicies.forEach(function (policy) {
                data[policy.form_key()] = _this3[policy.form_key()]();
            });
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsSignUpModal) {
            SignUpModal = _flarumComponentsSignUpModal.default;
        }, function (_flagrowTermsHelpersSortByAttribute) {
            sortByAttribute = _flagrowTermsHelpersSortByAttribute.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/terms/addUpdateAlert', ['flarum/extend', 'flarum/components/IndexPage', 'flarum/components/DiscussionPage', 'flarum/components/UserPage', 'flagrow/terms/components/UpdateAlert'], function (_export, _context) {
    "use strict";

    var override, IndexPage, DiscussionPage, UserPage, UpdateAlert;


    // This single method will be used to inject the alert into existing components
    // If the view is already an array, we add our content at the start
    // If it isn't an array we wrap the content into a new array
    function addAlertToContent(original) {
        var existing = original();
        var additional = UpdateAlert.component();

        // if the existing content is an array, add to it
        // This should only happen with the hero() override as other extensions might return an array there
        if (Array.isArray(existing)) {
            existing.unshift(additional);

            return existing;
        }

        // Otherwise return a new list of elements
        // Use a container div otherwise when extending view() this will prevent the config() method from running
        // as the Component class won't be able to bind config() to an array
        // We could also add to vnode.children but this could cause weird styling if another extension or custom styles
        // change the look of the base page content by targeting the original view root element based on its class
        // By using a new outer container we make sure the alert always stays full width and unaffected by the page view under it
        return m('div', [additional, existing]);
    }

    _export('default', function () {
        // There's no single place we can inject the banner
        // So we use a few different points so it's visible on most pages
        override(IndexPage.prototype, 'hero', addAlertToContent);
        override(DiscussionPage.prototype, 'view', addAlertToContent);

        // Covers user profile and settings
        override(UserPage.prototype, 'view', addAlertToContent);
    });

    return {
        setters: [function (_flarumExtend) {
            override = _flarumExtend.override;
        }, function (_flarumComponentsIndexPage) {
            IndexPage = _flarumComponentsIndexPage.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumComponentsUserPage) {
            UserPage = _flarumComponentsUserPage.default;
        }, function (_flagrowTermsComponentsUpdateAlert) {
            UpdateAlert = _flagrowTermsComponentsUpdateAlert.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/terms/addUserPoliciesStateControl', ['flarum/extend', 'flarum/app', 'flarum/utils/UserControls', 'flarum/components/Button', 'flagrow/terms/components/UserPoliciesStateModal'], function (_export, _context) {
    "use strict";

    var extend, app, UserControls, Button, UserPoliciesStateModal;

    _export('default', function () {
        extend(UserControls, 'moderationControls', function (items, user) {
            if (app.forum.attribute('flagrow-terms.canSeeUserPoliciesState')) {
                items.add('flagrow-terms.state', Button.component({
                    icon: 'paperclip',
                    children: app.translator.trans('flagrow-terms.forum.user_controls.state_button'),
                    onclick: function onclick() {
                        app.modal.show(new UserPoliciesStateModal({ user: user }));
                    }
                }));
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumUtilsUserControls) {
            UserControls = _flarumUtilsUserControls.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowTermsComponentsUserPoliciesStateModal) {
            UserPoliciesStateModal = _flagrowTermsComponentsUserPoliciesStateModal.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/terms/components/AcceptPoliciesModal', ['flarum/app', 'flarum/components/Modal', 'flarum/components/Button', 'flagrow/terms/helpers/sortByAttribute'], function (_export, _context) {
    "use strict";

    var app, Modal, Button, sortByAttribute, AcceptPoliciesModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowTermsHelpersSortByAttribute) {
            sortByAttribute = _flagrowTermsHelpersSortByAttribute.default;
        }],
        execute: function () {
            AcceptPoliciesModal = function (_Modal) {
                babelHelpers.inherits(AcceptPoliciesModal, _Modal);

                function AcceptPoliciesModal() {
                    babelHelpers.classCallCheck(this, AcceptPoliciesModal);
                    return babelHelpers.possibleConstructorReturn(this, (AcceptPoliciesModal.__proto__ || Object.getPrototypeOf(AcceptPoliciesModal)).apply(this, arguments));
                }

                babelHelpers.createClass(AcceptPoliciesModal, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        babelHelpers.get(AcceptPoliciesModal.prototype.__proto__ || Object.getPrototypeOf(AcceptPoliciesModal.prototype), 'init', this).call(this);

                        app.store.all('flagrow-terms-policies').forEach(function (policy) {
                            _this2[policy.form_key()] = m.prop(false);
                        });
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-terms.forum.accept-modal.title');
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return m('.Modal-body', this.body());
                    }
                }, {
                    key: 'body',
                    value: function body() {
                        var _this3 = this;

                        var policies = sortByAttribute(app.store.all('flagrow-terms-policies').filter(function (policy) {
                            var state = app.session.user.flagrowTermsPoliciesState()[policy.id()];

                            return !state || state.has_update;
                        }));

                        if (policies.length === 0) {
                            return Button.component({
                                children: app.translator.trans('flagrow-terms.forum.accept-modal.close'),
                                onclick: function onclick() {
                                    app.modal.close();
                                }
                            });
                        }

                        return policies.map(function (policy) {
                            return m('div', [m('h2', policy.name()), app.forum.attribute('flagrow-terms.hide-updated-at') ? null : m('p', policy.terms_updated_at() ? app.translator.trans('flagrow-terms.forum.accept-modal.updated-at', {
                                date: moment(policy.terms_updated_at()).format(app.forum.attribute('flagrow-terms.date-format'))
                            }) : app.translator.trans('flagrow-terms.forum.accept-modal.updated-recently')), policy.update_message() ? m('p', policy.update_message()) : null, m('.Form-group', m('.Flagrow-Terms-Check.Flagrow-Terms-Check--login', m('label.checkbox', [m('input', {
                                type: 'checkbox',
                                bidi: _this3[policy.form_key()]
                            }), app.translator.trans('flagrow-terms.forum.accept-modal.i-accept', {
                                policy: policy.name(),
                                a: policy.url() ? m('a', {
                                    href: policy.url(),
                                    target: '_blank'
                                }) : m('span')
                            })]))), Button.component({
                                className: 'Button Button--primary',
                                children: app.translator.trans('flagrow-terms.forum.accept-modal.accept'),
                                disabled: !_this3[policy.form_key()](),
                                onclick: function onclick() {
                                    app.request({
                                        url: app.forum.attribute('apiUrl') + policy.apiEndpoint() + '/accept',
                                        method: 'POST',
                                        errorHandler: _this3.onerror.bind(_this3)
                                    }).then(function (updated) {
                                        app.store.pushPayload(updated);

                                        // If this was the last policy to accept, close the modal
                                        if (policies.length === 1) {
                                            app.modal.close();
                                        }

                                        m.redraw();
                                    });
                                }
                            })]);
                        });
                    }
                }]);
                return AcceptPoliciesModal;
            }(Modal);

            _export('default', AcceptPoliciesModal);
        }
    };
});;
'use strict';

System.register('flagrow/terms/components/UpdateAlert', ['flarum/app', 'flarum/Component', 'flarum/components/Alert', 'flarum/components/Button', 'flagrow/terms/components/AcceptPoliciesModal'], function (_export, _context) {
    "use strict";

    var app, Component, Alert, Button, AcceptPoliciesModal, AlertWithContainer, temporarilyHidden, UpdateAlert;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowTermsComponentsAcceptPoliciesModal) {
            AcceptPoliciesModal = _flagrowTermsComponentsAcceptPoliciesModal.default;
        }],
        execute: function () {
            AlertWithContainer = function (_Alert) {
                babelHelpers.inherits(AlertWithContainer, _Alert);

                function AlertWithContainer() {
                    babelHelpers.classCallCheck(this, AlertWithContainer);
                    return babelHelpers.possibleConstructorReturn(this, (AlertWithContainer.__proto__ || Object.getPrototypeOf(AlertWithContainer)).apply(this, arguments));
                }

                babelHelpers.createClass(AlertWithContainer, [{
                    key: 'view',
                    value: function view() {
                        var vdom = babelHelpers.get(AlertWithContainer.prototype.__proto__ || Object.getPrototypeOf(AlertWithContainer.prototype), 'view', this).call(this);

                        vdom.children = [m('.container', vdom.children)];

                        return vdom;
                    }
                }]);
                return AlertWithContainer;
            }(Alert);

            temporarilyHidden = false;

            UpdateAlert = function (_Component) {
                babelHelpers.inherits(UpdateAlert, _Component);

                function UpdateAlert() {
                    babelHelpers.classCallCheck(this, UpdateAlert);
                    return babelHelpers.possibleConstructorReturn(this, (UpdateAlert.__proto__ || Object.getPrototypeOf(UpdateAlert)).apply(this, arguments));
                }

                babelHelpers.createClass(UpdateAlert, [{
                    key: 'shouldShowAlert',
                    value: function shouldShowAlert() {
                        if (temporarilyHidden) {
                            return false;
                        }

                        var user = app.session.user;

                        return user && user.flagrowTermsPoliciesHasUpdate();
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        if (!this.shouldShowAlert()) {
                            return m('div');
                        }

                        return AlertWithContainer.component({
                            type: 'info',
                            children: app.session.user.flagrowTermsPoliciesMustAccept() ? app.translator.trans('flagrow-terms.forum.update-alert.must-accept-message') : app.translator.trans('flagrow-terms.forum.update-alert.can-accept-message'),
                            controls: [Button.component({
                                className: 'Button Button--link',
                                children: app.translator.trans('flagrow-terms.forum.update-alert.review'),
                                onclick: function onclick() {
                                    app.modal.show(new AcceptPoliciesModal());
                                }
                            })],
                            dismissible: !app.session.user.flagrowTermsPoliciesMustAccept(),
                            ondismiss: function ondismiss() {
                                temporarilyHidden = true;
                            }
                        });
                    }
                }]);
                return UpdateAlert;
            }(Component);

            _export('default', UpdateAlert);
        }
    };
});;
'use strict';

System.register('flagrow/terms/components/UserPoliciesStateModal', ['flarum/app', 'flarum/components/Modal', 'flagrow/terms/helpers/sortByAttribute'], function (_export, _context) {
    "use strict";

    var app, Modal, sortByAttribute, UserPoliciesStateModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flagrowTermsHelpersSortByAttribute) {
            sortByAttribute = _flagrowTermsHelpersSortByAttribute.default;
        }],
        execute: function () {
            UserPoliciesStateModal = function (_Modal) {
                babelHelpers.inherits(UserPoliciesStateModal, _Modal);

                function UserPoliciesStateModal() {
                    babelHelpers.classCallCheck(this, UserPoliciesStateModal);
                    return babelHelpers.possibleConstructorReturn(this, (UserPoliciesStateModal.__proto__ || Object.getPrototypeOf(UserPoliciesStateModal)).apply(this, arguments));
                }

                babelHelpers.createClass(UserPoliciesStateModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(UserPoliciesStateModal.prototype.__proto__ || Object.getPrototypeOf(UserPoliciesStateModal.prototype), 'init', this).call(this);
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-terms.forum.state-modal.title', {
                            username: this.props.user.username()
                        });
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        var _this2 = this;

                        return m('.Modal-body', m('ul', sortByAttribute(app.store.all('flagrow-terms-policies')).map(function (policy) {
                            var state = _this2.props.user.flagrowTermsPoliciesState()[policy.id()];

                            return m('li', policy.name() + ': ' + (state && state.accepted_at ? app.translator.trans('flagrow-terms.forum.state-modal.accepted-at', {
                                date: moment(state.accepted_at).format(app.forum.attribute('flagrow-terms.date-format')) + ' (' + state.accepted_at + ')'
                            }).join('') : app.translator.trans('flagrow-terms.forum.state-modal.not-accepted')));
                        })));
                    }
                }]);
                return UserPoliciesStateModal;
            }(Modal);

            _export('default', UserPoliciesStateModal);
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

System.register('flagrow/terms/main', ['flarum/extend', 'flarum/app', 'flarum/Model', 'flarum/models/User', 'flagrow/terms/models/Policy', 'flagrow/terms/addAcceptModal', 'flagrow/terms/addFieldsToRegister', 'flagrow/terms/addUpdateAlert', 'flagrow/terms/addUserPoliciesStateControl'], function (_export, _context) {
    "use strict";

    var extend, app, Model, User, Policy, addAcceptModal, addFieldsToRegister, addUpdateAlert, addUserPoliciesStateControl;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }, function (_flagrowTermsModelsPolicy) {
            Policy = _flagrowTermsModelsPolicy.default;
        }, function (_flagrowTermsAddAcceptModal) {
            addAcceptModal = _flagrowTermsAddAcceptModal.default;
        }, function (_flagrowTermsAddFieldsToRegister) {
            addFieldsToRegister = _flagrowTermsAddFieldsToRegister.default;
        }, function (_flagrowTermsAddUpdateAlert) {
            addUpdateAlert = _flagrowTermsAddUpdateAlert.default;
        }, function (_flagrowTermsAddUserPoliciesStateControl) {
            addUserPoliciesStateControl = _flagrowTermsAddUserPoliciesStateControl.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-terms', function () {
                app.store.models['flagrow-terms-policies'] = Policy;

                User.prototype.flagrowTermsPoliciesState = Model.attribute('flagrowTermsPoliciesState');
                User.prototype.flagrowTermsPoliciesHasUpdate = Model.attribute('flagrowTermsPoliciesHasUpdate');
                User.prototype.flagrowTermsPoliciesMustAccept = Model.attribute('flagrowTermsPoliciesMustAccept');
                User.prototype.seeFlagrowTermsPoliciesState = Model.attribute('seeFlagrowTermsPoliciesState');

                addAcceptModal();
                addFieldsToRegister();
                addUpdateAlert();
                addUserPoliciesStateControl();
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