"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cond;

// inspired by rambda

/* eslint-disable */
function cond(pairs) {
  var args = Array.prototype.slice.call(arguments, 1);

  if (0 === args.length) {
    return function () {
      return cond.apply(this, [pairs].concat(Array.prototype.slice.call(arguments, 0)));
    };
  }

  for (var i = 0, l = pairs.length; i < l; i++) {
    if (pairs[i][0].apply(this, args)) {
      return pairs[i][1].apply(this, args);
    }
  }

  return undefined;
}