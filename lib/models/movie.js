'use strict';

const Bookshelf = require('../libraries/bookshelf');
const Location  = require('./location');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  locations: function () {
    return this.hasMany(Location);
  },
  serialize: function () {
    return {
      id: this.get('id'),
      title: this.get('title'),
      release_year: this.get('release_year'),
      object: 'movie',
      locations: this.related('locations').map((location) => location.serialize().location)
    };
  }
});
