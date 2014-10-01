define([
	'js/app'
], function(app){

	'use strict';

	app
		.filter('nohash', function() {
			return function(input) {
				return input.replace(/^#/,'');
			};
		});
});
