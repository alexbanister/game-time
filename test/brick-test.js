var { assert } = require('chai');
const Brick = require('../lib/Brick.js');

describe('Brick Functionality', function () {
  it('should be an object', function () {
    const brick = new Brick();

    assert.isObject(brick, 'brick is an object');
  });

  it('should have a function that makes a brick', function () {
    const brick = new Brick();

    assert.isFunction(brick.makeBrick);
  });

  it('should have an x coodrinate value', function() {
    const brick = new Brick(15);

    assert.equal(brick.x, 15);
  });

  it('should have a y coodrinate value', function() {
    const brick = new Brick(15, 25);

    assert.equal(brick.y, 25);
  });

  it('should have a width', function() {
    const brick = new Brick(15, 25, 100);

    assert.equal(brick.width, 100);
  });

  it('should have a height', function() {
    const brick = new Brick(15, 25, 100, 25);

    assert.equal(brick.height, 25);
  });

  it('should have a density', function() {
    const brick = new Brick(15, 25, 100, 25, 3);

    assert.equal(brick.density, 3);
  });

  it('should have a default density', function() {
    const brick = new Brick(15, 25, 100, 25);

    assert.equal(brick.density, 1);
  });

  it('should have a function that changes brick color', function () {
    const brick = new Brick(15, 25, 100, 25);

    assert.isFunction(brick.getBrickColor);
  });
});
