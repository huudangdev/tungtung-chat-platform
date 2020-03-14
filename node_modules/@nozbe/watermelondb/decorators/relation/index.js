"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../common");

var _Relation = _interopRequireDefault(require("../../Relation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var relation = function (relationTable, relationIdColumn, options) {
  return function (target, key, descriptor) {
    (0, _common.ensureDecoratorUsedProperly)(relationIdColumn, target, key, descriptor);
    return {
      get: function get() {
        this._relationCache = this._relationCache || {};
        var cachedRelation = this._relationCache[key];

        if (cachedRelation) {
          return cachedRelation;
        }

        var newRelation = new _Relation.default(this.asModel, relationTable, relationIdColumn, options || {
          isImmutable: false
        });
        this._relationCache[key] = newRelation;
        return newRelation;
      },
      set: function set() {
        throw new Error("Don't set relation directly. Use relation.set() instead");
      }
    };
  };
};

var _default = relation;
exports.default = _default;