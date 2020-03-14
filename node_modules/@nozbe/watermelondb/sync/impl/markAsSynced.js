"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = markLocalChangesAsSynced;

var _rambdax = require("rambdax");

var _fp = require("../../utils/fp");

var _common = require("../../utils/common");

var _helpers = require("./helpers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var unchangedRecordsForRaws = function (raws, recordCache) {
  return (0, _rambdax.reduce)(function (records, raw) {
    var record = recordCache.find(function (model) {
      return model.id === raw.id;
    });

    if (!record) {
      (0, _common.logError)("[Sync] Looking for record ".concat(raw.id, " to mark it as synced, but I can't find it. Will ignore it (it should get synced next time). This is probably a Watermelon bug \u2014 please file an issue!"));
      return records;
    } // only include if it didn't change since fetch
    // TODO: get rid of `equals`


    return (0, _rambdax.equals)(record._raw, raw) ? records.concat(record) : records;
  }, [], raws);
};

var recordsToMarkAsSynced = function ({
  changes: changes,
  affectedRecords: affectedRecords
}) {
  return (0, _rambdax.pipe)(_rambdax.values, (0, _rambdax.map)(function ({
    created: created,
    updated: updated
  }) {
    return unchangedRecordsForRaws([].concat(_toConsumableArray(created), _toConsumableArray(updated)), affectedRecords);
  }), _fp.unnest)(changes);
};

var destroyDeletedRecords = function (db, {
  changes: changes
}) {
  return (0, _rambdax.promiseAllObject)((0, _rambdax.map)(function ({
    deleted: deleted
  }, tableName) {
    return db.adapter.destroyDeletedRecords(tableName, deleted);
  }, // $FlowFixMe
  changes));
};

function markLocalChangesAsSynced(db, syncedLocalChanges) {
  (0, _helpers.ensureActionsEnabled)(db);
  return db.action(function () {
    return new Promise(function ($return, $error) {
      return Promise.resolve(Promise.all([db.batch.apply(db, _toConsumableArray((0, _rambdax.map)(_helpers.prepareMarkAsSynced, recordsToMarkAsSynced(syncedLocalChanges)))), destroyDeletedRecords(db, syncedLocalChanges)])).then(function () {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    });
  }, 'sync-markLocalChangesAsSynced');
}