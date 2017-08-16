const Render = require('./render.js');

let width = 75;
let height = 25;
let x = (game.width - width)/2;
let y = (game.height - height);
console.log(context);

class Player extends Render {
  constructor (x, y, width, height, score = 0, balls = 3, powerUp) {
    super(x, y, width, height);
    this.score = score;
    this.balls = balls;
    this.powerUp = powerUp;
    drawPaddle(x, y, width, height);
  }

  drawPaddle(paddleX, paddleY, paddleWidth, paddleHeight) {
    console.log("am i here?");
    context.beginPath();
    context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
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
