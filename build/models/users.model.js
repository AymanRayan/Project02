"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = parseInt(process.env.SALT);
const pepper = process.env.BCRYPT;
async function doQuery(sql, params) {
    try {
        const conn = await database_1.default.connect();
        let result;
        if (params) {
            result = await conn.query(sql, params);
        }
        else {
            result = await conn.query(sql);
        }
        conn.release();
        return result;
    }
    catch (e) {
        throw new Error(`can't do that query due to: ${e}`);
    }
}
class UserModel {
    static async index() {
        try {
            const sql = `select * from ${this.table}`;
            const result = await doQuery(sql);
            return result.rows;
        }
        catch (e) {
            throw new Error(`MODEL ERR: can't find the data due to : ${e} `);
        }
    }
    static async create(user) {
        const hash = bcrypt_1.default.hashSync(user.password + pepper, salt);
        try {
            const sql = `insert into ${this.table} (first_name,last_name,password) values($1,$2,$3) RETURNING *`;
            const result = await doQuery(sql, [user.first_name, user.last_name, hash]);
            return result.rows[0];
        }
        catch (e) {
            throw new Error(`MODEL ERR: couldn't add this raw due to: ${e}`);
        }
    }
    static async show(id) {
        try {
            const sql = `select * from ${this.table} where id=($1)`;
            const result = await doQuery(sql, [id]);
            return result.rows[0];
        }
        catch (e) {
            throw new Error(`MODEL ERR: can't find that user due to: ${e}`);
        }
    }
    static async edit(user) {
        const hash = bcrypt_1.default.hashSync(user.password + pepper, salt);
        try {
            const sql = `update ${this.table} set first_name = $2, last_name = $3, password = $4 where id = $1 RETURNING *`;
            const result = await doQuery(sql, [user.id, user.first_name, user.last_name, hash]);
            return result.rows[0];
        }
        catch (e) {
            throw new Error(`MODEL ERR: can't edit that raw due to : ${e}`);
        }
    }
    static async authintication(first_name, password) {
        let result;
        try {
            const sql = `select * from ${this.table} where first_name=($1)`;
            result = await doQuery(sql, [first_name]);
        }
        catch (e) {
            result = null;
            throw new Error(`MODEL ERR: can't find the user due to: ${e}`);
        }
        if (!result.rows.length) {
            return null;
        }
        else {
            const user = result.rows[0];
            if (!bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return null;
            }
            else {
                return user;
            }
        }
    }
}
UserModel.table = 'users_table';
exports.default = UserModel;
