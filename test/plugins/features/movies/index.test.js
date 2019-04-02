'use strict';

const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', async () => {
      const payload = { title: 'Le_film' };

      const response = await Movies.inject({
        url: '/movies',
        method: 'POST',
        payload
      });

      expect(response.statusCode).to.eql(200);
      expect(response.result.object).to.eql('movie');
      expect(response.result.title).to.eql(payload.title);
      expect(response.result.release_year).to.be.null;

    });

  });

});
