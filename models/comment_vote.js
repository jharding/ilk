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

var CommentVote;

CommentVote = module.exports = fabio.define({
  // schema
  // ------

  schema: {
    commentId: {}
  , voterId: {}
  }

  // statics
  // -------

, statics: {}

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      var that = this
        , query = 'INSERT INTO commentVotes SET ?';

      db.query(query, attrs, function(err, results) {
        if (err) { return cb(err); }

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
