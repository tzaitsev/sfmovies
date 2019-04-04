'use strict';

const Joi = require('joi');

const LocationValidator = require('../../lib/validators/location');

describe('location validator', () => {

  describe('movie_id', () => {

    it('is required', () => {
      const payload = { location: 'Test' };
      const params = {};
      const request = { payload, params };
      const result = Joi.validate(request, LocationValidator);
      expect(result.error.details[0].path[1]).to.eql('movie_id');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is greater than or equal to 1', () => {

      const payload = { location: 'Test' };
      const params = { movie_id: 0 };
      const request = { payload, params };

      const result = Joi.validate(request, LocationValidator);
      expect(result.error.details[0].path[1]).to.eql('movie_id');
      expect(result.error.details[0].type).to.eql('number.min');
    });

  });

  describe('location', () => {

    it('is required', () => {
      const payload = { };
      const params = { movie_id: 1 };
      const request = { payload, params };

      const result = Joi.validate(request, LocationValidator);
      expect(result.error.details[0].path[1]).to.eql('location');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is greater than 1 characters', () => {
      const payload = { location: '' };
      const params = { movie_id: 1 };
      const request = { payload, params };

      const result = Joi.validate(request, LocationValidator);
      expect(result.error.details[0].path[1]).to.eql('location');
      expect(result.error.details[0].type).to.eql('any.empty');
    });

  });

});
