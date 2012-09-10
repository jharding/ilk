// users model
// -----------

// dependencies
// ============

var pg = require('pg');
var bcrypt = require('bcrypt');

var rounds = 10;

// interface
// =========

module.exports = {
  register: function(email, password, callback) {
    bcrypt.hash(password, rounds, function(err, hash) {
      if (err) { callback(err); return; }

      sql.register(email, hash, callback);
    });
  }
};

// helper functions
// ================

var sql = {
  register: function(email, hash, callback) {
    pg.connect(function(err, client) {
      if (err) { callback(err); return; }

      var query = {
        text:'INSERT INTO users(email, password_hash) VALUES($1, $2)',
        values: [email, hash]
      };
      client.query(query, function(err, result) {
        if (err) { callback(err); return; }

        callback(null);
      });
    });
  }
};
