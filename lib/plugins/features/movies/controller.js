'use strict';

const Movie    = require('../../../models/movie');
const Location = require('../../../models/location');
const Knex     = require('../../../libraries/knex');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch({ withRelated: ['locations'] });
};

exports.associateLocation = async (params, payload) => {

  const moviePayload = { ...payload, ...params };

  await new Location().save(moviePayload);

  return new Movie({ id: params.movie_id }).fetch({ withRelated: ['locations'] });

};

exports.findAll = async (query = {}) => {
  let { title } = query; //string with or without %, % triggers fuzzy search
  const { location, release_year, start_year, end_year } = query; //(start_year and/or end_year), OR release_year

  return new Movie().query((qb) => {

    if (title) {
      title = title.toLowerCase();
      if (title.indexOf('%') > -1) {
        qb.where('title', 'ilike', title);
      } else {
        qb.whereRaw(`LOWER(title) = ?`, [title]);
      }
    }

    if (release_year) {
      qb.where('release_year', parseInt(release_year));
    } else if (start_year || end_year) {
      if (start_year && end_year) {
        qb.where('release_year', '>=', parseInt(start_year));
        qb.where('release_year', '<=', parseInt(end_year));
      } else if (start_year) {
        qb.where('release_year', '>=', parseInt(start_year));
      } else {
        qb.where('release_year', '<=', parseInt(end_year));
      }
    }

    if (location) { //Bookshelf: https://github.com/bookshelf/bookshelf/issues/834
      qb.leftJoin('locations', 'movies.id', 'locations.movie_id');
      qb.select('movies.*');
      qb.select(Knex.raw('array_agg(location) as locations'));
      qb.groupBy('movies.id');
      qb.whereIn('location', [location]);
    }

  }).fetchAll({ withRelated: 'locations' });
};
