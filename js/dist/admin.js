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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.js");
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_common__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _src_common__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
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

/***/ "./node_modules/html5sortable/dist/html.sortable.js":
/*!**********************************************************!*\
  !*** ./node_modules/html5sortable/dist/html.sortable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function($) {
/*
 * HTML5 Sortable jQuery Plugin
 * https://github.com/voidberg/html5sortable
 *
 * Original code copyright 2012 Ali Farhadi.
 * This version is mantained by Alexandru Badiu <andu@ctrlz.ro> & Lukas Oppermann <lukas@vea.re>
 *
 *
 * Released under the MIT license.
 */
'use strict';
/*
 * variables global to the plugin
 */
var dragging;
var draggingHeight;
var placeholders = $();
var sortables = [];
/*
 * remove event handlers from items
 * @param [jquery Collection] items
 * @info event.h5s (jquery way of namespacing events, to bind multiple handlers to the event)
 */
var _removeItemEvents = function(items) {
  items.off('dragstart.h5s');
  items.off('dragend.h5s');
  items.off('selectstart.h5s');
  items.off('dragover.h5s');
  items.off('dragenter.h5s');
  items.off('drop.h5s');
};
/*
 * remove event handlers from sortable
 * @param [jquery Collection] sortable
 * @info event.h5s (jquery way of namespacing events, to bind multiple handlers to the event)
 */
var _removeSortableEvents = function(sortable) {
  sortable.off('dragover.h5s');
  sortable.off('dragenter.h5s');
  sortable.off('drop.h5s');
};
/*
 * attache ghost to dataTransfer object
 * @param [event] original event
 * @param [object] ghost-object with item, x and y coordinates
 */
var _attachGhost = function(event, ghost) {
  // this needs to be set for HTML5 drag & drop to work
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text', '');

  // check if setDragImage method is available
  if (event.dataTransfer.setDragImage) {
    event.dataTransfer.setDragImage(ghost.item, ghost.x, ghost.y);
  }
};
/**
 * _addGhostPos clones the dragged item and adds it as a Ghost item
 * @param [object] event - the event fired when dragstart is triggered
 * @param [object] ghost - .item = node, draggedItem = jQuery collection
 */
var _addGhostPos = function(e, ghost) {
  if (!ghost.x) {
    ghost.x = parseInt(e.pageX - ghost.draggedItem.offset().left);
  }
  if (!ghost.y) {
    ghost.y = parseInt(e.pageY - ghost.draggedItem.offset().top);
  }
  return ghost;
};
/**
 * _makeGhost decides which way to make a ghost and passes it to attachGhost
 * @param [jQuery selection] $draggedItem - the item that the user drags
 */
var _makeGhost = function($draggedItem) {
  return {
    item: $draggedItem[0],
    draggedItem: $draggedItem
  };
};
/**
 * _getGhost constructs ghost and attaches it to dataTransfer
 * @param [event] event - the original drag event object
 * @param [jQuery selection] $draggedItem - the item that the user drags
 * @param [object] ghostOpt - the ghost options
 */
// TODO: could $draggedItem be replaced by event.target in all instances
var _getGhost = function(event, $draggedItem) {
  // add ghost item & draggedItem to ghost object
  var ghost = _makeGhost($draggedItem);
  // attach ghost position
  ghost = _addGhostPos(event, ghost);
  // attach ghost to dataTransfer
  _attachGhost(event, ghost);
};
/*
 * return options if not set on sortable already
 * @param [object] soptions
 * @param [object] options
 */
var _getOptions = function(soptions, options) {
  if (typeof soptions === 'undefined') {
    return options;
  }
  return soptions;
};
/*
 * remove data from sortable
 * @param [jquery Collection] a single sortable
 */
var _removeSortableData = function(sortable) {
  sortable.removeData('opts');
  sortable.removeData('connectWith');
  sortable.removeData('items');
  sortable.removeAttr('aria-dropeffect');
};
/*
 * remove data from items
 * @param [jquery Collection] items
 */
var _removeItemData = function(items) {
  items.removeAttr('aria-grabbed');
  items.removeAttr('draggable');
  items.removeAttr('role');
};
/*
 * check if two lists are connected
 * @param [jquery Collection] items
 */
var _listsConnected = function(curList, destList) {
  if (curList[0] === destList[0]) {
    return true;
  }
  if (curList.data('connectWith') !== undefined) {
    return curList.data('connectWith') === destList.data('connectWith');
  }
  return false;
};
/*
 * destroy the sortable
 * @param [jquery Collection] a single sortable
 */
var _destroySortable = function(sortable) {
  var opts = sortable.data('opts') || {};
  var items = sortable.children(opts.items);
  var handles = opts.handle ? items.find(opts.handle) : items;
  // remove event handlers & data from sortable
  _removeSortableEvents(sortable);
  _removeSortableData(sortable);
  // remove event handlers & data from items
  handles.off('mousedown.h5s');
  _removeItemEvents(items);
  _removeItemData(items);
};
/*
 * enable the sortable
 * @param [jquery Collection] a single sortable
 */
var _enableSortable = function(sortable) {
  var opts = sortable.data('opts');
  var items = sortable.children(opts.items);
  var handles = opts.handle ? items.find(opts.handle) : items;
  sortable.attr('aria-dropeffect', 'move');
  handles.attr('draggable', 'true');
  // IE FIX for ghost
  // can be disabled as it has the side effect that other events
  // (e.g. click) will be ignored
  if (typeof document.createElement('span').dragDrop === 'function' && !opts.disableIEFix) {
    handles.on('mousedown.h5s', function() {
      if (items.index(this) !== -1) {
        this.dragDrop();
      } else {
        $(this).parents(opts.items)[0].dragDrop();
      }
    });
  }
};
/*
 * disable the sortable
 * @param [jquery Collection] a single sortable
 */
var _disableSortable = function(sortable) {
  var opts = sortable.data('opts');
  var items = sortable.children(opts.items);
  var handles = opts.handle ? items.find(opts.handle) : items;
  sortable.attr('aria-dropeffect', 'none');
  handles.attr('draggable', false);
  handles.off('mousedown.h5s');
};
/*
 * reload the sortable
 * @param [jquery Collection] a single sortable
 * @description events need to be removed to not be double bound
 */
var _reloadSortable = function(sortable) {
  var opts = sortable.data('opts');
  var items = sortable.children(opts.items);
  var handles = opts.handle ? items.find(opts.handle) : items;
  // remove event handlers from items
  _removeItemEvents(items);
  handles.off('mousedown.h5s');
  // remove event handlers from sortable
  _removeSortableEvents(sortable);
};
/*
 * public sortable object
 * @param [object|string] options|method
 */
var sortable = function(selector, options) {

  var $sortables = $(selector);
  var method = String(options);

  options = $.extend({
    connectWith: false,
    placeholder: null,
    // dragImage can be null or a jQuery element
    dragImage: null,
    disableIEFix: false,
    placeholderClass: 'sortable-placeholder',
    draggingClass: 'sortable-dragging'
  }, options);

  /* TODO: maxstatements should be 25, fix and remove line below */
  /*jshint maxstatements:false */
  return $sortables.each(function() {

    var $sortable = $(this);

    if (/enable|disable|destroy/.test(method)) {
      sortable[method]($sortable);
      return;
    }

    // get options & set options on sortable
    options = _getOptions($sortable.data('opts'), options);
    $sortable.data('opts', options);
    // reset sortable
    _reloadSortable($sortable);
    // initialize
    var items = $sortable.children(options.items);
    var index;
    var startParent;
    var newParent;
    var placeholder = (options.placeholder === null) ? $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="' + options.placeholderClass + '"/>') : $(options.placeholder).addClass(options.placeholderClass);

    // setup sortable ids
    if (!$sortable.attr('data-sortable-id')) {
      var id = sortables.length;
      sortables[id] = $sortable;
      $sortable.attr('data-sortable-id', id);
      items.attr('data-item-sortable-id', id);
    }

    $sortable.data('items', options.items);
    placeholders = placeholders.add(placeholder);
    if (options.connectWith) {
      $sortable.data('connectWith', options.connectWith);
    }

    _enableSortable($sortable);
    items.attr('role', 'option');
    items.attr('aria-grabbed', 'false');

    // Handle drag events on draggable items
    items.on('dragstart.h5s', function(e) {
      e.stopImmediatePropagation();

      if (options.dragImage) {
        _attachGhost(e.originalEvent, {
          item: options.dragImage,
          x: 0,
          y: 0
        });
        console.log('WARNING: dragImage option is deprecated' +
        ' and will be removed in the future!');
      } else {
        // add transparent clone or other ghost to cursor
        _getGhost(e.originalEvent, $(this), options.dragImage);
      }
      // cache selsection & add attr for dragging
      dragging = $(this);
      dragging.addClass(options.draggingClass);
      dragging.attr('aria-grabbed', 'true');
      // grab values
      index = dragging.index();
      draggingHeight = dragging.height();
      startParent = $(this).parent();
      // trigger sortstar update
      dragging.parent().triggerHandler('sortstart', {
        item: dragging,
        startparent: startParent
      });
    });
    // Handle drag events on draggable items
    items.on('dragend.h5s', function() {
      if (!dragging) {
        return;
      }
      // remove dragging attributes and show item
      dragging.removeClass(options.draggingClass);
      dragging.attr('aria-grabbed', 'false');
      dragging.show();

      placeholders.detach();
      newParent = $(this).parent();
      dragging.parent().triggerHandler('sortstop', {
        item: dragging,
        startparent: startParent,
      });
      if (index !== dragging.index() ||
          startParent.get(0) !== newParent.get(0)) {
        dragging.parent().triggerHandler('sortupdate', {
          item: dragging,
          index: newParent.children(newParent.data('items')).index(dragging),
          oldindex: items.index(dragging),
          elementIndex: dragging.index(),
          oldElementIndex: index,
          startparent: startParent,
          endparent: newParent
        });
      }
      dragging = null;
      draggingHeight = null;
    });
    // Handle drop event on sortable & placeholder
    // TODO: REMOVE placeholder?????
    $(this).add([placeholder]).on('drop.h5s', function(e) {
      if (!_listsConnected($sortable, $(dragging).parent())) {
        return;
      }

      e.stopPropagation();
      placeholders.filter(':visible').after(dragging);
      dragging.trigger('dragend.h5s');
      return false;
    });

    // Handle dragover and dragenter events on draggable items
    // TODO: REMOVE placeholder?????
    items.add([this, placeholder]).on('dragover.h5s dragenter.h5s', function(e) {
      if (!_listsConnected($sortable, $(dragging).parent())) {
        return;
      }

      e.preventDefault();
      e.originalEvent.dataTransfer.dropEffect = 'move';
      if (items.is(this)) {
        var thisHeight = $(this).height();
        if (options.forcePlaceholderSize) {
          placeholder.height(draggingHeight);
        }

        // Check if $(this) is bigger than the draggable. If it is, we have to define a dead zone to prevent flickering
        if (thisHeight > draggingHeight) {
          // Dead zone?
          var deadZone = thisHeight - draggingHeight;
          var offsetTop = $(this).offset().top;
          if (placeholder.index() < $(this).index() &&
              e.originalEvent.pageY < offsetTop + deadZone) {
            return false;
          }
          if (placeholder.index() > $(this).index() &&
              e.originalEvent.pageY > offsetTop + thisHeight - deadZone) {
            return false;
          }
        }

        dragging.hide();
        if (placeholder.index() < $(this).index()) {
          $(this).after(placeholder);
        } else {
          $(this).before(placeholder);
        }
        placeholders.not(placeholder).detach();
      } else {
        if (!placeholders.is(this) && !$(this).children(options.items).length) {
          placeholders.detach();
          $(this).append(placeholder);
        }
      }
      return false;
    });
  });
};

sortable.destroy = function(sortable) {
  _destroySortable(sortable);
};

sortable.enable = function(sortable) {
  _enableSortable(sortable);
};

sortable.disable = function(sortable) {
  _disableSortable(sortable);
};

$.fn.sortable = function(options) {
  return sortable(this, options);
};

return sortable;
}));


/***/ }),

/***/ "./src/admin/addPermissions.js":
/*!*************************************!*\
  !*** ./src/admin/addPermissions.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/PermissionGrid */ "flarum/components/PermissionGrid");
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'moderateItems', function (items) {
    items.add('flagrow-terms-see-user-policies-state', {
      icon: 'fas fa-paperclip',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.permissions.see-user-policies-state'),
      permission: 'flagrow-terms.see-user-policies-state'
    });
    items.add('flagrow-terms-postpone-policies-accept', {
      icon: 'fas fa-paperclip',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.permissions.postpone-policies-accept'),
      permission: 'flagrow-terms.postpone-policies-accept'
    });
    items.add('flagrow-terms-export-policies', {
      icon: 'fas fa-paperclip',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.permissions.export-policies'),
      permission: 'flagrow-terms.export-policies'
    });
  });
});

/***/ }),

/***/ "./src/admin/components/PolicyEdit.js":
/*!********************************************!*\
  !*** ./src/admin/components/PolicyEdit.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PolicyEdit; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);






var PolicyEdit =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PolicyEdit, _Component);

  function PolicyEdit() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = PolicyEdit.prototype;

  _proto.init = function init() {
    this.policy = this.props.policy;
    this.dirty = false;
    this.processing = false;
    this.toggleFields = false;

    if (this.policy === null) {
      this.initNewField();
    }
  };

  _proto.initNewField = function initNewField() {
    this.policy = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.createRecord('flagrow-terms-policies', {
      attributes: {
        name: '',
        url: '',
        update_message: '',
        terms_updated_at: ''
      }
    });
  };

  _proto.boxTitle = function boxTitle() {
    if (this.policy.exists) {
      return this.policy.name();
    }

    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.buttons.new-policy');
  };

  _proto.view = function view() {
    var _this = this;

    return m('.Flagrow-Terms-Policiy-Box', [this.policy.exists ? m('span.fas.fa-arrows-alt.Flagrow-Terms-Policiy-Box--handle.js-policy-handle') : null, m('.Button.Button--block.Flagrow-Terms-Policiy-Header', {
      onclick: function onclick() {
        _this.toggleFields = !_this.toggleFields;
      }
    }, [m('.Flagrow-Terms-Policiy-Header-Title', this.boxTitle()), m('div', [this.policy.exists ? [flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.buttons.edit-policy'), ' '] : null, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()(this.toggleFields ? 'fas fa-chevron-up' : 'fas fa-chevron-down')])]), this.toggleFields ? this.viewFields() : null]);
  };

  _proto.viewFields = function viewFields() {
    var _this2 = this;

    return m('form.Flagrow-Terms-Policiy-Body', [m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.name')), m('input.FormControl', {
      type: 'text',
      value: this.policy.name(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'name'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.name-help'))]), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.url')), m('input.FormControl', {
      type: 'url',
      value: this.policy.url(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'url'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.url-help'))]), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.update-message')), m('textarea.FormControl', {
      value: this.policy.update_message(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'update_message'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.update-message-help'))]), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.terms-updated-at')), m('.Flagrow-Terms-Input-Group', [m('input.FormControl', {
      type: 'text',
      value: this.policy.terms_updated_at(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'terms_updated_at')),
      placeholder: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.terms-updated-at-placeholder')
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Button Button--primary',
      onclick: function onclick() {
        _this2.updateAttribute('terms_updated_at', moment().milliseconds(0).toISOString());
      },
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.buttons.set-to-now')
    })]), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.terms-updated-at-help'))]), this.policy.exists ? m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.export-url')), m('.ButtonGroup', ['json', 'csv'].map(function (format) {
      return m('a.Button.Flagrow-Terms-Export-Button', {
        href: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + '/flagrow/terms/policies/' + _this2.policy.id() + '/export.' + format,
        target: '_blank'
      }, format.toUpperCase());
    })), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.policies.export-url-help', {
      a: m('a', {
        href: 'https://github.com/flagrow/terms/wiki/Export-url',
        target: '_blank'
      })
    }))]) : null, m('.ButtonGroup', [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.buttons.' + (this.policy.exists ? 'save' : 'add') + '-policy'),
      loading: this.processing,
      disabled: !this.readyToSave(),
      onclick: this.savePolicy.bind(this)
    }), this.policy.exists ? flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--danger',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.buttons.delete-policy'),
      loading: this.processing,
      onclick: this.deletePolicy.bind(this)
    }) : ''])]);
  };

  _proto.updateAttribute = function updateAttribute(attribute, value) {
    var _this$policy$pushAttr;

    this.policy.pushAttributes((_this$policy$pushAttr = {}, _this$policy$pushAttr[attribute] = value, _this$policy$pushAttr));
    this.dirty = true;
  };

  _proto.readyToSave = function readyToSave() {
    return this.dirty;
  };

  _proto.savePolicy = function savePolicy() {
    var _this3 = this;

    this.processing = true;
    var createNewRecord = !this.policy.exists;
    this.policy.save(this.policy.data.attributes).then(function () {
      if (createNewRecord) {
        _this3.initNewField();

        _this3.toggleFields = false;
      }

      _this3.processing = false;
      _this3.dirty = false;
      m.redraw();
    }).catch(function (err) {
      _this3.processing = false;
      throw err;
    });
  };

  _proto.deletePolicy = function deletePolicy() {
    var _this4 = this;

    if (!confirm(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-terms.admin.messages.delete-policy-confirmation', {
      name: this.policy.name()
    }).join(''))) {
      return;
    }

    this.processing = true;
    this.policy.delete().then(function () {
      _this4.processing = false;
      m.redraw();
    }).catch(function (err) {
      _this4.processing = false;
      throw err;
    });
  };

  return PolicyEdit;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/admin/components/PolicyList.js":
/*!********************************************!*\
  !*** ./src/admin/components/PolicyList.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PolicyList; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var html5sortable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html5sortable */ "./node_modules/html5sortable/dist/html.sortable.js");
/* harmony import */ var html5sortable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html5sortable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PolicyEdit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PolicyEdit */ "./src/admin/components/PolicyEdit.js");
/* harmony import */ var _common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/helpers/sortByAttribute */ "./src/common/helpers/sortByAttribute.js");







var PolicyList =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PolicyList, _Component);

  function PolicyList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = PolicyList.prototype;

  _proto.init = function init() {
    flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.request({
      method: 'GET',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.forum.attribute('apiUrl') + '/flagrow/terms/policies'
    }).then(function (result) {
      flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.store.pushPayload(result);
      m.redraw();
    });
  };

  _proto.config = function config() {
    var _this = this;

    this.$('.js-policies-container').sortable({
      handle: '.js-policy-handle'
    }).on('sortupdate', function () {
      var sorting = _this.$('.js-policy-data').map(function () {
        return $(this).data('id');
      }).get();

      _this.updateSort(sorting);
    });
  };

  _proto.view = function view() {
    var policies = flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.store.all('flagrow-terms-policies');
    var fieldsList = [];
    Object(_common_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_5__["default"])(policies).forEach(function (policy) {
      // Build array of fields to show.
      fieldsList.push(m('.js-policy-data', {
        key: policy.id(),
        'data-id': policy.id()
      }, _PolicyEdit__WEBPACK_IMPORTED_MODULE_4__["default"].component({
        policy: policy
      })));
    });
    return m('div', [m('h2', flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans('flagrow-terms.admin.titles.policies')), m('.Flagrow-Terms-Policies-Container', [m('.js-policies-container', fieldsList), _PolicyEdit__WEBPACK_IMPORTED_MODULE_4__["default"].component({
      key: 'new',
      policy: null
    })])]);
  };

  _proto.updateSort = function updateSort(sorting) {
    flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.request({
      method: 'POST',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.forum.attribute('apiUrl') + '/flagrow/terms/policies/order',
      data: {
        sort: sorting
      }
    }).then(function (result) {
      // Update sort attributes
      flarum_app__WEBPACK_IMPORTED_MODULE_2___default.a.store.pushPayload(result);
      m.redraw();
    });
  };

  return PolicyList;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/admin/components/TermsSettingsModal.js":
/*!****************************************************!*\
  !*** ./src/admin/components/TermsSettingsModal.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TermsSettingsModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PolicyList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PolicyList */ "./src/admin/components/PolicyList.js");





var settingsPrefix = 'flagrow-terms.';
var translationPrefix = 'flagrow-terms.admin.settings.';

var TermsSettingsModal =
/*#__PURE__*/
function (_SettingsModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(TermsSettingsModal, _SettingsModal);

  function TermsSettingsModal() {
    return _SettingsModal.apply(this, arguments) || this;
  }

  var _proto = TermsSettingsModal.prototype;

  _proto.title = function title() {
    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans(translationPrefix + 'title');
  };

  _proto.form = function form() {
    return [m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans(translationPrefix + 'field.signup-legal-text')), m('textarea.FormControl', {
      bidi: this.setting(settingsPrefix + 'signup-legal-text')
    })]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.setting(settingsPrefix + 'hide-updated-at')() > 0,
      onchange: this.setting(settingsPrefix + 'hide-updated-at'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans(translationPrefix + 'field.hide-updated-at')
    }))]), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans(translationPrefix + 'field.date-format')), m('input[type=text].FormControl', {
      bidi: this.setting(settingsPrefix + 'date-format'),
      placeholder: 'YYYY-MM-DD'
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans(translationPrefix + 'field.date-format-help', {
      a: m('a', {
        href: 'https://momentjs.com/docs/#/displaying/format/',
        target: '_blank'
      })
    }))]), _PolicyList__WEBPACK_IMPORTED_MODULE_4__["default"].component()];
  };

  return TermsSettingsModal;
}(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_models_Policy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/models/Policy */ "./src/common/models/Policy.js");
/* harmony import */ var _components_TermsSettingsModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/TermsSettingsModal */ "./src/admin/components/TermsSettingsModal.js");
/* harmony import */ var _addPermissions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addPermissions */ "./src/admin/addPermissions.js");




flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('flagrow-terms', function (app) {
  app.store.models['flagrow-terms-policies'] = _common_models_Policy__WEBPACK_IMPORTED_MODULE_1__["default"];

  app.extensionSettings['flagrow-terms'] = function () {
    return app.modal.show(new _components_TermsSettingsModal__WEBPACK_IMPORTED_MODULE_2__["default"]());
  };

  Object(_addPermissions__WEBPACK_IMPORTED_MODULE_3__["default"])();
});

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

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/PermissionGrid":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/PermissionGrid']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/PermissionGrid'];

/***/ }),

/***/ "flarum/components/SettingsModal":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsModal']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsModal'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

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

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map