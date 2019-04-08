'use strict';

const Joi = require('joi');

module.exports = {
  payload: { location: Joi.string().min(1).required() },
  params: { movie_id: Joi.number().integer().min(1).required() }
};
