"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middleware/auth"));
var user_handler_1 = __importDefault(require("../handlers/user.handler"));
var userRoutes = express_1.default.Router();
//index
userRoutes.get('/show', auth_1.default, user_handler_1.default.index);
//create
userRoutes.post('/create', user_handler_1.default.create);
//showOne
userRoutes.get('/show/:id', auth_1.default, user_handler_1.default.show);
//edit
userRoutes.put('/edit/:id', auth_1.default, user_handler_1.default.edit);
exports.default = userRoutes;
