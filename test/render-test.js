var { assert } = require('chai');
const Render = require('../lib/Render.js');

describe('Render Functionality', function () {
  it('should be an object', function () {
    const render = new Render();

    assert.isObject(render, 'render is an object');
  });
});
