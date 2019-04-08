'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  idAttribute: null,
  tableName: 'locations',
  serialize: function () {
    return {
      movie_id: this.get('movie_id'),
      location: this.get('location')
    };
  }
});
