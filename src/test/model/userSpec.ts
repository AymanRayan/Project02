import UserModel from "../../models/users.model";


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
        const user = await UserModel.create({
            first_name: "abc",
            last_name:"xyz",
            password:"123"
        });
        expect(user.first_name).toEqual('abc');
        expect(user.last_name).toEqual('xyz');
    });

    it('index return all users',async () => {
        const result = await UserModel.index();
        expect(result[0].first_name).toEqual('abc'); 
    });

    it('edit method',async () => {
        const user =await UserModel.edit({
            first_name:'abc',
            last_name:'lmn',
            password:'123'
        });
        expect(user.last_name).toEqual('lmn');
    });
    it('show one method',async () => {
        let result = await UserModel.show("1");
        if(Array.isArray(result)){
            result = result[0];
        }
        expect(result.first_name).toEqual('abc');
    });


});