// module dependencies
// -------------------

var views = require('../views/pages');

module.exports = {
  splash: function(req, res, next) {
    res.view(views.splash);
  }
};
