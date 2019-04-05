'use strict';

exports.up = async (Knex) => {
  await Knex.schema.createTable('locations', (table) => {
    table.integer('movie_id').notNullable();
    table.text('location').notNullable();
  });
};

exports.down = async (Knex) => {
  await Knex.schema.dropTable('locations');
};
