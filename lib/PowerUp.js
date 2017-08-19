const Render = require('./Render.js');

class powerUp extends Render {
  constructor (x, y, width, height, whatPower) {
    super(x, y, width, height);
    this.whatPower = whatPower;
  }

  makePowerUp (context){

  }

  pickPowerUp () {

  }
}

module.exports = powerUp;
