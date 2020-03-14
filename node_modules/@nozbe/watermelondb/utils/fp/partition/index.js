"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = partition;

var _is = _interopRequireDefault(require("../is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// inspired by rambda and ramda

/* eslint-disable */
function partition(pred, arr) {
  if (arr === undefined) {
    return function (arr) {
      return partition(pred, arr);
    };
  }

  if ((0, _is.default)(Array, arr)) {
    var tuple = [[], []];

    for (var i = 0, l = arr.length; i < l; i++) {
      var v = arr[i];
      tuple[pred(v) ? 0 : 1].push(v);
    }

    return tuple;
  }

  var tuple = [{}, {}];
  var keys = Object.keys(arr);

  for (var i = 0, l = keys.length; i < l; i++) {
    var prop = keys[i];
    var v = arr[prop];
    tuple[pred(v) ? 0 : 1][prop] = v;
  }

  return tuple;
}