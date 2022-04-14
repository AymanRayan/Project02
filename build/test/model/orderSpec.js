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
describe('test of order model', function () {
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
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.default.create({
                        user_id: "1",
                        status: "complete"
                    })];
                case 1:
                    order = _a.sent();
                    expect(order.status).toEqual('complete');
                    return [2 /*return*/];
            }
        });
    }); });
    it('cart is worked', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.default.addOrderPro(1, 1, 2)];
                case 1:
                    result = _a.sent();
                    expect(result.order_id).toEqual('1');
                    expect(result.product_id).toEqual('1');
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
                    expect(result[0].user_id).toEqual('1');
                    return [2 /*return*/];
            }
        });
    }); });
    it('edit method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.default.edit({
                        id: 1,
                        user_id: '1',
                        status: 'active'
                    })];
                case 1:
                    order = _a.sent();
                    expect(order.status).toEqual('active');
                    return [2 /*return*/];
            }
        });
    }); });
    it('show one method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.default.show("1")];
                case 1:
                    result = _a.sent();
                    if (Array.isArray(result)) {
                        result = result[0];
                    }
                    expect(result.user_id).toEqual('1');
                    return [2 /*return*/];
            }
        });
    }); });
});
// describe('test of order endPoints', () => {
// });