define(['angular', 'js/app'], function(ng, app){

	'use strict';

	app
		.controller('HowToCtrl', ['$rootScope', '$scope', 'cssGen', 'cssSet', function($rootScope, $scope, cssGen, cssSet){
			$rootScope.view = 'howto';

			var op = $rootScope.options,
				genTextExample = cssGen.getNew({
					totalCols : op.hCells,
					totalRows : op.vCells,
					vMovement : op.vMovementPct / 100,
					hMovement : op.hMovementPct / 100,
					itemsSelector : '.item',
					cellsSelector : '.cell'
				}),
				genAnimationExample = cssGen.getNew({
					totalCols : 4,
					totalRows : 4,
					vMovement : 1,
					hMovement : 1,
					itemsSelector : '.howto .animate #ball2',
					cellsSelector : '.howto .animate .cell'
				});

			var update = function(){
				$scope.cellByItemCss = genTextExample.getCellByItem(0, 'id', 3);

				$rootScope.animationExample = genAnimationExample.getMouseMovement(op.speed, op.easing);
				$rootScope.animationExample += genAnimationExample.getCellsByItem([{id: '#ball2', depth: 1}]);
				cssSet.watch('animationExample');
			};
			$rootScope.$watchCollection('options', update);
			$rootScope.$on('change', update);
		}]);
});
