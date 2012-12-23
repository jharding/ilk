'use strict';

// module dependencies
// -------------------

var _ = require('underscore')
  , async = require('async')
  , express = require('express')
  , response = express.response;

// view base
// ---------

module.exports = {
  omit: ['omit', 'getContext', 'extend', 'base']

, getContext: function(req, locals, cb) {
    var view = this
      , context = {}
      , asyncTasks = [];

    // for each non-omitted key
    _(this)
    .chain()
    .keys()
    .difference(this.omit)
    .forEach(function(key) {
      var attribute = view[key];

      // attribute is a function so it needs to be evaluated
      // in order to get the true value of the attribute
      if (typeof attribute === 'function') {
        asyncTasks.push(function(done) {
          view[key](req, locals, function(err, value) {
            if (err) { return done(err); }

            context[key] = value;
            done();
          });
        });
      }

      else {
        // replace "/" with "-" so template can be used as css class/id
        if (key === 'template') {
          context[key] = attribute.replace(/\//g, '-');
        }

        else {
          context[key] = attribute;
        }
      }
    });

    // process async tasks in parallel
    async.parallel(asyncTasks, function(err) {
      if (err) { return cb(err); }

      cb(null, context);
    });
  }

, extend: function(obj) {
    obj = _(obj || {}).reduce(function(memo, val, key) {
      memo[key] = typeof val === 'function' ? cbify(val) : val;

      return memo;
    }, {});

    return _.extend({}, this, { base: this }, obj);
  }
};

// express response helper
// -----------------------

response.view = function(view, locals, cb) {
  var res = this
    , req = this.req;

  locals = locals || {};

  // support function(view, cb) signature
  if (typeof locals === 'function') {
    cb = locals;
    locals = {};
  }

  view.getContext(req, locals, function(err, context) {
    if (err) { return req.next(err); }
    res.render(view.template, context, cb);
  });
};

// helper functions
// ----------------

// https://gist.github.com/2385351
function cbify(fn) {
  return function callbackable() {
    var length = arguments.length
      , done = arguments[length - 1];

    if (length > fn.length && _.isFunction(done)) {
      try { done(null, fn.apply(this, arguments)); } catch(e) { done(e); }
    }

    else { fn.apply(this, arguments); }
  };
}
