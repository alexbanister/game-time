var { assert } = require('chai');
const Player = require('../lib/Player.js');

describe('Player Functionality', function () {
  it('should be an object', function () {
    const player = new Player();

    assert.isObject(player, 'player is an object');
  });
});
