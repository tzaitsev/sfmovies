'use strict';

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'Le_Test_Movie' };

      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      expect(response.result.title).to.eql(payload.title);
      expect(response.result.release_year).to.be.a('null');
    });

  });

  describe('get', () => {

    it('gets a list of movies', async () => {
      const response = await Movies.inject({
        url: '/movies',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('180');
      expect(response.result['1'].title).to.eql('24 Hours on Craigslist');
      expect(response.result.length).to.be.above(2);
    });

    it('gets a specific movie', async () => {
      const response = await Movies.inject({
        url: '/movies?title=180',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('180');
      expect(response.result.length).to.equal(1);

    });

    it('supports fuzzy titles', async () => {
      const response = await Movies.inject({
        url: '/movies?title=A Jitney%',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('A Jitney Elopement');
      expect(response.result.length).to.equal(1);
    });

    it('supports fuzzy titles and release years', async () => {
      const response = await Movies.inject({
        url: '/movies?title=%p%&release_year=1947',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('Dark Passage');
      expect(response.result['1'].title).to.eql('Nora Prentiss');
      expect(response.result.length).to.equal(2);
    });

    it('supports release years', async () => {
      const response = await Movies.inject({
        url: '/movies?release_year=1915',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('A Jitney Elopement');
      expect(response.result.length).to.equal(1);
    });

    it('supports start_year', async () => {
      const response = await Movies.inject({
        url: '/movies?start_year=2015',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('Age of Adaline');
      expect(response.result.length).to.be.above(1);
    });

    it('supports end_year', async () => {
      const response = await Movies.inject({
        url: '/movies?end_year=1915',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('A Jitney Elopement');
      expect(response.result.length).to.equal(1);
    });

    it('supports start_year and end_year', async () => {
      const response = await Movies.inject({
        url: '/movies?start_year=1927&end_year=1935',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('Barbary Coast');
      expect(response.result['1'].title).to.eql('The Jazz Singer');
      expect(response.result.length).to.equal(2);
    });

    it('supports release_year and start_year and end_year ', async () => {
      const response = await Movies.inject({
        url: '/movies?release_year=1915&start_year=1927&end_year=1935',
        method: 'GET'
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result['0'].title).to.eql('A Jitney Elopement');
      expect(response.result.length).to.equal(1);

    });

  });

});
