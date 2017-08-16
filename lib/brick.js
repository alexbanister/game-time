const Render = require('./render.js');

class Brick extends Render {
  constructor (x, y, width, height, density = 1) {
    super(x, y, width, height);
    this.density = density;
  }

  makeBrick (context){

  }

  getHit () {

  }

  clearBrick () {

  }

  checkForPowerUps () {

  }
}

module.exports = Brick;
