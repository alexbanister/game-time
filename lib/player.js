const Render = require('./render.js');

class Player extends Render {
  constructor (x, y, width, height, score = 0, balls = 3, powerUp) {
    super(x, y, width, height);
    this.score = score;
    this.balls = balls;
    this.powerUp = powerUp;
  }

  movePaddle (context){

  }

  increaseScore () {

  }

  addBall () {

  }

  removeBall () {

  }
}

module.exports = Player;
