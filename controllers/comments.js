'use strict';

// dependencies
// ------------

var Comment = require('../models/comment')
  , views = require('../views/comments')
  , f = require('util').format;

module.exports = {
  // pages
  // -----

  show: function(req, res, next) {
    var id = req.params.id;

    Comment.findOne({ id: id }, function(err, comment) {
      if (err) { return next(err); }

      comment
      .then(function(attrs) {
        res.view(views.show, { comment: attrs });
      })
      .error(function(err) { next(err); });
    });
  }

  // actions
  // -------

, create: function(req, res, next) {
    var content = req.body.comment.content
      , postId = req.params.postId
      , user = req.user;

    Comment.create({
      content: content
    , postId: postId
    , authorId: user.id
    })
    .then(function(attrs) { res.redirect(f('/posts/%d', postId)); })
    .error(function(err) { next(err); });
  }
};
