'use strict';

var base = require('../supers/layout')
  , f = require('util').format;

module.exports = base.extend({
  template: 'posts/show'

, urls: function(reqs, locals) {
    return {
      createComment: f('/posts/%d/comment', locals.post.id)
    }
  }

, comments: function(req, locals) {
    return locals.comments;
  }
});
