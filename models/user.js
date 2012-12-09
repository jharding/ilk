'use strict';

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
    , maps: hash
    }
  , createdAt: {}
  , updatedAt: {}
  }

  // statics
  // -------

, statics: {
    findOne: function(condition, cb) {
      var query = 'SELECT * FROM users WHERE ?';

      db.query(query, condition, function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0] ? User.load(results[0]) : null);
      });
    }
  }

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      var that = this
        , query = 'INSERT INTO users SET ?';

      db.query(query, attrs, function(err, results) {
        if (err) { return cb(err); }

        that.id = results.insertId;
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

  , joinBoard: function(boardId, username, cb) {
      var that = this
        , query = 'INSERT INTO memberships SET ?'
        , attrs = {
            username: username
          , boardId: boardId
          , memberId: this.id
          };

      db.query(query, attrs, function(err, results) {
        if (err) { return cb(err); }

        cb(null);
      });
    }
  }
});

// helper functions
// ----------------

function hash(val, cb) {
  bcrypt.hash(val, bcryptRounds, function(err, hashedVal) {
    if (err) { return cb(err); }

    cb(null, hashedVal);
  });
}
