"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withDatabase;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// HoC to inject the database into the props of consumers
function withDatabase(Component) {
  return function (props) {
    return _react.default.createElement(_.DatabaseConsumer, null, function (database) {
      return _react.default.createElement(Component, _extends({}, props, {
        database: database
      }));
    });
  };
}