// module dependencies
// -------------------

var controllers = require('./controllers')
  // controllers
  , pages = controllers.pages
  , users = controllers.users
  , boards = controllers.boards

  // helpers
  , auth = require('./lib/auth');

// route defintions
// ----------------

module.exports.attachTo = function(app) {
  // pages
  app.get('/', pages.splash);

  // users
  app.get('/signup', users.signup);
  app.post('/signup', users.register);
  app.get('/login', users.login);
  app.post('/login', auth.verifyCredentials);

  // board
  app.get('/i/:name', boards.show);
};
