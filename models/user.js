// dependencies
// ------------

var app = require('../server')
  , mysql = app.get('mysql')
  , bcrypt = require('bcrypt')
  , fabio = require('fabio');

// model definition
// ----------------

var User
  , rounds = 10;

User = module.exports = fabio.define({
  schema: {
    email: {
      validators: fabio.validators.isFuzzyEmail
    }
  , password: {
      validators: fabio.validators.minmax(4, 64)
    , map: hash
    }
  }

, statics: {}

, methods: {
    create: function(attrs, cb) {
      var query = 'INSERT INTO users SET ?';

      mysql.query(query, attrs, function(err, results) {
        if (err) { cb(err); return; }

        cb(null);
      });

      mysql.end();
    }

  , update: function(attrs, cb) {
      console.log('update');
      cb(null, attrs);
    }

  , delete: function(attrs, cb) {}
}
});

// helper functions
// ----------------

function hash(val, cb) {
  bcrypt.hash(val, rounds, function(err, hashedVal) {
    if (err) { cb(err); return; }

    cb(null, hashedVal);
  });
}
