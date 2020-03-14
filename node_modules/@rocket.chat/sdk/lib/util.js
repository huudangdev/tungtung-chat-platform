"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Delay invocation of a function until some time after it was last called */
function debounce(func, waitMilliseconds, immediate) {
    if (waitMilliseconds === void 0) { waitMilliseconds = 100; }
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        var doLater = function () {
            timeout = undefined;
            if (!immediate)
                func.apply(self, args);
        };
        var callNow = immediate && timeout === undefined;
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(doLater, waitMilliseconds);
        if (callNow)
            func.apply(self, args);
    };
}
exports.debounce = debounce;
/** Convert a http/s protocol address to a websocket URL */
function hostToWS(host, ssl) {
    if (ssl === void 0) { ssl = false; }
    host = host.replace(/^(https?:\/\/)?/, '');
    return "ws" + (ssl ? 's' : '') + "://" + host;
}
exports.hostToWS = hostToWS;
//# sourceMappingURL=util.js.map