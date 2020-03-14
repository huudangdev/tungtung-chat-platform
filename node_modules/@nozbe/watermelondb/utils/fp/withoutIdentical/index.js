"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withoutIdentical;

var _identical = _interopRequireDefault(require("../identical"));

var _differenceWith = _interopRequireDefault(require("../differenceWith"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Like ramda's `without`, but uses `===` and not slow `equals` for comparisons
function withoutIdentical(withoutThese, originalList) {
  // TODO: Rewrite in vanilla JS?
  return (0, _differenceWith.default)(_identical.default, originalList, withoutThese);
}