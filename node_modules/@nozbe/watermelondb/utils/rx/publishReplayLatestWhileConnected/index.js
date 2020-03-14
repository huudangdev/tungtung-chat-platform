"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = publishReplayLatestWhileConnected;

var _ReplaySubject = require("rxjs/ReplaySubject");

var _operators = require("rxjs/operators");

function publishReplayLatestWhileConnected(source) {
  return source.pipe((0, _operators.multicast)(function () {
    return new _ReplaySubject.ReplaySubject(1);
  }));
}