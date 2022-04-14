"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var users_model_1 = __importDefault(require("../../models/users.model"));
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var req = (0, supertest_1.default)(server_1.default);
describe('test of user model', function () {
    it('index method', function () {
        expect(users_model_1.default.index).toBeDefined();
    });
    it('show method', function () {
        expect(users_model_1.default.show).toBeDefined();
    });
    it('create method', function () {
        expect(users_model_1.default.create).toBeDefined();
    });
    it('edit method', function () {
        expect(users_model_1.default.edit).toBeDefined();
    });
    it('authinticated method', function () {
        expect(users_model_1.default.authintication).toBeDefined();
    });
    it('creation is worked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_model_1.default.create({
                        first_name: "abc",
                        last_name: "xyz",
                        password: "123"
                    })];
                case 1:
                    user = _a.sent();
                    expect(user.first_name).toEqual('abc');
                    expect(user.last_name).toEqual('xyz');
                    return [2 /*return*/];
            }
        });
    }); });
    it('index return all users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_model_1.default.index()];
                case 1:
                    result = _a.sent();
                    expect(result[2].first_name).toEqual('abc');
                    return [2 /*return*/];
            }
        });
    }); });
    it('edit method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_model_1.default.edit({
                        id: 3,
                        first_name: 'abc',
                        last_name: 'lmn',
                        password: '123'
                    })];
                case 1:
                    user = _a.sent();
                    expect(user.last_name).toEqual('lmn');
                    return [2 /*return*/];
            }
        });
    }); });
    it('show one method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_model_1.default.show("3")];
                case 1:
                    result = _a.sent();
                    if (Array.isArray(result)) {
                        result = result[0];
                    }
                    expect(result.first_name).toEqual('abc');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('test User endpoints', function () {
    var user;
    var token;
    it('create new user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/users/create').send({
                        first_name: "a",
                        last_name: "r",
                        password: '123'
                    })];
                case 1:
                    res = _a.sent();
                    token = res.body;
                    user = jsonwebtoken_1.default.decode(token);
                    expect(user.last_name).toEqual('r');
                    return [2 /*return*/];
            }
        });
    }); });
    it('show one by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get("/users/show/".concat(user.id)).set('Authorization', token)];
                case 1:
                    res = _a.sent();
                    expect(res.body.first_name).toEqual('a');
                    return [2 /*return*/];
            }
        });
    }); });
    it('index users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/users/show').set('Authorization', token)];
                case 1:
                    res = _a.sent();
                    index = user.id;
                    expect(res.body[0].last_name).toEqual('rayan');
                    return [2 /*return*/];
            }
        });
    }); });
});
