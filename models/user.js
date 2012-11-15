// dependencies
// ------------

var _ = require('underscore')
  , app = require('../server')
  , db = app.get('mysql')
  , mysql = require('mysql')
  , bcrypt = require('bcrypt')
  , fabio = require('fabio');

// model definition
// ----------------

var User
  , bcryptRounds = 10;

User = module.exports = fabio.define({
  // schema
  // ------

  schema: {
    email: {
      validators: fabio.validators.isFuzzyEmail
    }
  , password: {
      validators: fabio.validators.minmax(4, 64)
    , map: hash
    }
  }

  // statics
  // -------

, statics: {
    findOne: function(attrs, cb) {
      var query = composeSelect('users', attrs)
        , user;

      db.query(query, function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0] ? User.new(results[0], { raw: true }) : null);
      });
    }
  }

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      var query = 'INSERT INTO users SET ?';

      db.query(query, attrs, function(err, results) {
        if (err) { return cb(err); }

        // TODO: pass something
        cb(null);
      });
    }

  , update: function(attrs, cb) {
      // TODO
    }

  , delete: function(attrs, cb) {
      // TODO
    }

  , verifyPassword: function(val, cb) {
      bcrypt.compare(val, this.attrs.password, function(err, same) {
        if (err) { return cb(err); }

        cb(null, same);
      });
    }
  }
});

// helper functions
// ----------------

function composeSelect(tables, conditions) {
  var statement
    , keys;

  tables = _.isArray(tables) ? tables.join(', ') : tables;
  statement = 'SELECT * FROM ' + tables;

  keys = Object.keys(conditions || {});

  if (keys.length > 0) {
    statement += ' WHERE ';
    keys.forEach(function(key) {
      statement += key + '=' + mysql.escape(conditions[key]) + ' AND ';
    });

    // strip trailing AND
    statement = statement.replace(/ AND $/, ' ');
  }

  return statement;
}

function hash(val, cb) {
  bcrypt.hash(val, bcryptRounds, function(err, hashedVal) {
    if (err) { return cb(err); }

    cb(null, hashedVal);
  });
}
