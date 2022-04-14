import ProductModel from "../../models/product.model";


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
        const pro = await ProductModel.create({
            the_name: "abc",
            price:"111" 
        });
        expect(pro.the_name).toEqual('abc');
        expect(pro.price).toEqual('111');
    });

    it('index return all users',async () => {
        const result = await ProductModel.index();
        expect(result[0].the_name).toEqual('abc'); 
    });

    it('edit method',async () => {
        const pro =await ProductModel.edit({
            id:1,
            the_name:'abc',
            price:'222'
        });
        expect(pro.price).toEqual('222');
    });

    it('show one method',async () => {
        let result = await ProductModel.show("1");
        if(Array.isArray(result)){
            result = result[0];
        }
        expect(result.the_name).toEqual('abc');
    });


});


// describe('test product handler', ()=> {

// });