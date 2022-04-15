import  express  from "express";
import auth from "../middleware/auth";
import OrderHandler from "../handlers/order.handler";

const orderRoutes :express.Router = express.Router();

//index
orderRoutes.get('/show',auth,OrderHandler.index);

//create
orderRoutes.post('/create',auth,OrderHandler.create);

//showOne
orderRoutes.get('/show/:id',auth,OrderHandler.show);

//edit
orderRoutes.put('/edit/:id',auth,OrderHandler.edit);

//addOrder/pro
orderRoutes.post('/cart',auth,OrderHandler.addOrderPro);

//clear the cart
orderRoutes.delete('/clearAll',auth,OrderHandler.clearCart);

//clean table
orderRoutes.delete('/clean',auth,OrderHandler.cleanAll);
export default orderRoutes;