"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newLoki = newLoki;
exports.deleteDatabase = deleteDatabase;

var _lokijs = _interopRequireWildcard(require("lokijs"));

var _common = require("../../../utils/common");

function _getRequireWildcardCache() { if ("function" !== typeof WeakMap) return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (null != obj) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-undef */
var isIDBAvailable = function (onQuotaExceededError) {
  return new Promise(function (resolve) {
    // $FlowFixMe
    if ('undefined' === typeof indexedDB) {
      resolve(false);
    } // in Firefox private mode, IDB will be available, but will fail to open


    var checkRequest = indexedDB.open('WatermelonIDBChecker');

    checkRequest.onsuccess = function (e) {
      var db = e.target.result;
      db.close();
      resolve(true);
    };

    checkRequest.onerror = function (event) {
      var _event$target;

      var error = null === event || void 0 === event ? void 0 : null === (_event$target = event.target) || void 0 === _event$target ? void 0 : _event$target.error; // this is what Firefox in Private Mode returns:
      // DOMException: "A mutation operation was attempted on a database that did not allow mutations."
      // code: 11, name: InvalidStateError

      _common.logger.error('[WatermelonDB][Loki] IndexedDB checker failed to open. Most likely, user is in Private Mode. It could also be a quota exceeded error. Will fall back to in-memory database.', event, error);

      if (error && 'QuotaExceededError' === error.name) {
        _common.logger.log('[WatermelonDB][Loki] Looks like disk quota was exceeded: ', error);

        onQuotaExceededError && onQuotaExceededError(error);
      }

      resolve(false);
    };

    checkRequest.onblocked = function () {
      _common.logger.error('[WatermelonDB] IndexedDB checker call is blocked');
    };
  });
};

function getLokiAdapter(name, adapter, useIncrementalIDB, onIndexedDBVersionChange, onQuotaExceededError) {
  return new Promise(function ($return, $error) {
    var IncrementalIDBAdapter, LokiIndexedAdapter;

    if (adapter) {
      return $return(adapter);
    } else {
      return Promise.resolve(isIDBAvailable(onQuotaExceededError)).then(function ($await_2) {
        try {
          if ($await_2) {
            if (useIncrementalIDB) {
              IncrementalIDBAdapter = require('lokijs/src/incremental-indexeddb-adapter');
              return $return(new IncrementalIDBAdapter({
                onversionchange: onIndexedDBVersionChange
              }));
            }

            LokiIndexedAdapter = require('lokijs/src/loki-indexed-adapter');
            return $return(new LokiIndexedAdapter(name));
          }

          return function () {
            // if IDB is unavailable (that happens in private mode), fall back to memory adapter
            // we could also fall back to localstorage adapter, but it will fail in all but the smallest dbs
            return $return(new _lokijs.LokiMemoryAdapter());
          }.call(this);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }

    return function () {
      return $return(new _lokijs.LokiMemoryAdapter());
    }.call(this);
  });
}

function newLoki(name, adapter, useIncrementalIDB, onIndexedDBVersionChange, onQuotaExceededError) {
  return new Promise(function ($return, $error) {
    var loki;
    return Promise.resolve(getLokiAdapter(name, adapter, useIncrementalIDB, onIndexedDBVersionChange, onQuotaExceededError)).then(function ($await_3) {
      try {
        loki = new _lokijs.default(name, {
          adapter: $await_3,
          autosave: true,
          autosaveInterval: 250,
          verbose: true
        });
        return Promise.resolve(new Promise(function (resolve, reject) {
          loki.loadDatabase({}, function (error) {
            error ? reject(error) : resolve();
          });
        })).then(function () {
          try {
            return $return(loki);
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

function deleteDatabase(loki) {
  return new Promise(function ($return, $error) {
    return Promise.resolve(new Promise(function (resolve, reject) {
      // Works around a race condition - Loki doesn't disable autosave or drain save queue before
      // deleting database, so it's possible to delete and then have the database be saved
      loki.close(function () {
        loki.deleteDatabase({}, function (response) {
          // LokiIndexedAdapter responds with `{ success: true }`, while
          // LokiMemory adapter just calls it with no params
          if (response && response.success || response === undefined) {
            resolve();
          } else {
            reject(response);
          }
        });
      });
    })).then(function () {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}