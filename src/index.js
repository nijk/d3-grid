/**
 * d3-proto - /index
 *
 * Created by nijk on 03/09/2016.
 */

'use strict';

//import chord from "./chord";
//import circle from "./circle";
//import wheel from "./wheel/wheel";
import grid from "./grid/";


// Styles
require('./style/styles');

//chord();

//circle(500);

//wheel({ size: 500, ringWidth: 40, gap: 10, segments: 20 });

grid({
  /*width: 540,
  height: 450,*/
  type: 'canvas',
  selector: '#vis',
  cells: 10e3,
  cellSize: [6,6,2],
  shape: 'circle',
  scale: true
});
