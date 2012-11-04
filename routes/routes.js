var app = require('../server')
  , routes = require('./index')
  , auth = require('../lib/auth');

// routes
// ------

// pages
app.get('/', routes.pages.splash);
app.get('/secret', auth(), routes.pages.splash);

// user
app.get('/signup', routes.user.pages.signup);
app.post('/signup', routes.user.actions.signup);
app.get('/login', routes.user.pages.login);
app.post('/login', auth(), routes.user.actions.login);
