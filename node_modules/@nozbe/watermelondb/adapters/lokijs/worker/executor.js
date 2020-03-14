"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lokijs = _interopRequireWildcard(require("lokijs"));

var _rambdax = require("rambdax");

var _common = require("../../../utils/common");

var _helpers = require("../../../Schema/migrations/helpers");

var _RawRecord = require("../../../RawRecord");

var _lokiExtensions = require("./lokiExtensions");

var _executeQuery = _interopRequireDefault(require("./executeQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if ("function" !== typeof WeakMap) return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (null != obj) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SCHEMA_VERSION_KEY = '_loki_schema_version';

var LokiExecutor =
/*#__PURE__*/
function () {
  function LokiExecutor(options) {
    this.cachedRecords = new Map();
    var {
      dbName: dbName,
      schema: schema,
      migrations: migrations,
      _testLokiAdapter: _testLokiAdapter
    } = options;
    this.dbName = dbName;
    this.schema = schema;
    this.migrations = migrations;
    this.useIncrementalIndexedDB = options.useIncrementalIndexedDB || false;
    this.onIndexedDBVersionChange = options.onIndexedDBVersionChange;
    this.onQuotaExceededError = options.onQuotaExceededError;
    this._testLokiAdapter = _testLokiAdapter;
  }

  var _proto = LokiExecutor.prototype;

  _proto.setUp = function setUp() {
    return new Promise(function ($return, $error) {
      return Promise.resolve(this._openDatabase()).then(function () {
        try {
          return Promise.resolve(this._migrateIfNeeded()).then(function () {
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

  _proto.isCached = function isCached(table, id) {
    var cachedSet = this.cachedRecords.get(table);
    return cachedSet ? cachedSet.has(id) : false;
  };

  _proto.markAsCached = function markAsCached(table, id) {
    var cachedSet = this.cachedRecords.get(table);

    if (cachedSet) {
      cachedSet.add(id);
    } else {
      this.cachedRecords.set(table, new Set([id]));
    }
  };

  _proto.removeFromCache = function removeFromCache(table, id) {
    var cachedSet = this.cachedRecords.get(table);

    if (cachedSet) {
      cachedSet.delete(id);
    }
  };

  _proto.find = function find(table, id) {
    if (this.isCached(table, id)) {
      return id;
    }

    var raw = this.loki.getCollection(table).by('id', id);

    if (!raw) {
      return null;
    }

    this.markAsCached(table, id);
    return (0, _RawRecord.sanitizedRaw)(raw, this.schema.tables[table]);
  };

  _proto.query = function query(_query) {
    var records = (0, _executeQuery.default)(_query, this.loki).data();
    return this._compactQueryResults(records, _query.table);
  };

  _proto.count = function count(query) {
    return (0, _executeQuery.default)(query, this.loki).count();
  };

  _proto.update = function update(table, rawRecord) {
    var collection = this.loki.getCollection(table); // Loki identifies records using internal $loki ID so we must find the saved record first

    var lokiId = collection.by('id', rawRecord.id).$loki;
    var raw = rawRecord;
    raw.$loki = lokiId;
    collection.update(raw);
  };

  _proto.destroyPermanently = function destroyPermanently(table, id) {
    var collection = this.loki.getCollection(table);
    var record = collection.by('id', id);
    collection.remove(record);
    this.removeFromCache(table, id);
  };

  _proto.markAsDeleted = function markAsDeleted(table, id) {
    var collection = this.loki.getCollection(table);
    var record = collection.by('id', id);

    if (record) {
      record._status = 'deleted';
      collection.update(record);
      this.removeFromCache(table, id);
    }
  };

  _proto.batch = function batch(operations) {
    var _this = this;

    // TODO: Only add to cached records if all is successful
    // TODO: Transactionality
    var recordsToCreate = {};
    operations.forEach(function (operation) {
      var [type, table, raw] = operation;

      switch (type) {
        case 'create':
          if (!recordsToCreate[table]) {
            recordsToCreate[table] = [];
          }

          recordsToCreate[table].push(raw);
          break;

        default:
          break;
      }
    }); // We're doing a second pass, because batch insert is much faster in Loki

    Object.entries(recordsToCreate).forEach(function (args) {
      var [table, raws] = args;
      var shouldRebuildIndexAfterIndex = 1000 <= raws.length; // only profitable for large inserts

      _this.loki.getCollection(table).insert(raws, shouldRebuildIndexAfterIndex);

      raws.forEach(function (raw) {
        _this.markAsCached(table, raw.id);
      });
    });
    operations.forEach(function (operation) {
      var [type, table, rawOrId] = operation;

      switch (type) {
        case 'update':
          _this.update(table, rawOrId);

          break;

        case 'markAsDeleted':
          _this.markAsDeleted(table, rawOrId);

          break;

        case 'destroyPermanently':
          _this.destroyPermanently(table, rawOrId);

          break;

        default:
          break;
      }
    });
  };

  _proto.getDeletedRecords = function getDeletedRecords(table) {
    return this.loki.getCollection(table).find({
      _status: {
        $eq: 'deleted'
      }
    }).map((0, _rambdax.prop)('id'));
  };

  _proto.destroyDeletedRecords = function destroyDeletedRecords(table, records) {
    var collection = this.loki.getCollection(table);
    (0, _rambdax.forEach)(function (recordId) {
      var record = collection.by('id', recordId);
      record && collection.remove(record);
    }, records);
  };

  _proto.unsafeResetDatabase = function unsafeResetDatabase() {
    return new Promise(function ($return, $error) {
      return Promise.resolve((0, _lokiExtensions.deleteDatabase)(this.loki)).then(function () {
        try {
          this.cachedRecords.clear();

          _common.logger.log('[WatermelonDB][Loki] Database is now reset');

          return Promise.resolve(this._openDatabase()).then(function () {
            try {
              this._setUpSchema();

              return $return();
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  } // *** LocalStorage ***
  ;

  _proto.getLocal = function getLocal(key) {
    var record = this._findLocal(key);

    return record ? record.value : null;
  };

  _proto.setLocal = function setLocal(key, value) {
    var record = this._findLocal(key);

    if (record) {
      record.value = value;

      this._localStorage.update(record);
    } else {
      this._localStorage.insert({
        key: key,
        value: value
      });
    }
  };

  _proto.removeLocal = function removeLocal(key) {
    var record = this._findLocal(key);

    if (record) {
      this._localStorage.remove(record);
    }
  } // *** Internals ***
  ;

  _proto._openDatabase = function _openDatabase() {
    return new Promise(function ($return, $error) {
      _common.logger.log('[WatermelonDB][Loki] Initializing IndexedDB');

      return Promise.resolve((0, _lokiExtensions.newLoki)(this.dbName, this._testLokiAdapter, this.useIncrementalIndexedDB, this.onIndexedDBVersionChange, this.onQuotaExceededError)).then(function ($await_10) {
        try {
          this.loki = $await_10;

          _common.logger.log('[WatermelonDB][Loki] Database loaded');

          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    }.bind(this));
  };

  _proto._setUpSchema = function _setUpSchema() {
    var _this2 = this;

    _common.logger.log('[WatermelonDB][Loki] Setting up schema'); // Add collections


    (0, _rambdax.values)(this.schema.tables).forEach(function (tableSchema) {
      _this2._addCollection(tableSchema);
    });
    this.loki.addCollection('local_storage', {
      unique: ['key'],
      indices: [],
      disableMeta: true
    }); // Set database version

    this._databaseVersion = this.schema.version;

    _common.logger.log('[WatermelonDB][Loki] Database collections set up');
  };

  _proto._addCollection = function _addCollection(tableSchema) {
    var {
      name: name,
      columns: columns
    } = tableSchema;
    var indexedColumns = (0, _rambdax.values)(columns).reduce(function (indexes, column) {
      return column.isIndexed ? indexes.concat([column.name]) : indexes;
    }, []);
    this.loki.addCollection(name, {
      unique: ['id'],
      indices: ['_status'].concat(_toConsumableArray(indexedColumns)),
      disableMeta: true
    });
  };

  _proto._migrateIfNeeded = function _migrateIfNeeded() {
    return new Promise(function ($return, $error) {
      var dbVersion, schemaVersion, migrationSteps;
      dbVersion = this._databaseVersion;
      schemaVersion = this.schema.version;

      if (dbVersion === schemaVersion) {// All good!

        return $If_2.call(this);
      } else {
        if (0 === dbVersion) {
          _common.logger.log('[WatermelonDB][Loki] Empty database, setting up');

          return Promise.resolve(this.unsafeResetDatabase()).then(function () {
            try {
              return $If_3.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        } else {
          if (0 < dbVersion && dbVersion < schemaVersion) {
            _common.logger.log('[WatermelonDB][Loki] Database has old schema version. Migration is required.');

            migrationSteps = this._getMigrationSteps(dbVersion);

            if (migrationSteps) {
              _common.logger.log("[WatermelonDB][Loki] Migrating from version ".concat(dbVersion, " to ").concat(this.schema.version, "..."));

              var $Try_1_Post = function () {
                try {
                  return $If_5.call(this);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }.bind(this);

              var $Try_1_Catch = function (error) {
                try {
                  _common.logger.error('[WatermelonDB][Loki] Migration failed', error);

                  throw error;
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              };

              try {
                return Promise.resolve(this._migrate(migrationSteps)).then(function () {
                  try {
                    return $Try_1_Post();
                  } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                  }
                }, $Try_1_Catch);
              } catch (error) {
                $Try_1_Catch(error)
              }
            } else {
              _common.logger.warn('[WatermelonDB][Loki] Migrations not available for this version range, resetting database instead');

              return Promise.resolve(this.unsafeResetDatabase()).then(function () {
                try {
                  return $If_5.call(this);
                } catch ($boundEx) {
                  return $error($boundEx);
                }
              }.bind(this), $error);
            }

            function $If_5() {
              return $If_4.call(this);
            }
          } else {
            _common.logger.warn('[WatermelonDB][Loki] Database has newer version than app schema. Resetting database.');

            return Promise.resolve(this.unsafeResetDatabase()).then(function () {
              try {
                return $If_4.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          }

          function $If_4() {
            return $If_3.call(this);
          }
        }

        function $If_3() {
          return $If_2.call(this);
        }
      }

      function $If_2() {
        return $return();
      }
    }.bind(this));
  };

  _proto._getMigrationSteps = function _getMigrationSteps(fromVersion) {
    // TODO: Remove this after migrations are shipped
    var {
      migrations: migrations
    } = this;

    if (!migrations) {
      return null;
    }

    return (0, _helpers.stepsForMigration)({
      migrations: migrations,
      fromVersion: fromVersion,
      toVersion: this.schema.version
    });
  };

  _proto._migrate = function _migrate(steps) {
    return new Promise(function ($return) {
      var _this3 = this;

      steps.forEach(function (step) {
        if ('create_table' === step.type) {
          _this3._executeCreateTableMigration(step);
        } else if ('add_columns' === step.type) {
          _this3._executeAddColumnsMigration(step);
        } else {
          throw new Error("Unsupported migration step ".concat(step.type));
        }
      }); // Set database version

      this._databaseVersion = this.schema.version;

      _common.logger.log("[WatermelonDB][Loki] Migration successful");

      return $return();
    }.bind(this));
  };

  _proto._executeCreateTableMigration = function _executeCreateTableMigration({
    schema: schema
  }) {
    this._addCollection(schema);
  };

  _proto._executeAddColumnsMigration = function _executeAddColumnsMigration({
    table: table,
    columns: columns
  }) {
    var collection = this.loki.getCollection(table); // update ALL records in the collection, adding new fields

    collection.findAndUpdate({}, function (record) {
      columns.forEach(function (column) {
        (0, _RawRecord.setRawSanitized)(record, column.name, null, column);
      });
    }); // add indexes, if needed

    columns.forEach(function (column) {
      if (column.isIndexed) {
        collection.ensureIndex(column.name);
      }
    });
  } // Maps records to their IDs if the record is already cached on JS side
  ;

  _proto._compactQueryResults = function _compactQueryResults(records, table) {
    var _this4 = this;

    return records.map(function (raw) {
      var {
        id: id
      } = raw;

      if (_this4.isCached(table, id)) {
        return id;
      }

      _this4.markAsCached(table, id);

      return (0, _RawRecord.sanitizedRaw)(raw, _this4.schema.tables[table]);
    });
  };

  _proto._findLocal = function _findLocal(key) {
    var localStorage = this._localStorage;
    return localStorage && localStorage.by('key', key);
  };

  _createClass(LokiExecutor, [{
    key: "_databaseVersion",
    get: function get() {
      var databaseVersionRaw = this.getLocal(SCHEMA_VERSION_KEY) || '';
      return parseInt(databaseVersionRaw, 10) || 0;
    },
    set: function set(version) {
      this.setLocal(SCHEMA_VERSION_KEY, "".concat(version));
    }
  }, {
    key: "_localStorage",
    get: function get() {
      return this.loki.getCollection('local_storage');
    }
  }]);

  return LokiExecutor;
}();

exports.default = LokiExecutor;