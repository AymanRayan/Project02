import client from "../database";

type Product = {
    id ?: number;
    name : string;
    price : string; 
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


 class ProductModel {
     static table ='products_table';
     static async index() {
          try{
              const sql =`select * from ${this.table}`;
              const result = await doQuery(sql);
              return result.rows;
          }catch(e){
              throw new Error(`MODEL ERR: can't find the data due to : ${e} `);
          }
      }
      static async create(product:Product){
          try{
             const sql = `insert into ${this.table} (name,price) values($1,$2) RETURNING *`;
          const result = await doQuery(sql,[product.name,product.price]);
          return result.rows[0];
          }catch(e){
              throw new Error (`MODEL ERR: couldn't add this raw due to: ${e}`);
          }
      }
      static async show(id:string){
          try{
              const sql =`select * from ${this.table} where id=($1)`;
              const result = await doQuery(sql,[id]);
              return result.rows[0];  
          }catch(e){
              throw new Error (`MODEL ERR: can't find that user due to: ${e}`);
          }
      }
      static async edit(product:Product){
          try{
              const sql = `update ${this.table} set name = $2, price = $3 where id = $1 RETURNING *`;
              const result =await doQuery(sql,[product.id,product.name,product.price]);
              return result.rows[0];
          }catch(e){
             throw new Error (`MODEL ERR: can't edit that raw due to : ${e}`);
          }
      }
   
}

export default ProductModel;