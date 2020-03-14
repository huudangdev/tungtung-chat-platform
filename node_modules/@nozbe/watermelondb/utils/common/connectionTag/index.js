"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectionTag;
var previousTag = 0;

function connectionTag() {
  previousTag += 1;
  return previousTag;
}