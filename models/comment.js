'use strict';

// dependencies
// ------------

var _ = require('underscore')
  , app = require('../server')
  , db = app.get('mysql')
  , mysql = require('mysql')
  , fabio = require('fabio');

// model definition
// ----------------

var Comment;

Comment = module.exports = fabio.define({
  // schema
  // ------

  schema: {
    content: {}
  , upVotes: {}
  , downVotes: {}
  , createdAt: {}
  , updatedAt: {}
  , authorId: {}
  , postId: {}
  }

  // statics
  // -------

, statics: {
    findOne: function(condition, cb) {
      var query = 'SELECT * FROM comments WHERE ?';

      db.query(query, condition, function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0] ? Comment.load(results[0]) : null);
      });
    }
  }

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      var that = this
        , query = 'INSERT INTO comments SET ?';

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
  }
});
