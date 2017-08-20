var { assert } = require('chai');
const Level = require('../lib/Level.js');

describe('Level Functionality', function () {
  it('should be an object', function () {
    const level = new Level();

    assert.isObject(level, 'level is an object');
  });

  it('should default to level 1', function () {
    const level = new Level();

    assert.equal(level.currentLevel, 1);
  });

  it('on instantiating a level start of game should be true', function () {
    const level = new Level();

    assert.equal(level.start, true);
  });

  it('should have a function to build bricks on the canvas', function () {
    const level = new Level();

    assert.isFunction(level.buildBricks);
  });

  it('should default to level 1', function () {
    const level = new Level();

    assert.equal(level.currentLevel, 1);
  });

  it('once all bricks on current level have been destroyed, level should increment', function () {
    const level = new Level();

    assert.equal(level.currentLevel, 1);
    level.buildBricks();
    level.activeBricks = 0;
    level.checkGameState();
    assert.equal(level.currentLevel, 2);
  });

  it('should have a function that builds a start screen', function () {
    const level = new Level();

    assert.isFunction(level.drawStartScreenText);
  });

  it('should have a function that builds draws a level', function () {
    const level = new Level();

    assert.isFunction(level.drawLevel);
  });

  it('should have a function that checks the state of the game', function () {
    const level = new Level();

    assert.isFunction(level.checkGameState);
  });

  //need sub-tests for internal functions of check game state

  it.skip('should have a function that checks the gets the background of the level', function () {
    const level = new Level();

    assert.isFunction(level.getLevelBackground);
  });

  it('should have a function that checks that will draw a random level when the set levels have been run through', function () {
    const level = new Level();

    assert.isFunction(level.drawRandomLevel);
  });

  it('should have a function that gets the template of a given level', function () {
    const level = new Level();

    assert.isFunction(level.getLevelTemplate);
  });
});
