define(['angular', 'js/app'], function(ng, app){

	'use strict';

	app.controller('OptionsCtrl', ['$rootScope', '$scope', function($rootScope, $scope){

		var list = $rootScope.itemList;

		$scope.change = function(kind){
			$rootScope.$emit('change');
		};
	}]);
});
