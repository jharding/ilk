'use strict';

// dependencies
// ------------

var Board = require('../models/board')
  , views = require('../views/boards')
  , f = require('util').format;

module.exports = {
  // pages
  // -----

  showTop: function(req, res, next) {
    var args = [].slice.call(arguments, 0);
    args.unshift('top');

    show.apply(this, args);
  }

, showActive: function(req, res, next) {
    var args = [].slice.call(arguments, 0);
    args.unshift('active');

    show.apply(this, args);
  }

, showNew: function(req, res, next) {
    var args = [].slice.call(arguments, 0);
    args.unshift('new');

    show.apply(this, args);
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

// helper functions
// ----------------

function show(algorithm, req, res, next) {
  var name = req.params.name
    , user = req.user;

  Board.findOne({ name: name }, function(err, board) {
    if (err) { return next(err); }

    board
    .getPosts({
      algorithm: algorithm
    , includeVotesForUser: user && { userId: user.id }
    })
    .value(function(posts) {
      res.view(views.show, {
        algorithm: algorithm
      , board: board.attrs
      , posts: posts
      });
    })
    .error(function(err) { next(err); });
  });
}

