import ProductModel from "../../models/product.model";
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

let pro:Product;
describe('test of products model', ()=> {
    it('index method' ,()=>{
        expect(ProductModel.index).toBeDefined();
    });

    it('show method' ,()=>{
        expect(ProductModel.show).toBeDefined();
    });

    it('create method' ,()=>{
        expect(ProductModel.create).toBeDefined();
    });

    it('edit method' ,()=>{
        expect(ProductModel.edit).toBeDefined();
    });

    it('creation is worked',async () => {
        const res = await ProductModel.create({
            the_name: "abc",
            price:"111" 
        });
        expect(res.the_name).toEqual('abc');
        expect(res.price).toEqual('111');
        pro = res as Product;
    });

    it('index return all users',async () => {
        const result = await ProductModel.index();
        expect(result.length).toBeGreaterThanOrEqual(1); 
    });

    it('edit method',async () => {
        const res =await ProductModel.edit({
            id:pro.id,
            the_name:'abc',
            price:'222'
        });
        expect(res.price).toEqual('222');
    });

    it('show one method',async () => {
        let id = pro.id?.toString() as string;
        let result = await ProductModel.show(id);
        if(Array.isArray(result)){
            result = result[0];
        }
        expect(result.the_name).toEqual('abc');
    });
    
});


describe('test product handler', ()=> {
    let token : string;
    let user : User;
    let product :Product;
      beforeAll(async () => {
          const res = await req.post('/users/create').send({
              first_name:'super',
              last_name:"admin",
              password:'admin'
          });
          token = res.body;
          user = jwt.decode(token) as User;
      });

      it('create product by super admin',async () => {
          let res = await req.post('/products/create').send({
              the_name:"desk",
              price:'1000'
          }).set('Authorization',token);
          product = res.body as Product;
          expect(product.price).toEqual('1000'); 
      });

      it('index products',async () => {
             const res = await req.get('/products/show');
             expect(res.body.length).toBeGreaterThanOrEqual(1);          
      });

      it('show one product',async () => {
          const res = await req.get(`/products/show/${product.id}`);
          expect(res.body.the_name).toEqual('desk');
      });
});