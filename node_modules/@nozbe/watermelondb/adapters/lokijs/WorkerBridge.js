"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createWorker(useWebWorker) {
  if (useWebWorker) {
    var LokiWebWorker = require('./worker/index.worker');

    return new LokiWebWorker();
  }

  var WebWorkerMock = require('./worker/workerMock').default;

  return new WebWorkerMock();
}

var _actionId = 0;

function nextActionId() {
  _actionId += 1;
  return _actionId;
}

var WorkerBridge =
/*#__PURE__*/
function () {
  function WorkerBridge(useWebWorker) {
    var _this = this;

    this._pendingActions = [];
    this._worker = createWorker(useWebWorker);

    this._worker.onmessage = function ({
      data: data
    }) {
      var {
        result: result,
        id: responseId
      } = data;

      var {
        callback: callback,
        id: id
      } = _this._pendingActions.shift(); // sanity check


      if (id !== responseId) {
        callback({
          error: new Error('Loki worker responses are out of order')
        });
        return;
      }

      callback(result);
    };
  } // TODO: `any` return should be `WorkerResponsePayload`


  var _proto = WorkerBridge.prototype;

  _proto.send = function send(type, payload = [], callback, cloneMethod = 'deep') {
    var id = nextActionId();

    this._pendingActions.push({
      callback: callback,
      id: id
    });

    this._worker.postMessage({
      id: id,
      type: type,
      payload: payload,
      cloneMethod: cloneMethod
    });
  };

  return WorkerBridge;
}();

var _default = WorkerBridge;
exports.default = _default;