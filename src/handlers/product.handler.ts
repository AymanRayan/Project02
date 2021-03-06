import { Request , Response} from 'express';
import jwt from 'jsonwebtoken';
import ProductModel from '../models/product.model';

class ProductHandler {
   static async index(req:Request , res:Response){
       try{
           const result = await ProductModel.index();
           res.json(result);
       }catch(e){
         res.status(400);
         throw new Error (`HANDEL ERR: can't handel index due to: ${e}`);
       }
   }
   static async show(req:Request , res:Response) {
       try{
           const result = await ProductModel.show(req.params.id);
           res.json(result);
       }catch(e){
           res.status(400);
           throw new Error(`HANDEL ERR: can't handel the show due to: ${e}`);
       }
   }
   static async create(req:Request , res:Response){
        try{
            const result = await ProductModel.create({
                the_name: req.body.the_name,
                price: req.body.price
            });
            // const op =jwt.sign(result, process.env.TOKEN as string);
            res.json(result);
        }catch(e){
            throw new Error(`HANDEL ERR: can't handel the create due to: ${e}`);
        }
   }
   static async edit(req:Request , res:Response){
       try{
           await ProductModel.edit({
               id: parseInt(req.params.id),
               the_name: req.body.the_name,
               price: req.body.price
           });
       }catch(e){
           throw new Error(`HANDEL ERR: can't handel the edit due to : ${e}`);
       }
   }
   static async cleanAll(req:Request , res:Response) {
       try{
           await ProductModel.cleanTable();
       }catch(e){
        throw new Error(`HANDEL ERR: can't handel the clean all due to : ${e}`);
       } 
   }

}

export default ProductHandler;