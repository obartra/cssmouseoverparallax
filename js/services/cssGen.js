(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else {
		root.CSSGen = factory();
	}
}(this, function () {

	'use strict';

	/*
	 * CSSGen
	 *
	 * @main CSSGen
	 *
	 * Generates CSS code to create a mouseover parallax effect on an array of items and
	 * for the overlayed grid layout that will determine their position
	 */
	return function CSSGen(options) {
		/**
		 * Default parameters for CSSGen
		 * @property params
		 * @type Object
		 * @private
		 */
		this.params = {
			cellsSelector : '.cell',
			itemsSelector : '.item',
			totalCols : 1,
			totalRows : 1,
			vMovement : 0,
			hMovement : 0
		};
		/**
		 * Sets the parameters for CSSGen
		 * @method set
		 * @constructor
		 * @param {Object} the parameters to set
		 * @public
		 */
		this.set = function(options){
			if (options !== null && typeof options === 'object'){
				for (var property in options) {
					if (options.hasOwnProperty(property)) {
						this.params[property] = options[property];
					}
				}
			}
		};
		/**
		 * Generates the selector for a given cell index and image
		 * @method _genSelector
		 * @param {Integer} index. The cell index
		 * @param {String} id. The id of the image to target
		 * @return the selector to use for a css cell rule
		 * @protected
		 */
		this._genSelector = function(index, id){
			var p = this.params;
			return p.cellsSelector+':nth-child('+ (++index) +'):hover ~ ' + id;
		};
		/**
		 * Generates the percentage of movement to apply to a given image 
		 * when hovering a given cell
		 * @method _genOffset
		 * @param {Integer} position. Cell's vertical or horizontal position
		 * relative to the total number of cells on that axis
		 * @param {Integer} total. The total number of cells on that axis 
		 * (total columns or total cells)
		 * @param {Float} depth. The distance of the image from the viewer.
		 * Values range [0,5] with 0 being the furthest (no movement) and 5 the closest
		 * @param {Float} factor. A [0,1] value to reduce movement across all depths
		 * @return {Float} [0,100] the percentage of movement required.
 		 * @protected
		 */
		this._genOffset = function(position, total, depth, factor){
			if (total <= 1){
				return 0;
			}
				//Movement based on cell position
			var pct = (position - total/2)/(total-1),
				//Movement based on distance
				depthMovement = Math.min(5,Math.max(0, (10-depth*2)/10));

			//set values within bounds [0,5]
			depthMovement = Math.min(5,Math.max(0, depthMovement));

			//return a [0-100].xx% value;
			return parseInt(depthMovement*pct*10000*factor,10)/100;
		};
		/**
		 * Generates a CSS rule for a given cell index and image
		 * @method getCellByItem
		 * @param {Integer} index. The cell index
		 * @param {String} id. The id of the image to target
		 * @param {Float} depth. The distance of the image from the viewer.
		 * Values range [0,5] with 0 being the furthest (no movement) and 5 the closest
		 * @return the generated css rule
		 * @public
		 */
		this.getCellByItem = function(index, id, depth){
			var p = this.params,
				selector = this._genSelector(index, id),
				col = index % p.totalCols,
				row = window.parseInt(index / p.totalCols, 10),
				verticalOffset = this._genOffset(row, p.totalRows, depth, p.vMovement),
				horizontalOffset = this._genOffset(col, p.totalCols, depth, p.hMovement);

			return selector + '{\n' +
				'\tmargin-left: ' + horizontalOffset + '%;\n' +
				'\tmargin-top: ' + verticalOffset + '%;\n' +
			'}\n';
		};
		/**
		 * Generates all CSS rules associated with a given cell
		 * @method getCell
		 * @param {Integer} index. The cell index
		 * @param {Object[]} items. An array of objects detailing the different items 
		 * to apply parallax to. The items need two properties 'id' and 'depth'
		 * @return {String} the generated css rules
		 * @public
		 */
		this.getCell = function(index, items){
			var css = '';
			for (var pos = 0; pos < items.length; pos++){
				css += this.getCellByItem(index, items[pos].id, items[pos].depth);
			}
			return css;
		};
		/**
		 * Generates all CSS rules associated with all cells
		 * @method getCellsByItem
		 * @param {Object[]} items. An array of objects detailing the different items 
		 * to apply parallax to. The items need two properties 'id' and 'depth'
		 * @return {String} the generated css rules
		 * @public
		 */
		this.getCellsByItem = function(items){
			var css = '',
				p = this.params,
				counter = 0;
			for (var col = 0; col < p.totalCols; col++){
				for (var row = 0; row < p.totalRows; row++){
					css += this.getCell(counter++, items);
				}
			}
			return css;
		};
		/**
		 * Generates the rules to set the cells size
		 * @method getCellDimensions
		 * @return {String} the generated css rule
		 * @public
		 */
		this.getCellDimensions = function(){
			var p = this.params;
			return p.cellsSelector+'{\n' +
				'\twidth: ' + parseInt(10000/p.totalCols,10)/100 + '%;\n' +
				'\theight: ' + parseInt(10000/p.totalRows,10)/100 + '%;\n' +
			'}\n';
		};
		/**
		 * Generates the rules to set the transitions on mouse move
		 * @method getMouseMovement
		 * @param {Float} speed. Value in seconds, the amount of time 
		 * needed for an image to reach its final position
		 * @param {String} easing. A valid css easing value to apply to
		 * the images to animate
		 * @return {String} the generated css rule
		 * @public
		 */
		this.getMouseMovement = function(speed, easing){
			return this.params.itemsSelector+'{\n' +
				'\t-moz-transition: all ' + speed + 's ' + easing + ';\n' +
				'\t-o-transition: all ' + speed + 's ' + easing + ';\n' +
				'\t-webkit-transition: all ' + speed + 's ' + easing + ';\n' +
				'\ttransition: all ' + speed + 's ' + easing + ';\n' +
			'}\n';
		};

		if (options){
			this.set(options);
		}
	};
}));
