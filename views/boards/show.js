'use strict';

var base = require('../supers/layout')
  , f = require('util').format
  , url = require('url')
  , relativeDate = require('relative-date');

module.exports = base.extend({
  template: 'boards/show'

, title: function(req, locals) {
    return locals.board.name;
  }

, description: function(req, locals) {
    return locals.board.description;
  }

, nav: function(req, locals) {
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

, board: function(req, locals) {
    var board = locals.board;

    return {
      id: board.id
    , name: board.name
    , description: board.description
    , createdAt: board.createdAt // TODO: format timestamp
    };
  }

, posts: function(req, locals) {
    return locals.posts.map(function(post) {
      post.source = url.parse(post.url).hostname;
      post.commentsUrl = f('/posts/%d', post.id);
      post.createdAt = relativeDate(post.createdAt);

      return post;
    });
  }
});
