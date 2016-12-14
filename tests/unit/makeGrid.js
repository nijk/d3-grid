'use strict';

import makeGrid from '../../src/core/calculateGrid';

const window = {
  outerWidth: 1024,
  outerHeight: 768
};

describe("makeGrid", () => {
  it("should accept optional properties", () => {
    const opts = makeGrid({ foo: 'bar' }, window);
    expect(opts.foo).toEqual('bar');
  });

  it("should merge options with defaults", () => {
    const opts = makeGrid({ cellSize: [1, 1, 1] }, window);
    expect(opts).toEqual(jasmine.objectContaining({
      cellSize: [1, 1, 1],
      cells: 100,
      scale: false
    }));
  });

  it("should define fallback dimensions", () => {
    const opts = makeGrid({}, window);
    expect(opts).toEqual(jasmine.objectContaining({
      width: 100,
      height: 100
    }));
  });

  it("should disallow widths larger than the viewport", () => {
    const opts = makeGrid({ width: 1025, height: 769 }, window);
    expect(opts).toEqual(jasmine.objectContaining({
      width: window.outerWidth,
      height: window.outerHeight
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
