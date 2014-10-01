define(['angular', 'js/app', 'prism'], function(ng, app, Prism){

	'use strict';

	app
	.directive('prism', [function() {
		return {
			scope: {
				prism: '='
			},
			link: function(scope, element) {
				scope.$watch('prism', function(v) {
					if(v) {
						Prism.highlightElement(element.find("code")[0]);
					}
				});
			},
			template: "<code ng-bind='prism'></code>"
		};
	}]);
});
