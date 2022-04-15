CREATE TABLE orders_table(
    id SERIAL PRIMARY KEY, 
    user_id BIGINT REFERENCES users_table(id),
    status VARCHAR (50));