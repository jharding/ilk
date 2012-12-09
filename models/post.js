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

var Post;

Post = module.exports = fabio.define({
  // schema
  // ------

  schema: {
    title: {}
  , url: {}
  , postedAt: {}
  , upVotes: {}
  , downVotes: {}
  , authorId: {}
  , boardId: {}
  }

  // statics
  // -------

, statics: {
    findOne: function(condition, cb) {
      var query = 'SELECT * FROM posts WHERE ?';

      db.query(query, condition, function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0] ? Post.load(results[0]) : null);
      });
    }
  }

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      var that = this
        , query = 'INSERT INTO posts SET ?';

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

  , getComments: function(cb) {
      var id = this.id
        , query = [
            'SELECT comments.id, comments.content, comments.authorId,'
          , 'memberships.username FROM comments INNER JOIN memberships'
          , 'ON comments.authorId=memberships.id WHERE comments.postId=?'
          ].join(' ');

      db.query(query, [id], function(err, rows) {
        if (err) { return cb(err); }

        cb(null, rows);
      });
    }
  }
});
