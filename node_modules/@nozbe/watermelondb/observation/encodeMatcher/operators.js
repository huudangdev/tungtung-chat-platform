"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.notLike = exports.like = exports.rawFieldEquals = void 0;

var _fp = require("../../utils/fp");

var _likeToRegexp = _interopRequireDefault(require("../../utils/fp/likeToRegexp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable eqeqeq */
var between = function (left, [lower, upper]) {
  return left >= lower && left <= upper;
};

var rawFieldEquals = function (left, right) {
  return left == right;
};

exports.rawFieldEquals = rawFieldEquals;

var rawFieldNotEquals = function (left, right) {
  return !(left == right);
};

var noNullComparisons = function (operator) {
  return function (left, right) {
    // return false if any operand is null/undefined
    if (null == left || null == right) {
      return false;
    }

    return operator(left, right);
  };
}; // Same as `a > b`, but `5 > undefined` is also true


var weakGt = function (left, right) {
  return left > right || null != left && null == right;
};

var handleLikeValue = function (v, defaultV) {
  return 'string' === typeof v ? v : defaultV;
};

var like = function (left, right) {
  var leftV = handleLikeValue(left, '');
  return (0, _likeToRegexp.default)(right).test(leftV);
};

exports.like = like;

var notLike = function (left, right) {
  // Mimic SQLite behaviour
  if (null === left) {
    return false;
  }

  var leftV = handleLikeValue(left, '');
  return !(0, _likeToRegexp.default)(right).test(leftV);
};

exports.notLike = notLike;

var oneOf = function (value, values) {
  return values.includes(value);
};

var notOneOf = function (value, values) {
  return !values.includes(value);
};

var operators = {
  eq: rawFieldEquals,
  notEq: rawFieldNotEquals,
  gt: noNullComparisons(_fp.gt),
  gte: noNullComparisons(_fp.gte),
  weakGt: weakGt,
  lt: noNullComparisons(_fp.lt),
  lte: noNullComparisons(_fp.lte),
  oneOf: oneOf,
  notIn: noNullComparisons(notOneOf),
  between: between,
  like: like,
  notLike: notLike
};
var _default = operators;
exports.default = _default;