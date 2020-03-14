"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Test script uses standard methods and env config to connect and log streams
var config_1 = require("./config");
var Bot_1 = __importDefault(require("../lib/clients/Bot"));
global.fetch = require('node-fetch');
// Login settings - LDAP needs to be explicitly enabled
exports.username = process.env.ROCKETCHAT_USER || 'g1';
exports.password = process.env.ROCKETCHAT_PASSWORD || '1';
exports.ldap = (process.env.ROCKETCHAT_AUTH === 'ldap');
// Connection settings - Enable SSL by default if Rocket.Chat URL contains https
exports.host = process.env.ROCKETCHAT_URL || 'http://localhost:3000';
exports.useSsl = (process.env.ROCKETCHAT_USE_SSL && process.env.ROCKETCHAT_USE_SSL === 'true') || (exports.host).toLowerCase().startsWith('https');
exports.timeout = 20 * 1000; // 20 seconds
// Respond settings - reactive callback filters for .respondToMessages
exports.rooms = (process.env.ROCKETCHAT_ROOM)
    ? (process.env.ROCKETCHAT_ROOM || '').split(',').map(function (room) { return room.trim(); })
    : [];
exports.allPublic = (process.env.LISTEN_ON_ALL_PUBLIC || 'false').toLowerCase() === 'true';
exports.dm = (process.env.RESPOND_TO_DM || 'false').toLowerCase() === 'true';
exports.livechat = (process.env.RESPOND_TO_LIVECHAT || 'false').toLowerCase() === 'true';
exports.edited = (process.env.RESPOND_TO_EDITED || 'false').toLowerCase() === 'true';
// Message attribute settings
exports.integrationId = process.env.INTEGRATION_ID || 'js.SDK';
// Cache settings
exports.roomCacheMaxSize = parseInt(process.env.ROOM_CACHE_SIZE || '10', 10);
exports.roomCacheMaxAge = 1000 * parseInt(process.env.ROOM_CACHE_MAX_AGE || '300', 10);
exports.dmCacheMaxSize = parseInt(process.env.DM_ROOM_CACHE_SIZE || '10', 10);
exports.dmCacheMaxAge = 1000 * parseInt(process.env.DM_ROOM_CACHE_MAX_AGE || '100', 10);
// Livechat settings
exports.token = process.env.LIVECHAT_TOKEN || '';
exports.rid = process.env.LIVECHAT_ROOM || '';
exports.department = process.env.LIVECHAT_DEPARTMENT || '';
var delay = function (ms) { return new Promise(function (resolve, reject) { return setTimeout(resolve, ms); }); };
var L = /** @class */ (function () {
    function L() {
    }
    L.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.log(...args)
    };
    L.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.log(...args)
    };
    L.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.warn(...args)
    };
    L.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // return this.warning(...args)
    };
    L.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.error(...args)
    };
    return L;
}());
var driver = new Bot_1.default({ host: exports.host, useSsl: exports.useSsl, timeout: exports.timeout, logger: new L() });
// Start subscription to log message stream (used for e2e test and demo)
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.login({ username: exports.username, password: exports.password })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, driver.connect({})
                        // driver.subscribeNotifyAll()
                        // driver.subscribeLoggedNotify()
                        // driver.subscribeNotifyUser()
                    ];
                case 2:
                    _a.sent();
                    // driver.subscribeNotifyAll()
                    // driver.subscribeLoggedNotify()
                    // driver.subscribeNotifyUser()
                    return [4 /*yield*/, driver.respondToMessages(function (err, msg, msgOpts) {
                            if (err)
                                throw err;
                            console.log('[respond]', JSON.stringify(msg), JSON.stringify(msgOpts));
                            if (msg)
                                demo(msg).catch(function (e) { return console.error(e); });
                        }, {
                            rooms: ['GENERAL'],
                            allPublic: false,
                            dm: true,
                            edited: true,
                            livechat: false
                        })];
                case 3:
                    // driver.subscribeNotifyAll()
                    // driver.subscribeLoggedNotify()
                    // driver.subscribeNotifyUser()
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Demo bot-style interactions
// A: Listen for "tell everyone <something>" and send that something to everyone
// B: Listen for "who's online" and tell that person who's online
function demo(message) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, match, usernames, usernames_1, usernames_1_1, username_1, e_1_1, names, niceNames;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!message.msg)
                        return [2 /*return*/];
                    if (!/tell everyone/i.test(message.msg)) return [3 /*break*/, 11];
                    match = message.msg.match(/tell everyone (.*)/i);
                    if (!match || !match[1])
                        return [2 /*return*/];
                    return [4 /*yield*/, driver.users.allNames()];
                case 1:
                    usernames = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, 9, 10]);
                    usernames_1 = __values(usernames), usernames_1_1 = usernames_1.next();
                    _b.label = 3;
                case 3:
                    if (!!usernames_1_1.done) return [3 /*break*/, 7];
                    username_1 = usernames_1_1.value;
                    if (!(username_1 && username_1 !== config_1.botUser.username)) return [3 /*break*/, 6];
                    // const toWhere =
                    return [4 /*yield*/, driver.getDirectMessageRoomId(username_1)];
                case 4:
                    // const toWhere =
                    _b.sent();
                    return [4 /*yield*/, delay(200)]; // delay to prevent rate-limit error
                case 5:
                    _b.sent(); // delay to prevent rate-limit error
                    _b.label = 6;
                case 6:
                    usernames_1_1 = usernames_1.next();
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (usernames_1_1 && !usernames_1_1.done && (_a = usernames_1.return)) _a.call(usernames_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [3 /*break*/, 14];
                case 11:
                    if (!/who\'?s online/i.test(message.msg)) return [3 /*break*/, 14];
                    return [4 /*yield*/, driver.users.onlineNames()];
                case 12:
                    names = _b.sent();
                    niceNames = names.join(', ').replace(/, ([^,]*)$/, ' and $1');
                    return [4 /*yield*/, driver.sendToRoomId(niceNames + ' are online', message.rid)];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    });
}
start().catch(function (e) { return console.error(e); });
//# sourceMappingURL=start.js.map