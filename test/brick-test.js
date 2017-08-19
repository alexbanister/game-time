var { assert } = require('chai');
const Brick = require('../lib/Brick.js');

describe('Brick Functionality', function () {
  it('should be an object', function () {
    const brick = new Brick();

    assert.isObject(brick, 'brick is an object');
  });
});
