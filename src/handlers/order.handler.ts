import { Request , Response} from 'express';
import OrderModel from '../models/order.model';

class OrderHandler {
    static async index(req:Request , res:Response){
        try{
            const result = await OrderModel.index();
            res.json(result);
        }catch(e){
          res.status(400);
          throw new Error (`HANDEL ERR: can't handel index due to: ${e}`);
        }
    }
    static async show(req:Request , res:Response) {
        try{
            const result = await OrderModel.show(req.params.id);
            res.json(result);
        }catch(e){
            res.status(400);
            throw new Error(`HANDEL ERR: can't handel the show due to: ${e}`);
        }
    }
    static async create(req:Request , res:Response){
         try{
             const result = await OrderModel.create({
                 user_id: req.body.user_id,
                 status: req.body.status
             });
             res.json(result);
         }catch(e){
             throw new Error(`HANDEL ERR: can't handel the create due to: ${e}`);
         }
    }
    static async edit(req:Request , res:Response){
        try{
            await OrderModel.edit({
                id: parseInt(req.params.id),
                user_id: req.body.user_id,
                status: req.body.status
            });
        }catch(e){
            throw new Error(`HANDEL ERR: can't handel the edit due to : ${e}`);
        }
    }
    static async addOrderPro(req:Request,res:Response){
        try{
            const orderId = req.body.order_id;
            const productId = req.body.product_id;
            const quantity= req.body.quantitiy;
            const result = await OrderModel.addOrderPro(orderId,productId,quantity);
            res.json(result); 
        }catch(e){
            throw new Error(`HANDEL ERR: can't handel add order/pro due to : ${e}`);
        }
    }
 }
 
 export default OrderHandler;