'use strict';

// module dependencies
// -------------------

var controllers = require('./controllers')
  // controllers
  , pages = controllers.pages
  , users = controllers.users
  , boards = controllers.boards
  , posts = controllers.posts
  , comments = controllers.comments

  // helpers
  , auth = require('./lib/auth');

// route defintions
// ----------------

module.exports.attachTo = function(app) {
  // pages
  //app.get('/', pages.splash);
  app.get('/', function(req, res) { res.redirect('/i/board'); }); // temp

  // users
  app.get('/signup', users.new);
  app.post('/signup', users.create);
  app.get('/login', users.login);
  app.post('/login', auth.login);
  app.get('/logout', auth.logout);

  // boards
  app.get('/i/:name', boards.show);
  app.get('/i/:name/join', boards.newMembership);
  app.post('/i/:name/join', auth, boards.createMembership);

  // posts
  app.get('/posts/:id', auth, posts.show);
  app.post('/posts/:id/upvote', auth, posts.upvote);
  app.get('/i/:boardName/submit', auth, posts.new);
  app.post('/i/:boardName/submit', auth, posts.create);

  // comments
  app.get('/comments/:id', auth, comments.show);
  app.post('/posts/:postId/comment', auth, comments.create);
};
