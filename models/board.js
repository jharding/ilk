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

var Board;

Board = module.exports = fabio.define({
  // schema
  // ------

  schema: {
    name: {}
  , description: {}
  , createdAt: {}
  , updatedAt: {}
  }

  // statics
  // -------

, statics: {
    findOne: function(condition, cb) {
      var query = 'SELECT * FROM boards WHERE ?';

      db.query(query, condition, function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0] ? Board.load(results[0]) : null);
      });
    }
  }

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      var that = this
        , query = 'INSERT INTO boards SET ?';

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

  , getPosts: function(cb) {
      var id = this.id
        , query = [
            'SELECT posts.*, memberships.username FROM posts'
          , 'INNER JOIN users ON posts.authorId = users.id'
          , 'INNER JOIN memberships ON users.id = memberships.userId'
          , 'WHERE posts.boardId = ?'
          ].join(' ');

      db.query(query, [id], function(err, rows) {
        if (err) { return cb(err); }

        cb(null, rows);
      });
    }

  , getPostsWithVoteStatusForUser: function(userId, cb) {
      var id = this.id
        , query = [
            'SELECT posts.*, memberships.username, postVotes.voterId FROM posts'
          , 'INNER JOIN users ON users.id = posts.authorId'
          , 'INNER JOIN memberships ON memberships.userId = users.id'
          , 'LEFT JOIN postVotes ON postVotes.postId = posts.id'
          , 'AND postVotes.voterId = ? WHERE posts.boardId = ?'
          ].join(' ');

      db.query(query, [userId, id], function(err, rows) {
        if (err) { return cb(err); }

        rows.forEach(function(row) {
          row.userVoted = !!row.voterId;
          delete row.voterId;
        });

        cb(null, rows);
      });
    }
  }
});
