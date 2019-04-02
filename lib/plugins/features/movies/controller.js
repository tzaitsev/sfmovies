'use strict';

const Movie = require('../../../models/movie');

exports.create = async (payload) => {
  const movie = await new Movie().save(payload);

  return new Movie({ id: movie.id }).fetch();
};

exports.findAll = async (query = {}) => {
  let title = query.title; //string with or without %, % triggers fuzzy search
  const { release_year, start_year, end_year } = query; //(start_year and/or end_year), OR release_year

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
  }).fetchAll();
};
