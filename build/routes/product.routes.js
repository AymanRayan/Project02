"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middleware/auth"));
var product_handler_1 = __importDefault(require("../handlers/product.handler"));
var productsRoutes = express_1.default.Router();
//index
productsRoutes.get('/show', product_handler_1.default.index);
//create
productsRoutes.post('/create', auth_1.default, product_handler_1.default.create);
//showOne
productsRoutes.get('/show/:id', product_handler_1.default.show);
//edit
productsRoutes.put('/edit/:id', auth_1.default, product_handler_1.default.edit);
//clean table
productsRoutes.delete('/clean', auth_1.default, product_handler_1.default.cleanAll);
exports.default = productsRoutes;
