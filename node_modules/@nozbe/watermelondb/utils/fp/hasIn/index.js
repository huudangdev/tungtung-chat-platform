"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasIn;

// inspired by ramda and rambda

/* eslint-disable */
function hasIn(prop, obj) {
  if (obj === undefined) {
    return function (obj) {
      return hasIn(prop, obj);
    };
  }

  return prop in obj;
}