import client from "../database";
import bcrypt from 'bcrypt';

type User = {
    id ?: number;
    first_name : string;
    last_name : string;
    password : string;  
}

const salt:number=parseInt(process.env.SALT as string );
const pepper:string = process.env.BCRYPT as string;

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
       throw new Error(`can't do that query due to: ${e}`);
    }
}


 class UserModel {
     static table ='users_table';
     static async index() {
          try{
              const sql =`select * from ${this.table}`;
              const result = await doQuery(sql);
              return result.rows;
          }catch(e){
              throw new Error(`MODEL ERR: can't find the data due to : ${e} `);
          }
      }
     static async create(user:User){
          const hash = bcrypt.hashSync(
              user.password +pepper,salt);
          try{
             const sql = `insert into ${this.table} (first_name,last_name,password) values($1,$2,$3) RETURNING *`;
          const result = await doQuery(sql,[user.first_name,user.last_name,hash]);
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
      static async edit(user:User){
          const hash = bcrypt.hashSync(user.password+pepper,salt)
          try{
              const sql = `update ${this.table} set first_name = $2, last_name = $3, password = $4 where id = $1 RETURNING *`;
              const result =await doQuery(sql,[user.id,user.first_name,user.last_name,hash ]);
              return result.rows[0];

          }catch(e){
             throw new Error (`MODEL ERR: can't edit that raw due to : ${e}`);
          }
      }
      static async authintication(first_name:string,password: string){
           let result;
           try{
               const sql = `select * from ${this.table} where first_name=($1)`;
               result = await doQuery(sql,[first_name]);

           }catch(e){
               result = null;
               throw new Error (`MODEL ERR: can't find the user due to: ${e}`);
           }
           if(!result.rows.length){
               return null;
           }else{
               const user = result.rows[0];
               if(!bcrypt.compareSync(password + pepper,user.password)){
                   return null
               }else{
                   return user;
               }
           }
      }
}

export default UserModel;