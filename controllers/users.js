'use strict';

// dependencies
// ------------

var User = require('../models/user')
  , views = require('../views/users');

module.exports = {
  // pages
  // -----

  new: function(req, res, next) {
    res.view(views.new);
  }

, login: function(req, res, next) {
    res.view(views.login);
  }

  // actions
  // -------

, create: function(req, res, next) {
    User.create({
      email: req.body.email
    , password: req.body.password
    })
    .value(function(attrs) {
      res.redirect('/');
    })
    .error(function(err) { next(err); });
  }
};
