"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchLocalChanges;
exports.hasUnsyncedChanges = hasUnsyncedChanges;

var _rambdax = require("rambdax");

var _fp = require("../../utils/fp");

var _common = require("../../utils/common");

var Q = _interopRequireWildcard(require("../../QueryDescription"));

var _Schema = require("../../Schema");

var _helpers = require("./helpers");

function _getRequireWildcardCache() { if ("function" !== typeof WeakMap) return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (null != obj) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var notSyncedQuery = Q.where((0, _Schema.columnName)('_status'), Q.notEq('synced'));

function fetchLocalChangesForCollection(collection) {
  return new Promise(function ($return, $error) {
    var changedRecords, deletedRecords, changeSet;
    return Promise.resolve(Promise.all([collection.query(notSyncedQuery).fetch(), collection.database.adapter.getDeletedRecords(collection.table)])).then(function ($await_1) {
      try {
        [changedRecords, deletedRecords] = $await_1;
        changeSet = {
          created: [],
          updated: [],
          deleted: deletedRecords
        };
        // perf-critical - using mutation
        changedRecords.forEach(function (record) {
          var status = record._raw._status;
          (0, _common.invariant)('created' === status || 'updated' === status, "Invalid changed record status"); // TODO: It would be best to omit _status, _changed fields, since they're not necessary for the server
          // but this complicates markLocalChangesAsDone, since we don't have the exact copy to compare if record changed
          // TODO: It would probably also be good to only send to server locally changed fields, not full records

          changeSet[status].push(Object.assign({}, record._raw));
        });
        return $return([changeSet, changedRecords]);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }, $error);
  });
}

var extractChanges = (0, _rambdax.map)(function ([changeSet]) {
  return changeSet;
});
var extractAllAffectedRecords = (0, _rambdax.pipe)(_rambdax.values, (0, _rambdax.map)(function ([, records]) {
  return records;
}), _fp.unnest);

function fetchLocalChanges(db) {
  (0, _helpers.ensureActionsEnabled)(db);
  return db.action(function () {
    return new Promise(function ($return, $error) {
      var changes;
      return Promise.resolve((0, _rambdax.promiseAllObject)((0, _rambdax.map)(fetchLocalChangesForCollection, // $FlowFixMe
      db.collections.map))).then(function ($await_2) {
        try {
          changes = $await_2;
          // TODO: deep-freeze changes object (in dev mode only) to detect mutations (user bug)
          return $return({
            // $FlowFixMe
            changes: extractChanges(changes),
            affectedRecords: extractAllAffectedRecords(changes)
          });
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  }, 'sync-fetchLocalChanges');
}

function hasUnsyncedChanges(db) {
  (0, _helpers.ensureActionsEnabled)(db); // action is necessary to ensure other code doesn't make changes under our nose

  return db.action(function () {
    return new Promise(function ($return, $error) {
      var collections, hasUnsynced, unsyncedFlags;
      collections = (0, _rambdax.values)(db.collections.map);

      hasUnsynced = function (collection) {
        return new Promise(function ($return, $error) {
          var changes, deleted;
          return Promise.resolve(collection.query(notSyncedQuery).fetchCount()).then(function ($await_3) {
            try {
              changes = $await_3;
              return Promise.resolve(db.adapter.getDeletedRecords(collection.table)).then(function ($await_4) {
                try {
                  deleted = $await_4;
                  return $return(0 < changes + deleted.length);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }, $error);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        });
      };

      return Promise.resolve((0, _fp.allPromises)(hasUnsynced, collections)).then(function ($await_5) {
        try {
          unsyncedFlags = $await_5;
          return $return((0, _rambdax.any)(_rambdax.identity, unsyncedFlags));
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  }, 'sync-hasUnsyncedChanges');
}