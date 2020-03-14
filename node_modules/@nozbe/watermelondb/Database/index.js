"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _merge = require("rxjs/observable/merge");

var _operators = require("rxjs/operators");

var _rambdax = require("rambdax");

var _common = require("../utils/common");

var _fp = require("../utils/fp");

var _compat = _interopRequireDefault(require("../adapters/compat"));

var _common2 = require("../Collection/common");

var _CollectionMap = _interopRequireDefault(require("./CollectionMap"));

var _ActionQueue = _interopRequireDefault(require("./ActionQueue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Database =
/*#__PURE__*/
function () {
  function Database({
    adapter: adapter,
    modelClasses: modelClasses,
    actionsEnabled: actionsEnabled
  }) {
    this._actionQueue = new _ActionQueue.default();
    this._subscribers = [];
    this._resetCount = 0;

    if ('production' !== process.env.NODE_ENV) {
      (0, _common.invariant)(adapter, "Missing adapter parameter for new Database()");
      (0, _common.invariant)(modelClasses && Array.isArray(modelClasses), "Missing modelClasses parameter for new Database()");
      (0, _common.invariant)(true === actionsEnabled || false === actionsEnabled, 'You must pass `actionsEnabled:` key to Database constructor. It is highly recommended you pass `actionsEnabled: true` (see documentation for more details), but can pass `actionsEnabled: false` for backwards compatibility.');
    }

    this.adapter = new _compat.default(adapter);
    this.schema = adapter.schema;
    this.collections = new _CollectionMap.default(this, modelClasses);
    this._actionsEnabled = actionsEnabled;
  } // Executes multiple prepared operations
  // (made with `collection.prepareCreate` and `record.prepareUpdate`)
  // Note: falsy values (null, undefined, false) passed to batch are just ignored


  var _proto = Database.prototype;

  _proto.batch = function batch(...records) {
    return new Promise(function ($return, $error) {
      var _this, batchOperations, changeNotifications, affectedTables;

      _this = this;

      this._ensureInAction("Database.batch() can only be called from inside of an Action. See docs for more details."); // performance critical - using mutations


      batchOperations = [];
      changeNotifications = {};
      records.forEach(function (record) {
        if (!record) {
          return;
        }

        (0, _common.invariant)(!record._isCommitted || record._hasPendingUpdate || record._hasPendingDelete, "Cannot batch a record that doesn't have a prepared create or prepared update");
        var raw = record._raw;
        var {
          id: id
        } = raw; // faster than Model.id

        var {
          table: table
        } = record.constructor; // faster than Model.table

        var changeType; // Deletes take presedence over updates

        if (record._hasPendingDelete) {
          if ('destroy' === record._hasPendingDelete) {
            batchOperations.push(['destroyPermanently', table, id]);
          } else {
            batchOperations.push(['markAsDeleted', table, id]);
          }

          changeType = _common2.CollectionChangeTypes.destroyed;
        } else if (record._hasPendingUpdate) {
          record._hasPendingUpdate = false; // TODO: What if this fails?

          batchOperations.push(['update', table, raw]);
          changeType = _common2.CollectionChangeTypes.updated;
        } else {
          batchOperations.push(['create', table, raw]);
          changeType = _common2.CollectionChangeTypes.created;
        }

        if (!changeNotifications[table]) {
          changeNotifications[table] = [];
        }

        changeNotifications[table].push({
          record: record,
          type: changeType
        });
      });
      return Promise.resolve(this.adapter.batch(batchOperations)).then(function () {
        try {
          // NOTE: We must make two passes to ensure all changes to caches are applied before subscribers are called
          Object.entries(changeNotifications).forEach(function (notification) {
            var [table, changeSet] = notification;

            _this.collections.get(table)._applyChangesToCache(changeSet);
          });
          Object.entries(changeNotifications).forEach(function (notification) {
            var [table, changeSet] = notification;

            _this.collections.get(table)._notify(changeSet);
          });
          affectedTables = Object.keys(changeNotifications);

          this._subscribers.forEach(function ([tables, subscriber]) {
            if (tables.some(function (table) {
              return affectedTables.includes(table);
            })) {
              subscriber();
            }
          });

          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  } // Enqueues an Action -- a block of code that, when its ran, has a guarantee that no other Action
  // is running at the same time.
  // If Database is instantiated with actions enabled, all write actions (create, update, delete)
  // must be performed inside Actions, so Actions guarantee a write lock.
  //
  // See docs for more details and practical guide
  ;

  _proto.action = function action(work, description) {
    return this._actionQueue.enqueue(work, description);
  } // Emits a signal immediately, and on change in any of the passed tables
  ;

  _proto.withChangesForTables = function withChangesForTables(tables) {
    var _this2 = this;

    var changesSignals = tables.map(function (table) {
      return _this2.collections.get(table).changes;
    });
    return _merge.merge.apply(void 0, _toConsumableArray(changesSignals)).pipe((0, _operators.startWith)(null));
  };

  // Notifies `subscriber` on change in any of passed tables (only a signal, no change set)
  _proto.experimentalSubscribe = function experimentalSubscribe(tables, subscriber) {
    var _this3 = this;

    if (!tables.length) {
      return _fp.noop;
    }

    var subscriberEntry = [tables, subscriber];

    this._subscribers.push(subscriberEntry);

    return function () {
      var idx = _this3._subscribers.indexOf(subscriberEntry);

      -1 !== idx && _this3._subscribers.splice(idx, 1);
    };
  };

  // Resets database - permanently destroys ALL records stored in the database, and sets up empty database
  //
  // NOTE: This is not 100% safe automatically and you must take some precautions to avoid bugs:
  // - You must NOT hold onto any Database objects. DO NOT store or cache any records, collections, anything
  // - You must NOT observe any record or collection or query
  // - You SHOULD NOT have any pending (queued) Actions. Pending actions will be aborted (will reject with an error).
  //
  // It's best to reset your app to an empty / logged out state before doing this.
  //
  // Yes, this sucks and there should be some safety mechanisms or warnings. Please contribute!
  _proto.unsafeResetDatabase = function unsafeResetDatabase() {
    return new Promise(function ($return, $error) {
      this._ensureInAction("Database.unsafeResetDatabase() can only be called from inside of an Action. See docs for more details."); // Doing this in very specific order:
      // First kill actions, to ensure no more traffic to adapter happens
      // then clear the database
      // and only then clear caches, since might have had queued fetches from DB still bringing in items to cache


      this._actionQueue._abortPendingActions();

      return Promise.resolve(this.adapter.unsafeResetDatabase()).then(function () {
        try {
          this._unsafeClearCaches();

          this._resetCount += 1;
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  };

  _proto._unsafeClearCaches = function _unsafeClearCaches() {
    (0, _rambdax.values)(this.collections.map).forEach(function (collection) {
      collection.unsafeClearCache();
    });
  };

  _proto._ensureInAction = function _ensureInAction(error) {
    this._actionsEnabled && (0, _common.invariant)(this._actionQueue.isRunning, error);
  };

  return Database;
}();

exports.default = Database;