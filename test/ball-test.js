var { assert } = require('chai');
const Ball = require('../lib/Ball.js');
const Player = require('../lib/Player.js');
let ball;

describe('Ball Functionality', function () {
  beforeEach(() => {
    ball = new Ball(500, 300);
  })

  it('should be an object', function () {
    assert.isObject(ball, 'ball is an object');
  });

  it('should have a function that makes a ball', function () {
    assert.isFunction(ball.makeBall);
  });

  it('should have an x coodrinate value', function() {
    assert.equal(ball.x, 500);
  });

  it('should have a y coodrinate value', function() {
    assert.equal(ball.y, 300);
  });

  it('should have a default width', function() {
    assert.equal(ball.width, 10);
  });

  it('should have a default height', function() {
    assert.equal(ball.height, 10);
  });

  it('should have a default velocity moving along the x axis', function() {
    assert.equal(ball.velocityX, 0);
  });

  it('should have a default velocity moving along the y axis', function() {
    assert.equal(ball.velocityY, 0);
  });

  it('should have a stickyBall function', function () {
    assert.isFunction(ball.stickyBall);
  });

  it('this stickyBall function should place ball in middle of paddle, in middle of screen at 495, 553', function () {
    const player = new Player();
    ball.x = 10;
    ball.y = 10;

    ball.stickyBall(player);
    assert.equal(ball.x, 495);
    assert.equal(ball.y, 553);
  });

  it('ball should have no X or Y velocity when intially stuck to paddle', function () {
    const player = new Player();
    ball.x = 10;
    ball.y = 10;

    ball.stickyBall(player);
    assert.equal(ball.velocityX, 0);
    assert.equal(ball.velocityY, 0);

  });

  it('should have a brick collision function', function () {
    assert.isFunction(ball.checkForCollisionsWithBrick);
  });

  it('should check which brick where hit', function () {
    assert.isFunction(ball.checkAllBricks);
  });

  // need to add more detailed test for brick collision

  it('should have a paddle collision  function', function () {
    assert.isFunction(ball.checkForCollisionsWithPaddle);
  });

  // need to add more detailed test for paddle collision

  it('should have a wall collision function', function () {
    assert.isFunction(ball.checkForCollisionsWithWall);
  });

    // need to add more detailed test for wall collision
});
