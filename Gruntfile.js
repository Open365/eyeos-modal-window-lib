// Generated on 2014-07-02 using generator-angular 0.9.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	require("eyeos-gruntfile")(grunt, "eyeos-modal-window-lib");

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var buildDir = 'build';
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		build: buildDir,
		dist: buildDir + '/dist'
	};


	// Define the configuration for all the tasks
	grunt.initConfig({
		dirs: appConfig,

		compass: {                  // Task
			dist: {                   // Target
				options: {              // Target options
					sassDir: '<%= dirs.app %>/styles',
					cssDir: '.tmp',
					environment: 'production'
				}
			}
		},

		concat: {
			options: {
				separator: ';\n'
			},
			js: {
				src: ['bower_components/bootstrap/dist/js/bootstrap.min.js', 'bower_components/bootstrap-dialog/dist/js/bootstrap-dialog.min.js'],
				dest: '<%= dirs.dist %>/eyeosModalWindow.min.js'
			},
			css: {
				src: ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/bootstrap-dialog/dist/css/bootstrap-dialog.min.css', '.tmp/eyeModal.css'],
				dest: '<%= dirs.dist %>/eyeosModalWindow.min.css'
			}
		}
	});

	/**
	 * We need to put a bower.json inside the artifact as this will be the
	 * distributed bower.json in the package. In the current bower.json we
	 * have bootstrap as dependency, but on the final artifact this dependency
	 * is bundled in the eyeosModalWindow.min.* files, so we need to remove
	 * the bootstrap dependency in the distributed bower.json.
	 */
	grunt.registerTask('generate-build-bower', function () {
		var bowerObj = grunt.file.readJSON('bower.json');
		delete bowerObj.dependencies['bootstrap-dialog'];
		var dest = buildDir + '/bower.json';
		grunt.file.write(dest, JSON.stringify(bowerObj, null, "  "));
		console.log('file written:', dest);
	});

	grunt.registerTask('build', [
		'compass',
		'concat:js',
		'concat:css',
		'generate-build-bower'
	]);
};
