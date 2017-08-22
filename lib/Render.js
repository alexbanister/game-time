
class Render {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawPaddle(context, player) {
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
  }

  displayLives(context, player) {
    context.font = "16px Monospace";
    context.fillStyle = "black";
    context.textAlign = "left"
    context.fillText("Lives: " + player.balls, 15, 25);
  }

  displayLevel(context, level, canvas) {
    context.font = "16px Monospace";
    context.fillStyle = "black";
    context.textAlign = "center"
    context.fillText("Level: " + level.currentLevel, canvas.width / 2, 25);
  }

  displayScore(context, canvas, player) {
    context.font = "16px Monospace";
    context.fillStyle = "black";
    context.textAlign = "right"
    context.fillText("Score: " + player.score, canvas.width - 15, 25);
  }

  // addPowerUp (context) {
  //   var powerUp = new PowerUp();
  // }
}

module.exports = Render;
