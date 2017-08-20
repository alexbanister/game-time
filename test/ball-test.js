var { assert } = require('chai');
const Ball = require('../lib/Ball.js');
const Player = require('../lib/Player.js');


describe('Ball Functionality', function () {
  it('should be an object', function () {
    const ball = new Ball();

    assert.isObject(ball, 'ball is an object');

    });

    it('should have a function that makes a brick', function () {
      const ball = new Ball();

      assert.isFunction(ball.makeBall);
    });

    it('should have an x coodrinate value', function() {
      const ball = new Ball(500);

      assert.equal(ball.x, 500);
    });

    it('should have a y coodrinate value', function() {
      const ball = new Ball(500, 300);

      assert.equal(ball.y, 300);
    });

    it('should have a default width', function() {
      const ball = new Ball(500, 300, width = 10);

      assert.equal(ball.width, 10);
    });

    it('should have a default height', function() {
      const ball = new Ball(500, 300, width = 10, height = 10);

      assert.equal(ball.height, 10);
    });

    it('should have a default velocity moving along the x axis', function() {
      const ball = new Ball(500, 300, width = 10, height = 10, velocity = 0);

      assert.equal(ball.velocityX, 0);
    });

    it('should have a default velocity moving along the y axis', function() {
      const ball = new Ball(500, 300, width = 10, height = 10, velocity = 0);

      assert.equal(ball.velocityY, 0);
    });

    it('should have a stickyBall function', function () {
      const ball = new Ball();

      assert.isFunction(ball.stickyBall);
    });

    it('this stickyBall function should place ball in middle of paddle, in middle of screen at 495, 553', function () {
      const ball = new Ball(10, 10, width = 10, height = 10, velocity = 0);
      const player = new Player();

      ball.stickyBall(player);
      assert.equal(ball.x, 495);
      assert.equal(ball.y, 553);
    });

    it('ball should have no X or Y velocity when intially stuck to paddle', function () {
      const ball = new Ball(10, 10, width = 10, height = 10, velocity = 0);
      const player = new Player();

      ball.stickyBall(player);
      assert.equal(ball.velocityX, 0);
      assert.equal(ball.velocityY, 0);

    });

    it('should have a brick collision function function', function () {
      const ball = new Ball();

      assert.isFunction(ball.checkForCollisionsWithBrick);
    });

    // need to add more detailed test for brick collision

    it('should have a paddle collision  function', function () {
      const ball = new Ball();

      assert.isFunction(ball.checkForCollisionsWithPaddle);
    });

    // need to add more detailed test for paddle collision

    it('should have a wall collision function', function () {
      const ball = new Ball();

      assert.isFunction(ball.checkForCollisionsWithWall);
    });

    // need to add more detailed test for wall collision
});
