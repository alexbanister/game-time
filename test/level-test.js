var { assert } = require('chai');
const Level = require('../lib/Level.js');

describe('Level Functionality', function () {
  it('should be an object', function () {
    const level = new Level();

    assert.isObject(level, 'level is an object');
  });
});
