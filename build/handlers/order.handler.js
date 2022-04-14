"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
class OrderHandler {
    static async index(req, res) {
        try {
            const result = await order_model_1.default.index();
            res.json(result);
        }
        catch (e) {
            res.status(400);
            throw new Error(`HANDEL ERR: can't handel index due to: ${e}`);
        }
    }
    static async show(req, res) {
        try {
            const result = await order_model_1.default.show(req.params.id);
            res.json(result);
        }
        catch (e) {
            res.status(400);
            throw new Error(`HANDEL ERR: can't handel the show due to: ${e}`);
        }
    }
    static async create(req, res) {
        try {
            const result = await order_model_1.default.create({
                user_id: req.body.user_id,
                status: req.body.status
            });
            res.json(result);
        }
        catch (e) {
            throw new Error(`HANDEL ERR: can't handel the create due to: ${e}`);
        }
    }
    static async edit(req, res) {
        try {
            await order_model_1.default.edit({
                id: parseInt(req.params.id),
                user_id: req.body.user_id,
                status: req.body.status
            });
        }
        catch (e) {
            throw new Error(`HANDEL ERR: can't handel the edit due to : ${e}`);
        }
    }
    static async addOrderPro(req, res) {
        try {
            let orderId = req.body.order_id;
            let productId = req.body.product_id;
            let quantity = req.body.quantitiy;
            const result = await order_model_1.default.addOrderPro(orderId, productId, quantity);
            res.json(result);
        }
        catch (e) {
            throw new Error(`HANDEL ERR: can't handel add order/pro due to : ${e}`);
        }
    }
}
exports.default = OrderHandler;
