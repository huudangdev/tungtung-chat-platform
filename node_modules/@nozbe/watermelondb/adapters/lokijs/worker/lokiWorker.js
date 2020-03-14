"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logError = _interopRequireDefault(require("../../../utils/common/logError"));

var _invariant = _interopRequireDefault(require("../../../utils/common/invariant"));

var _executor = _interopRequireDefault(require("./executor"));

var _common = require("../common");

var _executorMethods;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ExecutorProto = _executor.default.prototype;
var executorMethods = (_executorMethods = {}, _executorMethods[_common.actions.SETUP] = ExecutorProto.setUp, _executorMethods[_common.actions.FIND] = ExecutorProto.find, _executorMethods[_common.actions.QUERY] = ExecutorProto.query, _executorMethods[_common.actions.COUNT] = ExecutorProto.count, _executorMethods[_common.actions.BATCH] = ExecutorProto.batch, _executorMethods[_common.actions.UNSAFE_RESET_DATABASE] = ExecutorProto.unsafeResetDatabase, _executorMethods[_common.actions.GET_LOCAL] = ExecutorProto.getLocal, _executorMethods[_common.actions.SET_LOCAL] = ExecutorProto.setLocal, _executorMethods[_common.actions.REMOVE_LOCAL] = ExecutorProto.removeLocal, _executorMethods[_common.actions.GET_DELETED_RECORDS] = ExecutorProto.getDeletedRecords, _executorMethods[_common.actions.DESTROY_DELETED_RECORDS] = ExecutorProto.destroyDeletedRecords, _executorMethods);

var LokiWorker =
/*#__PURE__*/
function () {
  function LokiWorker(workerContext) {
    var _this = this;

    this.queue = [];
    this._actionsExecuting = 0;
    this.workerContext = workerContext;

    this.workerContext.onmessage = function (e) {
      var action = e.data;

      _this.enqueue(action);
    };
  }

  var _proto = LokiWorker.prototype;

  _proto.enqueue = function enqueue(action) {
    this.queue.push(action);

    if (1 === this.queue.length) {
      this.executeNext();
    }
  };

  _proto.executeNext = function executeNext() {
    var action = this.queue[0];
    (0, _invariant.default)(0 === this._actionsExecuting, 'worker should not have ongoing actions'); // sanity check

    this.processAction(action);
  };

  _proto.onActionDone = function onActionDone(response) {
    (0, _invariant.default)(1 === this._actionsExecuting, 'worker should be executing 1 action'); // sanity check

    this._actionsExecuting = 0;
    this.queue.shift();

    try {
      this.workerContext.postMessage(response);
    } catch (error) {
      (0, _logError.default)(error);
    }

    if (this.queue.length) {
      this.executeNext();
    }
  };

  _proto.processAction = function processAction(action) {
    try {
      this._actionsExecuting += 1;
      var {
        type: type,
        payload: payload,
        id: id
      } = action;
      (0, _invariant.default)(type in _common.actions, "Unknown worker action ".concat(type));

      if (type === _common.actions.SETUP || type === _common.actions.UNSAFE_RESET_DATABASE) {
        this.processActionAsync(action);
      } else {
        var response = this._runExecutorAction(type, payload);

        this.onActionDone({
          id: id,
          result: {
            value: response
          }
        });
      }
    } catch (error) {
      this._onError(action, error);
    }
  };

  _proto.processActionAsync = function processActionAsync(action) {
    return new Promise(function ($return, $error) {
      var type, payload, id, options, executor, response;

      var $Try_3_Post = function () {
        try {
          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };

      var $Try_3_Catch = function (error) {
        try {
          this._onError(action, error);

          return $Try_3_Post();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this);

      try {
        ({
          type: type,
          payload: payload,
          id: id
        } = action);

        if (type === _common.actions.SETUP) {
          // app just launched, set up executor with options sent
          (0, _invariant.default)(!this.executor, "Loki executor already set up - cannot set up again");
          [options] = payload;
          executor = new _executor.default(options);
          return Promise.resolve(executor.setUp()).then(function () {
            try {
              this.executor = executor;
              this.onActionDone({
                id: id,
                result: {
                  value: null
                }
              });
              return $If_4.call(this);
            } catch ($boundEx) {
              return $Try_3_Catch($boundEx);
            }
          }.bind(this), $Try_3_Catch);
        } else {
          return Promise.resolve(this._runExecutorAction(type, payload)).then(function ($await_6) {
            try {
              response = $await_6;
              this.onActionDone({
                id: id,
                result: {
                  value: response
                }
              });
              return $If_4.call(this);
            } catch ($boundEx) {
              return $Try_3_Catch($boundEx);
            }
          }.bind(this), $Try_3_Catch);
        }

        function $If_4() {
          return $Try_3_Post();
        }
      } catch (error) {
        $Try_3_Catch(error)
      }
    }.bind(this));
  };

  _proto._runExecutorAction = function _runExecutorAction(type, payload) {
    // run action
    (0, _invariant.default)(this.executor, "Cannot run actions because executor is not set up");
    var runExecutorAction = executorMethods[type].bind(this.executor);
    return runExecutorAction.apply(void 0, _toConsumableArray(payload));
  };

  _proto._onError = function _onError(action, error) {
    // Main process only receives error message (when using web workers) — this logError is to retain call stack
    (0, _logError.default)(error);
    this.onActionDone({
      id: action.id,
      result: {
        error: error
      }
    });
  };

  return LokiWorker;
}();

exports.default = LokiWorker;