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
var order_model_1 = __importDefault(require("../../models/order.model"));
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var req = (0, supertest_1.default)(server_1.default);
var order;
var user1;
var pro;
var token;
describe('test of order model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/users/create').send({
                        first_name: 'super',
                        last_name: "admin2",
                        password: 'admin2'
                    })];
                case 1:
                    res = _a.sent();
                    token = res.body;
                    user1 = jsonwebtoken_1.default.decode(token);
                    return [2 /*return*/];
            }
        });
    }); });
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/products/create').send({
                        the_name: "shirt",
                        price: "150"
                    }).set('Authorization', token)];
                case 1:
                    res = _a.sent();
                    pro = res.body;
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method', function () {
        expect(order_model_1.default.index).toBeDefined();
    });
    it('show method', function () {
        expect(order_model_1.default.show).toBeDefined();
    });
    it('create method', function () {
        expect(order_model_1.default.create).toBeDefined();
    });
    it('edit method', function () {
        expect(order_model_1.default.edit).toBeDefined();
    });
    it('cart method', function () {
        expect(order_model_1.default.addOrderPro).toBeDefined();
    });
    it('creation is worked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, res;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = (_a = user1.id) === null || _a === void 0 ? void 0 : _a.toString();
                    return [4 /*yield*/, order_model_1.default.create({
                            user_id: id,
                            status: "complete"
                        })];
                case 1:
                    res = _b.sent();
                    order = res;
                    expect(res.status).toEqual('complete');
                    return [2 /*return*/];
            }
        });
    }); });
    it('cart is worked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orderid, proid, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderid = order.id;
                    proid = pro.id;
                    return [4 /*yield*/, order_model_1.default.addOrderPro(orderid, proid, 2)];
                case 1:
                    result = _a.sent();
                    expect(result.quantitiy).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('index return all users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.default.index()];
                case 1:
                    result = _a.sent();
                    expect(result.length).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('edit method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, orderid, res;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = (_a = user1.id) === null || _a === void 0 ? void 0 : _a.toString();
                    orderid = order.id;
                    return [4 /*yield*/, order_model_1.default.edit({
                            id: orderid,
                            user_id: id,
                            status: 'active'
                        })];
                case 1:
                    res = _b.sent();
                    expect(res.status).toEqual('active');
                    return [2 /*return*/];
            }
        });
    }); });
    it('show one method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = String(user1.id);
                    return [4 /*yield*/, order_model_1.default.show(id)];
                case 1:
                    result = _a.sent();
                    if (Array.isArray(result)) {
                        result = result[0];
                    }
                    expect(result.user_id).toEqual(id);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('test of order endPoints', function () {
    it('create order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/orders/create').send({
                        user_id: user1.id,
                        status: 'finshed'
                    }).set('Authorization', token)];
                case 1:
                    res = _a.sent();
                    order = res.body;
                    expect(order.status).toEqual('finshed');
                    return [2 /*return*/];
            }
        });
    }); });
    it('get order by user id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, id;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.get("/orders/show/".concat(user1.id)).set('Authorization', token)];
                case 1:
                    res = _b.sent();
                    ;
                    id = (_a = user1.id) === null || _a === void 0 ? void 0 : _a.toString();
                    expect(res.body.user_id).toEqual(id);
                    return [2 /*return*/];
            }
        });
    }); });
});
