var { assert } = require('chai');
const PowerUp = require('../lib/PowerUp.js');
const Player = require('../lib/Player.js');
const Ball = require('../lib/Ball.js');
let powerUp;
let player;
let ball;
let context;

describe('PowerUp Functionality', function () {
  beforeEach(() => {
    player = new Player();
    ball = new Ball();

    powerUp = new PowerUp(10, 10, 10, 10, player, context, ball);
  });

  it('should be an object', function () {
    assert.isObject(powerUp, 'powerUp is an object');
  });

  it('should have a function that draws powerup', function () {
    assert.isFunction(powerUp.drawPowerUp);
  });

  it('should have a powerup that gives extra lives and incremenets player lives', function () {
    assert.equal(powerUp.player.balls, 3);
    powerUp.powerUpList[0].power();
    assert.equal(powerUp.player.balls, 4);
  });

  it('should have a powerup that shrinks the width of the paddle in half', function () {
    assert.equal(powerUp.player.width, 100);
    powerUp.powerUpList[1].power();
    assert.equal(powerUp.player.width, 50);
  });

  it('should have a powerup that doubles the width of the paddle', function () {
    assert.equal(powerUp.player.width, 100);
    powerUp.powerUpList[2].power();
    assert.equal(powerUp.player.width, 200);
  });

  it('should have set the paddle back to its normal width', function () {
    powerUp.powerUpList[2].power();
    assert.equal(powerUp.player.width, 200);
    powerUp.removePowerUp();
    assert.equal(powerUp.player.width, 100);
    assert.equal(powerUp.powerUp.ball.sticky, false);
    powerUp.powerUpList[3].power();
    assert.equal(powerUp.powerUp.ball.sticky, true);
    powerUp.removePowerUp();
  });

  it('should have function to let powerups fall off screen if not caught by player', function () {
    assert.isFunction(powerUp.fallOffScreen, 'this is a function');
    player.currentPowerUps.push(powerUp);
    assert.deepEqual(player.currentPowerUps, [ powerUp ])
    powerUp.y = 601
    powerUp.fallOffScreen();
    assert.deepEqual(player.currentPowerUps, [ ])
  });

  it('should have function that triggers a powerUp when the powerUp hits the paddle', function () {
    assert.isFunction(powerUp.hitPaddle, 'this is a function');

    powerUp.y = 550;
    powerUp.x = 700;
    player.x = 700;
    assert.equal(powerUp.hitPaddle(), false);
    powerUp.y = 560;
    assert.equal(powerUp.hitPaddle(), true);
  });
});
