'use strict';

var base = require('../supers/layout')
  , f = require('util').format
  , url = require('url')
  , relativeDate = require('relative-date');

module.exports = base.extend({
  template: 'posts/show'

, title: function(req, locals) {
    return locals.post.title;
  }

, urls: function(reqs, locals) {
    return {
      createComment: f('/posts/%d/comment', locals.post.id)
    };
  }

, post: function(req, locals) {
    var post = locals.post;

    return {
      title: post.title
    , url: post.url
    , source: url.parse(post.url).hostname
    , upvotes: post.upvotes
    , commentCount: post.commentCount
    , createdAt: relativeDate(post.createdAt)
    };
  }

, board: function(req, locals) {
    var board = locals.board;

    return {
      id: board.id
    , name: board.name
    };
  }

, author: function(req, locals) {
    var author = locals.author;

    return {
      id: author.userId
    , name: author.username
    };
  }

, comments: function(req, locals) {
    return locals.comments.map(function(comment) {
      return {
        id: comment.id
      , content: comment.content
      , upvotes: comment.upvotes
      , createdAt: relativeDate(comment.createdAt)
      , author: {
          id: comment.authorId
        }
      };
    });
  }
});
