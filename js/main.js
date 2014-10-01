requirejs.config({
	paths : {
		'angular' : ['//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min', 'vendor/angular/angular.min'],
		'angular-route' : 'vendor/angular-route/angular-route',
		'angular-animate' : 'vendor/angular-animate/angular-animate',

		'lodash' : ['//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.underscore.min', 'vendor/lodash/dist/lodash.underscore.min'],

		'text' : 'vendor/requirejs-text/text',
		'json' : 'vendor/requirejs-plugins/src/json',

		'prism' : 'vendor/prismjs/prism',
		'prism-css' : 'vendor/prismjs/components/prism-css',
		'prism-scss' : 'vendor/prismjs/components/prism-scss',
		'prism-line-numbers' : 'vendor/prismjs/plugins/line-numbers/prism-line-numbers',
		'prism-loader' : 'js/prismLoader'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-route' : {
			deps : ['angular'],
			exports: 'angular'
		},
		'angular-animate' : {
			deps : ['angular'],
			exports : 'angular'
		},
		'prism' : {
			exports : 'Prism'
		},
		'prism-css' : {
			exports : 'Prism'
		},
		'prism-scss': {
			exports : 'Prism'
		},
		'prism-line-numbers': {
			exports : 'Prism'
		},
		'prism-loader': {
			deps : ['prism']
		}
	},
	stubModules: ['text', 'json'],
	baseUrl : '/',
	enforceDefine: true,
	wrapShim : true,
	waitSeconds : 0
});

require([
	'angular',
	'prism-loader',

	'js/app',

	'js/services/css',

	'js/pages/howto',
	'js/pages/result',
	'js/pages/css',

	'js/components/filters',
	'js/components/options',
	'js/components/prism'
], function(ng){

	'use strict';

	ng.bootstrap(document, ['app']);

});
