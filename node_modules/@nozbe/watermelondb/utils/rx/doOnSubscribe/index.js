"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doOnSubscribe;

var _defer = require("rxjs/observable/defer");

function doOnSubscribe(onSubscribe) {
  return function (source) {
    return (0, _defer.defer)(function () {
      onSubscribe();
      return source;
    });
  };
}