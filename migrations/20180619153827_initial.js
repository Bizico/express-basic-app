exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("shopping_list", table => {
      table.increments("id").primary();
      table.string("name");
      table.integer("qty").defaultTo(0);
      table.float("price").defaultTo(1);
      table.string("barcode");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("shopping_list")]);
};
