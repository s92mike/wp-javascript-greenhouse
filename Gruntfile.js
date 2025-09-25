module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Watch for changes
		watch: {
			scripts: {
				files: ['src/**/*.js', 'src/**/*.jsx'],
				tasks: ['webpack:dev'],
				options: {
					spawn: false,
				},
			},
			styles: {
				files: ['src/**/*.scss'],
				tasks: ['webpack:dev'],
				options: {
					spawn: false,
				},
			},
		},

		// Webpack build
		webpack: {
			dev: {
				mode: 'development',
				devtool: 'source-map'
			},
			prod: {
				mode: 'production'
			}
		},

		// Clean dist folder
		clean: {
			dist: ['dist/*']
		},

		// Copy files
		copy: {
			dist: {
				files: [
					{
						expand: true,
						src: ['demo.html'],
						dest: 'dist/',
						flatten: true
					}
				]
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Register tasks
	grunt.registerTask('default', ['clean:dist', 'webpack:prod', 'copy:dist']);
	grunt.registerTask('dev', ['webpack:dev', 'watch']);
	grunt.registerTask('build', ['clean:dist', 'webpack:prod', 'copy:dist']);
};
