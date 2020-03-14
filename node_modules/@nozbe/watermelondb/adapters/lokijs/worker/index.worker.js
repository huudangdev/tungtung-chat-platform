"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lokiWorker = _interopRequireDefault(require("./lokiWorker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-restricted-globals */

/* eslint-disable global-require */
// In a web browser, Webpack will spin up a web worker and run this code there, while the importing
// module will see a Worker class.
// But Jest will actually import this file and has to provide a Worker interface, so we export a mock
var getDefaultExport = function () {
  if ('test' === process.env.NODE_ENV) {
    var workerMock = require('./workerMock').default;

    return workerMock;
  }

  self.workerClass = new _lokiWorker.default(self);
  return self;
};

var _default = getDefaultExport();

exports.default = _default;