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

, statics: {}

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
  }
});
