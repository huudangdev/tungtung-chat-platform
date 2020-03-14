"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveConflict = resolveConflict;
exports.prepareCreateFromRaw = prepareCreateFromRaw;
exports.prepareUpdateFromRaw = prepareUpdateFromRaw;
exports.prepareMarkAsSynced = prepareMarkAsSynced;
exports.ensureActionsEnabled = ensureActionsEnabled;
exports.ensureSameDatabase = ensureSameDatabase;
exports.isChangeSetEmpty = void 0;

var _rambdax = require("rambdax");

var _common = require("../../utils/common");

var _RawRecord = require("../../RawRecord");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function resolveConflict(local, remote) {
  // We SHOULD NOT have a reference to a `deleted` record, but since it was locally
  // deleted, there's nothing to update, since the local deletion will still be pushed to the server -- return raw as is
  if ('deleted' === local._status) {
    return local;
  } // mutating code - performance-critical path


  var resolved = _objectSpread({}, local, {}, remote, {
    id: local.id,
    _status: local._status,
    _changed: local._changed
  }); // Use local properties where changed


  local._changed.split(',').forEach(function (column) {
    resolved[column] = local[column];
  }); // Handle edge case


  if ('created' === local._status) {
    (0, _common.logError)("[Sync] Server wants client to update record ".concat(local.id, ", but it's marked as locally created. This is most likely either a server error or a Watermelon bug (please file an issue if it is!). Will assume it should have been 'synced', and just replace the raw"));
    resolved._status = 'synced';
  }

  return resolved;
}

function replaceRaw(record, dirtyRaw) {
  record._raw = (0, _RawRecord.sanitizedRaw)(dirtyRaw, record.collection.schema);
}

function prepareCreateFromRaw(collection, dirtyRaw) {
  var raw = Object.assign({}, dirtyRaw, {
    _status: 'synced',
    _changed: ''
  }); // faster than object spread

  return collection.prepareCreateFromDirtyRaw(raw);
}

function prepareUpdateFromRaw(record, updatedDirtyRaw, log) {
  // Note COPY for log - only if needed
  var logConflict = log && !!record._raw._changed;
  var logLocal = logConflict ? _objectSpread({}, record._raw) : {};
  var logRemote = logConflict ? _objectSpread({}, updatedDirtyRaw) : {};
  var newRaw = resolveConflict(record._raw, updatedDirtyRaw);
  return record.prepareUpdate(function () {
    replaceRaw(record, newRaw); // log resolved conflict - if any

    if (logConflict && log) {
      log.resolvedConflicts = log.resolvedConflicts || [];
      log.resolvedConflicts.push({
        local: logLocal,
        remote: logRemote,
        resolved: _objectSpread({}, record._raw)
      });
    }
  });
}

function prepareMarkAsSynced(record) {
  var newRaw = Object.assign({}, record._raw, {
    _status: 'synced',
    _changed: ''
  }); // faster than object spread

  return record.prepareUpdate(function () {
    replaceRaw(record, newRaw);
  });
}

function ensureActionsEnabled(database) {
  (0, _common.invariant)(database._actionsEnabled, '[Sync] To use Sync, Actions must be enabled. Pass `{ actionsEnabled: true }` to Database constructor — see docs for more details');
}

function ensureSameDatabase(database, initialResetCount) {
  (0, _common.invariant)(database._resetCount === initialResetCount, "[Sync] Sync aborted because database was reset");
}

var isChangeSetEmpty = (0, _rambdax.pipe)(_rambdax.values, (0, _rambdax.all)(function ({
  created: created,
  updated: updated,
  deleted: deleted
}) {
  return 0 === created.length + updated.length + deleted.length;
}));
exports.isChangeSetEmpty = isChangeSetEmpty;