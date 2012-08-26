module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      files: ['src/js/**/*.js']
    },
    less: {
      style: {
        src: 'src/less/style.less',
        dest: 'assets/css/style.css'
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

  grunt.loadNpmTasks('grunt-less');

  grunt.registerTask('default', 'lint');
};
