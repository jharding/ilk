var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      client: ['assets/js/**/*.js']
    , server: ['*.js', 'lib/**/*.js', 'routes/**/*.js', 'models/**/*.js']
    }
  , less: {
      development: {
        files: {
          'public/css/style.css': 'assets/less/style.less'
        }
      }
    }
  , watch: {
      files: 'assets/less/**/*.less'
    , tasks: 'less:style'
    }
  , jshint: {
      options: {
        // enforcing options
        bitwise: true
      , curly: true
      , newcap: true
      , noarg: true
      , noempty: true
      , nonew: true
      , trailing: true
        // relaxing options
      , boss: true
      , es5: true
      , evil: true
      , expr: true
      , laxcomma: true
        // environments
      , node: true
      }
    }
  , exec: {
      dbcreate: {
        command: 'mysql --user=ilk_dev ilk_dev < ' +
          path.join(__dirname, '/db/create_tables.sql')
      , stdout: true
      }
    , dbdrop: {
        command: 'mysql --user=ilk_dev ilk_dev < ' +
          path.join(__dirname, '/db/drop_tables.sql')
      , stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('dbcreate', 'exec:dbcreate');
  grunt.registerTask('dbdrop', 'exec:dbdrop');
  grunt.registerTask('dbreset', 'exec:dbdrop exec:dbcreate');

  grunt.registerTask('default', 'lint');
};
