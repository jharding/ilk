// dependencies
// ------------

var Board = require('../models/board')
  , views = require('../views/boards');

module.exports = {
  // pages
  // -----

  show: function(req, res, next) {
    var name = req.params.name;

    Board.findOne({ name: name }, function(err, board) {
      if (err) { return next(err); }

      board
      .getPosts({ authors: true })
      .value(function(posts) {
        res.view(views.show, { board: board.attrs, posts: posts });
      })
      .error(function(err) { next(err); });
    });
  }
};
