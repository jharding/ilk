// dependencies
// ------------

var User = require('../models/user');

module.exports = {
  // pages
  // -----

  signup: function(req, res, next) {
    res.render('user/signup');
  }

, login: function(req, res, next) {
    res.render('user/login');
  }

  // actions
  // -------

, register: function(req, res, next) {
    new User({
      email: req.body.email
    , password: req.body.password
    })
    .save()
    .value(function(attrs) {
      res.redirect('/');
    })
    .error(function(err) { next(err); });
  }
};
