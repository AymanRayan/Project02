"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_TEST = _a.POSTGRES_TEST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
var Db;
if (ENV === "test") {
    Db = POSTGRES_TEST;
}
else {
    Db = POSTGRES_DB;
}
console.log("you are in ".concat(Db, " database"));
var client = new pg_1.Pool({
    port: parseInt(PORT),
    host: POSTGRES_HOST,
    database: Db,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
client.on('error', function (error) {
    console.error(error.message);
});
exports.default = client;
