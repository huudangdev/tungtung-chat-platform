"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var settings = __importStar(require("./lib/settings"));
exports.settings = settings;
var Livechat_1 = __importDefault(require("./lib/clients/Livechat"));
exports.Livechat = Livechat_1.default;
var Bot_1 = __importDefault(require("./lib/clients/Bot"));
exports.Bot = Bot_1.default;
var Rocketchat_1 = __importDefault(require("./lib/clients/Rocketchat"));
exports.Rocketchat = Rocketchat_1.default;
//# sourceMappingURL=index.js.map