module.exports = function(grunt){
	grunt.task.registerTask('copytmp', 'Copies index.php to the /grunt/tmp directory', function(){
		grunt.file.copy('index.php', 'grunt/tmp/index.php');
	});

	grunt.task.registerTask('htmlgenfile', 'Generates a single html file from the index.php', function(){
		var done = this.async();
		grunt.util.spawn({ cmd: 'php', args: ['grunt/update.php'] }, function ( err, response ) {
			if (err) {
				grunt.log.write(response.stdout.red.bold + '\n\n');
			}else{
				grunt.log.write('HTML file generated successfully'.green + '\n');
			}
			done(err);
		});
	});

	//Load tasks
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('htmlgen', ['copytmp', 'htmlgenfile', 'htmlmin']);

};
