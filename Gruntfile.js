'use strict';

var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      clientjs: {
        files: ['assets/js/**/*.js']
      , tasks: ['jshint:client']
      }
    , clientcss: {
        files: ['assets/less/**/*.less']
      , tasks: ['less:development']
      }
    }

  , concat: {
      vendor: {
        src: [
          'assets/vendor/jquery/jquery-1.8.2.js'
        , 'assets/vendor/bootstrap/js/bootstrap-dropdown.js'
        ]
      , dest: 'public/js/vendor.js'
      }
    }

  , less: {
      development: {
        files: { 'public/css/ilk.css': 'assets/less/ilk.less' }
      }
    }

  , exec: {
      dbcreate: {
        cmd: 'mysql --user=ilk_dev ilk_dev < ' +
          path.join(__dirname, '/db/create_tables.mysql')
      }
    , dbseed: {
        cmd: 'mysql --user=ilk_dev ilk_dev < ' +
          path.join(__dirname, '/db/seed.mysql')
      }
    , dbdrop: {
        cmd: 'mysql --user=ilk_dev ilk_dev < ' +
          path.join(__dirname, '/db/drop_tables.mysql')
      }
    }

  , jshint: {
      client: ['assets/js/**/*.js']
    , server: [
        '*.js'
      , 'lib/**/*.js'
      , 'views/**/*.js'
      , 'models/**/*.js'
      , 'controllers/**/*.js'
      ]
    , options: {
      // enforcing options
        bitwise: true
      , curly: true
      , forin: true
      , newcap: true
      , noarg: true
      , noempty: true
      , nonew: true
      , quotmark: true
      , undef: true
      , trailing: true
      , maxlen: 80

      // relaxing options
      , boss: true
      , es5: true
      , expr: true
      , laxcomma: true

      // environments
      , node: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('dev', ['less:development', 'concat']);
  grunt.registerTask('db', ['exec:dbdrop', 'exec:dbcreate', 'exec:dbseed']);
};
