var { assert } = require('chai');
const Player = require('../lib/Player.js');
const Ball = require('../lib/Ball.js');
let player;

describe('Player Functionality', function () {
  beforeEach(() => {
    player = new Player();
  })

  it('should be an object', function () {
    assert.isObject(player, 'player is an object');
  });

  it('should have an x coodrinate value with a default', function() {
    assert.equal(player.x, 450);
  });

  it('should have a y coodrinate that defaults to 565', function() {
    assert.equal(player.y, 565);
  });

  it('should have a default width', function() {
    assert.equal(player.width, 100);
  });

  it('should have a default height', function() {
    assert.equal(player.height, 20);
  });

  it('should have a default score of 0', function() {
    assert.equal(player.score, 0);
  });

  it('should should start with 3 balls', function() {
    assert.equal(player.balls, 3);
  });

  it('should have the ability to receive a powerUp', function () {
    assert.equal(player.activePowerUp);
  });

  it('should have a function to move the paddle', function () {
    assert.isFunction(player.movePaddle);
  });

  it('moving the mouse should change the x value of the paddle', function () {
    let e = { layerX: 700 }
    let canvas = { width: 1000 }

    player.movePaddle(canvas, e)
    assert.equal(player.x, e.layerX - player.width / 2);
    e.layerX = 100;
    player.movePaddle(canvas, e)
    assert.equal(player.x, e.layerX - player.width / 2);
  });

  it('should have a function to launch the ball', function () {
    assert.isFunction(player.launchBall);
  });

  it('launchBall function should change the velocity of the ball', function () {
    const ball = new Ball(500, 300);

    assert.equal(ball.velocityX, 0);
    assert.equal(ball.velocityY, 0);
    player.launchBall(ball, {});
    assert.equal(ball.velocityX, -1.8);
    assert.equal(ball.velocityY, -1.8);
  });

  it('score should increment when increaseScore function is called', function () {
    let hitBrick = [{}];
    assert.equal(player.score, 0);
    player.increaseScore(hitBrick);
    assert.equal(player.score, 1);
    player.increaseScore(hitBrick);
    player.increaseScore(hitBrick);
    assert.equal(player.score, 3);
  });

  it('numbers of lives should decrement upon ball passing below x axis of line', function () {
    player.balls = 3;
    player.removeBall();
    assert.equal(player.balls, 2);
  });
});
