"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = zip;

// inspired by ramda and rambda

/* eslint-disable */
function zip(left, right) {
  if (right === undefined) {
    return function (right) {
      return zip(left, right);
    };
  }

  var result = [];
  var length = Math.min(left.length, right.length);

  for (var i = 0; i < length; i++) {
    result[i] = [left[i], right[i]];
  }

  return result;
}