'use strict';

var base = require('../supers/layout')
  , f = require('util').format;

module.exports = base.extend({
  template: 'posts/show'

, create_comment_url: function(req, locals) {
    return f('/posts/%d/comment', locals.post.id);
  }

, comments: function(req, locals) {
    return locals.comments;
  }
});
