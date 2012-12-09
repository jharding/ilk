'use strict';

var base = require('../supers/layout')
  , f = require('util').format
  , url = require('url');

module.exports = base.extend({
  template: 'boards/show'


, urls: function(req, locals) {
    var base = f('/i/%s', locals.board.name.toLowerCase());

    return {
      join: f('%s/join', base)
    , submit: f('%s/submit', base)
    };
  }

, name: function(req, locals) {
    return locals.board.name;
  }

, description: function(req, locals) {
    return locals.board.description;
  }

, posts: function(req, locals) {
    return locals.posts.map(function(post) {
      post.source = url.parse(post.url).hostname;
      post.comments_url = f('/posts/%d', post.id);

      return post;
    });
  }
});
