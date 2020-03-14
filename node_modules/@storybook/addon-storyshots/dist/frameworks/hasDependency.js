"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasDependency;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _readPkgUp = _interopRequireDefault(require("read-pkg-up"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  package: {
    dependencies,
    devDependencies
  } = {}
} = _readPkgUp.default.sync() || {};

function hasDependency(name) {
  return devDependencies && devDependencies[name] || dependencies && dependencies[name] || _fs.default.existsSync(_path.default.join('node_modules', name, 'package.json'));
}