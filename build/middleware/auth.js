"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function auth(req, res, next) {
    try {
        const header = req.headers.authorization;
        const arr = header?.split(' ');
        let token;
        if (arr?.length > 1) {
            token = arr[1];
        }
        else {
            token = header;
        }
        jsonwebtoken_1.default.verify(token, process.env.TOKEN);
        next();
    }
    catch (e) {
        res.status(401).send({
            message: `UnAuthorized due to : ${e}`
        });
    }
}
exports.default = auth;
