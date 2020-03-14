"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = complement;

// inspired by rambda

/* eslint-disable */
function complement(fn) {
  var args = Array.prototype.slice.call(arguments, 1);

  if (0 === args.length) {
    return function () {
      return complement.apply(this, [fn].concat(Array.prototype.slice.call(arguments, 0)));
    };
  }

  return !fn.apply(this, args);
}