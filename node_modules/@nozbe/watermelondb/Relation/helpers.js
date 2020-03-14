"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createObservable = void 0;

var _of = require("rxjs/observable/of");

var _operators = require("rxjs/operators");

var getImmutableObservable = function (relation) {
  return relation._model.collections.get(relation._relationTableName) // $FlowFixMe
  .findAndObserve(relation.id);
};

var getObservable = function (relation) {
  return relation._model.observe() // $FlowFixMe
  .pipe((0, _operators.map)(function (model) {
    return model._getRaw(relation._columnName);
  }), (0, _operators.distinctUntilChanged)(), (0, _operators.switchMap)(function (id) {
    return id ? relation._model.collections.get(relation._relationTableName).findAndObserve(id) : (0, _of.of)(null);
  }));
}; // eslint-disable-next-line


var createObservable = function (relation) {
  return relation._isImmutable ? getImmutableObservable(relation) : getObservable(relation);
};

exports.createObservable = createObservable;