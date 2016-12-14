/**
 * d3-grid - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

import { gridCanvas, gridSvg } from "../grid/";

// Styles
import './scss/styles';

// HTML5 Canvas Squares
gridCanvas({
  /*width: 540,
  height: 450,*/
  /*classes: {
    canvas: {
      'vis__grid': false,
    },
  },*/
  type: 'canvas',
  selector: '.vis__canvas--squares',
  cells: 2e3,
  cellSize: [6,6,2],
  shape: 'square',
  scale: true
});

// HTML5 Canvas Squares
gridCanvas({
  /*width: 540,
  height: 450,*/
  /*classes: {
    canvas: {
      'vis__grid': false,
    },
  },*/
  type: 'canvas',
  selector: '.vis__canvas--circles',
  cells: 2e3,
  cellSize: [6,6,2],
  shape: 'circle',
  scale: true
});
