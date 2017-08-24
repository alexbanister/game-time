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

  it('as the paddle moves along its x-axis, the balls x-axis should change to match that of the players x-axis', function () {
    const player = new Player();

    ball.x = 10;
    ball.y = 10;

    player.x = 400;
    ball.stickyBall(player);
    assert.equal(ball.x, (player.x + ((player.width / 2) - (ball.width / 2))))
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

  it('should have a paddle collision  function', function () {
    assert.isFunction(ball.checkForCollisionsWithPaddle);
  });

  it('should hit paddle', function () {
    const player = new Player();

    player.x = 10;
    ball.x = 10;
    ball.y = 10;

    assert.equal(ball.checkForCollisionsWithPaddle(player), false);
    ball.y = 555;
    assert.equal(ball.checkForCollisionsWithPaddle(player), true);
  });

  it('should hit paddle', function () {
    const player = new Player();

    ball.x = 10;
    ball.y = 10;
    ball.velocityY = 1.8;
    ball.velocityX = 1.8

    assert.equal(ball.checkForCollisionsWithPaddle(player), false);
    assert.equal(ball.velocityX, 1.8);
    assert.equal(ball.velocityY, 1.8);
    ball.y = 555;
    ball.x = 495;
    assert.equal(ball.checkForCollisionsWithPaddle(player), true);
    assert.equal(ball.velocityX, -0.4);
    assert.equal(ball.velocityY.toFixed(6), -1.9);
  });

  it('should bounce off wall', function () {
    ball.x = 10;
    ball.y = 10;
    ball.velocityY = 1.8;
    ball.velocityX = 1.8
    let width = 1000;

    ball.checkForCollisionsWithWall(width)
    assert.equal(ball.velocityX, 1.8);
    assert.equal(ball.velocityY, 1.8);

    ball.y = 0;
    ball.checkForCollisionsWithWall(width)
    assert.equal(ball.velocityX, 1.8);
    assert.equal(ball.velocityY, -1.8);

    ball.x = width;
    ball.y = 10;
    ball.checkForCollisionsWithWall(width)
    assert.equal(ball.velocityX, -1.8);
    assert.equal(ball.velocityY, -1.8);
  });
});
