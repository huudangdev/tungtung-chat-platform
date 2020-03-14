"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDatabase = useDatabase;

var _react = _interopRequireDefault(require("react"));

var _DatabaseProvider = require("../DatabaseProvider");

var _invariant = _interopRequireDefault(require("../utils/common/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useDatabase() {
  var database = _react.default.useContext(_DatabaseProvider.DatabaseContext);

  (0, _invariant.default)(database, 'Could not find database context, please make sure the component is wrapped in the <DatabaseProvider>');
  return database;
}