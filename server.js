// ilk: message boards
// ===================
// * Copyright (c) 2012 Jake Harding

'use strict';

// module dependencies
// -------------------

var express = require('express')
  , hogan = require('fs-hogan')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , mw = {
      passport: require('passport')
    , csrfLocal: require('express-csrf-local')
    , flash: require('connect-flash')
    };

var app = module.exports = express();

// configuration and middleware
// ----------------------------

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'hjs');
  app.engine('hjs', hogan.renderFile);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(mw.flash());
  app.use(mw.passport.initialize());
  app.use(mw.passport.session());
  app.use(express.csrf());
  app.use(mw.csrfLocal('csrfToken'));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
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

app.configure('test', function() {
  app.use(express.errorHandler());

  hogan.set({
    templates: app.get('views')
  , extension: app.get('view engine')
  });
});

// start your engines
// ------------------

require('./routes').attachTo(app);

// don't start the server in test enviroment
if (app.get('env') !== 'test') {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
}
