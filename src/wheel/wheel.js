/**
 * d3-proto - /circle
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from 'd3';
import _ from 'lodash';

import random from '../core/random';

// Styles
require('./wheel.scss');

const wheel = ({ size = 100, ringWidth = 10, gap = 5, segments = 1 }) => {
  const svg = d3.select('body').append('svg');
  const g = svg.append('g');

  const circleSize = size - (ringWidth * 2) - (gap * 2);
  const circleRadius = circleSize / 2;
  const circleCenter = size / 2;
  const pie = d3.pie()
    .padAngle(0.2);
  const arc = d3.arc()
    .innerRadius((circleSize + gap) / 2)
    .outerRadius(size / 2)
    .padAngle(0.01);

  // SVG
  svg.attr('width', size)
    .attr('height', size)
    .attr('class', 'vis__circle-ring');

  g.attr('class', 'container');

  // Wheel
  g.append('circle')
    .attr('cx', circleCenter)
    .attr('cy', circleCenter)
    .attr('r', circleRadius)
    .attr('class', 'vis__wheel-centre');

  g.selectAll('path')
    .data(pie(_.range(1, segments, 0)))
    .enter().append('path')
    .style('fill', random.colour)
    .attr('transform', `translate(${circleCenter}, ${circleCenter})`)
    .attr('d', arc);
};

export default wheel;
