/**
 * d3-grid - /random
 *
 * Created by nijk on 14/09/2016.
 */

'use strict';

//import * as d3 from 'd3';
//const colours = d3.schemeCategory20c;

const randomColour = () => {
  const colours = ['#DC2878', '#865CD6', '#865CD6', '#865CD6', '#FD9A69', '#FD9A69', '#FD9A69', '#FD9A69', '#2AD2C9', '#2AD2C9', '#2AD2C9', '#2AD2C9', '#2AD2C9', '#2AD2C9', '#2AD2C9', '#2AD2C9', '#2AD2C9'];
  const colour = Math.floor(Math.random() * colours.length);

  return colours[colour];
};

const random = {
  colour: randomColour
};

export default random;
