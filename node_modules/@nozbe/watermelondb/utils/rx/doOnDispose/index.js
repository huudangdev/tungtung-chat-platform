"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doOnDispose;

var _Observable = require("rxjs/Observable");

function doOnDispose(onDispose) {
  return function (source) {
    return _Observable.Observable.create(function (observer) {
      var subscription = source.subscribe(observer);
      return function () {
        subscription.unsubscribe();
        onDispose();
      };
    });
  };
}