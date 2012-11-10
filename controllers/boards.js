// dependencies
// ------------

var Board = require('../models/board');

module.exports = {
  // pages
  // -----

  show: function(req, res, next) {
    res.render('boards/show');
  }
};
