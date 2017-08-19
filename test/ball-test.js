var { assert } = require('chai');
const Ball = require('../lib/Ball.js');

describe('Ball Functionality', function () {
  it('should be an object', function () {
    const ball = new Ball();

    assert.isObject(ball, 'ball is an object');
  });
});
