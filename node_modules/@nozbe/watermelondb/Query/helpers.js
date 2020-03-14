"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssociations = exports.getSecondaryTables = void 0;

var _rambdax = require("rambdax");

var _zip = _interopRequireDefault(require("../utils/fp/zip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSecondaryTables = function (description) {
  return (0, _rambdax.uniq)(description.join.map(function (join) {
    return join.table;
  }));
};

exports.getSecondaryTables = getSecondaryTables;

var getAssociations = function (tables, associations) {
  return (0, _zip.default)(tables, tables.map(function (table) {
    return associations[table];
  }));
};

exports.getAssociations = getAssociations;