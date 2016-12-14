'use strict';

import _ from 'lodash';

let widthFallback = 100;
let heightFallback = 100;

// Defaults
let defaults = {
  cellSize: [8, 8, 2],
  cells: 100,
  scale: false
};

const setSize = ({ width, height, scale, ...rest }, $el) => {
  width = (scale || width > $el.clientWidth) ? $el.clientWidth : width || widthFallback;
  height = (scale || height > $el.clientHeight) ? $el.clientHeight : height || heightFallback;

  return _.merge({}, { width, height, scale }, rest);
};

const setGrid = ({ cells, width, height, grid, cellSize, ...rest }) => {
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

  return _.merge({}, { cells, width, height, grid, cellSize }, rest);
};

const setCell = ({ width, height, grid, cellSize, ...rest }) => {
  let cellWidth = Math.floor((width / grid[0]) * 0.9);
  let cellHeight = Math.floor((height / grid[1]) * 0.9);
  let cellGutter = Math.ceil(cellWidth * 0.1);
  cellSize = [cellWidth, cellHeight, cellGutter];

  return _.merge({}, { width, height, grid, cellSize }, rest);
};

const calculateGrid = (opts = {}, $el) => {
  // Options
  opts = _.merge({}, defaults, opts);

  // Set width & height
  opts = setSize(opts, $el);

  // Set columns & rows
  if (!opts.grid || opts.grid && opts.grid.length !== 2) {
    opts = setGrid(opts);
  }

  // Set cellSize
  if (!opts.cellSize || opts.cellSize && opts.cellSize.length !== 3) {
    opts = setCell(opts);
  }
  
  opts.data = _.range(0, opts.cells, 0);

  console.log('calculateGrid opts', opts);

  return opts;
};

export default calculateGrid;
