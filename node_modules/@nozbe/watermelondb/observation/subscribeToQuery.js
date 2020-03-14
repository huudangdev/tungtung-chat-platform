"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subscribeToQuery;

var _subscribeToQueryReloading = _interopRequireDefault(require("./subscribeToQueryReloading"));

var _subscribeToSimpleQuery = _interopRequireDefault(require("./subscribeToSimpleQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function subscribeToQuery(query, subscriber) {
  return query.hasJoins ? (0, _subscribeToQueryReloading.default)(query, subscriber) : (0, _subscribeToSimpleQuery.default)(query, subscriber);
}