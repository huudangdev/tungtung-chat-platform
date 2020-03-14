"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _withoutIdentical = _interopRequireDefault(require("../withoutIdentical"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrayDifference = function (previousList, newList) {
  return {
    added: (0, _withoutIdentical.default)(previousList, newList),
    removed: (0, _withoutIdentical.default)(newList, previousList)
  };
};

var _default = arrayDifference;
exports.default = _default;