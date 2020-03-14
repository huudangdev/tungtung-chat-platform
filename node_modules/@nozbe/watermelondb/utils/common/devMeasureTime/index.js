"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devMeasureTime = devMeasureTime;
exports.devMeasureTimeAsync = devMeasureTimeAsync;
exports.getPreciseTime = void 0;

var getPreciseTime = function () {
  if ('undefined' !== typeof global && global.nativePerformanceNow) {
    return global.nativePerformanceNow;
  } else if ('undefined' !== typeof window && window.performance && window.performance.now) {
    return window.performance.now.bind(window.performance);
  }

  return Date.now;
}();

exports.getPreciseTime = getPreciseTime;

function devMeasureTime(executeBlock) {
  var start = getPreciseTime();
  var result = executeBlock();
  var time = getPreciseTime() - start;
  return [result, time];
}

function devMeasureTimeAsync(executeBlock) {
  return new Promise(function ($return, $error) {
    var start, result, time;
    start = getPreciseTime();
    return Promise.resolve(executeBlock()).then(function ($await_1) {
      try {
        result = $await_1;
        time = getPreciseTime() - start;
        return $return([result, time]);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}