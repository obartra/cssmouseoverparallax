module.exports = function(grunt){
	grunt.registerTask('npm', 'install node dependencies', function() {
		var done = this.async();
		grunt.util.spawn({ cmd: 'npm', args: ['install'] }, function ( err, response ) {
			if (err) {
				grunt.log.write(response.stdout.red.bold + '\n\n');
			}else{
				grunt.log.write('Node dependencies installed successfully'.green + '\n');
			}
			done(err);
		});
	});
	grunt.registerTask('bower', 'install bower dependencies', function() {
		var done = this.async();
		grunt.util.spawn({ cmd: 'bower', args: ['install'] }, function ( err, response ) {
			if (err) {
				grunt.log.write(response.stdout.red.bold + '\n\n');
			}else{
				grunt.log.write('Bower dependencies installed successfully'.green + '\n');
			}
			done(err);
		});
	});

	grunt.registerTask('installdependencies', ['bower', 'npm']);
};
