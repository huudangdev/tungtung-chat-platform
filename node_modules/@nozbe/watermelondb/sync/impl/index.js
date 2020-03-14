"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastPulledAt = getLastPulledAt;
exports.setLastPulledAt = setLastPulledAt;
Object.defineProperty(exports, "applyRemoteChanges", {
  enumerable: true,
  get: function get() {
    return _applyRemote.default;
  }
});
Object.defineProperty(exports, "fetchLocalChanges", {
  enumerable: true,
  get: function get() {
    return _fetchLocal.default;
  }
});
Object.defineProperty(exports, "hasUnsyncedChanges", {
  enumerable: true,
  get: function get() {
    return _fetchLocal.hasUnsyncedChanges;
  }
});
Object.defineProperty(exports, "markLocalChangesAsSynced", {
  enumerable: true,
  get: function get() {
    return _markAsSynced.default;
  }
});

var _common = require("../../utils/common");

var _applyRemote = _interopRequireDefault(require("./applyRemote"));

var _fetchLocal = _interopRequireWildcard(require("./fetchLocal"));

var _markAsSynced = _interopRequireDefault(require("./markAsSynced"));

function _getRequireWildcardCache() { if ("function" !== typeof WeakMap) return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (null != obj) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastSyncedAtKey = '__watermelon_last_pulled_at';

function getLastPulledAt(database) {
  return new Promise(function ($return, $error) {
    return Promise.resolve(database.adapter.getLocal(lastSyncedAtKey)).then(function ($await_1) {
      try {
        return $return(parseInt($await_1, 10) || null);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}

function setLastPulledAt(database, timestamp) {
  return new Promise(function ($return, $error) {
    var previousTimestamp;
    return Promise.resolve(getLastPulledAt(database)).then(function ($await_2) {
      try {
        previousTimestamp = $await_2 || 0;

        if (timestamp < previousTimestamp) {
          (0, _common.logError)("[Sync] Pull has finished and received server time ".concat(timestamp, " \u2014 but previous pulled-at time was greater - ").concat(previousTimestamp, ". This is most likely server bug."));
        }

        return Promise.resolve(database.adapter.setLocal(lastSyncedAtKey, "".concat(timestamp))).then(function () {
          try {
            return $return();
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }, $error);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}