'use strict';

// dependencies
// ------------

var Post = require('../models/post')
  , PostVote = require('../models/post_vote')
  , Board = require('../models/board')
  , views = require('../views/posts');

module.exports = {
  // pages
  // -----

  new: function(req, res, next) {
    var boardName = req.params.boardName;

    Board.findOne({ name: boardName }, function(err, board) {
      if (err) { return next(err); }

      res.view(views.new, { board: board.attrs });
    });
  }

, show: function(req, res, next) {
    var id = req.params.id;

    Post.findOne({ id: id }, function(err, post) {
      if (err) { return next(err); }

      post
      .getBoard()
      .getAuthor()
      .getComments()
      .values(function(attrs, board, author, comments) {
        res.view(views.show, {
          post: attrs
        , board: board
        , author: author
        , comments: comments
        });
      })
      .error(function(err) { next(err); });
    });
  }

  // actions
  // -------

, create: function(req, res, next) {
    var boardName = req.params.boardName
      , title = req.body.title
      , url = req.body.url
      , user = req.user;

    Board.findOne({ name: boardName }, function(err, board) {
      Post.create({
        title: title
      , url: url
      , boardId: board.id
      , authorId: user.id
      })
      .then(function(attrs) { res.redirect('/'); }) // TODO
      .error(function(err) { next(err); });
    });
  }

, upvote: function(req, res, next) {
    var postId = req.params.id
      , user = req.user;

    PostVote.create({
      postId: postId
    , voterId: user.id
    })
    .then(function(attrs) { res.redirect('/'); }) // TODO
    .error(function(err) { next(err); });
  }
};
