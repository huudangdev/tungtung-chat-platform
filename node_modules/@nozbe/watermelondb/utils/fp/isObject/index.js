"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isObject = function (maybeObject) {
  return null !== maybeObject && 'object' === typeof maybeObject && !Array.isArray(maybeObject);
};

var _default = isObject;
exports.default = _default;