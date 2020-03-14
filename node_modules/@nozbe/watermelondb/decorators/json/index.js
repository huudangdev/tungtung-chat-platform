"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.jsonDecorator = void 0;

var _rambdax = require("rambdax");

var _makeDecorator = _interopRequireDefault(require("../../utils/common/makeDecorator"));

var _tryCatch = _interopRequireDefault(require("../../utils/fp/tryCatch"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseJSON = (0, _tryCatch.default)(JSON.parse, (0, _rambdax.always)(undefined));
var jsonDecorator = (0, _makeDecorator.default)(function (rawFieldName, sanitizer) {
  return function (target, key, descriptor) {
    (0, _common.ensureDecoratorUsedProperly)(rawFieldName, target, key, descriptor);
    return {
      configurable: true,
      enumerable: true,
      get: function get() {
        var rawValue = this.asModel._getRaw(rawFieldName);

        var parsedValue = parseJSON(rawValue);
        return sanitizer(parsedValue, this);
      },
      set: function set(json) {
        var sanitizedValue = sanitizer(json, this);
        var stringifiedValue = null != sanitizedValue ? JSON.stringify(sanitizedValue) : null;

        this.asModel._setRaw(rawFieldName, stringifiedValue);
      }
    };
  };
});
exports.jsonDecorator = jsonDecorator;
var _default = jsonDecorator;
exports.default = _default;