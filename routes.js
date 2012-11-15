// module dependencies
// -------------------

var controllers = require('./controllers')
  // controllers
  , pages = controllers.pages
  , users = controllers.users
  , boards = controllers.boards
  , posts = controllers.posts

  // helpers
  , auth = require('./lib/auth');

// route defintions
// ----------------

module.exports.attachTo = function(app) {
  // pages
  //app.get('/', pages.splash);
  app.get('/', function(req, res) { res.redirect('/i/board'); }); // temp

  // users
  app.get('/signup', users.signup);
  app.post('/signup', users.register);
  app.get('/login', users.login);
  app.post('/login', auth.login);
  app.get('/logout', auth.logout);

  // boards
  app.get('/i/:name', boards.show);

  // posts
  app.get('/i/:name/submit', posts.new);
  app.post('/i/:name/submit', posts.create);
};
