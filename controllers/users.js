// dependencies
// ------------

var User = require('../models/user')
  , views = require('../views/users');

module.exports = {
  // pages
  // -----

  signup: function(req, res, next) {
    res.view(views.signup);
  }

, login: function(req, res, next) {
    res.view(views.login);
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
