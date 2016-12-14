/**
 * d3-grid - GridCanvas
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from 'd3';
import classnames from 'classnames';

import random from './random';
import Grid from './grid';

// GridCanvas
export default class GridCanvas extends Grid {
  /**
   * DOM elements
   * @returns {GridCanvas}
   */
  setDOM () {
    const selector = this.opts.selector || 'body';
    this.$parent = document.querySelector(selector);
    this.$grid = d3.select(selector).append('canvas');

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
   * @returns {GridCanvas}
   * @private
   */
  _buildGrid () {
    const { width, height, classes } = this.opts;
    const context = this.getContext(this.$grid);

    this.$grid
      .attr('class', classnames(classes.grid))
      .attr('width', width)
      .attr('height', height);

    context.clearRect(0, 0, width, height);

    return this;
  }

  /**
   * Build the container and the cells for each square/circle
   * @returns {GridCanvas}
   * @private
   */
  _buildContainer () {
    const { data, cellSize } = this.opts;
    this.$container = d3.select(document.createElement('grid'));

    this.$container.selectAll('grid')
      .data(data)
      .enter()
      .append('cell')
      .attr('x', this.calculateCellX.bind(this, this.cellOffset.x))
      .attr('y', this.calculateCellY.bind(this, this.cellOffset.y))
      .attr('width', cellSize[0])
      .attr('height', cellSize[1])
      .attr('fillStyle', random.colour);

    return this;
  }

  /**
   * Build the squares/circles
   * @returns {GridCanvas}
   * @private
   */
  _buildContents () {
    const context = this.getContext(this.$grid);
    const { shape, cellSize } = this.opts;

    switch (shape) {
      case 'circle':
        const endAngle = 2 * Math.PI;
        const radius = cellSize[0] / 2;

        this.$container.selectAll('cell').each((_d, i, nodes) => {
          const node = d3.select(nodes[i]);

          context.beginPath();
          context.fillStyle = node.attr('fillStyle');
          context.arc(node.attr('x'), node.attr('y'), radius, 0, endAngle);
          context.fill();
          context.closePath();
        });
        break;
      default:
        this.$container.selectAll('cell').each((_d, i, nodes) => {
          const node = d3.select(nodes[i]);

          context.beginPath();
          context.fillStyle = node.attr('fillStyle');
          context.fillRect(node.attr('x'), node.attr('y'), cellSize[0], cellSize[1]);
          context.closePath();
        });
        break;
    }

    return this;
  }
}
