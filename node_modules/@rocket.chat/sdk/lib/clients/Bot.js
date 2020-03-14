"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("../log");
var Rocketchat_1 = __importDefault(require("./Rocketchat"));
var mem_1 = __importDefault(require("mem"));
var MY_MESSAGES = '__my_messages__';
var TOPIC_MESSAGES = 'stream-room-messages';
var BotClient = /** @class */ (function (_super) {
    __extends(BotClient, _super);
    function BotClient(_a) {
        var _b = _a.allPublic, allPublic = _b === void 0 ? false : _b, integrationId = _a.integrationId, _c = _a.cachedMethods, cachedMethods = _c === void 0 ? ['channelInfo', 'privateInfo', 'getRoomIdByNameOrId', 'getRoomId', 'getRoomName', 'getRoomNameById', 'getDirectMessageRoomId'] : _c, config = __rest(_a, ["allPublic", "integrationId", "cachedMethods"]);
        var _this = _super.call(this, __assign({}, config, { allPublic: allPublic })) || this;
        _this.lastReadTime = new Date(-8640000000000000);
        _this.joinedIds = [];
        _this.messages = null;
        _this.integrationId = integrationId;
        cachedMethods.forEach(function (name) {
            if (_this[name]) {
                _this[name] = mem_1.default(_this[name].bind(_this), { maxAge: 60 * 60 * 1000 }).bind(_this);
            }
        });
        return _this;
    }
    /**
     * Initialise socket instance with given options or defaults.
     * Proxies the DDP module socket connection. Resolves with socket when open.
     * Accepts callback following error-first-pattern.
     * Error returned or promise rejected on timeout.
     * @example <caption>Use with callback</caption>
     *  import driver from '@rocket.chat/sdk/bot'
     *  driver.connect({}, (err) => {
     *    if (err) throw err
     *    else console.log('connected')
     *  })
     * @example <caption>Using promise</caption>
     *  import driver from '@rocket.chat/sdk/bot'
     *  driver.connect()
     *    .then(() => console.log('connected'))
     *    .catch((err) => console.error(err))
     */
    BotClient.prototype.connect = function (options, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, _super.prototype.connect.call(this, options)];
                    case 1:
                        result = _c.sent();
                        if (!callback) return [3 /*break*/, 3];
                        _a = callback;
                        _b = [null];
                        return [4 /*yield*/, this.socket];
                    case 2:
                        _a.apply(void 0, _b.concat([(_c.sent())]));
                        _c.label = 3;
                    case 3: return [2 /*return*/, result];
                    case 4:
                        error_1 = _c.sent();
                        if (callback) {
                            callback(error_1, this);
                        }
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BotClient.prototype.unsubscribeAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                delete this.messages;
                return [2 /*return*/, _super.prototype.unsubscribeAll.call(this)];
            });
        });
    };
    /** Begin subscription to user's "global" message stream. Will only allow one. */
    BotClient.prototype.subscribeToMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.messages) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.subscribe(TOPIC_MESSAGES, MY_MESSAGES)];
                    case 1:
                        _a.messages = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.messages];
                }
            });
        });
    };
    /**
     * Add callback for changes in the message stream, subscribing if not already.
     * This can be called directly for custom extensions, but for most usage (e.g.
     * for bots) the respondToMessages is more useful to only receive messages
     * matching configuration.
     *
     * @param callback Function called with every change in subscriptions.
     *  - Uses error-first callback pattern
     *  - Second argument is the changed message
     *  - Third argument is additional attributes, such as `roomType`
     */
    BotClient.prototype.reactToMessages = function (callback, debug) {
        return __awaiter(this, void 0, void 0, function () {
            var handler, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        handler = function (e) {
                            try {
                                var message = e.fields.args[0];
                                if (!message || !message._id) {
                                    callback(new Error('Message handler fired on event without message or meta data'));
                                }
                                else {
                                    callback(null, message, {});
                                }
                            }
                            catch (err) {
                                _this.logger.error("[driver] Message handler err: " + err.message);
                                callback(err);
                            }
                        };
                        _a = this;
                        return [4 /*yield*/, this.subscribeToMessages()];
                    case 1:
                        _a.messages = _b.sent();
                        this.messages.onEvent(handler);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Applies `reactToMessages` with some filtering of messages based on config.
     * If no rooms are joined at this point, it will attempt to join now based on
     * environment config, otherwise it might not receive any messages. It doesn't
     * matter that this happens asynchronously because joined rooms can change after
     * the subscription is set up.
     *
     * @param callback Function called after filters run on subscription events.
     *  - Uses error-first callback pattern
     *  - Second argument is the changed item
     *  - Third argument is additional attributes, such as `roomType`
     * @param options Sets filters for different event/message types.
     */
    BotClient.prototype.respondToMessages = function (callback, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var config, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = __assign({}, this.config, options);
                        if (!(!config.allPublic && this.joinedIds.length === 0 && config.rooms && config.rooms.length > 0)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.joinRooms(config.rooms)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.logger.error("[driver] Failed to join configured rooms (" + config.rooms.join(', ') + "): " + err_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, this.reactToMessages(function (err, message, meta) { return __awaiter(_this, void 0, void 0, function () {
                            var room, isDM, isLC, error_2, currentReadTime;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err) {
                                            log_1.logger.error("[driver] Unable to receive: " + err.message);
                                            return [2 /*return*/, callback(err)]; // bubble errors back to adapter
                                        }
                                        if (typeof message === 'undefined' /*|| typeof meta === 'undefined'*/) {
                                            log_1.logger.error("[driver] Message or meta undefined");
                                            return [2 /*return*/, callback(err)];
                                        }
                                        // Ignore bot's own messages
                                        if (message.u && message.u._id === this.userId)
                                            return [2 /*return*/];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this.rooms.info({ rid: message.rid })];
                                    case 2:
                                        room = _a.sent();
                                        isDM = room.t === 'd';
                                        if (isDM && !config.dm)
                                            return [2 /*return*/];
                                        isLC = room.t === 'l';
                                        if (isLC && !config.livechat)
                                            return [2 /*return*/];
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_2 = _a.sent();
                                        console.log(error_2);
                                        return [3 /*break*/, 4];
                                    case 4:
                                        currentReadTime = (message.ts) ? new Date(message.ts.$date) : new Date();
                                        // Ignore edited messages if configured to
                                        if (!config.edited && message.editedAt)
                                            return [2 /*return*/];
                                        // Ignore messages in stream that aren't new
                                        if (currentReadTime < this.lastReadTime)
                                            return [2 /*return*/];
                                        // At this point, message has passed checks and can be responded to
                                        // const username = (message.u) ? message.u.username : 'unknown'
                                        // this.logger.info(`[driver] Message ${message._id} from ${username}`)
                                        this.lastReadTime = currentReadTime;
                                        callback(null, message, meta);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                }
            });
        });
    };
    /** Get ID for a room by name (or ID). */
    BotClient.prototype.getRoomId = function (name) {
        return this.getRoomIdByNameOrId(name);
    };
    /** Join the bot into a room by its name or ID */
    BotClient.prototype.joinRoom = function (_a) {
        var rid = _a.rid;
        return __awaiter(this, void 0, void 0, function () {
            var roomId, joinedIndex;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getRoomId(rid)];
                    case 1:
                        roomId = _b.sent();
                        joinedIndex = this.joinedIds.indexOf(rid);
                        if (joinedIndex !== -1) {
                            log_1.logger.error("[driver] Join room failed, already joined");
                            throw new Error("[driver] Join room failed, already joined");
                        }
                        return [4 /*yield*/, _super.prototype.joinRoom.call(this, { rid: roomId })];
                    case 2:
                        _b.sent();
                        this.joinedIds.push(roomId);
                        return [2 /*return*/, roomId];
                }
            });
        });
    };
    /** Exit a room the bot has joined */
    BotClient.prototype.leaveRoom = function (room) {
        return __awaiter(this, void 0, void 0, function () {
            var roomId, joinedIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRoomId(room)];
                    case 1:
                        roomId = _a.sent();
                        joinedIndex = this.joinedIds.indexOf(room);
                        if (joinedIndex === -1) {
                            this.logger.error("[driver] Leave room failed, bot has not joined " + room);
                            throw new Error("[driver] Leave room failed, bot has not joined " + room);
                        }
                        return [4 /*yield*/, this.leaveRoom(roomId)];
                    case 2:
                        _a.sent();
                        delete this.joinedIds[joinedIndex];
                        return [2 /*return*/, roomId];
                }
            });
        });
    };
    /** Join a set of rooms by array of names or IDs */
    BotClient.prototype.joinRooms = function (rooms) {
        var _this = this;
        return Promise.all(rooms.map(function (rid) { return _this.joinRoom({ rid: rid }); }));
    };
    /**
     * Prepare and send string/s to specified room ID.
     * @param content Accepts message text string or array of strings.
     * @param roomId  ID of the target room to use in send.
     * @todo Returning one or many gets complicated with type checking not allowing
     *       use of a property because result may be array, when you know it's not.
     *       Solution would probably be to always return an array, even for single
     *       send. This would be a breaking change, should hold until major version.
     */
    BotClient.prototype.sendToRoomId = function (content, roomId) {
        var _this = this;
        if (Array.isArray(content)) {
            return Promise.all(content.map(function (text) {
                return _this.sendMessage(text, roomId);
            }));
        }
        return this.sendMessage(content, roomId);
    };
    /**
     * Prepare and send string/s to specified room name (or ID).
     * @param content Accepts message text string or array of strings.
     * @param room    A name (or ID) to resolve as ID to use in send.
     */
    BotClient.prototype.sendToRoom = function (content, room) {
        var _this = this;
        return this.getRoomId(room)
            .then(function (roomId) { return _this.sendToRoomId(content, roomId); });
    };
    /**
     * Prepare and send string/s to a user in a DM.
     * @param content   Accepts message text string or array of strings.
     * @param username  Name to create (or get) DM for room ID to use in send.
     */
    BotClient.prototype.sendDirectToUser = function (content, username) {
        var _this = this;
        return this.getDirectMessageRoomId(username)
            .then(function (rid) { return _this.sendToRoomId(content, rid); });
    };
    /**
     * Get ID for a DM room by its recipient's name.
     * Will create a DM (with the bot) if it doesn't exist already.
     * @todo test why create resolves with object instead of simply ID
     */
    BotClient.prototype.getDirectMessageRoomId = function (username) {
        return this.createDirectMessage(username).then(function (DM) {
            return DM._id;
        });
    };
    return BotClient;
}(Rocketchat_1.default));
exports.default = BotClient;
//# sourceMappingURL=Bot.js.map