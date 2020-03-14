"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encodeValue;

var _sqlEscapeString = _interopRequireDefault(require("sql-escape-string"));

var _common = require("../../../utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function encodeValue(value) {
  if (true === value) {
    return '1';
  } else if (false === value) {
    return '0';
  } else if (Number.isNaN(value)) {
    (0, _common.logError)('Passed NaN to query');
    return 'null';
  } else if (value === undefined) {
    (0, _common.logError)('Passed undefined to query');
    return 'null';
  } else if (null === value) {
    return 'null';
  } else if ('number' === typeof value) {
    return "".concat(value);
  } // TODO: We shouldn't ever encode SQL values directly — use placeholders


  return (0, _sqlEscapeString.default)(value);
}