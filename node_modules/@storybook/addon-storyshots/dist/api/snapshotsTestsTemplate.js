"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _global = require("global");

var _jestSpecificSnapshot = require("jest-specific-snapshot");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function snapshotTest({
  item,
  asyncJest,
  framework,
  testMethod,
  testMethodParams
}) {
  const {
    name
  } = item;

  const context = _objectSpread({}, item, {
    framework
  });

  if (asyncJest === true) {
    (0, _global.it)(name, done => testMethod(_objectSpread({
      done,
      story: item,
      context
    }, testMethodParams)));
  } else {
    (0, _global.it)(name, () => testMethod(_objectSpread({
      story: item,
      context
    }, testMethodParams)));
  }
}

function snapshotTestSuite(_ref) {
  let {
    item,
    suite
  } = _ref,
      restParams = _objectWithoutProperties(_ref, ["item", "suite"]);

  const {
    kind,
    children
  } = item; // eslint-disable-next-line jest/valid-describe

  (0, _global.describe)(suite, () => {
    // eslint-disable-next-line jest/valid-describe
    (0, _global.describe)(kind, () => {
      children.forEach(c => {
        snapshotTest(_objectSpread({
          item: c
        }, restParams));
      });
    });
  });
}

function snapshotsTests(_ref2) {
  let {
    data,
    snapshotSerializers
  } = _ref2,
      restParams = _objectWithoutProperties(_ref2, ["data", "snapshotSerializers"]);

  if (snapshotSerializers) {
    snapshotSerializers.forEach(serializer => {
      (0, _jestSpecificSnapshot.addSerializer)(serializer);
      expect.addSnapshotSerializer(serializer);
    });
  }

  data.forEach(item => {
    snapshotTestSuite(_objectSpread({
      item
    }, restParams));
  });
}

var _default = snapshotsTests;
exports.default = _default;