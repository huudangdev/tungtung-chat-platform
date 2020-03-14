"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encodeUpdate;

var _rambdax = require("rambdax");

var _encodeName = _interopRequireDefault(require("../encodeName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeSetPlaceholders = (0, _rambdax.pipe)(_rambdax.keys, (0, _rambdax.map)(_encodeName.default), (0, _rambdax.map)(function (key) {
  return "".concat(key, "=?");
}), (0, _rambdax.join)(', '));

var getArgs = function (raw) {
  return (0, _rambdax.pipe)(_rambdax.values, (0, _rambdax.append)(raw.id) // for `where id is ?`
  )(raw);
};

function encodeUpdate(table, raw) {
  var sql = "update ".concat((0, _encodeName.default)(table), " set ").concat(encodeSetPlaceholders(raw), " where \"id\" is ?");
  var args = getArgs(raw);
  return [sql, args];
}