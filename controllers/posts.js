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
    var name = req.params.name;

    res.view(views.new, { board: { name: name } });
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
