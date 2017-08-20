var { assert } = require('chai');
const Player = require('../lib/Player.js');
const Ball = require('../lib/Ball.js');

describe('Player Functionality', function () {
  it('should be an object', function () {
    const player = new Player();

    assert.isObject(player, 'player is an object');
  });

  it('should have a function that draws a paddle', function () {
    const player = new Player();

    assert.isFunction(player.drawPaddle);
  });

  it('should have an x coodrinate value with a default', function() {
    const player = new Player();

    assert.equal(player.x, 450);
  });

  it('should have a y coodrinate that defaults to 565', function() {
    const player = new Player();

    assert.equal(player.y, 565);
  });

  it('should have a default width', function() {
    const player = new Player();

    assert.equal(player.width, 100);
  });

  it('should have a default height', function() {
    const player = new Player();

    assert.equal(player.height, 20);
  });

  it('should have a default score of 0', function() {
    const player = new Player();

    assert.equal(player.score, 0);
  });

  it('should should start with 3 balls', function() {
    const player = new Player();

    assert.equal(player.balls, 3);
  });

  it.skip('should have the ability to receive a powerUp', function () {
    const player = new Player();

    //need a powerUp check
  });

  it('should have a function to move the paddle', function () {
    const player = new Player();

    assert.isFunction(player.movePaddle);
  });

  it.skip('moving the mouse should change the x value of the paddle', function () {
    const player = new Player();
  });

  it('should have a function to display lives', function () {
    const player = new Player();

    assert.isFunction(player.displayLives);
  });

  it('should have a function to launch the ball', function () {
    const player = new Player();

    assert.isFunction(player.launchBall);
  });

  it('launchBall function should change the velocity of the ball', function () {
    const player = new Player();
    const ball = new Ball(x, y, width = 10, height = 10, velocity = 0);

    assert.equal(ball.velocityX, 0);
    assert.equal(ball.velocityY, 0);
    player.launchBall();
    assert.equal(ball.velocityX, -1.8);
    assert.equal(ball.velocityY, -1.8);
  });

  it('should have a function to display level', function () {
    const player = new Player();

    assert.isFunction(player.displayLevel);
  });

  it('should have a function to display score', function () {
    const player = new Player();

    assert.isFunction(player.displayScore);
  });

  it('score should increment when increaseScoreyScore function is called', function () {
    const player = new Player();

    assert.equal(player.score, 0);
    player.increaseScore();
    player.increaseScore();
    player.increaseScore();
    assert.equal(player.score, 3);
  });

  it.skip('numbers of lives should decrement upon ball passing below x axis of line', function () {
    const player = new Player();

    assert.isFunction(player.displayLives);
  });
});
