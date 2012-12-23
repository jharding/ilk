'use strict';

// dependencies
// ------------

var Comment = require('../models/comment')
  , f = require('util').format;

module.exports = {
  // actions
  // -------

 create: function(req, res, next) {
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
