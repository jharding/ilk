// ilk: message boards
// -------------------
// * Copyright (c) 2012 Jake Harding

// module dependencies
// ===================

var express = require('express');
var hogan = require('fs-hogan');
var http = require('http');
var path = require('path');

var routes = require('./routes');

var app = express();

// configuration and middleware
// ============================

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
  app.use(express.csrf());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  hogan.set({ templates: app.get('views'), extension: app.get('view engine') });
});

// routes
// ======

app.get('/', routes.pages.splash);

// start your engines
// ==================

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
