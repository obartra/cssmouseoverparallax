define([
	'angular',
	'json!model/data.json',
	'text!templates/howto.html',
	'text!templates/result.html',
	'text!templates/css.html',

	'angular-route',
	'angular-animate'
], function(ng, DATA, howToTemplate, resultTemplate, cssTemplate){

	'use strict';

	return ng.module('app', ['ngRoute', 'ngAnimate'])
		.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

			$locationProvider.html5Mode(true);
			$routeProvider
				.when('/howto', {
					template: howToTemplate,
					controller: 'HowToCtrl'
				})
				.when('/css', {
					template: cssTemplate,
					controller: 'CssCtrl'
				})
				.when('/', {
					template: resultTemplate,
					controller: 'ResultCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		}])
		.run(['$rootScope', function($rootScope){
			/*
			 * options {Object}
			 *  - hParallax {Boolean} default true. Toggle horizontal parallax
			 *  - vParallax {Boolean} default true.	Toggle vertical parallax
			 *  - showGrid {Boolean} default false. Show current active cell on hover
			 *  - hCells {Integer} default 7. [1-15] number of horizontal cells on the grid
			 *  - vCells {Integer} default 7. [1-15] number of vertical cells on the grid
			 *  - vMovementPct {Integer} default 15. [0,100] overall vertical movement regardless of distance
			 *  - hMovementPct {Integer} default 30. [0,100] overall horizontal movement regardless of distance
			 *  - speed {Float} default 0.6. [0-2] speed at which items follow the mouse (in seconds)
			 *  - easing {menuOptions.easing} default "linear".	easing type for mouse movement
			 */
			$rootScope.options = DATA.options;
			/* menuOptions {Object} contains the different options used for the options select elements*/
			$rootScope.menuOptions = DATA.menuOptions;
			/* itemList {Object[]} list of objects with the following properties:
			 *  - type {String} Class used to determine the image to show for the item
			 *  - depth {Float} The distance of the image from the viewer.
			 *    Values range [0,5] with 0 being the furthest (no movement) and 5 the closest
			 *  - top {Float} [0-100] Default top position in percentage of the item
			 *  - left {Float} [0-100] Default left position in percentage of the item
			 */
			$rootScope.itemList = DATA.itemList;
			/* showOptions {Boolean} whether the settings panel is initially enabled or not*/
			$rootScope.showOptions = DATA.showOptions;

			var initialize = function(){
				var list = $rootScope.itemList;
				//assign a unique id to each element
				for (var i = 0, i_len = list.length; i < i_len; i++){
					list[i].id = '#id' + i;
				}
			}
			initialize();
		}]);
});
