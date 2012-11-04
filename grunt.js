var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      client: ['src/js/**/*.js']
    , server: ['./*.js', './routes/**/*.js', './models/**/*.js']
    }
  , less: {
      development: {
        files: {
          'assets/css/style.css': 'src/less/style.less'
        }
      }
    }
  , watch: {
      files: 'src/less/**/*.less'
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
