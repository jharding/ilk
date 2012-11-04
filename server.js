// ilk: message boards
// ===================
// * Copyright (c) 2012 Jake Harding

// module dependencies
// -------------------

var express = require('express')
  , hogan = require('fs-hogan')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , middleware = {
      csrfLocal: require('express-csrf-local')
    };

var app = module.exports = express();

// configuration and middleware
// ----------------------------

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.engine('hjs', hogan.renderFile);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.csrf());
  app.use(middleware.csrfLocal('csrfToken'));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
});

app.configure('development', function(){
  app.use(express.errorHandler());

  hogan.set({
    templates: app.get('views')
  , extension: app.get('view engine')
  });

  app.set('mysql', mysql.createConnection({
      host: 'localhost'
    , user: 'root'
    , database: 'ilk_dev'
    , debug: true
    })
  );
});

// routes
// ------

var routes = require('./routes');

// pages
app.get('/', routes.pages.splash);

// user
app.get('/signup', routes.user.pages.signup);
app.post('/signup', routes.user.actions.register);

// start your engines
// ------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
