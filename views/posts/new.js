'use strict';

var base = require('../supers/layout');

module.exports = base.extend({
  template: 'posts/new'

, board: function(req, locals) {
    return locals.board;
  }
});
