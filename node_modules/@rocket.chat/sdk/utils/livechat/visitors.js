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
var Livechat_1 = __importDefault(require("../../lib/api/Livechat"));
var log_1 = require("../../lib/log");
var config_1 = require("../config");
log_1.silence();
var livechat = new Livechat_1.default({});
function visitors() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    _b = (_a = console).log;
                    _c = "\n\nDemo of API livechat query helpers\n\nCreate Livechat Visitor `livechat.grantVisitor()`:\n";
                    _e = (_d = JSON).stringify;
                    return [4 /*yield*/, livechat.grantVisitor(config_1.mockVisitor)];
                case 1:
                    _f = _c + _e.apply(_d, [_q.sent(), null, '\t']) + "\n\nAdd new Livechat CustomField `livechat.sendCustomField()`:\n";
                    _h = (_g = JSON).stringify;
                    return [4 /*yield*/, livechat.sendCustomField(config_1.mockCustomField)];
                case 2:
                    _j = _f + _h.apply(_g, [_q.sent(), null, '\t']) + "\n\nAdd new Livechat CustomFields `livechat.sendCustomFields()`:\n";
                    _l = (_k = JSON).stringify;
                    return [4 /*yield*/, livechat.sendCustomFields(config_1.mockCustomFields)];
                case 3:
                    _m = _j + _l.apply(_k, [_q.sent(), null, '\t']) + "\n\n`livechat.visitor()`:\n";
                    _p = (_o = JSON).stringify;
                    return [4 /*yield*/, livechat.visitor()];
                case 4:
                    _b.apply(_a, [_m + _p.apply(_o, [_q.sent(), null, '\t']) + "\n\n\t"]);
                    return [2 /*return*/];
            }
        });
    });
}
visitors().catch(function (e) { return console.error(e); });
//# sourceMappingURL=visitors.js.map