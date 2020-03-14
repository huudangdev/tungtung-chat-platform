"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lt;

// inspired by ramda and rambda

/* eslint-disable */
function lt(x, y) {
  if (1 === arguments.length) {
    return function (y) {
      return lt(x, y);
    };
  }

  return x < y;
}