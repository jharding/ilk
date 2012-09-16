module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      client: ['src/js/**/*.js'],
      server: ['./*.js', './routes/**/*.js', './models/**/*.js']
    },
    less: {
      development: {
        files: {
          'assets/css/style.css': 'src/less/style.less'
        }
      }
    },
    watch: {
      files: 'src/less/**/*.less',
      tasks: 'less:style'
    },
    jshint: {
      options: {
        // enforcing options
        bitwise: true,
        curly: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        trailing: true,
        // relaxing options
        boss: true,
        es5: true,
        evil: true,
        expr: true,
        // environments
        node: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', 'lint');
};
