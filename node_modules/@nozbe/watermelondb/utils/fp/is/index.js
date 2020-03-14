"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = is;

// inspired by rambda and ramda
function is(Constructor, value) {
  if (1 === arguments.length) {
    return function (valueHolder) {
      return is(Constructor, valueHolder);
    };
  }

  return null != value && value.constructor === Constructor || value instanceof Constructor;
}