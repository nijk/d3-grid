'use strict';

import gridCanvas from './gridCanvas';
import gridSvg from './gridSvg';

export default (opts) => {
  const { type = 'svg' } = opts;
  switch (type) {
    case 'canvas':
      return gridCanvas(opts);
      break;
    case 'svg':
      return gridSvg(opts);
      break;
    default:
      return gridSvg(opts);
      break;
  }
}
