// dependencies
// ------------

var User = require('../models/user.js');

// pages
// -----

module.exports.pages = {
  signup: function(req, res, next) { res.render('user/signup'); }
};

module.exports.actions = {
  register: function(req, res, next) {
    new User({
      email: req.body.email
    , password: req.body.password
    })
    .save()
    .val(function(attrs) {
      res.redirect('/');
    })
    .error(function(err) { next(err); });
  }
};
