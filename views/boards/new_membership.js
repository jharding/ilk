'use strict';

var base = require('../supers/layout')
  , f = require('util').format;

module.exports = base.extend({
  template: 'boards/new_membership'


, urls: function(req, locals) {
    var base = f('/i/%s', locals.board.name.toLowerCase());

    return {
      join: f('%s/join', base)
    };
  }

, board: function(req, locals) {
    return locals.board;
  }
});
