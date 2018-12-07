module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_common__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/common/helpers/sortByAttribute.js":
/*!***********************************************!*\
  !*** ./src/common/helpers/sortByAttribute.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (items, attr) {
  if (attr === void 0) {
    attr = 'sort';
  }

  return items.sort(function (a, b) {
    return a[attr]() - b[attr]();
  });
});

/***/ }),

/***/ "./src/common/index.js":
/*!*****************************!*\
  !*** ./src/common/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/common/models/Policy.js":
/*!*************************************!*\
  !*** ./src/common/models/Policy.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Policy; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/computed */ "flarum/utils/computed");
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3__);





var Policy =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Policy, _mixin);

  function Policy() {
    return _mixin.apply(this, arguments) || this;
  }

  var _proto = Policy.prototype;

  /**
   * @inheritDoc
   */
  _proto.apiEndpoint = function apiEndpoint() {
    return '/flagrow/terms/policies' + (this.exists ? '/' + this.data.id : '');
  };

  return Policy;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, {
  sort: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('sort'),
  name: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('name'),
  url: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('url'),
  update_message: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('update_message'),
  terms_updated_at: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('terms_updated_at'),
  form_key: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_3___default()('id', function (id) {
    return 'flagrow_terms_policy_' + id;
  })
}));



/***/ }),

/***/ "./src/forum/addAcceptModal.js":
/*!*************************************!*\
  !*** ./src/forum/addAcceptModal.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/IndexPage */ "flarum/components/IndexPage");
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_AcceptPoliciesModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AcceptPoliciesModal */ "./src/forum/components/AcceptPoliciesModal.js");





/* harmony default export */ __webpack_exports__["default"] = (function () {
  var initialized = false;
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_components_Page__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'init', function () {
    if (initialized) {
      return;
    } // We only show the modal if the first page loaded was the index page
    // And that new updates are available
    // And that the user *must* accept them


    if (flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.current instanceof flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_3___default.a) {
      var user = flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.session.user;

      if (user && user.flagrowTermsPoliciesMustAccept()) {
        flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.modal.show(new _components_AcceptPoliciesModal__WEBPACK_IMPORTED_MODULE_4__["default"]());
      }
    }

    initialized = true;
  });
});

/***/ }),

/***/ "./src/forum/addFieldsToRegister.js":
/*!******************************************!*\
  !*** ./src/forum/addFieldsToRegister.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/SignUpModal */ "flarum/components/SignUpModal");
/* harmony import */ var flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/helpers/sortByAttribute */ "./src/common/helpers/sortByAttribute.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'init', function () {
    var _this = this;

    this.flagrowTermsPolicies = Object(_common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_3__["default"])(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('flagrow-terms-policies'));
    this.flagrowTermsPolicies.forEach(function (policy) {
      _this[policy.form_key()] = m.prop(false);
    });
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'fields', function (fields) {
    var _this2 = this;

    var legalText = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow-terms.signup-legal-text');

    if (legalText) {
      fields.add('flagrow-terms-legal-text', m('.Form-group', m('.Flagrow-Terms-SignUp-Legal.Alert', legalText)));
    }

    this.flagrowTermsPolicies.forEach(function (policy) {
      fields.add('flagrow-terms-policy-' + policy.id(), m('.Form-group', m('.Flagrow-Terms-Check.Flagrow-Terms-Check--signup', m('label.checkbox', [m('input', {
        type: 'checkbox',
        bidi: _this2[policy.form_key()],
        disabled: _this2.loading
      }), flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.signup.i-accept', {
        policy: policy.name(),
        a: policy.url() ? m('a', {
          href: policy.url(),
          target: '_blank'
        }) : m('span')
      })]))));
    });
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'submitData', function (data) {
    var _this3 = this;

    this.flagrowTermsPolicies.forEach(function (policy) {
      data[policy.form_key()] = _this3[policy.form_key()]();
    });
  });
});

/***/ }),

/***/ "./src/forum/addUpdateAlert.js":
/*!*************************************!*\
  !*** ./src/forum/addUpdateAlert.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/IndexPage */ "flarum/components/IndexPage");
/* harmony import */ var flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DiscussionPage */ "flarum/components/DiscussionPage");
/* harmony import */ var flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_UpdateAlert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/UpdateAlert */ "./src/forum/components/UpdateAlert.js");




 // This single method will be used to inject the alert into existing components
// If the view is already an array, we add our content at the start
// If it isn't an array we wrap the content into a new array

function addAlertToContent(original) {
  var existing = original();
  var additional = _components_UpdateAlert__WEBPACK_IMPORTED_MODULE_4__["default"].component(); // if the existing content is an array, add to it
  // This should only happen with the hero() override as other extensions might return an array there

  if (Array.isArray(existing)) {
    existing.unshift(additional);
    return existing;
  } // Otherwise return a new list of elements
  // Use a container div otherwise when extending view() this will prevent the config() method from running
  // as the Component class won't be able to bind config() to an array
  // We could also add to vnode.children but this could cause weird styling if another extension or custom styles
  // change the look of the base page content by targeting the original view root element based on its class
  // By using a new outer container we make sure the alert always stays full width and unaffected by the page view under it


  return m('div', [additional, existing]);
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  // There's no single place we can inject the banner
  // So we use a few different points so it's visible on most pages
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_IndexPage__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'hero', addAlertToContent);
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_DiscussionPage__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'view', addAlertToContent); // Covers user profile and settings

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'view', addAlertToContent);
});

/***/ }),

/***/ "./src/forum/addUserPoliciesStateControl.js":
/*!**************************************************!*\
  !*** ./src/forum/addUserPoliciesStateControl.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/UserControls */ "flarum/utils/UserControls");
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_UserPoliciesStateModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/UserPoliciesStateModal */ "./src/forum/components/UserPoliciesStateModal.js");





/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_2___default.a, 'moderationControls', function (items, user) {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow-terms.canSeeUserPoliciesState')) {
      items.add('flagrow-terms.state', flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        icon: 'fas fa-paperclip',
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.user_controls.state_button'),
        onclick: function onclick() {
          flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _components_UserPoliciesStateModal__WEBPACK_IMPORTED_MODULE_4__["default"]({
            user: user
          }));
        }
      }));
    }
  });
});

/***/ }),

/***/ "./src/forum/components/AcceptPoliciesModal.js":
/*!*****************************************************!*\
  !*** ./src/forum/components/AcceptPoliciesModal.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AcceptPoliciesModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/helpers/sortByAttribute */ "./src/common/helpers/sortByAttribute.js");






var AcceptPoliciesModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AcceptPoliciesModal, _Modal);

  function AcceptPoliciesModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = AcceptPoliciesModal.prototype;

  _proto.init = function init() {
    var _this = this;

    _Modal.prototype.init.call(this);

    flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('flagrow-terms-policies').forEach(function (policy) {
      _this[policy.form_key()] = m.prop(false);
    });
  };

  _proto.title = function title() {
    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.accept-modal.title');
  };

  _proto.content = function content() {
    return m('.Modal-body', this.body());
  };

  _proto.body = function body() {
    var _this2 = this;

    var policies = Object(_common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_4__["default"])(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('flagrow-terms-policies').filter(function (policy) {
      var state = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user.flagrowTermsPoliciesState()[policy.id()];
      return !state || state.has_update;
    }));

    if (policies.length === 0) {
      return flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.accept-modal.close'),
        onclick: function onclick() {
          flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.close();
        }
      });
    }

    return policies.map(function (policy) {
      return m('div', [m('h2', policy.name()), flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow-terms.hide-updated-at') ? null : m('p', policy.terms_updated_at() ? flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.accept-modal.updated-at', {
        date: moment(policy.terms_updated_at()).format(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow-terms.date-format'))
      }) : flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.accept-modal.updated-recently')), policy.update_message() ? m('p', policy.update_message()) : null, m('.Form-group', m('.Flagrow-Terms-Check.Flagrow-Terms-Check--login', m('label.checkbox', [m('input', {
        type: 'checkbox',
        bidi: _this2[policy.form_key()]
      }), flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.accept-modal.i-accept', {
        policy: policy.name(),
        a: policy.url() ? m('a', {
          href: policy.url(),
          target: '_blank'
        }) : m('span')
      })]))), flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
        className: 'Button Button--primary',
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.accept-modal.accept'),
        disabled: !_this2[policy.form_key()](),
        onclick: function onclick() {
          flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
            url: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + policy.apiEndpoint() + '/accept',
            method: 'POST',
            errorHandler: _this2.onerror.bind(_this2)
          }).then(function (updated) {
            flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.pushPayload(updated); // If this was the last policy to accept, close the modal

            if (policies.length === 1) {
              flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.close();
            }

            m.redraw();
          });
        }
      })]);
    });
  };

  return AcceptPoliciesModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/UpdateAlert.js":
/*!*********************************************!*\
  !*** ./src/forum/components/UpdateAlert.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UpdateAlert; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AcceptPoliciesModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AcceptPoliciesModal */ "./src/forum/components/AcceptPoliciesModal.js");







var AlertWithContainer =
/*#__PURE__*/
function (_Alert) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AlertWithContainer, _Alert);

  function AlertWithContainer() {
    return _Alert.apply(this, arguments) || this;
  }

  var _proto = AlertWithContainer.prototype;

  _proto.view = function view() {
    var vdom = _Alert.prototype.view.call(this);

    vdom.children = [m('.container', vdom.children)];
    return vdom;
  };

  return AlertWithContainer;
}(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_3___default.a);

var temporarilyHidden = false;

var UpdateAlert =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UpdateAlert, _Component);

  function UpdateAlert() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto2 = UpdateAlert.prototype;

  _proto2.shouldShowAlert = function shouldShowAlert() {
    if (temporarilyHidden) {
      return false;
    }

    var user = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user;
    return user && user.flagrowTermsPoliciesHasUpdate();
  };

  _proto2.view = function view() {
    if (!this.shouldShowAlert()) {
      return m('div');
    }

    return AlertWithContainer.component({
      type: 'info',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user.flagrowTermsPoliciesMustAccept() ? flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.update-alert.must-accept-message') : flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.update-alert.can-accept-message'),
      controls: [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        className: 'Button Button--link',
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.update-alert.review'),
        onclick: function onclick() {
          flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _AcceptPoliciesModal__WEBPACK_IMPORTED_MODULE_5__["default"]());
        }
      })],
      dismissible: !flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user.flagrowTermsPoliciesMustAccept(),
      ondismiss: function ondismiss() {
        temporarilyHidden = true;
      }
    });
  };

  return UpdateAlert;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/UserPoliciesStateModal.js":
/*!********************************************************!*\
  !*** ./src/forum/components/UserPoliciesStateModal.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserPoliciesStateModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/helpers/sortByAttribute */ "./src/common/helpers/sortByAttribute.js");





var UserPoliciesStateModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserPoliciesStateModal, _Modal);

  function UserPoliciesStateModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = UserPoliciesStateModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);
  };

  _proto.title = function title() {
    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.state-modal.title', {
      username: this.props.user.username()
    });
  };

  _proto.content = function content() {
    var _this = this;

    return m('.Modal-body', m('ul', Object(_common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_3__["default"])(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('flagrow-terms-policies')).map(function (policy) {
      var state = _this.props.user.flagrowTermsPoliciesState()[policy.id()];

      return m('li', policy.name() + ': ' + (state && state.accepted_at ? flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.state-modal.accepted-at', {
        date: moment(state.accepted_at).format(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow-terms.date-format')) + ' (' + state.accepted_at + ')'
      }).join('') : flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.forum.state-modal.not-accepted')));
    })));
  };

  return UserPoliciesStateModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_models_Policy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/models/Policy */ "./src/common/models/Policy.js");
/* harmony import */ var _addAcceptModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addAcceptModal */ "./src/forum/addAcceptModal.js");
/* harmony import */ var _addFieldsToRegister__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addFieldsToRegister */ "./src/forum/addFieldsToRegister.js");
/* harmony import */ var _addUpdateAlert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addUpdateAlert */ "./src/forum/addUpdateAlert.js");
/* harmony import */ var _addUserPoliciesStateControl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addUserPoliciesStateControl */ "./src/forum/addUserPoliciesStateControl.js");









flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('flagrow-terms', function () {
  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.models['flagrow-terms-policies'] = _common_models_Policy__WEBPACK_IMPORTED_MODULE_4__["default"];
  flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default.a.prototype.flagrowTermsPoliciesState = flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('flagrowTermsPoliciesState');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default.a.prototype.flagrowTermsPoliciesHasUpdate = flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('flagrowTermsPoliciesHasUpdate');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default.a.prototype.flagrowTermsPoliciesMustAccept = flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('flagrowTermsPoliciesMustAccept');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_3___default.a.prototype.seeFlagrowTermsPoliciesState = flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('seeFlagrowTermsPoliciesState');
  Object(_addAcceptModal__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_addFieldsToRegister__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_addUpdateAlert__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(_addUserPoliciesStateControl__WEBPACK_IMPORTED_MODULE_8__["default"])();
});

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Alert":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Alert']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Alert'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/DiscussionPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionPage']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionPage'];

/***/ }),

/***/ "flarum/components/IndexPage":
/*!*************************************************************!*\
  !*** external "flarum.core.compat['components/IndexPage']" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/IndexPage'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/SignUpModal":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/SignUpModal']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SignUpModal'];

/***/ }),

/***/ "flarum/components/UserPage":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/UserPage']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UserPage'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/models/User":
/*!****************************************************!*\
  !*** external "flarum.core.compat['models/User']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/User'];

/***/ }),

/***/ "flarum/utils/UserControls":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/UserControls']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/UserControls'];

/***/ }),

/***/ "flarum/utils/computed":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/computed']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/computed'];

/***/ }),

/***/ "flarum/utils/mixin":
/*!****************************************************!*\
  !*** external "flarum.core.compat['utils/mixin']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/mixin'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map