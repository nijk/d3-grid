/**
 * d3-grid - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

import _ from 'lodash';

import { GridCanvas, GridSvg } from "../src/";

// Styles
import './scss/styles';

// Settings
const cells = 3000;
const scale = true;

// HTML5 Canvas Squares
const canvasSquares = new GridCanvas({
  type: 'canvas',
  selector: '.vis__canvas--squares',
  cells,
  cellSize: [6,6,2],
  shape: 'square',
  scale,
});

// HTML5 Canvas Circles
const canvasCircles = new GridCanvas({
  /*width: 540,
  height: 450,*/
  /*classes: {
    canvas: {
      'vis__grid': false,
    },
  },*/
  type: 'canvas',
  selector: '.vis__canvas--circles',
  cells,
  cellSize: [6,6,2],
  shape: 'circle',
  scale,
});

// Svg Squares
const svgSquares = new GridSvg({
  type: 'svg',
  selector: '.vis__svg--squares',
  cells,
  cellSize: [6,6,2],
  shape: 'square',
  scale,
});

// Svg Circles
const svgCircles = new GridSvg({
  type: 'svg',
  selector: '.vis__svg--circles',
  cells,
  cellSize: [6,6,2],
  shape: 'circle',
  scale,
});


// Resize handler
const onResize = () => {
  console.info('onResize fired');
  canvasSquares.resize();
  canvasCircles.resize();
  svgSquares.resize();
  svgCircles.resize();
};

// Event handler
const addEvent = (object, type, callback) => {
  if (object == null || typeof(object) == 'undefined') return;

  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on"+type] = callback;
  }
};

// Event listener
addEvent(window, 'resize', _.debounce(onResize, 300));
