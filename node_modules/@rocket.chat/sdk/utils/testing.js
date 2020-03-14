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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("../lib/api/api"));
var config_1 = require("./config");
var api = new api_1.default({});
/** Define common attributes for DRY tests */
exports.testChannelName = 'tests';
exports.testPrivateName = 'p-tests';
/** Get information about a user */
function userInfo(username) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.get('users.info', { username: username }, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.userInfo = userInfo;
/** Create a user and catch the error if they exist already */
function createUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post('users.create', user, true, /already in use/i)];
                case 1: return [2 /*return*/, (_a.sent())];
            }
        });
    });
}
exports.createUser = createUser;
/** Get information about a channel */
function channelInfo(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, api.get('channels.info', query, true)];
        });
    });
}
exports.channelInfo = channelInfo;
/** Get information about a private group */
function privateInfo(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, api.get('groups.info', query, true)];
        });
    });
}
exports.privateInfo = privateInfo;
/** Get the last messages sent to a channel (in last 10 minutes) */
function lastMessages(roomId, count) {
    if (count === void 0) { count = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var now, latest, oldest, history;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    latest = now.toISOString();
                    oldest = new Date(now.setMinutes(now.getMinutes() - 10)).toISOString();
                    return [4 /*yield*/, api.get('channels.history', { roomId: roomId, latest: latest, oldest: oldest, count: count })];
                case 1:
                    history = _a.sent();
                    return [2 /*return*/, history.messages];
            }
        });
    });
}
exports.lastMessages = lastMessages;
/** Create a room for tests and catch the error if it exists already */
function createChannel(name, members, readOnly) {
    if (members === void 0) { members = []; }
    if (readOnly === void 0) { readOnly = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.post('channels.create', { name: name, members: members, readOnly: readOnly }, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createChannel = createChannel;
/** Create a private group / room and catch if exists already */
function createPrivate(name, members, readOnly) {
    if (members === void 0) { members = []; }
    if (readOnly === void 0) { readOnly = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (api.post('groups.create', { name: name, members: members, readOnly: readOnly }, true))];
        });
    });
}
exports.createPrivate = createPrivate;
/** Send message from mock user to channel for tests to listen and respond */
/** @todo Sometimes the post request completes before the change event emits
 *        the message to the streamer. That's why the interval is used for proof
 *        of receipt. It would be better for the endpoint to not resolve until
 *        server side handling is complete. Would require PR to core.
 */
function sendFromUser(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var user, endpoint, roomId, _a, messageDefaults, data, oldest, result, proof;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, api.login({ username: config_1.mockUser.username, password: config_1.mockUser.password })];
                case 1:
                    user = _b.sent();
                    endpoint = (payload.roomId && payload.roomId.indexOf(user.userId) !== -1)
                        ? 'dm.history'
                        : 'channels.history';
                    if (!(payload.roomId)) return [3 /*break*/, 2];
                    _a = payload.roomId;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, channelInfo({ roomName: exports.testChannelName })];
                case 3:
                    _a = (_b.sent()).channel._id;
                    _b.label = 4;
                case 4:
                    roomId = _a;
                    messageDefaults = { roomId: roomId };
                    data = Object.assign({}, messageDefaults, payload);
                    oldest = new Date().toISOString();
                    return [4 /*yield*/, api.post('chat.postMessage', data, true)];
                case 5:
                    result = _b.sent();
                    proof = new Promise(function (resolve, reject) {
                        var looked = 0;
                        var look = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var messages, found;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, api.get(endpoint, { roomId: roomId, oldest: oldest })];
                                    case 1:
                                        messages = (_a.sent()).messages;
                                        found = messages.some(function (message) {
                                            return result.message._id === message._id;
                                        });
                                        if (found || looked > 10) {
                                            clearInterval(look);
                                            if (found)
                                                resolve();
                                            else
                                                reject('API send from user, proof of receipt timeout');
                                        }
                                        looked++;
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 100);
                    });
                    return [4 /*yield*/, proof];
                case 6:
                    _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.sendFromUser = sendFromUser;
/** Leave user from room, to generate `ul` message (test channel by default) */
function leaveUser(room) {
    if (room === void 0) { room = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var roomId, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, api.login({ username: config_1.mockUser.username, password: config_1.mockUser.password })];
                case 1:
                    _b.sent();
                    if (!room.id && !room.name)
                        room.name = exports.testChannelName;
                    if (!(room.id)) return [3 /*break*/, 2];
                    _a = room.id;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, channelInfo({ roomName: room.name })];
                case 3:
                    _a = (_b.sent()).channel._id;
                    _b.label = 4;
                case 4:
                    roomId = _a;
                    return [4 /*yield*/, api.post('channels.leave', { roomId: roomId })];
                case 5: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.leaveUser = leaveUser;
/** Invite user to room, to generate `au` message (test channel by default) */
function inviteUser(room) {
    if (room === void 0) { room = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var mockInfo, roomId, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, userInfo(config_1.mockUser.username)];
                case 1:
                    mockInfo = _b.sent();
                    return [4 /*yield*/, api.login({ username: config_1.apiUser.username, password: config_1.apiUser.password })];
                case 2:
                    _b.sent();
                    if (!room.id && !room.name)
                        room.name = exports.testChannelName;
                    if (!(room.id)) return [3 /*break*/, 3];
                    _a = room.id;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, channelInfo({ roomName: room.name })];
                case 4:
                    _a = (_b.sent()).channel._id;
                    _b.label = 5;
                case 5:
                    roomId = _a;
                    return [4 /*yield*/, api.post('channels.invite', { userId: mockInfo._id, roomId: roomId })];
                case 6: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.inviteUser = inviteUser;
/** @todo : Join user into room (enter) to generate `uj` message type. */
/** Update message sent from mock user */
function updateFromUser(payload) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.login({ username: config_1.mockUser.username, password: config_1.mockUser.password })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.post('chat.update', payload, true)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateFromUser = updateFromUser;
/** Create a direct message session with the mock user */
function setupDirectFromUser() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.login({ username: config_1.mockUser.username, password: config_1.mockUser.password })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, api.post('im.create', { username: config_1.botUser.username }, true)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.setupDirectFromUser = setupDirectFromUser;
/** Initialise testing instance with the required users for SDK/bot tests */
function setup() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1, botInfo, error_2, botInfo, mockInfo, error_3, mockInfo, e_1, error_4, testPrivateInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\nPreparing instance for tests...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // Verify API user can login
                    return [4 /*yield*/, api.login({ password: config_1.apiUser.password, username: config_1.apiUser.username })];
                case 2:
                    // Verify API user can login
                    _a.sent();
                    console.log("API user (" + config_1.apiUser.username + ") logged in");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1, config_1.apiUser);
                    throw new Error("API user (" + config_1.apiUser.username + ") could not login");
                case 4:
                    _a.trys.push([4, 6, , 8]);
                    return [4 /*yield*/, userInfo(config_1.botUser.username)];
                case 5:
                    botInfo = _a.sent();
                    console.log("API user (" + botInfo.username + ") exists");
                    return [3 /*break*/, 8];
                case 6:
                    error_2 = _a.sent();
                    console.log("Bot user (" + config_1.botUser.username + ") not found");
                    return [4 /*yield*/, createUser(config_1.botUser)
                        // if (!botInfo.success) {
                        //   throw new Error(`Bot user (${botUser.username}) could not be created`)
                        // }
                    ];
                case 7:
                    botInfo = _a.sent();
                    // if (!botInfo.success) {
                    //   throw new Error(`Bot user (${botUser.username}) could not be created`)
                    // }
                    console.log("Bot user (" + botInfo.username + ") created");
                    return [3 /*break*/, 8];
                case 8:
                    _a.trys.push([8, 10, , 12]);
                    return [4 /*yield*/, userInfo(config_1.mockUser.username)];
                case 9:
                    mockInfo = _a.sent();
                    console.log("Mock user (" + mockInfo.username + ") exists");
                    return [3 /*break*/, 12];
                case 10:
                    error_3 = _a.sent();
                    console.log("Mock user (" + config_1.mockUser.username + ") not found");
                    return [4 /*yield*/, createUser(config_1.mockUser)
                        // if (!mockInfo || mockInfo.success) {
                        //   throw new Error(`Mock user (${mockUser.username}) could not be created`)
                        // }
                    ];
                case 11:
                    mockInfo = _a.sent();
                    // if (!mockInfo || mockInfo.success) {
                    //   throw new Error(`Mock user (${mockUser.username}) could not be created`)
                    // }
                    console.log("Mock user (" + mockInfo.username + ") created");
                    return [3 /*break*/, 12];
                case 12:
                    _a.trys.push([12, 14, , 16]);
                    // Verify or create user for bot
                    // Verify or create channel for tests
                    return [4 /*yield*/, channelInfo({ roomName: exports.testChannelName })];
                case 13:
                    // Verify or create user for bot
                    // Verify or create channel for tests
                    _a.sent();
                    console.log("Test channel (" + exports.testChannelName + ") exists");
                    return [3 /*break*/, 16];
                case 14:
                    e_1 = _a.sent();
                    console.log("Test channel (" + exports.testChannelName + ") not found");
                    return [4 /*yield*/, createChannel(exports.testChannelName, [
                            config_1.apiUser.username, config_1.botUser.username, config_1.mockUser.username
                        ])
                        // if (!testChannelInfo.success) {
                        //   throw new Error(`Test channel (${testChannelName}) could not be created`)
                        // }
                    ];
                case 15:
                    _a.sent();
                    // if (!testChannelInfo.success) {
                    //   throw new Error(`Test channel (${testChannelName}) could not be created`)
                    // }
                    console.log("Test channel (" + exports.testChannelName + ") created");
                    return [3 /*break*/, 16];
                case 16:
                    _a.trys.push([16, 18, , 20]);
                    // Verify or create private room for tests
                    return [4 /*yield*/, privateInfo({ roomName: exports.testPrivateName })];
                case 17:
                    // Verify or create private room for tests
                    _a.sent();
                    console.log("Test private room (" + exports.testPrivateName + ") exists");
                    return [3 /*break*/, 20];
                case 18:
                    error_4 = _a.sent();
                    return [4 /*yield*/, createPrivate(exports.testPrivateName, [
                            config_1.apiUser.username, config_1.botUser.username, config_1.mockUser.username
                        ])];
                case 19:
                    testPrivateInfo = _a.sent();
                    console.log("Test private room (" + testPrivateInfo.name + ") created");
                    return [3 /*break*/, 20];
                case 20: return [4 /*yield*/, api.logout()];
                case 21:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.setup = setup;
//# sourceMappingURL=testing.js.map