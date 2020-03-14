"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;

var _diagnosticError = _interopRequireDefault(require("../diagnosticError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// If `condition` is falsy, throws an Error with the passed message
function invariant(condition, errorMessage) {
  if (!condition) {
    var error = (0, _diagnosticError.default)(errorMessage || 'Broken invariant');
    error.framesToPop += 1;
    throw error;
  }
}