'use strict';

var base = require('../supers/layout')
  , f = require('util').format
  , url = require('url');

module.exports = base.extend({
  template: 'boards/show'

, page: function(req, locals) {
    return {
      isTop: locals.algorithm === 'top'
    , isActive: locals.algorithm === 'active'
    , isNew: locals.algorithm === 'new'
    , isSubmit: locals.algorithm === undefined
    };
  }

, urls: function(req, locals) {
    var base = f('/i/%s', locals.board.name.toLowerCase());

    return {
      canonical: base
    , join: f('%s/join', base)
    , submit: f('%s/submit', base)
    , top: f('%s/top', base)
    , new: f('%s/new', base)
    , active: f('%s/active', base)
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
      post.commentsUrl = f('/posts/%d', post.id);

      return post;
    });
  }
});
