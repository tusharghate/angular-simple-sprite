module.exports = function(grunt) {

  grunt.initConfig(require('./grunt/config'));
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('buildApp', 
    [
      'clean',
      'jsbeautifier',
      'jshint:pre',
      'uglify'
      // 'jshint:post'
    ]
  );

  grunt.registerTask('default', 
    [
      'buildApp'
    ]
  );

};