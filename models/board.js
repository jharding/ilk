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
    findById: function(id, cb) {
      var query = "SELECT * FROM boards WHERE id=?";

      db.query(query, [id], function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0] ? new Board(results[0], { raw: true }) : null);
      });
    }

  , findByName: function(name, cb) {
      var query = "SELECT * FROM boards WHERE name=?";

      db.query(query, [name], function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0] ? new Board(results[0], { raw: true }) : null);
      });
    }
  }

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      // TODO
    }

  , update: function(attrs, cb) {
      // TODO
    }

  , delete: function(attrs, cb) {
      // TODO
    }

  , getPosts: function(opts, cb) {
      var id = this.attrs.id
        , query = 'SELECT posts.* FROM posts WHERE posts.id=?';

      if (opts.authors) {
        query = [
          'SELECT posts.id, posts.name, posts.link, posts.author_id,'
        , 'board_members.username FROM posts INNER JOIN board_members'
        , 'ON posts.author_id=board_members.id WHERE posts.board_id=?'
        ].join(' ');
      }

      db.query(query, [id], function(err, rows) {
        if (err) { return cb(err); }

        cb(null, rows);
      });
    }
  }
});
