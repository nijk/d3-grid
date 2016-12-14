/**
 * d3-grid - /grid
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import _ from 'lodash';
import CalculateGrid from './calculateGrid';

/**
 * Abstract class: Grid
 */
export default class Grid {
  constructor (opts) {
    // Properties
    this.opts = opts;
    this.$container = null;
    this.$grid = null;
    this.$parent = null;
    this.cellOffset = {
      x: 0,
      y: 0
    };

    const calculateGrid = new CalculateGrid(window);

    // Calculate Grid, set appropriate classes and build the Canvas Grid
    return this.setDOM()
      .setOpts(calculateGrid.calculate(this.$parent, this.opts))
      .setClasses()
      .calculateCellOffset()
      .build();
  }

  resize () {
    this.setOpts(calculateGrid.calculate(this.$parent, this.opts))
      .setClasses()
      .calculateCellOffset()
      .build();

    return this;
  }

  /**
   * Stub: DOM elements
   * @returns {Grid}
   */
  setDOM () {
    return this;
  }

  /**
   * Set Options
   * @param opts
   * @returns {Grid}
   */
  setOpts (opts) {
    this.opts = _.merge({}, this.opts, opts);
    return this;
  }

  /**
   * CSS Classes
   * @returns {Grid}
   */
  setClasses () {
    const { scale } = this.opts;
    let classes = {
      grid: {
        'vis__max': !!scale,
      },
      container: {
        container: true
      },
    };

    this.setOpts({ classes });

    return this;
  }

  /**
   * Grid builder
   */
  build () {
    this._buildGrid();
    this._buildContainer();
    this._buildContents();
  }

  calculateCellOffset () {
    const { shape, cellSize } = this.opts;

    if (shape === 'circle') {
      this.cellOffset = {
        x: Math.ceil((cellSize[0] + cellSize[2]) / 2),
        y: Math.ceil((cellSize[1] + cellSize[2]) / 2)
      };
    }

    return this;
  }

  /**
   * Calculate the cell's x value
   * @param offset
   * @param _d
   * @param i
   * @returns {*}
   * @private
   */
  calculateCellX (offset, _d, i) {
    const { cellSize, grid } = this.opts;
    const item = i + 1;
    const col = (item > grid[0]) ? item - (grid[0] * (Math.ceil(item / grid[0] - 1))) : item;
    return ((cellSize[0] + cellSize[2]) * (col - 1)) + offset;
  }

  /**
   * Calculate the cell's y value
   * @param offset
   * @param _d
   * @param i
   * @returns {*}
   * @private
   */
  calculateCellY (offset, _d, i) {
    const { cellSize, grid } = this.opts;
    return ((cellSize[1] + cellSize[2]) * (Math.ceil((i + 1) / grid[0]) - 1)) + offset
  }

  /**
   * Stub: Build the Grid
   * @returns {Grid}
   * @private
   */
  _buildGrid () {
    console.info('Abstract _buildGrid');
    return this;
  }

  /**
   * Stub: Build the container and the cells for each square/circle
   * @returns {Grid}
   * @private
   */
  _buildContainer () {
    return this;
  }

  /**
   * Stub: Build the squares/circles
   * @returns {Grid}
   * @private
   */
  _buildContents () {
    return this;
  }
}
