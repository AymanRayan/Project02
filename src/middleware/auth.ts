import { NextFunction, Request,Response } from "express";
import jwt from 'jsonwebtoken';

async function auth(req: Request , res: Response, next: NextFunction) {
    try{
        const header= req.headers.authorization as string;
        const arr= header?.split(' ');
        let token:string;
        if(arr?.length > 1){
           token = arr[1];
        }else{
            token = header;
        }
        jwt.verify(token,process.env.TOKEN as string);
        next();
    }catch(e){
        res.status(401).send({
            message:`UnAuthorized due to : ${e}`
        })
    }
}

export default auth;