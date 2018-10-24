
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('factories', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('lower_bound');
      table.integer('upper_bound');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('children', function (table) {
      table.increments('id').primary();
      table.integer('rand_value');
      table.integer('factory_id').unsigned()
      table.foreign('factory_id')
        .references('factories.id');

      table.timestamps(true, true);
    })
  ]) 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('factories'),
    knex.schema.dropTable('children')
  ]); 
};
