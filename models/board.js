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
            'SELECT posts.id, posts.title, posts.url, posts.authorId,'
          , 'boardMembers.username FROM posts INNER JOIN boardMembers'
          , 'ON posts.authorId=boardMembers.id WHERE posts.boardId=?'
          ].join(' ');

      db.query(query, [id], function(err, rows) {
        if (err) { return cb(err); }

        cb(null, rows);
      });
    }
  }
});
