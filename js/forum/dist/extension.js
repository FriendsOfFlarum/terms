'use strict';

System.register('flagrow/terms/addAcceptModal', ['flarum/app', 'flarum/extend', 'flarum/components/Page', 'flagrow/terms/components/AcceptPoliciesModal'], function (_export, _context) {
    "use strict";

    var app, extend, Page, AcceptPoliciesModal;

    _export('default', function () {
        var initialized = false;

        extend(Page.prototype, 'init', function () {
            if (initialized) {
                return;
            }

            initialized = true;

            var user = app.session.user;

            if (user && user.flagrowTermsPoliciesHasUpdate()) {
                app.modal.show(new AcceptPoliciesModal());
            }
        });
    });

    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
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

            // Add the new content inside the Form element, at the second-to-last position (last is submit button)
            children.forEach(function (child) {
                if (child.attrs && child.attrs.className && child.attrs.className.indexOf('Form') !== -1) {
                    child.children.splice(child.children.length - 1, 0, additionalContent);
                }
            });
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
                    key: 'isDismissible',
                    value: function isDismissible() {
                        return !app.session.user.flagrowTermsPoliciesMustAccept();
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
                                date: moment(policy.terms_updated_at()).format('dddd, Do MMMM YYYY')
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

System.register('flagrow/terms/main', ['flarum/extend', 'flarum/app', 'flarum/Model', 'flarum/models/User', 'flagrow/terms/models/Policy', 'flagrow/terms/addAcceptModal', 'flagrow/terms/addFieldsToRegister', 'flagrow/terms/addUserPoliciesStateControl'], function (_export, _context) {
    "use strict";

    var extend, app, Model, User, Policy, addAcceptModal, addFieldsToRegister, addUserPoliciesStateControl;
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
                terms_updated_at: Model.attribute('terms_updated_at'),
                form_key: computed('id', function (id) {
                    return 'flagrow_terms_policy_' + id;
                })
            }));

            _export('default', Policy);
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
                                date: state.accepted_at
                            }) : app.translator.trans('flagrow-terms.forum.state-modal.not-accepted')));
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
});