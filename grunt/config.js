module.exports = {

	// Clean files and folders.
	clean: {
        dist: {
            src: ['dist/angular-simple-sprite.min.js']
        }
	},

    jsbeautifier: {
        files : ['dist/**/*.js'],
        options : {

        }
    },

    // Validate JS files with JSHint.
    jshint: {
        options: {
            jshintrc: 'jshint-config.jshintrc',
            ignore: ['bower_components/**']
        },

        pre: ['dist/angular-simple-sprite.js'],
        post: ['dist/angular-simple-sprite.min.js']
    },

    // Minify JavaScript and CSS files with UglifyJS.
    uglify: {
    	all: {
    		options: {
    			mangle: true,
    			compress: true
    		},

    		files: [
	    		{
	    			expand: true,
                    cwd: 'dist/',
	    			src: ['**/*.js'],
                    dest: 'dist/',
	    			ext: '.min.js',
	    			extDot: 'first'
	    		}
    		]
    	},
    }

};