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
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var salt = parseInt(process.env.SALT);
var pepper = process.env.BCRYPT;
function doQuery(sql, params) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    result = void 0;
                    if (!params) return [3 /*break*/, 3];
                    return [4 /*yield*/, conn.query(sql, params)];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, conn.query(sql)];
                case 4:
                    result = _a.sent();
                    _a.label = 5;
                case 5:
                    conn.release();
                    return [2 /*return*/, result];
                case 6:
                    e_1 = _a.sent();
                    throw new Error("can't do that query due to: ".concat(e_1));
                case 7: return [2 /*return*/];
            }
        });
    });
}
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "select * from ".concat(this.table);
                        return [4 /*yield*/, doQuery(sql)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                    case 2:
                        e_2 = _a.sent();
                        throw new Error("MODEL ERR: can't find the data due to : ".concat(e_2, " "));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, sql, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = bcrypt_1.default.hashSync(user.password + pepper, salt);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        sql = "insert into ".concat(this.table, " (first_name,last_name,password) values($1,$2,$3) RETURNING *");
                        return [4 /*yield*/, doQuery(sql, [user.first_name, user.last_name, hash])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        e_3 = _a.sent();
                        throw new Error("MODEL ERR: couldn't add this raw due to: ".concat(e_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "select * from ".concat(this.table, " where id=($1)");
                        return [4 /*yield*/, doQuery(sql, [id])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 2:
                        e_4 = _a.sent();
                        throw new Error("MODEL ERR: can't find that user due to: ".concat(e_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.edit = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, sql, result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = bcrypt_1.default.hashSync(user.password + pepper, salt);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        sql = "update ".concat(this.table, " set first_name = $2, last_name = $3, password = $4 where id = $1 RETURNING *");
                        return [4 /*yield*/, doQuery(sql, [user.id, user.first_name, user.last_name, hash])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        e_5 = _a.sent();
                        throw new Error("MODEL ERR: can't edit that raw due to : ".concat(e_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.authintication = function (first_name, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, e_6, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "select * from ".concat(this.table, " where first_name=($1)");
                        return [4 /*yield*/, doQuery(sql, [first_name])];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        result = null;
                        throw new Error("MODEL ERR: can't find the user due to: ".concat(e_6));
                    case 3:
                        if (!result.rows.length) {
                            return [2 /*return*/, null];
                        }
                        else {
                            user = result.rows[0];
                            if (!bcrypt_1.default.compareSync(password + pepper, user.password)) {
                                return [2 /*return*/, null];
                            }
                            else {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserModel.cleanTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "delete from ".concat(this.table);
                        return [4 /*yield*/, doQuery(sql)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        throw new Error("MODEL ERR: can't clean data due to : ".concat(e_7));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.table = 'users_table';
    return UserModel;
}());
exports.default = UserModel;
