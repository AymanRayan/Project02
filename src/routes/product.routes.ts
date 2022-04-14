import express from 'express';
import auth from "../middleware/auth";
import ProductHandler from '../handlers/product.handler';

const productsRoutes :express.Router = express.Router();

//index
productsRoutes.get('/show',ProductHandler.index);

//create
productsRoutes.post('/create',auth,ProductHandler.create);

//showOne
productsRoutes.get('/show/:id',ProductHandler.show);

//edit
productsRoutes.put('/edit/:id',auth,ProductHandler.edit);


export default productsRoutes;