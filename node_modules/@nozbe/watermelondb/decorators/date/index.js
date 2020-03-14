"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeDecorator = _interopRequireDefault(require("../../utils/common/makeDecorator"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateDecorator = (0, _makeDecorator.default)(function (columnName) {
  return function (target, key, descriptor) {
    (0, _common.ensureDecoratorUsedProperly)(columnName, target, key, descriptor);
    return {
      configurable: true,
      enumerable: true,
      get: function get() {
        var rawValue = this.asModel._getRaw(columnName);

        return 'number' === typeof rawValue ? new Date(rawValue) : null;
      },
      set: function set(date) {
        var rawValue = date ? +new Date(date) : null;

        this.asModel._setRaw(columnName, rawValue);
      }
    };
  };
});
var _default = dateDecorator;
exports.default = _default;