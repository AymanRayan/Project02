# Storefront Backend Project

## first enviroment

create folder named '.env' contains:-

==============

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=thestore
POSTGRES_USER=postgres
POSTGRES_PASSWORD=ayman
SALT=10
BCRYPT=more_secure
TOKEN=ahfkabv


=============

## Setting postgresql
Your application must make use of the following libraries:
1. Download postgresql.
2. throw cmd open psql
3. in database.ts the connection to psql by using pg packages
4. db-migrate from npm for migrations
5. by db-migrate created folders for [up] and [down] tables


## install modules

`npm i install`

###  Run the tests

`npm run test` 

build server and run jasmine and store data at thestore database

to clear data use postman Api by these routes

[delete] (/{orders,users,products}/clean) after using (/orders/clearAll) to delete cart table
    
### build
1. `npm run build`  to build the server
2. `npm run start`  to run the server

### keep in mind that
- db port is 5432
- server listening to `0.0.0.0:3000`

##### try this
- Create [post] `0.0.0.0:3000/users/create` can use orders/products instesd of users
- Index  [get]  `0.0.0.0:3000/users/show`  can use orders/products instesd of users
- showOne [get]  `0.0.0.0:3000/users/show/:id` can use orders/products instesd of users
 
