'use strict';

const Movie = require('../../lib/models/movie');

describe('movie model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const movie = Movie.forge();

      expect(movie.serialize()).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'locations',
        'object'
      ]);
    });

  });

});
