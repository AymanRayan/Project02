"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
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
        throw new Error(`MODEL ERR: can't do that query due to: ${e}`);
    }
}
class OrderModel {
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
    static async create(order) {
        try {
            const sql = `insert into ${this.table} (user_id,status) values($1,$2) RETURNING *`;
            const result = await doQuery(sql, [order.user_id, order.status]);
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
    static async edit(order) {
        try {
            const sql = `update ${this.table} set user_id = $2, status = $3 where id = $1 RETURNING *`;
            const result = await doQuery(sql, [order.id, order.user_id, order.status]);
            return result.rows[0];
        }
        catch (e) {
            throw new Error(`MODEL ERR: can't edit that raw due to : ${e}`);
        }
    }
    static async addOrderPro(orderId, productId, quantity) {
        try {
            const sql = `insert into order_product_table (order_id,product_id,quantitiy) values ($1,$2,$3) returning *`;
            const result = await doQuery(sql, [orderId, productId, quantity]);
            return result.rows[0];
        }
        catch (e) {
            throw new Error(`MODEL ERR: can't addOrders due to : ${e}`);
        }
    }
}
OrderModel.table = 'orders_table';
exports.default = OrderModel;
