"use strict";
/**
    * @module ApiRocketChat
    * Provides a client for handling requests with Rocket.Chat's REST API
    */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("./api"));
/** Defaults for user queries */
exports.userFields = { name: 1, username: 1, status: 1, type: 1 };
/** Query helpers for user collection requests */
var ApiRocketChat = /** @class */ (function (_super) {
    __extends(ApiRocketChat, _super);
    function ApiRocketChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ApiRocketChat.prototype, "users", {
        get: function () {
            var self = this;
            return {
                all: function (fields) {
                    if (fields === void 0) { fields = exports.userFields; }
                    return self.get('users.list', { fields: fields }).then(function (r) { return r.users; });
                },
                allNames: function () { return self.get('users.list', { fields: { 'username': 1 } }).then(function (r) { return r.users.map(function (u) { return u.username; }); }); },
                allIDs: function () { return self.get('users.list', { fields: { '_id': 1 } }).then(function (r) { return r.users.map(function (u) { return u._id; }); }); },
                online: function (fields) {
                    if (fields === void 0) { fields = exports.userFields; }
                    return self.get('users.list', { fields: fields, query: { 'status': { $ne: 'offline' } } }).then(function (r) { return r.users; });
                },
                onlineNames: function () { return self.get('users.list', { fields: { 'username': 1 }, query: { 'status': { $ne: 'offline' } } }).then(function (r) { return r.users.map(function (u) { return u.username; }); }); },
                onlineIds: function () { return self.get('users.list', { fields: { '_id': 1 }, query: { 'status': { $ne: 'offline' } } }).then(function (r) { return r.users.map(function (u) { return u._id; }); }); },
                info: function (username) {
                    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, self.get('users.info', { username: username }, true)];
                            case 1: return [2 /*return*/, (_a.sent()).user];
                        }
                    }); });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiRocketChat.prototype, "rooms", {
        get: function () {
            var self = this;
            return {
                info: function (_a) {
                    var rid = _a.rid;
                    return self.get('rooms.info', { rid: rid }, true);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    // editMessage(message: IMessage) chat.update
    ApiRocketChat.prototype.joinRoom = function (_a) {
        var rid = _a.rid;
        return this.post('channels.join', { roomId: rid }, true);
    };
    ApiRocketChat.prototype.info = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.get('info', {}, true)];
                case 1: return [2 /*return*/, (_a.sent()).info];
            }
        }); });
    };
    /**
     * Send a prepared message object (with pre-defined room ID).
     * Usually prepared and called by sendMessageByRoomId or sendMessageByRoom.
     */
    ApiRocketChat.prototype.sendMessage = function (message, rid) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.post('chat.sendMessage', { message: this.prepareMessage(message, rid) }, true)];
                case 1: return [2 /*return*/, (_a.sent()).message];
            }
        }); });
    };
    ApiRocketChat.prototype.getRoomIdByNameOrId = function (name) { return this.get('chat.getRoomIdByNameOrId', { name: name }, true); };
    ApiRocketChat.prototype.getRoomNameById = function (rid) { return this.getRoomName(rid); };
    ApiRocketChat.prototype.getRoomName = function (rid) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('chat.getRoomNameById', { rid: rid }, true)];
                    case 1:
                        room = _a.sent();
                        return [2 /*return*/, room.name];
                }
            });
        });
    };
    ApiRocketChat.prototype.getRoomId = function (name) { return this.get('chat.find', { name: name }, true); };
    ApiRocketChat.prototype.createDirectMessage = function (username) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.post('im.create', { username: username }, true)];
                case 1: return [2 /*return*/, (_a.sent()).room];
            }
        }); });
    };
    /**
     * Edit an existing message, replacing any attributes with those provided.
     * The given message object should have the ID of an existing message.
     */
    ApiRocketChat.prototype.editMessage = function (message) {
        return this.post('chat.update', { roomId: message.rid, msgId: message._id, text: message.msg });
    };
    /**
     * Send a reaction to an existing message. Simple proxy for method call.
     * @param emoji     Accepts string like `:thumbsup:` to add 👍 reaction
     * @param messageId ID for a previously sent message
     */
    ApiRocketChat.prototype.setReaction = function (emoji, messageId) { return this.post('chat.react', { emoji: emoji, messageId: messageId }, true); };
    // TODO fix this methods
    ApiRocketChat.prototype.loadHistory = function (rid, lastUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('chat.syncMessages', { roomId: rid, lastUpdate: lastUpdate.toISOString() }, true)];
                    case 1: return [2 /*return*/, (_a.sent()).result];
                }
            });
        });
    };
    /** Exit a room the bot has joined */
    ApiRocketChat.prototype.leaveRoom = function (rid) {
        return this.post('rooms.leave', { rid: rid }).then(function () { return rid; });
    };
    /** Get information about a public group */
    ApiRocketChat.prototype.channelInfo = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('channels.info', query, true)];
                    case 1: return [2 /*return*/, (_a.sent()).channel];
                }
            });
        });
    };
    /** Get information about a private group */
    ApiRocketChat.prototype.privateInfo = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('groups.info', query, true)];
                    case 1: return [2 /*return*/, (_a.sent()).group];
                }
            });
        });
    };
    return ApiRocketChat;
}(api_1.default));
exports.default = ApiRocketChat;
//# sourceMappingURL=RocketChat.js.map