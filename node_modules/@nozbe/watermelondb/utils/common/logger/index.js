"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-console */
var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    this.silent = false;
  }

  var _proto = Logger.prototype;

  _proto.log = function log(...messages) {
    var _console;

    this.silent || (_console = console).log.apply(_console, messages);
  };

  _proto.warn = function warn(...messages) {
    var _console2;

    this.silent || (_console2 = console).warn.apply(_console2, messages);
  };

  _proto.error = function error(...messages) {
    var _console3;

    this.silent || (_console3 = console).error.apply(_console3, messages);
  };

  _proto.silence = function silence() {
    this.silent = true;
  };

  return Logger;
}();

var _default = new Logger();

exports.default = _default;