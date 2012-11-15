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
  }

  // methods
  // -------

, methods: {
    create: function(attrs, cb) {
      var query = 'INSERT INTO posts SET ?';

      db.query(query, attrs, function(err, results) {
        if (err) { return cb(err); }

        cb(null,  results[0]);
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
