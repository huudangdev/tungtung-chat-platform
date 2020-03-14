"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logError = _interopRequireDefault(require("../utils/common/logError"));

var _invariant = _interopRequireDefault(require("../utils/common/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordCache =
/*#__PURE__*/
function () {
  function RecordCache(tableName, recordInsantiator) {
    this.map = new Map();
    this.tableName = tableName;
    this.recordInsantiator = recordInsantiator;
  }

  var _proto = RecordCache.prototype;

  _proto.get = function get(id) {
    return this.map.get(id);
  };

  _proto.add = function add(record) {
    this.map.set(record.id, record);
  };

  _proto.delete = function _delete(record) {
    this.map.delete(record.id);
  };

  _proto.unsafeClear = function unsafeClear() {
    this.map = new Map();
  };

  _proto.recordsFromQueryResult = function recordsFromQueryResult(result) {
    var _this = this;

    return result.map(function (res) {
      return _this.recordFromQueryResult(res);
    });
  };

  _proto.recordFromQueryResult = function recordFromQueryResult(result) {
    if ('string' === typeof result) {
      return this._cachedModelForId(result);
    }

    return this._modelForRaw(result);
  };

  _proto._cachedModelForId = function _cachedModelForId(id) {
    var record = this.map.get(id);
    (0, _invariant.default)(record, "Record ID ".concat(this.tableName, "#").concat(id, " was sent over the bridge, but it's not cached"));
    return record;
  };

  _proto._modelForRaw = function _modelForRaw(raw) {
    // Sanity check: is this already cached?
    var cachedRecord = this.map.get(raw.id);

    if (cachedRecord) {
      (0, _logError.default)("Record ".concat(this.tableName, "#").concat(cachedRecord.id, " is cached, but full raw object was sent over the bridge"));
      return cachedRecord;
    } // Return new model


    var newRecord = this.recordInsantiator(raw);
    this.add(newRecord);
    return newRecord;
  };

  return RecordCache;
}();

exports.default = RecordCache;