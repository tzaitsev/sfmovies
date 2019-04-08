'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'WooTMovies!' };
      const movie = await Controller.create(payload);
      expect(movie.get('title')).to.eql(payload.title);
    });

  });

  describe('associates a location to a movie', () => {

    it('creates a movie and associates a location', async () => {
      const payload = { title: 'TestLocationMovies!' };
      const movie = await Controller.create(payload);
      const movieWithLocation = await Controller.associateLocation({ movie_id: movie.id }, { location: 'San Francisco' });
      expect(movieWithLocation.serialize().locations).to.include('San Francisco');
    });

  });

  describe('get', () => {

    it('returns a list of movies if no query params are passed', async () => {
      const movies = await Controller.findAll();
      expect(movies.models['0'].attributes.title).to.eql('180');
      expect(movies.models['1'].attributes.title).to.eql('24 Hours on Craigslist');
      expect(movies.models.length).to.be.above(1);
    });

    it('returns a list of one movie if it is an exact title match to a query parameter', async () => {
      const movies = await Controller.findAll({ title: '180' });
      expect(movies.models['0'].attributes.title).to.eql('180');
      expect(movies.models.length).to.equal(1);
    });

    it('returns a specific movie if it is an exact release_year match to a query parameter', async () => {
      const movies = await Controller.findAll({ release_year: '1915' });
      expect(movies.models['0'].attributes.title).to.eql('A Jitney Elopement');
      expect(movies.models.length).to.equal(1);
    });

    it('returns a list of movies with a fuzzy title', async () => {
      const movies = await Controller.findAll({ release_year: '1947', title: '%p%' });
      expect(movies.models['0'].attributes.title).to.eql('Dark Passage');
      expect(movies.models['1'].attributes.title).to.eql('Nora Prentiss');
      expect(movies.models.length).to.equal(2);
    });

    it('returns a list of movies with a start_year', async () => {
      const movies = await Controller.findAll({ start_year: 2015 });
      expect(movies.models['0'].attributes.title).to.eql('Age of Adaline');
      expect(movies.models.length).to.be.above(1);
    });

    it('returns a list of movies with an end_year', async () => {
      const movies = await Controller.findAll({ end_year: 1915 });
      expect(movies.models['0'].attributes.title).to.eql('A Jitney Elopement');
      expect(movies.models.length).to.equal(1);
    });

    it('returns a list of movies with a release_year', async () => {
      const movies = await Controller.findAll({ release_year: 1915 });
      expect(movies.models['0'].attributes.title).to.eql('A Jitney Elopement');
      expect(movies.models.length).to.equal(1);
    });

    it('returns a list of movies with a start_year and end_year', async () => {
      const movies = await Controller.findAll({ start_year: 1927, end_year: 1935 });
      expect(movies.models['0'].attributes.title).to.eql('Barbary Coast');
      expect(movies.models['1'].attributes.title).to.eql('The Jazz Singer');
      expect(movies.models.length).to.equal(2);
    });

    it('returns a list of movies with a location', async () => {
      const movies = await Controller.findAll({ location: 'San Francisco' });
      expect(movies.models['0'].attributes.title).to.eql('180');
      expect(movies.models['1'].attributes.title).to.eql('24 Hours on Craigslist');
      expect(movies.models.length).to.equal(3);
    });

  });

});
