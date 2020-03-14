"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withDatabase", {
  enumerable: true,
  get: function get() {
    return _withDatabase.default;
  }
});
exports.default = exports.DatabaseConsumer = exports.DatabaseContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _Database = _interopRequireDefault(require("../Database"));

var _withDatabase = _interopRequireDefault(require("./withDatabase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatabaseContext = _react.default.createContext();

exports.DatabaseContext = DatabaseContext;
var {
  Provider: Provider,
  Consumer: Consumer
} = DatabaseContext;
exports.DatabaseConsumer = Consumer;

/**
 * Database provider to create the database context
 * to allow child components to consume the database without prop drilling
 */
function DatabaseProvider({
  children: children,
  database: database
}) {
  if (!database) {
    throw new Error('You must supply a database prop to the DatabaseProvider');
  }

  return _react.default.createElement(Provider, {
    value: database
  }, children);
}

var _default = DatabaseProvider;
exports.default = _default;