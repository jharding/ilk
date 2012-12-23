'use strict';

var base = require('../supers/layout')
  , f = require('util').format;

module.exports = base.extend({
  template: 'posts/new'

, title: function(req, locals) {
    return f('Submit | %s', locals.board.name);
  }

, board: function(req, locals) {
    var board = locals.board;

    return {
      id: board.id
    , name: board.name
    , description: board.description
    };
  }
});
