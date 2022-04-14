"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("../middleware/auth"));
var order_handler_1 = __importDefault(require("../handlers/order.handler"));
var orderRoutes = express_1.default.Router();
//index
orderRoutes.get('/show', auth_1.default, order_handler_1.default.index);
//create
orderRoutes.post('/create', auth_1.default, order_handler_1.default.create);
//showOne
orderRoutes.get('/show/:id', auth_1.default, order_handler_1.default.show);
//edit
orderRoutes.put('/edit/:id', auth_1.default, order_handler_1.default.edit);
//addOrder/pro
orderRoutes.post('cart', auth_1.default, order_handler_1.default.addOrderPro);
exports.default = orderRoutes;
