var base = require('../../lib/view_base');

module.exports = base.extend({
  css: ['ilk']

, js: ['vendor', 'core']

, current_user: function(req, context, cb) {
    if (req.user) {
      req.user.value(function(attrs) { cb(null, attrs); });
    }

    else {
      cb(null);
    }
  }
});
