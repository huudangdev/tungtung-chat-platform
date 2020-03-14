"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gte;

// inspired by ramda and rambda

/* eslint-disable */
function gte(x, y) {
  if (1 === arguments.length) {
    return function (y) {
      return gte(x, y);
    };
  }

  return x >= y;
}