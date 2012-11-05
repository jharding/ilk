// dependencies
// ------------

var User = require('../models/user');

// pages
// -----

module.exports.pages = {
  signup: function(req, res, next) { res.render('user/signup'); }
, login: function(req, res, next) { res.render('user/login'); }
};

module.exports.actions = {
  signup: function(req, res, next) {
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

, login: function(req, res, next) {
    var conditions = { email: req.body.email };

    User.findOne(conditions, function(err, user) {
      if (err) { return next(err); }

      user
      .verifyPassword(req.body.password)
      .value(function(verified) {
        res.redirect('/');
      })
      .error(function(err) { next(err); });
    });
  }
};
