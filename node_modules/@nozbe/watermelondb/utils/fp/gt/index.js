"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gt;

// inspired by ramda and rambda

/* eslint-disable */
function gt(x, y) {
  if (1 === arguments.length) {
    return function (y) {
      return gt(x, y);
    };
  }

  return x > y;
}