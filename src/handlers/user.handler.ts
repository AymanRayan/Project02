import { Request , Response} from 'express';
import jwt from 'jsonwebtoken';
import UserModel  from '../models/users.model';

class UserHandler {
   static async index(req:Request , res:Response){
       try{
           const result = await UserModel.index();
           res.json(result);
       }catch(e){
         res.status(400);
         throw new Error (`HANDEL ERR: can't handel index due to: ${e}`);
       }
   }
   static async show(req:Request , res:Response) {
       try{
           const result = await UserModel.show(req.params.id);
           res.json(result);
       }catch(e){
           res.status(400);
           throw new Error(`HANDEL ERR: can't handel the show due to: ${e}`);
       }
   }
   static async create(req:Request , res:Response){
        try{
            const result = await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            });
            const op =jwt.sign(result, process.env.TOKEN as string);
            res.json(op);
        }catch(e){
            throw new Error(`HANDEL ERR: can't handel the create due to: ${e}`);
        }
   }
   static async edit(req:Request , res:Response){
       try{
           await UserModel.edit({
               id: parseInt(req.params.id),
               first_name: req.body.first_name,
               last_name: req.body.last_name,
               password: req.body.password
           });
       }catch(e){
           throw new Error(`HANDEL ERR: can't handel the edit due to : ${e}`);
       }
   }

   static async authentication(req: Request , res: Response){
       try{
            const result = await UserModel.authintication(req.body.first_name,req.body.password);
            const op =jwt.sign(result, process.env.TOKEN as string);
            res.json(op);
       }catch(e){
           throw new Error(`HANDEL ERR: can't handel the authentication due to : ${e}`);
       }
   }
   static async cleanAll(req:Request , res:Response) {
    try{
        await UserModel.cleanTable();
    }catch(e){
     throw new Error(`HANDEL ERR: can't handel the clean all due to : ${e}`);
    } 
}

}

export default UserHandler;