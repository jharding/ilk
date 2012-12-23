'use strict';

var base = require('../../lib/view_base');

module.exports = base.extend({
  css: ['ilk']

, js: ['vendor', 'core']

, title: 'Ilk'

, flash: function(req, locals) {
    return {
      success: req.flash('success')
    , info: req.flash('info')
    , warning: req.flash('warning')
    , error: req.flash('error')
    };
  }

, currentUser: function(req, locals, cb) {
    if (req.user) {
      req.user.then(function(attrs) { cb(null, attrs); });
    }

    else {
      cb(null);
    }
  }
});
