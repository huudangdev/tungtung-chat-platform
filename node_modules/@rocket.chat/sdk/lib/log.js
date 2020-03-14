"use strict";
/**
 * @module log
 * Basic log handling with ability to override when used within another module.
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Temp logging, should override form adapter's log */
var InternalLog = /** @class */ (function () {
    function InternalLog() {
    }
    InternalLog.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.log(...args)
    };
    InternalLog.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.log(...args)
    };
    InternalLog.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.warn(...args)
    };
    InternalLog.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.warning.apply(this, __spread(args));
    };
    InternalLog.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.error(...args)
    };
    return InternalLog;
}());
/** Default basic console logging */
exports.logger = new InternalLog();
/** Substitute logging handler */
function replaceLog(externalLog) {
    exports.logger = externalLog;
}
exports.replaceLog = replaceLog;
/** Null all log outputs */
function silence() {
    replaceLog({
        debug: function () { return null; },
        info: function () { return null; },
        warn: function () { return null; },
        warning: function () { return null; },
        error: function () { return null; }
    });
}
exports.silence = silence;
//# sourceMappingURL=log.js.map