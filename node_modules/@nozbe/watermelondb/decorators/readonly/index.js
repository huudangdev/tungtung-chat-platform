"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeDecorator = _interopRequireDefault(require("../../utils/common/makeDecorator"));

var _invariant = _interopRequireDefault(require("../../utils/common/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Marks a field as non-writable (throws an error when attempting to set a new value)
// When using multiple decorators, remember to mark as @readonly *last* (leftmost)
var readonly = (0, _makeDecorator.default)(function () {
  return function (target, key, descriptor) {
    // Set a new setter on getter/setter fields
    if (descriptor.get || descriptor.set) {
      return _objectSpread({}, descriptor, {
        set: function set() {
          (0, _invariant.default)(false, "Attempt to set new value on a property ".concat(target.constructor.name, ".prototype.").concat(key, " marked as @readonly"));
        }
      });
    } // Mark as writable=false for simple fields


    descriptor.writable = false;
    return descriptor;
  };
});
var _default = readonly;
exports.default = _default;