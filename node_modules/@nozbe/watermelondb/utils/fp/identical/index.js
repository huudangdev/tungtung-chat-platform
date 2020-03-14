"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identical;

// inspired by ramda and rambda

/* eslint-disable */
function identical(a, b) {
  if (1 === arguments.length) {
    return function (b) {
      return identical(a, b);
    };
  }

  if (a === b) {
    return 0 !== a || 1 / a === 1 / b;
  }

  return a !== a && b !== b;
}