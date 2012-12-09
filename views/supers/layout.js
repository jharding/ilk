'use strict';

var base = require('../../lib/view_base');

module.exports = base.extend({
  css: ['ilk']

, js: ['vendor', 'core']

, flash: function(req, locals) {
    return {
      success: req.flash('success')
    , info: req.flash('info')
    , warning: req.flash('warning')
    , error: req.flash('error')
    };
  }

, current_user: function(req, locals, cb) {
    if (req.user) {
      req.user.value(function(attrs) { cb(null, attrs); });
    }

    else {
      cb(null);
    }
  }
});
