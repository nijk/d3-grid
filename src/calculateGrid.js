'use strict';

import _ from 'lodash';

export default class CalculateGrid {
  constructor (window = window) {
    this.window = window;
    
    this.defaults = {
      width: 100,
      height: 100,
      cellSize: [8, 8, 2],
      cells: 100,
      scale: false,      
    };
    
    this.$el = null;
    this.opts = {};

    return this;
  }

  /**
   * Set Options
   * @param opts
   * @returns {CalculateGrid}
   */
  setOpts (opts) {
    this.opts = _.merge({}, this.opts, opts);
    return this;
  }

  /**
   * Set Size props
   * @returns {CalculateGrid}
   */
  setSize () {
    const computedStyle = this.window.getComputedStyle(this.$el);
    const padding = {
      x: parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight),
      y: parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
    };

    let { width, height, scale } = this.opts;
    let elWidth, elHeight;

    elWidth = this.$el.clientWidth;
    elHeight = this.$el.clientHeight;

    elWidth -= padding.x;
    elHeight -= padding.y;

    width = (scale || width > elWidth) ? elWidth : width || this.defaults.width;
    height = (scale || height > elHeight) ? elHeight : height || this.defaults.height;

    return this.setOpts({ width, height, scale });
  }

  /**
   * Set Grid props
   * @returns {CalculateGrid}
   */
  setGrid () {
    let { cells, width, height, grid, cellSize } = this.opts;
    let side, cols, rows;

    if (cellSize.length === 3) {
      cols = Math.floor((width - cellSize[2]) / (cellSize[0] + cellSize[2]));
      rows = Math.floor((height - cellSize[2]) / (cellSize[1] + cellSize[2]));
    } else {
      side = Math.sqrt(cells);
      side = side > 1 ? Math.floor(side) : 1;
      cols = rows = side;
    }

    grid = [cols, rows];

    return this.setOpts({ cells, width, height, grid, cellSize });
  }

  /**
   * Set Cell props
   * @returns {CalculateGrid}
   */
  setCell () {
    let { cells, width, height, grid, cellSize } = this.opts;
    const cellWidth = Math.floor((width / grid[0]) * 0.9);
    const cellHeight = Math.floor((height / grid[1]) * 0.9);
    const cellGutter = Math.ceil(cellWidth * 0.1);
    cellSize = [cellWidth, cellHeight, cellGutter];

    return this.setOpts({ cells, width, height, grid, cellSize });
  }

  /**
   * Calculate all props
   * @param $el
   * @param opts
   * @returns {*}
   */
  calculate ($el, opts) {
    // Set properties
    this.$el = $el;
    this.opts = _.merge({}, this.defaults, opts);

    // Set width & height
    this.setSize();

    // Set columns & rows
    if (!this.opts.grid || this.opts.grid && this.opts.grid.length !== 2) {
      this.setGrid();
    }

    // Set cellSize
    if (!this.opts.cellSize || this.opts.cellSize && this.opts.cellSize.length !== 3) {
      this.setCell();
    }

    this.setOpts({
      data: _.range(0, this.opts.cells, 0),
    });

    return this.opts;
  }
}
