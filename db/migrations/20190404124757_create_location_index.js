'use strict';

const INDEX_NAME = 'location_movie_id_unique_idx';

exports.up = async (Knex) => {
  await Knex.raw(`
    CREATE UNIQUE INDEX CONCURRENTLY ${INDEX_NAME} ON  locations (movie_id,location)
  `);
};

exports.down = async (Knex) => {
  await Knex.raw(`
      DROP INDEX CONCURRENTLY ${INDEX_NAME}
    `);
};

exports.config = {
  transaction: false
};
