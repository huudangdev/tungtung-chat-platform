"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = likeToRegexp;

function likeToRegexp(likeQuery) {
  var regexp = "^".concat(likeQuery, "$").replace(/%/g, '.*').replace(/_/g, '.');
  return new RegExp(regexp, 'i');
}