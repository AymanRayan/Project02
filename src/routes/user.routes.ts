import  express  from "express";
import auth from "../middleware/auth";
import UserHandler from "../handlers/user.handler";

const userRoutes :express.Router = express.Router();

//index
userRoutes.get('/show',auth,UserHandler.index);

//create
userRoutes.post('/create',UserHandler.create);

//showOne
userRoutes.get('/show/:id',auth,UserHandler.show);

//edit
userRoutes.put('/edit/:id',auth,UserHandler.edit);


export default userRoutes;