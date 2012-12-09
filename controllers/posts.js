'use strict';

// dependencies
// ------------

var Post = require('../models/post')
  , Board = require('../models/board')
  , views = require('../views/posts');

module.exports = {
  // pages
  // -----

  new: function(req, res, next) {
    var boardName = req.params.boardName;

    res.view(views.new, { board: { name: boardName } });
  }

, show: function(req, res, next) {
    var id = req.params.id;

    Post.findOne({ id: id }, function(err, post) {
      if (err) { return next(err); }

      post
      .getComments()
      .value(function(comments) {
        res.view(views.show, { post: post.attrs, comments: comments });
      })
      .error(function(err) { next(err); });
    });
  }

  // actions
  // -------

, create: function(req, res, next) {
    var boardName = req.params.name
      , title = req.body.title
      , url = req.body.url
      , user = req.user;

    Board.findOne({ name: boardName }, function(err, board) {
      Post.create({
        title: title
      , url: url
      , boardId: board.attrs.id
      , authorId: user.attrs.id
      })
      .value(function(attrs) { res.redirect('/'); })
      .error(function(err) { next(err); });
    });
  }
};
