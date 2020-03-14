"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unnest;

var _is = _interopRequireDefault(require("../is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// inspired by ramda and rambda

/* eslint-disable */
function unnest(arr) {
  var result = [];

  for (var i = 0, l = arr.length; i < l; i++) {
    var value = arr[i];

    if ((0, _is.default)(Array, value)) {
      result = result.concat(value);
    } else {
      result.push(value);
    }
  }

  return result;
}