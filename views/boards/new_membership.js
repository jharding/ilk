'use strict';

var base = require('../supers/layout')
  , f = require('util').format;

module.exports = base.extend({
  template: 'boards/new_membership'

, title: function(req, locals) {
    return f('Join %s', locals.board.name);
  }

, description: function(req, locals) {
    return f('Join the %s board on Ilk', locals.board.name);
  }

, urls: function(req, locals) {
    var base = f('/i/%s', locals.board.name.toLowerCase());

    return {
      join: f('%s/join', base)
    };
  }

, board: function(req, locals) {
    var board = locals.board;

    return {
      id: board.id
    , name: board.name
    , description: board.description
    , createdAt: board.createdAt // TODO: format timestamp
    };
  }
});
