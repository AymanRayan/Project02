import client from "../database";

type Order = {
    id ?: number;
    user_id : string;
    status : string; 
}

async function doQuery(sql: string , params?: (string|number|undefined)[]) {
    try{
        const conn = await client.connect();
        let result;
        if(params){
            result = await conn.query(sql,params);
        }else{
            result = await conn.query(sql);
        }
        conn.release();
     return result;
    }catch(e){
       throw new Error(`MODEL ERR: can't do that query due to: ${e}`);
    }
}

class OrderModel {
    static table ='orders_table';
    static async index() {
         try{
             const sql =`select * from ${this.table}`;
             const result = await doQuery(sql);
             return result.rows;
         }catch(e){
             throw new Error(`MODEL ERR: can't find the data due to : ${e} `);
         }
     }
     static async create(order:Order){
         try{
            const sql = `insert into ${this.table} (user_id,status) values($1,$2) RETURNING *`;
         const result = await doQuery(sql,[order.user_id,order.status]);
         return result.rows[0];
         }catch(e){
             throw new Error (`MODEL ERR: couldn't add this raw due to: ${e}`);
         }
     }
     static async show(id:string){
         try{
             const sql =`select * from ${this.table} where user_id=($1)`;
             const result = await doQuery(sql,[id]);
             return result.rows[0];  
         }catch(e){
             throw new Error (`MODEL ERR: can't find that user due to: ${e}`);
         }
     }
     static async edit(order:Order){
         try{
             const sql = `update ${this.table} set user_id = $2, status = $3 where id = $1 RETURNING *`;
             const result =await doQuery(sql,[order.id,order.user_id,order.status]);
             return result.rows[0];
         }catch(e){
            throw new Error (`MODEL ERR: can't edit that raw due to : ${e}`);
         }
     }
     static async addOrderPro(orderId : number, productId : number,quantity : number){
         try{
             const sql =`insert into order_product_table (order_id,product_id,quantitiy) values ($1,$2,$3) returning *`;
             const result = await doQuery(sql,[orderId,productId,quantity]);
             return result.rows[0];
         }catch(e){
             throw new Error (`MODEL ERR: can't addOrders due to : ${e}`);
         }
     }
     static async clearCart(){
         try{
            const sql = 'delete from order_product_table';
              await doQuery(sql);
         }catch(e){
            throw new Error (`MODEL ERR: can't clear cart due to : ${e}`);
         }
     }
     static async cleanTable(){
         try{
              const sql = `delete from ${this.table}`;
              await doQuery(sql);
         }catch(e){
            throw new Error (`MODEL ERR: can't clean data due to : ${e}`);
         }
     }
}

export default OrderModel;