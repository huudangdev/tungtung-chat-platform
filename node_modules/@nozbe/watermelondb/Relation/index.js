"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lazy = _interopRequireDefault(require("../decorators/lazy"));

var _invariant = _interopRequireDefault(require("../utils/common/invariant"));

var _publishReplayLatestWhileConnected = _interopRequireDefault(require("../utils/rx/publishReplayLatestWhileConnected"));

var _helpers = require("./helpers");

var _class, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && void 0 !== desc.initializer) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (void 0 === desc.initializer) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper() { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

// Defines a one-to-one relation between two Models (two tables in db)
// Do not create this object directly! Use `relation` or `immutableRelation` decorators instead
var Relation = (_class = (_temp =
/*#__PURE__*/
function () {
  function Relation(model, relationTableName, columnName, options) {
    _initializerDefineProperty(this, "_cachedObservable", _descriptor, this);

    this._model = model;
    this._relationTableName = relationTableName;
    this._columnName = columnName;
    this._isImmutable = options.isImmutable;
  }

  var _proto = Relation.prototype;

  _proto.fetch = function fetch() {
    var {
      id: id
    } = this;

    if (id) {
      return this._model.collections.get(this._relationTableName).find(id);
    }

    return Promise.resolve(null);
  };

  _proto.set = function set(record) {
    this.id = null === record || void 0 === record ? void 0 : record.id;
  };

  _proto.observe = function observe() {
    return this._cachedObservable;
  };

  _createClass(Relation, [{
    key: "id",
    get: function get() {
      return this._model._getRaw(this._columnName);
    },
    set: function set(newId) {
      if (this._isImmutable) {
        (0, _invariant.default)(!this._model._isCommitted, "Cannot change property marked as @immutableRelation ".concat(Object.getPrototypeOf(this._model).constructor.name, " - ").concat(this._columnName));
      }

      this._model._setRaw(this._columnName, newId || null);
    }
  }]);

  return Relation;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_cachedObservable", [_lazy.default], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return (0, _helpers.createObservable)(this).pipe(_publishReplayLatestWhileConnected.default).refCount();
  }
})), _class);
exports.default = Relation;