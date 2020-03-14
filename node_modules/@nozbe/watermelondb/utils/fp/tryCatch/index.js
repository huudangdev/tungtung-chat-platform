"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tryCatch;

// inspired by ramda and rambda

/* eslint-disable */
function tryCatch(tryer, catcher, value) {
  if (catcher === undefined) {
    return function (catcher, value) {
      if (value === undefined) {
        return function (value) {
          return tryCatch(tryer, catcher, value);
        };
      }

      return tryCatch(tryer, catcher, value);
    };
  } else if (value === undefined) {
    return function (value) {
      return tryCatch(tryer, catcher, value);
    };
  }

  try {
    return tryer.apply(this, [value]);
  } catch (err) {
    return catcher.apply(this, [err, value]);
  }
}