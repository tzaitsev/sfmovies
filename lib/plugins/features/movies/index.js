'use strict';

const MovieValidator = require('../../../validators/movie');
const Controller     = require('./controller');

exports.register = (server, options, next) => {

  server.route([{
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
