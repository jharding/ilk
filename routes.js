// module dependencies
// -------------------

var controllers = require('./controllers')
  // controllers
  , user = controllers.user
  , pages = controllers.pages

  // helpers
  , auth = require('./lib/auth');

// route defintions
// ----------------

module.exports.start = function(app) {
  // pages
  app.get('/', pages.splash);
  app.get('/secret', auth.verifySession, pages.splash); // temp

  // user
  app.get('/signup', user.signup);
  app.post('/signup', user.register);
  app.get('/login', user.login);
  app.post('/login', auth.verifyCredentials);
};
