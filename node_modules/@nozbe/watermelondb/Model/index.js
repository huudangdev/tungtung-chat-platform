"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.associations = associations;
exports.default = void 0;

var _BehaviorSubject = require("rxjs/BehaviorSubject");

var _invariant = _interopRequireDefault(require("../utils/common/invariant"));

var _ensureSync = _interopRequireDefault(require("../utils/common/ensureSync"));

var _fromPairs = _interopRequireDefault(require("../utils/fp/fromPairs"));

var _noop = _interopRequireDefault(require("../utils/fp/noop"));

var _Schema = require("../Schema");

var _RawRecord = require("../RawRecord");

var _helpers = require("../sync/helpers");

var _helpers2 = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function associations(...associationList) {
  return (0, _fromPairs.default)(associationList);
}

var Model =
/*#__PURE__*/
function () {
  var _proto = Model.prototype;

  // Set this in concrete Models to the name of the database table
  // Set this in concrete Models to define relationships between different records
  // `false` when instantiated but not yet in the database
  // `true` when prepareUpdate was called, but not yet sent to be executed
  // turns to `false` the moment the update is sent to be executed, even if database
  // did not respond yet
  _proto._getChanges = function _getChanges() {
    if (!this.__changes) {
      // initializing lazily - it has non-trivial perf impact on very large collections
      this.__changes = new _BehaviorSubject.BehaviorSubject(this);
    }

    return this.__changes;
  };

  // Modifies the model (using passed function) and saves it to the database.
  // Touches `updatedAt` if available.
  //
  // Example:
  // someTask.update(task => {
  //   task.name = 'New name'
  // })
  _proto.update = function update(recordUpdater = _noop.default) {
    return new Promise(function ($return, $error) {
      this.collection.database._ensureInAction("Model.update() can only be called from inside of an Action. See docs for more details.");

      this.prepareUpdate(recordUpdater);
      return Promise.resolve(this.collection.database.batch(this)).then(function () {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    }.bind(this));
  } // Prepares an update to the database (using passed function).
  // Touches `updatedAt` if available.
  //
  // After preparing an update, you must execute it synchronously using
  // database.batch()
  ;

  _proto.prepareUpdate = function prepareUpdate(recordUpdater = _noop.default) {
    var _this = this;

    (0, _invariant.default)(this._isCommitted, "Cannot update uncommitted record");
    (0, _invariant.default)(!this._hasPendingUpdate, "Cannot update a record with pending updates");
    this._isEditing = true; // Touch updatedAt (if available)

    if ((0, _helpers2.hasUpdatedAt)(this)) {
      this._setRaw((0, _Schema.columnName)('updated_at'), Date.now());
    } // Perform updates


    (0, _ensureSync.default)(recordUpdater(this));
    this._isEditing = false;
    this._hasPendingUpdate = true; // TODO: `process.nextTick` doesn't work on React Native
    // We could polyfill with setImmediate, but it doesn't have the same effect — test and enseure
    // it would actually work for this purpose

    if ('production' !== process.env.NODE_ENV && process && process.nextTick) {
      process.nextTick(function () {
        (0, _invariant.default)(!_this._hasPendingUpdate, "record.prepareUpdate was called on ".concat(_this.table, "#").concat(_this.id, " but wasn't sent to batch() synchronously -- this is bad!"));
      });
    }

    return this;
  };

  _proto.prepareMarkAsDeleted = function prepareMarkAsDeleted() {
    (0, _invariant.default)(this._isCommitted, "Cannot mark an uncomitted record as deleted");
    (0, _invariant.default)(!this._hasPendingUpdate, "Cannot mark an updated record as deleted");
    this._isEditing = true;
    this._raw._status = 'deleted';
    this._hasPendingDelete = 'mark';
    this._isEditing = false;
    return this;
  };

  _proto.prepareDestroyPermanently = function prepareDestroyPermanently() {
    (0, _invariant.default)(this._isCommitted, "Cannot mark an uncomitted record as deleted");
    (0, _invariant.default)(!this._hasPendingUpdate, "Cannot mark an updated record as deleted");
    this._isEditing = true;
    this._raw._status = 'deleted';
    this._hasPendingDelete = 'destroy';
    this._isEditing = false;
    return this;
  } // Marks this record as deleted (will be permanently deleted after sync)
  // Note: Use this only with Sync
  ;

  _proto.markAsDeleted = function markAsDeleted() {
    return new Promise(function ($return, $error) {
      this.collection.database._ensureInAction("Model.markAsDeleted() can only be called from inside of an Action. See docs for more details.");

      return Promise.resolve(this.collection.database.batch(this.prepareMarkAsDeleted())).then(function () {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    }.bind(this));
  } // Pernamently removes this record from the database
  // Note: Don't use this when using Sync
  ;

  _proto.destroyPermanently = function destroyPermanently() {
    return new Promise(function ($return, $error) {
      this.collection.database._ensureInAction("Model.destroyPermanently() can only be called from inside of an Action. See docs for more details.");

      return Promise.resolve(this.collection.database.batch(this.prepareDestroyPermanently())).then(function () {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    }.bind(this));
  };

  _proto.experimentalMarkAsDeleted = function experimentalMarkAsDeleted() {
    return new Promise(function ($return, $error) {
      var _this$collection$data, children;

      this.collection.database._ensureInAction("Model.experimental_markAsDeleted() can only be called from inside of an Action. See docs for more details.");

      return Promise.resolve((0, _helpers2.fetchChildren)(this)).then(function ($await_4) {
        try {
          children = $await_4;
          children.forEach(function (model) {
            return model.prepareMarkAsDeleted();
          });
          return Promise.resolve((_this$collection$data = this.collection.database).batch.apply(_this$collection$data, _toConsumableArray(children).concat([this.prepareMarkAsDeleted()]))).then(function () {
            try {
              return $return();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  };

  _proto.experimentalDestroyPermanently = function experimentalDestroyPermanently() {
    return new Promise(function ($return, $error) {
      var _this$collection$data2, children;

      this.collection.database._ensureInAction("Model.experimental_destroyPermanently() can only be called from inside of an Action. See docs for more details.");

      return Promise.resolve((0, _helpers2.fetchChildren)(this)).then(function ($await_6) {
        try {
          children = $await_6;
          children.forEach(function (model) {
            return model.prepareDestroyPermanently();
          });
          return Promise.resolve((_this$collection$data2 = this.collection.database).batch.apply(_this$collection$data2, _toConsumableArray(children).concat([this.prepareDestroyPermanently()]))).then(function () {
            try {
              return $return();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }, $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  } // *** Observing changes ***
  // Returns an observable that emits `this` upon subscription and every time this record changes
  // Emits `complete` if this record is destroyed
  ;

  _proto.observe = function observe() {
    (0, _invariant.default)(this._isCommitted, "Cannot observe uncommitted record");
    return this._getChanges();
  } // *** Implementation details ***
  ;

  // See: Database.batch()
  // To be used by Model subclass methods only
  _proto.batch = function batch(...records) {
    var _this$collection$data3;

    return (_this$collection$data3 = this.collection.database).batch.apply(_this$collection$data3, records);
  } // TODO: Document me
  // To be used by Model subclass methods only
  ;

  _proto.subAction = function subAction(action) {
    return this.collection.database._actionQueue.subAction(action);
  };

  _createClass(Model, [{
    key: "id",
    get: function get() {
      return this._raw.id;
    }
  }, {
    key: "syncStatus",
    get: function get() {
      return this._raw._status;
    }
  }, {
    key: "collections",
    // Collections of other Models in the same domain as this record
    get: function get() {
      return this.database.collections;
    }
  }, {
    key: "database",
    get: function get() {
      return this.collection.database;
    }
  }, {
    key: "asModel",
    get: function get() {
      return this;
    }
  }, {
    key: "table",
    get: function get() {
      return this.constructor.table;
    } // Don't use this directly! Use `collection.create()`

  }]);

  function Model(collection, raw) {
    this._isEditing = false;
    this._isCommitted = true;
    this._hasPendingUpdate = false;
    this._hasPendingDelete = false;
    this.__changes = null;
    this._subscribers = [];
    this.collection = collection;
    this._raw = raw;
  }

  Model._prepareCreate = function _prepareCreate(collection, recordBuilder) {
    var record = new this(collection, // sanitizedRaw sets id
    (0, _RawRecord.sanitizedRaw)((0, _helpers2.createTimestampsFor)(this.prototype), collection.schema));
    record._isCommitted = false;
    record._isEditing = true;
    (0, _ensureSync.default)(recordBuilder(record));
    record._isEditing = false;
    return record;
  };

  Model._prepareCreateFromDirtyRaw = function _prepareCreateFromDirtyRaw(collection, dirtyRaw) {
    var record = new this(collection, (0, _RawRecord.sanitizedRaw)(dirtyRaw, collection.schema));
    record._isCommitted = false;
    return record;
  };

  _proto.experimentalSubscribe = function experimentalSubscribe(subscriber) {
    var _this2 = this;

    this._subscribers.push(subscriber);

    return function () {
      var idx = _this2._subscribers.indexOf(subscriber);

      -1 !== idx && _this2._subscribers.splice(idx, 1);
    };
  };

  _proto._notifyChanged = function _notifyChanged() {
    this._getChanges().next(this);

    this._subscribers.forEach(function (subscriber) {
      subscriber(false);
    });
  };

  _proto._notifyDestroyed = function _notifyDestroyed() {
    this._getChanges().complete();

    this._subscribers.forEach(function (subscriber) {
      subscriber(true);
    });
  };

  _proto._getRaw = function _getRaw(rawFieldName) {
    return this._raw[rawFieldName];
  };

  _proto._setRaw = function _setRaw(rawFieldName, rawValue) {
    (0, _invariant.default)(this._isEditing, 'Not allowed to change record outside of create/update()');
    (0, _invariant.default)(!this._getChanges().isStopped && 'deleted' !== this._raw._status, 'Not allowed to change deleted records');
    var valueBefore = this._raw[rawFieldName];
    (0, _RawRecord.setRawSanitized)(this._raw, rawFieldName, rawValue, this.collection.schema.columns[rawFieldName]);

    if (valueBefore !== this._raw[rawFieldName]) {
      (0, _helpers.setRawColumnChange)(this._raw, rawFieldName);
    }
  } // Please don't use this unless you really understand how Watermelon Sync works, and thought long and
  // hard about risks of inconsistency after sync
  ;

  _proto._dangerouslySetRawWithoutMarkingColumnChange = function _dangerouslySetRawWithoutMarkingColumnChange(rawFieldName, rawValue) {
    (0, _invariant.default)(this._isEditing, 'Not allowed to change record outside of create/update()');
    (0, _invariant.default)(!this._getChanges().isStopped && 'deleted' !== this._raw._status, 'Not allowed to change deleted records');
    (0, _RawRecord.setRawSanitized)(this._raw, rawFieldName, rawValue, this.collection.schema.columns[rawFieldName]);
  };

  return Model;
}();

exports.default = Model;
Model.associations = {};