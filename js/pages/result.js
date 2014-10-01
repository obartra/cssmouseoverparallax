define(['angular', 'js/app'], function(ng, app){

	'use strict';

	app
		.controller('ResultCtrl', ['$rootScope', '$scope', 'cssGen', 'cssSet', function($rootScope, $scope, cssGen, cssSet){
			$rootScope.view = 'result';
			$scope.int = window.parseInt;
			cssSet.watch('cellCss');
		}]);
});
