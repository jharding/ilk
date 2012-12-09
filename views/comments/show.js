'use strict';

var base = require('../supers/layout')
  , f = require('util').format;

module.exports = base.extend({
  template: 'comments/show'

, content: function(req, locals) {
    return locals.comment.content;
  }
});
