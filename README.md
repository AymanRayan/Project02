# Storefront Backend Project

## first enviroment

create folder named '.env' contains:-

==============
### .env file data

- ENV=dev
- POSTGRES_HOST=127.0.0.1
- PORT=5432
- POSTGRES_DB=thestore
- POSTGRES_TEST=test
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=ayman
- SALT=10
- BCRYPT=more_secure
- TOKEN=ahfkabv


=============

## Setting postgresql

1. Download postgresql.
2. throw cmd open psql
3. ##### postgres user
 - login to psql as postgres user psql -U postgres password ayman ||
 - `CREATE user postgres WITH PASSWORD 'ayman';`
4. CREATE DATABASE thestore;
5. CREATE DATABASE test;
6. @ database.jason set the eniroment connection to dev enviroment and test enviroment
7. in database.ts the connection to psql by using pg packages
8. db-migrate from npm for migrations
9. now can create tables by `npx db-migrate create tablename --sql-file`
10. @ files up write create table by required schema @ down drop the creation
notes:
- for up can use `npm run migration:up`
- for down can use `npm run migration:down`

### install modules

`npm i install`

###  Run the tests

`npm run test` 
###### what this line do is:-
- set the ENV to equal test 
- build server // notice that this will console log the database name
- then migrate up for test env 
- ..now ready to run jasmine 
- after all reset the migration.


==================
#### can user api for clear data by Postman
to clear data use postman Api by these routes

[delete] (/{orders,users,products}/clean) after using (/orders/clearAll) to delete cart table
    
### build
1. `npm run build`  to build the server
2. `npm run start`  to run the server

### keep in mind that
- db port is 5432
- server listening to `0.0.0.0:3000` // consoled log after the start.

##### try this
- Create [post] `0.0.0.0:3000/users/create` can use orders/products instesd of users
- Index  [get]  `0.0.0.0:3000/users/show`  can use orders/products instesd of users
- showOne [get]  `0.0.0.0:3000/users/show/:id` can use orders/products instesd of users
 
