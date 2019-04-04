'use strict';

const MovieValidator    = require('../../../validators/movie');
const LocationValidator = require('../../../validators/location');
const Controller        = require('./controller');

exports.register = (server, options, next) => {

  server.route([
    {
      method: 'POST',
      path: '/movies/{movie_id}/locations',
      config: {
        handler: (request, reply) => {
          reply(Controller.associateLocation(request.params, request.payload));
        },
        validate: LocationValidator
      }
    },
    {
      method: 'POST',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.create(request.payload));
        },
        validate: {
          payload: MovieValidator
        }
      }
    },
    {
      method: 'GET',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.findAll(request.query));
        }
      }
    }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
