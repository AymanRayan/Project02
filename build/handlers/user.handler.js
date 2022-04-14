"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
class UserHandler {
    static async index(req, res) {
        try {
            const result = await users_model_1.default.index();
            res.json(result);
        }
        catch (e) {
            res.status(400);
            throw new Error(`HANDEL ERR: can't handel index due to: ${e}`);
        }
    }
    static async show(req, res) {
        try {
            const result = await users_model_1.default.show(req.params.id);
            res.json(result);
        }
        catch (e) {
            res.status(400);
            throw new Error(`HANDEL ERR: can't handel the show due to: ${e}`);
        }
    }
    static async create(req, res) {
        try {
            const result = await users_model_1.default.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
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
            await users_model_1.default.edit({
                id: parseInt(req.params.id),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            });
        }
        catch (e) {
            throw new Error(`HANDEL ERR: can't handel the edit due to : ${e}`);
        }
    }
    static async authentication(req, res) {
        try {
            const result = await users_model_1.default.authintication(req.body.first_name, req.body.password);
            const op = jsonwebtoken_1.default.sign(result, process.env.TOKEN);
            res.json(op);
        }
        catch (e) {
            throw new Error(`HANDEL ERR: can't handel the authentication due to : ${e}`);
        }
    }
}
exports.default = UserHandler;
