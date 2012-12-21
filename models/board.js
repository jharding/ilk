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

  , getPosts: function(opts, cb) {
      var id = this.id
        , query = [
            'SELECT * FROM'
          , '(SELECT posts.*, memberships.username AS authorName FROM posts'
          , 'INNER JOIN users ON posts.authorId = users.id'
          , 'INNER JOIN memberships ON users.id = memberships.userId'
          , 'WHERE posts.boardId = ?) AS postsWithAuthor'
          ].join(' ')
        , values = [id]
        , transforms = [];


      if (opts.includeVotesForUser) {
        query = [
          query
        , 'LEFT JOIN postVotes ON postVotes.postId = postsWithAuthor.id'
        , 'AND postVotes.voterId = ?'
        ].join(' ');

        values.push(opts.includeVotesForUser.userId);

        transforms.push(function(row) {
          row.userVoted = !!row.voterId;
          delete row.voterId;
        });
      }

      if (opts.algorithm === 'top') {
        query = [
          query
        , 'ORDER BY (postsWithAuthor.upvotes - 1) /'
        , 'POW(((UNIX_TIMESTAMP(NOW()) -'
        , 'UNIX_TIMESTAMP(postsWithAuthor.createdAt)) / 3600) + 2, 1.5) DESC'
        ].join(' ');
      }

      else if (opts.algorithm === 'active') {
        query = [query , 'ORDER BY lastCommentPostedAt DESC'].join(' ');
      }

      else if (opts.algorithm === 'new') {
        query = [query , 'ORDER BY createdAt DESC'].join(' ');
      }

      else {
        return cb(new Error('Invalid algorithm'));
      }

      db.query(query, values, function(err, rows) {
        if (err) { return cb(err); }

        transforms.forEach(function(transform) { rows.forEach(transform); });

        cb(null, rows);
      });
    }
  }
});
