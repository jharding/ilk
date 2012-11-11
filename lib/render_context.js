var _ = require('underscore')
  , express = require('express')
  , response = express.response
  , render = response.render;

response.render = function(template, context, cb) {
  var context = context || {}
    , req = this.req;

  // support function(template, cb) signature
  if (typeof context === 'function') {
    cb = context, context = {};
  }

  context.template = template.replace('/', '-');

  if (req.user) {
    req.user.value(function(attrs) {
      context = _.extend({}, { sessionUser: attrs }, context);
      render.call(this, template, context, cb);
    }.bind(this));
  }

  else {
    render.call(this, template, context, cb);
  }
};
