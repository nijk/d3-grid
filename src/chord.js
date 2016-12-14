/**
 * d3-proto - /chord
 *
 * Created by nijk on 13/09/2016.
 */

'use strict';

import * as d3 from "d3";
import * as _ from 'lodash';

// From http://mkweb.bcgsc.ca/circos/guide/tables/
const matrix = [
  [0.0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0.0, 0, 0, 0, 0, 0, 0, 700, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0.0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0.0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0.0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0.0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0.0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0.0, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 700, 52, 24, 4, 8, 6, 150, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0]
];

const matrixGroups = [
  { title: 'Group 1'/*, start: 0, end: 9*/},
  { title: 'Group 2'/*, start: 10, end: 19*/},
  { title: 'Group 3'/*, start: 20, end: 29*/},
  { title: 'Group 4'/*, start: 30, end: 39*/}
];

/*
 * Utils
 */

// Returns an array of text angles and values for a given group and step.
function nodeNumbers (d) {
  const start = d.startAngle / 2;
  const end = d.endAngle / 2;
  const item = parseInt(d.index, 10) + 1;
  const k = (end - start) / item;
  return [{ value: item, angle: item * k + d.startAngle }];
}

// Returns n as a float between lower and upper values
const permittedValue = (n, lower = 1, upper = 100) => Math.min(parseFloat(upper), Math.max(parseFloat(lower), parseFloat(n)));

// Process a chord to have equal arc size & distribution, via startAngle/endAngle
const processChordAngle = (options, chord, percentage = 100, debug = false) => {
  const startAngle = chord.index * (options.nodeRad + options.arcPadding);
  const endAngle = startAngle + ((options.nodeRad / 100) * percentage);
  debug && console.debug('processChordAngle', startAngle, endAngle);
  return { ...chord, startAngle, endAngle, extra: parseFloat((Math.random() * 100).toFixed(1)), extra2: parseFloat((Math.random() * 100).toFixed(1)) };
};

// Return value in Radians for number of degrees in a circle
const getTotalRadians = (deg = 360) => {
  const value = permittedValue(deg, 0, 360);
  return value / ((value / 2) / Math.PI);
};

// Return value in Radians for each arc of a circle
const getArcRadian = (arcs = 1, arcPadding = 0) => (getTotalRadians() - arcPadding) / arcs;

// Process a chord's array-like object to have equal arc size & distribution
const processChords = (chords, { arcPadding }) => {
  const options = {
    arcPadding,
    arcs: chords['groups'].length,
    totalRads: getTotalRadians(),
  };
  options.totalarcPadding = options.arcs * arcPadding;
  options.nodeRad = getArcRadian(options.arcs, options.totalarcPadding);

  _.each(chords, (chord, key) => {
    chords[key].source = processChordAngle(options, chord.source, permittedValue(chord.source.value, 15, 50));
    chords[key].target = processChordAngle(options, chord.target);
  });

  // Handle groups
  chords.groups = _.map(chords.groups, (chord) => processChordAngle(options, chord));
  return chords;
};

// D3 functions
const generateArc = ({ inner, outer/*, size*/ }) => d3.arc().innerRadius(inner).outerRadius(outer);

const generateArcValue = (radius, value, d) => generateArc({
  inner: radius.inner,
  outer: radius.inner + ((radius.size / 100) * permittedValue(value, 10, 100))/*,
   size: radius.size*/
})(d);

// Colours
const color = (i) => d3.scaleOrdinal().domain(d3.range(1)).range(["#4c5e6c"])(i);

// Chord Element
const chord = ({ diameter = 500 }) => {
  const arcPadding = 0.01; // Space between arcs in Radians, for conversion to px see arcSpacing
  const arcSize = 15; // Depth of the arcs in pixels
  const outerRadius = (diameter * 0.5);
  const arcSpacing = Math.max(1, outerRadius * arcPadding);
  const innerRadius = outerRadius - ((arcSize * 3) + (arcSpacing * 2) + 30);

  console.info('arcSpacing', arcSpacing, outerRadius * arcPadding);

  // SVG
  const svg = d3.select('body').append('svg');
  svg.attr('width', diameter)
    .attr('height', diameter);

  // Chord data
  let chords = d3.chord().padAngle(arcPadding).sortSubgroups(d3.descending)(matrix);
  chords = processChords(chords, { arcPadding });

  // Arcs
  const arcInnerRadius = { inner: innerRadius, outer: innerRadius + arcSize };

  const arcMiddleRadius = { inner: arcInnerRadius.outer + arcSpacing };
  arcMiddleRadius.outer = arcMiddleRadius.inner + arcSize;

  const arcOuterRadius = { inner: arcMiddleRadius.outer + arcSpacing };
  arcOuterRadius.outer = arcOuterRadius.inner + arcSize;

  // All Chord data
  let g = svg.append("g")
    .attr("transform", `translate(${outerRadius}, ${outerRadius})`)
    .datum(chords);

  // Ribbons
  g.append("g")
    .attr("class", "ribbons")
    .selectAll("path")
    .data(chords => chords)
    .enter().append("path")
    .attr("d", d3.ribbon().radius(innerRadius - arcSpacing))
    .style("fill", d => color(d.target.index))/*
   .style("stroke", d => d3.rgb(color(d.target.index)).darker())*/;

  /**
   * Wheel
   */

  // Segments
  let segmentNodes = g.append("g")
    .attr("class", "segments")
    .selectAll("g")
    .data(chords => chords.groups)
    .enter().append("g")
    .attr("class", "segment");

  let segmentArcInner = segmentNodes.append("g").attr("class", "segment__arc-inner");
  let segmentArcMiddle = segmentNodes.append("g").attr("class", "segment__arc-middle");
  let segmentArcOuter = segmentNodes.append("g").attr("class", "segment__arc-outer");

  let segmentGroups = g.append("g")
    .attr("class", "segment-groups");

  /**
   * Segment: Arc inner
   */

  // Arc Inner background
  segmentArcInner.append("path")
    .style("fill", d => color(d.index))
    .attr("d", generateArc(arcInnerRadius))
    .attr("class", "segment__arc-inner");

  // Arc Inner Text
  let segmentArcInnerText = segmentArcInner.selectAll(".segment__arc-inner-text")
    .data(nodeNumbers)
    .enter().append("g")
    .attr("class", "segment__arc-inner-text")
    .attr("transform", d => `rotate(${(d.angle)*180/Math.PI-90}) translate(${arcInnerRadius.inner + (arcSize/2)},0)`);

  segmentArcInnerText.append('text')
    .attr("x", 0)
    .attr("y", 0)
    .attr("dy", ".35em")
    .attr("transform", d => `rotate(${90-(d.angle*180/Math.PI)})`)
    .style("text-anchor", "middle")
    .text(d => _.padStart(d.value, 2, 0));

  /**
   * Segment: Arc middle
   */

  // Arc Middle background
  segmentArcMiddle.append('path')
    .attr("d", generateArc(arcMiddleRadius))
    .style("fill", d => color(d.index))
    .attr("class", "group__arc-middle-bg");

  // Arc Middle value
  segmentArcMiddle.append('path')
    .attr("d", d => generateArcValue(Object.assign(arcMiddleRadius, { size: arcSize }), d.extra, d))
    .style("fill", "green")
    .attr("class", "segment__arc-middle-value");

  /**
   * Segment: Arc outer
   */

  // Arc Outer background
  segmentArcOuter.append('path')
    .attr("d", generateArc(arcOuterRadius))
    .style("fill", d => color(d.index))
    .attr("class", "group__arc-outer-bg");

  // Arc Outer value
  segmentArcOuter.append('path')
    .attr("d", d => generateArcValue(Object.assign(arcOuterRadius, { size: arcSize }), d.extra2, d))
    .style("fill", "green")
    .attr("class", "segment__arc-outer-value");

  /**
   * Segment Groups
   */
  let segmentGroupNodes = segmentGroups.selectAll(".segment-group")
    .data(matrixGroups)
    .enter().append("g")
    .attr("transform", (_d, i) => `rotate(${90*i})`)
    .attr("class", "segment-group");

  let clipPaths = svg.append("defs")
    //.attr("transform", "translate(400, 400)")
    .selectAll(".segment-groups__clip-paths")
    .data(matrixGroups)
    .enter().append("clipPath")
    .attr("id", (_d, i) => `segment-groups__clip-paths--item-${i+1}`)
    .append("rect")
    .attr("width", 100)
    .attr("height", 100)
    .attr("x", (_d, i) => (outerRadius/4) + ((outerRadius/4)*0.25))
    .attr("y", (_d, i) => -((outerRadius/4) - ((outerRadius/4)*0.25)))
    .attr("transform-origin", "center center")
    .attr("transform", (_d, i, coll) => {
      const segmentAngle = (360 / coll.length);
      const angle = (segmentAngle / 2) + (segmentAngle * i);
      console.info('segmentAngle', angle);
      return `rotate(${angle}) translate(0,0)`;
    });

  // Arc line
  segmentGroupNodes.append("path")
    .attr("id", (_d, i) => `segment-group__arc--item-${i+1}`)
    .attr("class", "segment-group__arc")
    .attr("d", (d, i, coll) => d3.arc()({
      innerRadius: outerRadius - 10,
      outerRadius: outerRadius - 9,
      startAngle: 0,
      endAngle: (getTotalRadians() / coll.length) - arcPadding
    }))
    .attr("clip-path", (_d, i) => `#segment-group__text--item-${i+1}`)
    .style("fill", d => "#fff");

  // Segment group rotated by 90 deg
  let segmentGroupNodesRotated = segmentGroups.selectAll(".segment-group--rotated")
    .data(matrixGroups)
    .enter().append("g")
    .attr("transform", (_d, i) => `rotate(${90*(i+1)})`)
    .attr("class", "segment-group--rotated");

  // Arc line end-caps
  segmentGroupNodes
    .append("line")
    .attr("x1", "0")
    .attr("y1", "0")
    .attr("x2", "0")
    .attr("y2", "9")
    .attr("stroke", "#fff")
    .attr("stroke-width", "1")
    .attr("transform", (_d, i) => `translate(1, -${outerRadius-5})`);

  segmentGroupNodesRotated
    .append("line")
    .attr("x1", "0")
    .attr("y1", "0")
    .attr("x2", "0")
    .attr("y2", "9")
    .attr("stroke", "#fff")
    .attr("stroke-width", "1")
    .attr("transform", (_d, i) => `translate(-${arcSpacing}, -${outerRadius-5})`)
    /*.attr("transform-origin", "-${outerRadius -14}px 0")*/;

  // Arc line text
  segmentGroupNodes.append("text")
    .attr("id", (_d, i) => `segment-group__text--item-${i+1}`)
    .attr("class", "segment-group__text")
    .attr("dx", 0)
    .attr("dy", 5)
    .attr("transform", "rotate(45)")
    .append("textPath")
    .text(d => d.title)
    .attr("xlink:href", (_d, i) => `#segment-group__arc--item-${i+1}`)
    //.style("text-anchor", "middle")
    .style("background-color", "blue")
    .style("fill", "#fff");
};

export default chord;
