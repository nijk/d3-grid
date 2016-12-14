'use strict';

import CalculateGrid from '../../src/calculateGrid';

const mocks = {
  window: {},
};

mocks.window.getComputedStyle = () => ({
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
});

const body = {
  clientWidth: 1024,
  clientHeight: 768,
};

let calculateGrid;

describe("calculateGrid", () => {

  beforeEach(() => {
    calculateGrid = new CalculateGrid(mocks.window);
  });

  it("should accept optional properties", () => {
    const opts = calculateGrid.calculate(body, { foo: 'bar' });
    expect(opts.foo).toEqual('bar');
  });

  it("should merge options with defaults", () => {
    const opts = calculateGrid.calculate(body, { cellSize: [1, 1, 1] });
    expect(opts).toEqual(jasmine.objectContaining({
      cellSize: [1, 1, 1],
      cells: 100,
      scale: false
    }));
  });

  it("should define fallback dimensions", () => {
    const opts = calculateGrid.calculate(body, {});
    expect(opts).toEqual(jasmine.objectContaining({
      width: 100,
      height: 100
    }));
  });

  it("should disallow widths larger than the viewport", () => {
    const opts = calculateGrid.calculate(body, { width: 1025, height: 769 });
    expect(opts).toEqual(jasmine.objectContaining({
      width: body.clientWidth,
      height: body.clientHeight
    }));
  });


  /*
  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
  */
});
