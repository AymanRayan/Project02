import express from 'express';
import userRoutes from './routes/user.routes';
import productsRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
const routes: express.Router = express.Router();

routes.use('/users',userRoutes);
routes.use('/products',productsRoutes);
routes.use('/orders',orderRoutes);

export default routes;