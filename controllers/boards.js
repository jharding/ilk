'use strict';

// dependencies
// ------------

var Board = require('../models/board')
  , views = require('../views/boards')
  , f = require('util').format;

module.exports = {
  // pages
  // -----

  show: function(req, res, next) {
    var name = req.params.name;

    Board.findOne({ name: name }, function(err, board) {
      if (err) { return next(err); }

      board
      .getPosts()
      .value(function(posts) {
        res.view(views.show, { board: board.attrs, posts: posts });
      })
      .error(function(err) { next(err); });
    });
  }

, newMembership: function(req, res, next) {
    var name = req.params.name;

    Board.findOne({ name: name }, function(err, board) {
      if (err) { return next(err); }

      board
      .value(function(attrs) {
        res.view(views.newMembership, { board: attrs });
      })
      .error(function(err) { next(err); });
    });
  }

  // actions
  // -------

, createMembership: function(req, res, next) {
    var user = req.user
      , boardName = req.params.name
      , boardId = req.body.board.id
      , username = req.body.username;

    user
    .joinBoard(boardId, username)
    .value(function() { res.redirect(f('/i/%s', boardName)); })
    .error(function(err) { next(err); });
  }
};
