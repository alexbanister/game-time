var { assert } = require('chai');
const Level = require('../lib/Level.js');
let level;

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

  it.skip('once all bricks on current level have been destroyed, level should increment', function () {
    //checkGameState needs refactor
    assert.equal(level.currentLevel, 1);
    level.buildBricks({}, {}, {}, { velocityX: 1, velocityY: 1 });
    level.bricks = [];
    level.checkGameState();
    assert.equal(level.currentLevel, 2);
  });

  it('should have a function that builds draws a level', function () {
    assert.isFunction(level.drawLevel);
  });

  it('should have a function that checks the state of the game', function () {
    assert.isFunction(level.checkGameState);
  });

  //need sub-tests for internal functions of check game state

  it.skip('should have a function that checks the gets the background of the level', function () {
    assert.isFunction(level.getLevelBackground);
  });

  it('should have a function that checks that will draw a random level when the set levels have been run through', function () {
    assert.isFunction(level.drawRandomLevel);
  });

  it('should have a function that gets the template of a given level', function () {
    assert.isFunction(level.getLevelTemplate);
  });
});
