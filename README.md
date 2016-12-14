# D3 Grid
A D3 implementation of an SVG or Canvas grid

## Install

```npm install```

## How to use
See `/example` for implementation or run `npm start` and visit http://localhost:3000 to see the example grids.

```
import { GridCanvas, GridSvg } from "../src/";

// HTML5 Canvas Squares
const canvasSquares = new GridCanvas({
 selector: '.vis__canvas--squares',
 cells: 3000,
 cellSize: [6,6,2],
 shape: 'square',
 scale: true,
});

// Handle resizing

// N.B. This code will need to be wrapped in event listener and debounce handlers
canvasSquares.resize();
```
