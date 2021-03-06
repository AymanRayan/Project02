import UserModel from "../../models/users.model";
import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";

const req =supertest(app);

type User = {
    id ?: number;
    first_name : string;
    last_name : string;
    password : string;  
}
let user1:User;
describe('test of user model', ()=> {
    it('index method' ,()=>{
        expect(UserModel.index).toBeDefined();
    });

    it('show method' ,()=>{
        expect(UserModel.show).toBeDefined();
    });

    it('create method' ,()=>{
        expect(UserModel.create).toBeDefined();
    });

    it('edit method' ,()=>{
        expect(UserModel.edit).toBeDefined();
    });

    it('authinticated method' ,()=>{
        expect(UserModel.authintication).toBeDefined();
    });

    it('creation is worked',async () => {
        const res = await UserModel.create({
            first_name: "abc",
            last_name:"xyz",
            password:"123"
        });
        expect(res.first_name).toEqual('abc');
        expect(res.last_name).toEqual('xyz');
        user1 = res as User;
    });

    it('index return all users',async () => {
        const result = await UserModel.index();
        expect(result.length).toBeGreaterThanOrEqual(1); 
    });

    it('edit method',async () => {
        const user =await UserModel.edit({
            id:user1.id,
            first_name:'abc',
            last_name:'lmn',
            password:'123'
        });
        expect(user.last_name).toEqual('lmn');
    });
    it('show one method',async () => {
        let id = user1.id?.toString() as string;
        let result = await UserModel.show(id);
        if(Array.isArray(result)){
            result = result[0];
        }
        expect(result.first_name).toEqual('abc');
    });

});


describe ('test User endpoints',()=> {
     let user:User;
     let token:string;

      it('create new user',async () => {
         const res = await req.post('/users/create').send({
             first_name:"a",
             last_name:"r",
             password:'123'
         });
          token = res.body;
          user = jwt.decode(token) as User;
          expect(user.last_name).toEqual('r');
      });
     
      it('show one by id',async () => {
          const res = await req.get(`/users/show/${user.id}`).set('Authorization',token);
          expect(res.body.first_name).toEqual('a');
      });
      
      it('index users',async () => {
        const res = await req.get('/users/show').set('Authorization',token);
        expect(res.body.length).toBeGreaterThanOrEqual(1);  
      });

});