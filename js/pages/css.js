define([
	'js/app',
	'text!sass/_result.scss'
], function(app, staticCss){

	'use strict';

	app.controller('CssCtrl', ['$rootScope', '$scope', 'cssGen', function($rootScope, $scope, cssGen){
		$rootScope.view = 'css';
		$scope.staticCss = staticCss;
	}]);
});
