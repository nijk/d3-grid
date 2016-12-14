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
import makeGrid from '../core/calculateGrid';

// Styles
import './grid.scss';

// CSS Classes
const setClasses = ({ scale, ...rest }) => {
  let classes = { svg: {}, g: {} };
  classes.svg['vix__max'] = !!scale;
  classes.g['container'] = true;

  return _.merge({ scale, classes }, rest);
};

const buildSquares = (el, cols, rows, { data, width, height, cellSize }) => {
  el.g.selectAll('rect')
   .data(data)
   .enter().append('rect')
   .attr('x', (_d, i) => {
   const item = i + 1;
   const col = item > cols ? item - (cols * (Math.ceil(item / cols - 1))) : item;
   return (cellSize[0] + cellSize[2]) * (col - 1);
   })
   .attr('y', (_d, i) => (cellSize[1] + cellSize[2]) * (Math.ceil((i + 1) / cols) - 1))
   .attr('width', cellSize[0])
   .attr('height', cellSize[1])
   .style("fill", random.colour);
};

const buildCircles = (el, cols, rows, { data, cellSize }) => {
  const items = data.length;
  const spotCentre = (cellSize[1] + cellSize[2]) / 2;

  const spotXPos = (_d, i) => {
    const item = i + 1;
    const col = item > cols ? item - (cols * (Math.ceil(item / cols - 1))) : item;
    return ((cellSize[0] + cellSize[2]) / 2) * (col);
  };

  const spotYPos = (_d, i) => {
    const item = i + 1;
    const spotCentre = (cellSize[1] + cellSize[2]) / 2;
    const rows = Math.ceil(items / cols);
    const row = Math.ceil(item / rows);

    console.log(`item ${item} of ${items} on row ${row} of ${rows - 1}`, `x: ${spotXPos(_d, i)} y: ${spotCentre * row} with radius ${spotRadius}`);

    return spotCentre * row;
  };

  const spotRadius = ((cellSize[0] / 2) - (cellSize[2] / 2)) / 2;

  el.g.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', spotXPos)
    .attr('cy', spotYPos)
    .attr('r', spotRadius)
    .style("fill", random.colour);
};

// SVG builder
const build = (el, { shape, data, width, height, grid, cellSize, classes }) => {
  let cols = grid[0];
  let rows = grid[1];

  el.svg.attr('class', classnames(classes.svg))
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`);

  el.g.attr('class', classnames(classes.g))
    .attr('width', width)
    .attr('height', height);

  switch (shape) {
    case 'squares':
      buildSquares(el, cols, rows, { data, width, height, grid, cellSize, classes });
      break;
    case 'circles':
      buildCircles(el, cols, rows, { data, cellSize, classes });
      break;
  }

  console.log('data', data, data.length);
};

const gridSvg = (opts) => {
  // Basic elements
  let el = {};
  el.svg = d3.select('body').append('svg');
  el.g = el.svg.append('g');

  opts = makeGrid(opts);

  opts.data = _.range(0, opts.cells, 0);

  opts = setClasses(opts);

  console.log('build opts', opts);

  build(el, opts);
};

export default gridSvg;
