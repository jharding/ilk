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
  , upvotes: {}
  , commentCount: {}
  , createdAt: {}
  , updatedAt: {}
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

  , getBoard: function(cb) {
      var boardId = this.attrs.boardId
        , query = 'SELECT * FROM boards WHERE id = ?';

      db.query(query, [boardId], function(err, row) {
        if (err) { return cb(err); }

        cb(null, row[0]);
      });
    }

  , getAuthor: function(cb) {
      var authorId = this.attrs.authorId
        , boardId = this.attrs.boardId
        , query = 'SELECT * FROM  memberships WHERE userId = ? AND boardId = ?';

      db.query(query, [authorId, boardId], function(err, row) {
        if (err) { return cb(err); }

        cb(null, row[0]);
      });
    }

  , getComments: function(cb) {
      var id = this.id
        , query = [
            'SELECT comments.*, memberships.username FROM comments'
          , 'INNER JOIN users ON comments.authorId = users.id'
          , 'INNER JOIN memberships ON users.id = memberships.userId'
          , 'WHERE comments.postId = ? ORDER BY comments.createdAt ASC'
          ].join(' ');

      db.query(query, [id], function(err, rows) {
        if (err) { return cb(err); }

        cb(null, rows);
      });
    }
  }
});
