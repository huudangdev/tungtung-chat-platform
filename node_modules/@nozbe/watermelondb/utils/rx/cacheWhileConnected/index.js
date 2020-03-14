"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cacheWhileConnected;

var _operators = require("rxjs/operators");

var _publishReplayLatestWhileConnected = _interopRequireDefault(require("../publishReplayLatestWhileConnected"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Equivalent to observable |> distinctUntilChanged |> publishReplayLatestWhileConnected |> refCount
//
// Creates an observable that shares the connection with and replays the latest value from the underlying
// observable, and skips emissions that are the same as the previous one
function cacheWhileConnected(source) {
  return source.pipe((0, _operators.distinctUntilChanged)(), _publishReplayLatestWhileConnected.default).refCount();
}