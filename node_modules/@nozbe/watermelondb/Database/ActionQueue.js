"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../utils/common");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ActionQueue =
/*#__PURE__*/
function () {
  function ActionQueue() {
    this._queue = [];
    this._subActionIncoming = false;
  }

  var _proto = ActionQueue.prototype;

  _proto.enqueue = function enqueue(work, description) {
    var _this = this;

    // If a subAction was scheduled using subAction(), database.action() calls skip the line
    if (this._subActionIncoming) {
      this._subActionIncoming = false;
      return work(this);
    }

    return new Promise(function (resolve, reject) {
      if ('production' !== process.env.NODE_ENV && _this._queue.length) {
        var queue = _this._queue;
        var current = queue[0];

        _common.logger.warn("[WatermelonDB] The action you're trying to perform (".concat(description || 'unnamed', ") can't be performed yet, because there are ").concat(queue.length, " actions in the queue. Current action: ").concat(current.description || 'unnamed', ". Ignore this message if everything is working fine. But if your actions are not running, it's because the current action is stuck. Remember that if you're calling an action from an action, you must use subAction(). See docs for more details."));

        _common.logger.log("[WatermelonDB] Enqueued action:", work);

        _common.logger.log("[WatermelonDB] Running action:", current.work);
      }

      _this._queue.push({
        work: work,
        resolve: resolve,
        reject: reject,
        description: description
      });

      if (1 === _this._queue.length) {
        _this._executeNext();
      }
    });
  };

  _proto.subAction = function subAction(action) {
    try {
      this._subActionIncoming = true;
      return action();
    } catch (error) {
      this._subActionIncoming = false;
      return Promise.reject(error);
    }
  };

  _proto._executeNext = function _executeNext() {
    return new Promise(function ($return, $error) {
      var _this2, work, resolve, reject, workPromise;

      _this2 = this;
      ({
        work: work,
        resolve: resolve,
        reject: reject
      } = this._queue[0]);

      var $Try_2_Post = function () {
        try {
          this._queue.shift();

          if (this._queue.length) {
            setTimeout(function () {
              return _this2._executeNext();
            }, 0);
          }

          return $return();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this);

      var $Try_2_Catch = function (error) {
        try {
          reject(error);
          return $Try_2_Post();
        } catch ($boundEx) {
          return $error($boundEx);
        }
      };

      try {
        workPromise = work(this);

        if ('production' !== process.env.NODE_ENV) {
          (0, _common.invariant)(workPromise instanceof Promise, "The function passed to database.action() or a method marked as @action must be asynchronous \u2014 either marked as 'async' or always returning a promise (in: ".concat(this._queue[0].description || 'unnamed', ")"));
        }

        return Promise.resolve(workPromise).then(function ($await_3) {
          try {
            resolve($await_3);
            return $Try_2_Post();
          } catch ($boundEx) {
            return $Try_2_Catch($boundEx);
          }
        }, $Try_2_Catch);
      } catch (error) {
        $Try_2_Catch(error)
      }
    }.bind(this));
  };

  _proto._abortPendingActions = function _abortPendingActions() {
    (0, _common.invariant)(1 <= this._queue.length, 'abortPendingActions can only be called from an Action');

    var actionsToAbort = this._queue.splice(1); // leave only the current action (calling this method) on the queue


    actionsToAbort.forEach(function ({
      reject: reject
    }) {
      reject(new Error('Action has been aborted because the database was reset'));
    });
  };

  _createClass(ActionQueue, [{
    key: "isRunning",
    get: function get() {
      return 0 < this._queue.length;
    }
  }]);

  return ActionQueue;
}();

exports.default = ActionQueue;