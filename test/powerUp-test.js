var { assert } = require('chai');
const PowerUp = require('../lib/PowerUp.js');

describe('PowerUp Functionality', function () {
  it('should be an object', function () {
    const powerUp = new PowerUp();

    assert.isObject(powerUp, 'powerUp is an object');
  });
});
