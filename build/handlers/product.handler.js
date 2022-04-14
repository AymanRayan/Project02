"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductHandler {
    static async index(req, res) {
        try {
            const result = await product_model_1.default.index();
            res.json(result);
        }
        catch (e) {
            res.status(400);
            throw new Error(`HANDEL ERR: can't handel index due to: ${e}`);
        }
    }
    static async show(req, res) {
        try {
            const result = await product_model_1.default.show(req.params.id);
            res.json(result);
        }
        catch (e) {
            res.status(400);
            throw new Error(`HANDEL ERR: can't handel the show due to: ${e}`);
        }
    }
    static async create(req, res) {
        try {
            const result = await product_model_1.default.create({
                name: req.body.name,
                price: req.body.price
            });
            const op = jsonwebtoken_1.default.sign(result, process.env.TOKEN);
            res.json(op);
        }
        catch (e) {
            throw new Error(`HANDEL ERR: can't handel the create due to: ${e}`);
        }
    }
    static async edit(req, res) {
        try {
            await product_model_1.default.edit({
                id: parseInt(req.params.id),
                name: req.body.name,
                price: req.body.price
            });
        }
        catch (e) {
            throw new Error(`HANDEL ERR: can't handel the edit due to : ${e}`);
        }
    }
}
exports.default = ProductHandler;
