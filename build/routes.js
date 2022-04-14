"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var product_routes_1 = __importDefault(require("./routes/product.routes"));
var order_routes_1 = __importDefault(require("./routes/order.routes"));
var routes = express_1.default.Router();
routes.use('/users', user_routes_1.default);
routes.use('/products', product_routes_1.default);
routes.use('/orders', order_routes_1.default);
exports.default = routes;
