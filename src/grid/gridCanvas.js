/**
 * d3-proto - /grid
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from 'd3';
import _ from 'lodash';
import classnames from 'classnames';

import random from '../core/random';
import calculateGrid from '../core/calculateGrid';

// Styles
import './grid.scss';

// CSS Classes
const setClasses = ({ scale, ...rest }) => {
  let classes = { el: {}, grid: {} };
  classes.el['vis__max'] = !!scale;
  classes.grid['vis__grid'] = true;

  return _.merge({ scale, classes }, rest);
};

const buildCells = ($grid, context, opts) => {
  const { shape } = opts;

  switch (shape) {
    case 'circle':
      const endAngle = 2 * Math.PI;
      const radius = opts.cellSize[0] / 2;

      $grid.selectAll('cell').each((_d, i, nodes) => {
        const node = d3.select(nodes[i]);

        context.beginPath();
        context.fillStyle = node.attr('fillStyle');
        context.arc(node.attr('x'), node.attr('y'), radius, 0, endAngle);
        context.fill();
        context.closePath();
      });
      break;
    default:
      $grid.selectAll('cell').each((_d, i, nodes) => {
        const node = d3.select(nodes[i]);

        context.beginPath();
        context.fillStyle = node.attr('fillStyle');
        context.fillRect(node.attr('x'), node.attr('y'), opts.cellSize[0], opts.cellSize[0]);
        context.closePath();
      });
      break;
  }
};

const buildGrid = ({ shape, data, cellSize, grid }) => {
  const cols = grid[0];
  const $grid = d3.select(document.createElement('grid'));

  let offsetX = 0;
  let offsetY = 0;

  if (shape === 'circle') {
    offsetX = Math.ceil((cellSize[0] + cellSize[2]) / 2);
    offsetY = Math.ceil((cellSize[1] + cellSize[2]) / 2);
  }


  $grid.selectAll('grid')
   .data(data)
   .enter()
   .append('cell')
   .attr('x', (_d, i) => {
     const item = i + 1;
     const col = (item > grid[0]) ? item - (grid[0] * (Math.ceil(item / cols - 1))) : item;
     return ((cellSize[0] + cellSize[2]) * (col - 1)) + offsetX;
   })
   .attr('y', (_d, i) => ((cellSize[1] + cellSize[2]) * (Math.ceil((i + 1) / cols) - 1)) + offsetY)
   .attr('width', cellSize[0])
   .attr('height', cellSize[1])
   .attr('fillStyle', random.colour);

  return $grid;
};

// Grid builder
const build = ($canvas, opts) => {
  const { width, height, classes } = opts;
  const context = $canvas.node().getContext('2d');

  let $grid;

  $canvas.attr('class', classnames(classes.el))
    .attr('width', width)
    .attr('height', height);

  context.clearRect(0, 0, $canvas.attr('width'), $canvas.attr('height'));

  $grid = buildGrid(opts);
  buildCells($grid, context, opts);

};

const gridCanvas = (opts) => {
  // Basic elements
  const selector = opts.selector || 'body';
  const $el = document.querySelector(selector);
  const $canvas = d3.select(selector).append('canvas');

  // Ensure grid options are complete
  opts = calculateGrid(opts, $el);

  // Set data and classes
  opts = setClasses(opts);

  build($canvas, opts);
};

export default gridCanvas;
