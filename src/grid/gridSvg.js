/**
 * d3-grid - GridSvg
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from 'd3';
import classnames from 'classnames';

import random from './random';
import Grid from './grid';

// GridSvg
export default class GridSvg extends Grid {
  /**
   * DOM elements
   * @returns {GridSvg}
   */
  setDOM () {
    const selector = this.opts.selector || 'body';
    this.$parent = document.querySelector(selector);
    this.$grid = d3.select(selector).append('svg');

    console.info('SVG setDOM', this.$grid);
    
    return this;
  }

  /**
   * HTML5 Canvas Context from D3 selection
   * @param elem
   * @returns {*|CanvasRenderingContext2D}
   */
  getContext (elem) {
    return elem.node().getContext('2d');
  }

  /**
   * Build the Grid
   * @returns {GridSvg}
   * @private
   */
  _buildGrid () {
    const { width, height, classes } = this.opts;

    this.$grid.attr('class', classnames(classes.grid))
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    return this;
  }

  /**
   * Build the container and the cells for each square/circle
   * @returns {GridSvg}
   * @private
   */
  _buildContainer () {
    const { width, height, classes } = this.opts;

    this.$container = this.$grid.append('g');

    //this.$container = this.$grid.select('g');

    this.$container.attr('class', classnames(classes.container))
      .attr('width', width)
      .attr('height', height);
  }

  /**
   * Build the squares/circles
   * @returns {GridSvg}
   * @private
   */
  _buildContents () {
    const { shape, data, cellSize } = this.opts;

    switch (shape) {
      case 'circle':
        const endAngle = 2 * Math.PI;
        const radius = cellSize[0] / 2;

        // Make circles
        break;
      default:
        this.$container.selectAll('rect')
          .data(data)
          .enter().append('rect')
          .attr('x', this.calculateCellX.bind(this, this.cellOffset.x))
          .attr('y', this.calculateCellY.bind(this, this.cellOffset.y))
          .attr('width', cellSize[0])
          .attr('height', cellSize[1])
          .style("fill", random.colour);
        break;
    }

    return this;
  }
}
