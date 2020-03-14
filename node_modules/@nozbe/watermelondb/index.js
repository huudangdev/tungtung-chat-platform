"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Collection", {
  enumerable: true,
  get: function get() {
    return _Collection.default;
  }
});
Object.defineProperty(exports, "Database", {
  enumerable: true,
  get: function get() {
    return _Database.default;
  }
});
Object.defineProperty(exports, "CollectionMap", {
  enumerable: true,
  get: function get() {
    return _CollectionMap.default;
  }
});
Object.defineProperty(exports, "Relation", {
  enumerable: true,
  get: function get() {
    return _Relation.default;
  }
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _Model.default;
  }
});
Object.defineProperty(exports, "associations", {
  enumerable: true,
  get: function get() {
    return _Model.associations;
  }
});
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function get() {
    return _Query.default;
  }
});
Object.defineProperty(exports, "tableName", {
  enumerable: true,
  get: function get() {
    return _Schema.tableName;
  }
});
Object.defineProperty(exports, "columnName", {
  enumerable: true,
  get: function get() {
    return _Schema.columnName;
  }
});
Object.defineProperty(exports, "appSchema", {
  enumerable: true,
  get: function get() {
    return _Schema.appSchema;
  }
});
Object.defineProperty(exports, "tableSchema", {
  enumerable: true,
  get: function get() {
    return _Schema.tableSchema;
  }
});
exports.Q = void 0;

var Q = _interopRequireWildcard(require("./QueryDescription"));

exports.Q = Q;

var _Collection = _interopRequireDefault(require("./Collection"));

var _Database = _interopRequireDefault(require("./Database"));

var _CollectionMap = _interopRequireDefault(require("./Database/CollectionMap"));

var _Relation = _interopRequireDefault(require("./Relation"));

var _Model = _interopRequireWildcard(require("./Model"));

var _Query = _interopRequireDefault(require("./Query"));

var _Schema = require("./Schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if ("function" !== typeof WeakMap) return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (null != obj) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }