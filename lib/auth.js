// module dependencies
// -------------------

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models/user');

// passport configuration
// ----------------------

passport.use(new LocalStrategy({ usernameField: 'email' }, verifyUser));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = function(opts) {
  return passport.authenticate('local', opts || {});
};

// helper functions
// ----------------

function serializeUser(user, done) {
  user
  .getAttrs()
  .value(function(attrs) { done(null, attrs.id); })
  .error(function(err) { done(err); });
}

function deserializeUser(id, done) {
  User.findOne({ id: id }, function(err, user) {
    if (err) { done(err); return; }

    else if (!user) {
      done(new Error('unable to find user with id: ' + id));
    }

    else {
      done(null, user);
    }
  });
}

function verifyUser(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { done(err); return; }

    if (!user) {
      done(null, false, { message: 'no good' });
    }

    else {
      user
      .verifyPassword(password)
      .value(function(verified) {
        verified ? done(null, user) : done(null, false);
      })
      .error(function(err) { done(err); });
    }
  });
}
