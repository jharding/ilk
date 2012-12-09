'use strict';

var base = require('../supers/layout')
  , f = require('util').format;

module.exports = base.extend({
  template: 'posts/show'

, comments: function(req, locals) {
    return locals.comments;
  }
});
