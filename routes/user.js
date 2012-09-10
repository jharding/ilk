// user controller
// ---------------

// dependencies
// ============

var users = require('../models/users.js');

// pages
// =====

module.exports.pages = {
  signup: function(req, res, next) {
    res.render('user/signup', { csrfToken: req.session._csrf });
  }
};

module.exports.actions = {
  register: function(req, res, next) {
    users.register(req.body.email, req.body.password, function(err) {
      if (err) { next(err); return; }

      res.redirect('/');
    });
  }
};
