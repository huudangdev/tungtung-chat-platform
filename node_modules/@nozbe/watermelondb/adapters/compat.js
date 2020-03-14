"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Result = require("../utils/fp/Result");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DatabaseAdapterCompat =
/*#__PURE__*/
function () {
  function DatabaseAdapterCompat(adapter) {
    this.underlyingAdapter = adapter;
    var sqlAdapter = adapter;

    if (sqlAdapter.unsafeSqlQuery) {
      this.unsafeSqlQuery = function (tableName, sql) {
        return (0, _Result.toPromise)(function (callback) {
          return sqlAdapter.unsafeSqlQuery(tableName, sql, callback);
        });
      };
    }
  }

  var _proto = DatabaseAdapterCompat.prototype;

  _proto.find = function find(table, id) {
    var _this = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this.underlyingAdapter.find(table, id, callback);
    });
  };

  _proto.query = function query(_query) {
    var _this2 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this2.underlyingAdapter.query(_query, callback);
    });
  };

  _proto.count = function count(query) {
    var _this3 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this3.underlyingAdapter.count(query, callback);
    });
  };

  _proto.batch = function batch(operations) {
    var _this4 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this4.underlyingAdapter.batch(operations, callback);
    });
  };

  _proto.getDeletedRecords = function getDeletedRecords(tableName) {
    var _this5 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this5.underlyingAdapter.getDeletedRecords(tableName, callback);
    });
  };

  _proto.destroyDeletedRecords = function destroyDeletedRecords(tableName, recordIds) {
    var _this6 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this6.underlyingAdapter.destroyDeletedRecords(tableName, recordIds, callback);
    });
  };

  _proto.unsafeResetDatabase = function unsafeResetDatabase() {
    var _this7 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this7.underlyingAdapter.unsafeResetDatabase(callback);
    });
  };

  _proto.getLocal = function getLocal(key) {
    var _this8 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this8.underlyingAdapter.getLocal(key, callback);
    });
  };

  _proto.setLocal = function setLocal(key, value) {
    var _this9 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this9.underlyingAdapter.setLocal(key, value, callback);
    });
  };

  _proto.removeLocal = function removeLocal(key) {
    var _this10 = this;

    return (0, _Result.toPromise)(function (callback) {
      return _this10.underlyingAdapter.removeLocal(key, callback);
    });
  };

  // untyped - test-only code
  _proto.testClone = function testClone(options) {
    // $FlowFixMe
    return new DatabaseAdapterCompat(this.underlyingAdapter.testClone(options));
  };

  _createClass(DatabaseAdapterCompat, [{
    key: "schema",
    get: function get() {
      return this.underlyingAdapter.schema;
    }
  }, {
    key: "migrations",
    get: function get() {
      return this.underlyingAdapter.migrations;
    }
  }]);

  return DatabaseAdapterCompat;
}();

exports.default = DatabaseAdapterCompat;