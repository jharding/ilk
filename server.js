// ilk: message boards
// -------------------
// * Copyright (c) 2012 Jake Harding

// module dependencies
// ===================

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();
require('express-layout')(app);

// configuration and middleware
// ============================

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(require('less-middleware')({
    force: true,
    debug: true,
    compress: false,
    src: __dirname + '/src',
    dest: __dirname + '/assets'
  }));
});

// routes
// ======

app.get('/', routes.index);

// start your engines
// ==================

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
