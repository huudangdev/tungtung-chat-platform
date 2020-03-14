"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Subject = require("rxjs/Subject");

var _defer = require("rxjs/observable/defer");

var _operators = require("rxjs/operators");

var _invariant = _interopRequireDefault(require("../utils/common/invariant"));

var _noop = _interopRequireDefault(require("../utils/fp/noop"));

var _Result = require("../utils/fp/Result");

var _Query = _interopRequireDefault(require("../Query"));

var _RecordCache = _interopRequireDefault(require("./RecordCache"));

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Collection =
/*#__PURE__*/
function () {
  // Emits event every time a record inside Collection changes or is deleted
  // (Use Query API to observe collection changes)
  function Collection(database, ModelClass) {
    var _this = this;

    this.changes = new _Subject.Subject();
    this._subscribers = [];
    this.database = database;
    this.modelClass = ModelClass;
    this._cache = new _RecordCache.default(ModelClass.table, function (raw) {
      return new ModelClass(_this, raw);
    });
  } // Finds a record with the given ID
  // Promise will reject if not found


  var _proto = Collection.prototype;

  _proto.find = function find(id) {
    return new Promise(function ($return) {
      var _this2 = this;

      (0, _invariant.default)(id, "Invalid record ID ".concat(this.table, "#").concat(id));

      var cachedRecord = this._cache.get(id);

      return $return(cachedRecord || (0, _Result.toPromise)(function (callback) {
        return _this2._fetchRecord(id, callback);
      }));
    }.bind(this));
  } // Finds the given record and starts observing it
  // (with the same semantics as when calling `model.observe()`)
  ;

  _proto.findAndObserve = function findAndObserve(id) {
    var _this3 = this;

    return (0, _defer.defer)(function () {
      return _this3.find(id);
    }).pipe((0, _operators.switchMap)(function (model) {
      return model.observe();
    }));
  } // Query records of this type
  ;

  _proto.query = function query(...conditions) {
    return new _Query.default(this, conditions);
  } // Creates a new record in this collection
  // Pass a function to set attributes of the record.
  //
  // Example:
  // collections.get(Tables.tasks).create(task => {
  //   task.name = 'Task name'
  // })
  ;

  _proto.create = function create(recordBuilder = _noop.default) {
    return new Promise(function ($return, $error) {
      var record;

      this.database._ensureInAction("Collection.create() can only be called from inside of an Action. See docs for more details.");

      record = this.prepareCreate(recordBuilder);
      return Promise.resolve(this.database.batch(record)).then(function () {
        try {
          return $return(record);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }, $error);
    }.bind(this));
  } // Prepares a new record in this collection
  // Use this to batch-create multiple records
  ;

  _proto.prepareCreate = function prepareCreate(recordBuilder = _noop.default) {
    return this.modelClass._prepareCreate(this, recordBuilder);
  } // Prepares a new record in this collection based on a raw object
  // e.g. `{ foo: 'bar' }`. Don't use this unless you know how RawRecords work in WatermelonDB
  // this is useful as a performance optimization or if you're implementing your own sync mechanism
  ;

  _proto.prepareCreateFromDirtyRaw = function prepareCreateFromDirtyRaw(dirtyRaw) {
    return this.modelClass._prepareCreateFromDirtyRaw(this, dirtyRaw);
  } // *** Implementation of Query APIs ***
  ;

  _proto.unsafeFetchRecordsWithSQL = function unsafeFetchRecordsWithSQL(sql) {
    return new Promise(function ($return, $error) {
      var adapter, rawRecords;
      ({
        adapter: adapter
      } = this.database);
      (0, _invariant.default)('function' === typeof adapter.unsafeSqlQuery, 'unsafeFetchRecordsWithSQL called on database that does not support SQL');
      return Promise.resolve(adapter.unsafeSqlQuery(this.modelClass.table, sql)).then(function ($await_2) {
        try {
          rawRecords = $await_2;
          return $return(this._cache.recordsFromQueryResult(rawRecords));
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  } // *** Implementation details ***
  ;

  // See: Query.fetch
  _proto._fetchQuery = function _fetchQuery(query, callback) {
    var _this4 = this;

    this.database.adapter.underlyingAdapter.query(query.serialize(), function (result) {
      return callback((0, _Result.mapValue)(function (rawRecords) {
        return _this4._cache.recordsFromQueryResult(rawRecords);
      }, result));
    });
  } // See: Query.fetchCount
  ;

  _proto._fetchCount = function _fetchCount(query, callback) {
    this.database.adapter.underlyingAdapter.count(query.serialize(), callback);
  } // Fetches exactly one record (See: Collection.find)
  ;

  _proto._fetchRecord = function _fetchRecord(id, callback) {
    var _this5 = this;

    this.database.adapter.underlyingAdapter.find(this.table, id, function (result) {
      return callback((0, _Result.mapValue)(function (rawRecord) {
        (0, _invariant.default)(rawRecord, "Record ".concat(_this5.table, "#").concat(id, " not found"));
        return _this5._cache.recordFromQueryResult(rawRecord);
      }, result));
    });
  };

  _proto._applyChangesToCache = function _applyChangesToCache(operations) {
    var _this6 = this;

    operations.forEach(function ({
      record: record,
      type: type
    }) {
      if (type === _common.CollectionChangeTypes.created) {
        record._isCommitted = true;

        _this6._cache.add(record);
      } else if (type === _common.CollectionChangeTypes.destroyed) {
        _this6._cache.delete(record);
      }
    });
  };

  _proto._notify = function _notify(operations) {
    this._subscribers.forEach(function (subscriber) {
      subscriber(operations);
    });

    this.changes.next(operations);
    operations.forEach(function ({
      record: record,
      type: type
    }) {
      if (type === _common.CollectionChangeTypes.updated) {
        record._notifyChanged();
      } else if (type === _common.CollectionChangeTypes.destroyed) {
        record._notifyDestroyed();
      }
    });
  };

  _proto.experimentalSubscribe = function experimentalSubscribe(subscriber) {
    var _this7 = this;

    this._subscribers.push(subscriber);

    return function () {
      var idx = _this7._subscribers.indexOf(subscriber);

      -1 !== idx && _this7._subscribers.splice(idx, 1);
    };
  } // See: Database.unsafeClearCaches
  ;

  _proto.unsafeClearCache = function unsafeClearCache() {
    this._cache.unsafeClear();
  };

  _createClass(Collection, [{
    key: "table",
    get: function get() {
      return this.modelClass.table;
    }
  }, {
    key: "schema",
    get: function get() {
      return this.database.schema.tables[this.table];
    }
  }]);

  return Collection;
}();

exports.default = Collection;