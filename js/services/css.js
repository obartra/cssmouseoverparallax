define([
	'js/app',
	'js/services/cssGen',
	'lodash'
], function(app, CSSGen, _){

	'use strict';

	return app
		.service('cssGen', ['$rootScope', function($rootScope){
			var getCellCount = function(parallax, cells){
					return parallax ? parseInt(cells || 1, 10) : 1
				},
				cssGen,
				update = function(){
					var op = $rootScope.options,
						totalCols = op.hParallax ? op.hCells : 1,
						totalRows = op.vParallax ? op.vCells : 1,
						totalCells = getCellCount(op.hParallax, totalCols)* getCellCount(op.vParallax, totalRows),
						css = '';

					cssGen = new CSSGen({
						totalCols : totalCols,
						totalRows : totalRows,
						vMovement : op.vMovementPct/100,
						hMovement : op.hMovementPct/100,
						itemsSelector : '.result .item',
						cellsSelector : '.result .cell'
					});

					css += cssGen.getCellDimensions();
					css += cssGen.getMouseMovement(op.speed, op.easing);
					css += cssGen.getCellsByItem($rootScope.itemList);

					$rootScope.cellCss = css;
					$rootScope.totalCells = new Array(totalCells);

					$rootScope.$emit('css.change', css);
				};
			$rootScope.$watchCollection('options', update);
			$rootScope.$on('change', update);

			this.getNew = function(params){
				return new CSSGen(params);
			}
		}])
		.service('cssSet', ['$rootScope', function($rootScope){

			var varList = [],
				_style,
				create = function(){
					_style = document.createElement('style');
					_style.type = 'text/css';
					if (_style.styleSheet){
						_style.styleSheet.cssText = '';
					}else {
						_style.innerHTML = '';
					}
					document.head.appendChild(_style);
				},
				update = function(){
					var css = _.chain(varList)
								.map(function(varName){
									return $rootScope[varName];
								})
								.value()
								.join('\n');

					if (_style.styleSheet){
						_style.styleSheet.cssText = css;
					}else {
						_style.innerHTML = '';
						_style.appendChild(document.createTextNode(css));
					}
				};
			this.watch = function(varName){
				varList.push(varName);
				$rootScope.$watch(varName, update);
			}
			create();
		}]);
});
