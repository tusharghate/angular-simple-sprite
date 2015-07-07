module.exports = function(grunt) {

  grunt.initConfig(require('./grunt/config'));
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('buildApp', 
    [
      'clean',
      'jshint:pre',
      'uglify',
      'jshint:post'
    ]
  );

  grunt.registerTask('default', 
    [
      'buildApp'
    ]
  );

};