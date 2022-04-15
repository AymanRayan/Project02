import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const{
    PORT,
    POSTGRES_HOST,
    POSTGRES_TEST, 
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env;
let Db;
if(ENV === "test"){
    Db =POSTGRES_TEST;
}else{
    Db =POSTGRES_DB;
}

console.log(`you are in ${Db} database`);

const client = new Pool({
    port:parseInt(PORT as string),
    host: POSTGRES_HOST,
    database: Db,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
client.on('error',(error) => {
   console.error(error.message);
});


export default client;