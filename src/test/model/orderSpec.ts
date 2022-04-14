import OrderModel from "../../models/order.model";
import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
const req =supertest(app);

describe('test of order model', ()=> {
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
        const order = await OrderModel.create({
            user_id: "1",
            status:"complete" 
        });
        expect(order.status).toEqual('complete');
    });

    it('cart is worked',async () => {
        const result = await OrderModel.addOrderPro(1,1,2);
        expect(result.order_id).toEqual('1');
        expect(result.product_id).toEqual('1');
        expect(result.quantitiy).toEqual(2);
    });

    it('index return all users',async () => {
        const result = await OrderModel.index();
        expect(result[0].user_id).toEqual('1'); 
    });

    it('edit method',async () => {
        const order =await OrderModel.edit({
            id:1,
            user_id:'1',
            status:'active'
        });
        expect(order.status).toEqual('active');
    });
    
    it('show one method',async () => {
        let result = await OrderModel.show("1");
        if(Array.isArray(result)){
            result = result[0];
        }
        expect(result.user_id).toEqual('1');
    });
});


// describe('test of order endPoints', () => {
       
// });