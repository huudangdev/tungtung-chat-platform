"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowCloneDeepObjects = shallowCloneDeepObjects;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _lokiWorker = _interopRequireDefault(require("./lokiWorker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// shallow-clones objects (without checking their contents), but copies arrays
function shallowCloneDeepObjects(value) {
  if (Array.isArray(value)) {
    var returned = new Array(value.length);

    for (var i = 0, len = value.length; i < len; i += 1) {
      returned[i] = shallowCloneDeepObjects(value[i]);
    }

    return returned;
  } else if (value && 'object' === typeof value) {
    return Object.assign({}, value);
  }

  return value;
} // Simulates the web worker API


var LokiWorkerMock =
/*#__PURE__*/
function () {
  function LokiWorkerMock() {
    var _this = this;

    this.onmessage = function () {};

    // $FlowFixMe
    this._workerContext = {
      postMessage: function postMessage(data) {
        _this.onmessage({
          data: (0, _lodash.default)(data)
        });
      },
      onmessage: function onmessage() {}
    }; // $FlowFixMe

    this._worker = new _lokiWorker.default(this._workerContext);
  }

  var _proto = LokiWorkerMock.prototype;

  _proto.postMessage = function postMessage(data) {
    // TODO: Get rid of lodash.clonedeep - it's a very slow cloning method. I used it because
    // there some crashes when using alternatives… find those edge cases and fix them…
    // TODO: Even better, it would be great if we had zero-copy architecture (COW RawRecords?) and we didn't have to clone
    var clonedData;

    if ('shallowCloneDeepObjects' === data.cloneMethod) {
      clonedData = data;
      clonedData.payload = shallowCloneDeepObjects(clonedData.payload);
    } else if ('immutable' === data.cloneMethod) {
      // we got a promise that the payload is immutable so we don't need to copy
      clonedData = data;
    } else {
      clonedData = (0, _lodash.default)(data);
    }

    this._workerContext.onmessage({
      data: clonedData
    });
  };

  return LokiWorkerMock;
}();

exports.default = LokiWorkerMock;