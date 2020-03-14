"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureSync;

var _fp = require("../../fp");

var _invariant = _interopRequireDefault(require("../invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Throws if passed value if a Promise
// Otherwise, returns the passed value as-is.
//
// Use to ensure API users aren't passing async functions
function ensureSync(value) {
  (0, _invariant.default)(!(0, _fp.is)(Promise, value), 'Unexpected Promise. Passed function should be synchronous.');
  return value;
}