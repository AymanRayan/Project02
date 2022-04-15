import OrderModel from "../../models/order.model";
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

type Product = {
    id ?: number;
    the_name : string;
    price : string; 
}

type Order = {
    id ?: number;
    user_id : string;
    status : string; 
}
let order:Order;
let user1:User;
let pro:Product;
let token:string;

describe('test of order model', ()=> {
    beforeAll(async () => {
        const res = await req.post('/users/create').send({
            first_name:'super',
            last_name:"admin2",
            password:'admin2'
        });
        token = res.body;
        user1 = jwt.decode(token) as User;
       });
    beforeAll(async () => {
       const res = await req.post('/products/create').send({
           the_name:"shirt",
           price:"150"
       }).set('Authorization',token);
       pro = res.body as Product;
    })


    it('index method' ,()=>{
        expect(OrderModel.index).toBeDefined();
    });

    it('show method' ,()=>{
        expect(OrderModel.show).toBeDefined();
    });

    it('create method' ,()=>{
        expect(OrderModel.create).toBeDefined();
    });

    it('edit method' ,()=>{
        expect(OrderModel.edit).toBeDefined();
    });

    it('cart method' ,()=>{
        expect(OrderModel.addOrderPro).toBeDefined();
    });

    it('creation is worked',async () => {
        let id = user1.id?.toString() as string;
        let res = await OrderModel.create({
            user_id: id,
            status:"complete" 
        });
        order = res as Order;
        expect(res.status).toEqual('complete');
    });

    it('cart is worked',async () => {
        let orderid=order.id as number;
        let proid =pro.id as number;
        const result = await OrderModel.addOrderPro(orderid,proid,2);
        expect(result.quantitiy).toEqual(2);
    });

    it('index return all users',async () => {
        const result = await OrderModel.index();
        expect(result.length).toBeGreaterThanOrEqual(1); 
    });

    it('edit method',async () => {
        let id = user1.id?.toString() as string;
        let orderid = order.id;
        const res =await OrderModel.edit({
            id:orderid,
            user_id:id,
            status:'active'
        });
        expect(res.status).toEqual('active');
    });
    
    it('show one method',async () => {
        let id = String(user1.id);
        let result = await OrderModel.show(id);
        if(Array.isArray(result)){
            result = result[0];
        }
        expect(result.user_id).toEqual(id);
    });
});


describe('test of order endPoints', () => {
       it('create order',async () => {
           const res = await req.post('/orders/create').send({
               user_id: user1.id,
               status:'finshed'
           }).set('Authorization',token);
           order = res.body as Order;
           expect(order.status).toEqual('finshed');
       });
       it('get order by user id',async () => {
           const res = await req.get(`/orders/show/${user1.id}`).set('Authorization',token);;
           let id = user1.id?.toString() as string;
           expect(res.body.user_id).toEqual(id);
       });

});