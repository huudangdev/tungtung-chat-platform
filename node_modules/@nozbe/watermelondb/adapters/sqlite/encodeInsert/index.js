"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encodeInsert;
var memoizedPlaceholders = {};

var generatePlaceholders = function (count) {
  var memoized = memoizedPlaceholders[count];

  if (memoized) {
    return memoized;
  }

  var placeholders = Array(count).fill('?').join(', ');
  memoizedPlaceholders[count] = placeholders;
  return placeholders;
};

function encodeInsert(table, raw) {
  var keys = Object.keys(raw); // skipping encodeName because performance

  var sql = "insert into ".concat(table, " (\"").concat(keys.join('", "'), "\") values (").concat(generatePlaceholders(keys.length), ")");
  var args = Object.values(raw);
  return [sql, args];
}