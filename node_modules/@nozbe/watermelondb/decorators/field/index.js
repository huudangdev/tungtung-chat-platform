"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeDecorator = _interopRequireDefault(require("../../utils/common/makeDecorator"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var field = (0, _makeDecorator.default)(function (columnName) {
  return function (target, key, descriptor) {
    (0, _common.ensureDecoratorUsedProperly)(columnName, target, key, descriptor);
    return {
      configurable: true,
      enumerable: true,
      get: function get() {
        return this.asModel._getRaw(columnName);
      },
      set: function set(value) {
        this.asModel._setRaw(columnName, value);
      }
    };
  };
});
var _default = field;
exports.default = _default;