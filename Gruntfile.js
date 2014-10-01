module.exports = function(grunt) {

	//Load tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks("grunt-modernizr");
	grunt.loadTasks('./grunt');

	// Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		modernizr: {
			dist: {
				"devFile" : "vendor/modernizr/modernizr.js",
				"outputFile" : "grunt/tmp/modernizr-custom.js",
				"extra" : {
					"shiv" : false,
					"printshiv" : false,
					"load" : false,
					"mq" : false,
					"cssclasses" : true
				},
				"uglify" : true,
				"tests" : ["csstransitions"],
				"parseFiles" : false
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['grunt/tmp/modernizr-custom.js', 'vendor/requirejs/require.js' ,'js/main.js'],
				dest: 'grunt/tmp/main.js',
			}
		},
		requirejs : {
			compile : {
				options : {
					baseUrl: ".",
					name : "grunt/tmp/main.js",
					mainConfigFile: "grunt/tmp/main.js",
					out: "js/main.min.js",
					findNestedDependencies: true,
					preserveLicenseComments: false,
					optimize: 'uglify2',
					paths: {
						'angular' : 'empty:',
						'lodash' : 'empty:'
					},
					inlineText : true,
					pragmasOnSave: {
						excludeAfterBuild: false
					}
				}
			}
		},
		compass : {
			dist: {
				options: {
					config: './config.rb'
				}
			}
		},
		htmlmin : {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyJS: true,
					minifyCSS: true
				},
				files: {
					'index.html': 'grunt/tmp/index.html'
				}
			}
		},
		clean : ['grunt/tmp'],
		replace: {
			dist: {
				src: ['js/main.min.js'],
				dest: 'js/main.min.js',
				replacements: [{
					from: 'js/main.js',
					to: 'js/main.min.js'
				}]
			}
		}
	});

	// Run
	grunt.registerTask('default', ['installdependencies', 'modernizr', 'concat', 'requirejs', 'compass', 'htmlgen', 'replace', 'clean']);
	grunt.registerTask('fast', ['modernizr', 'concat', 'requirejs', 'compass', 'htmlgen', 'replace']);
};
