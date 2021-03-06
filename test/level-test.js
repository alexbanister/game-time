var { assert } = require('chai');
const Level = require('../lib/Level.js');
const Ball = require('../lib/Ball.js');
const Player = require('../lib/Player.js');
const Brick = require('../lib/Brick.js');
let ball;
let level;
let player;
let brick;

describe('Level Functionality', function () {
  beforeEach(() => {
    level = new Level();
  })
  it('should be an object', function () {
    assert.isObject(level, 'level is an object');
  });

  it('should default to level 1', function () {
    assert.equal(level.currentLevel, 1);
  });

  it('on instantiating a level start of game should be true', function () {
    assert.equal(level.start, true);
  });

  it('should have a function to build bricks on the canvas', function () {
    assert.isFunction(level.buildBricks);
  });

  it('once all bricks on current level have been destroyed, level should increment', function () {
    ball = new Ball();

    assert.equal(level.currentLevel, 1);
    level.completeLevel(ball, []);
    assert.equal(level.currentLevel, 2);
  });

  it('should have a function that builds draws a level', function () {
    assert.isFunction(level.drawLevel);
  });

  it('should have a function that checks the state of the game', function () {
    assert.isFunction(level.checkGameState);
  });

  it('should have a function that checks that will draw a random level when the set levels have been run through', function () {
    assert.isFunction(level.drawRandomLevel);
  });

  it('should have a function that gets the template of a given level', function () {
    assert.isFunction(level.getLevelTemplate);
  });

  it('brick density should decrement when hit by a ball', function () {
    ball = new Ball();
    player = new Player();
    level.currentLevel = 6;
    level.bricks = level.buildBricks();
    ball.x = 44;
    ball.y = 30;
    assert.equal(level.bricks[0].density, 2);
    ball.y = 45;
    ball.checkForCollisionsWithBrick(level, player, {});
    assert.equal(level.bricks[0].density, 1);
  });
});
