class Player {
  constructor (x, y, width, height, score, balls, powerUp) {
    super(x, y, width, height);
    this.score = score || 0;
    this.balls = balls || 3;
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
