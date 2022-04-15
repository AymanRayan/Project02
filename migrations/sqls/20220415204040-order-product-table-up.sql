create table order_product_table(
    id serial primary key,
    order_id bigint references orders_table(id),
    product_id bigint references products_table(id),
    quantitiy integer);