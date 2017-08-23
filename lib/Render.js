
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

  makeBall(context, ball) {
    context.save();
    context.translate(ball.x, ball.y);
    context.beginPath();
    context.moveTo(9.5, 4.8);
    context.bezierCurveTo(9.5, 7.4, 7.4, 9.5, 4.8, 9.5);
    context.bezierCurveTo(2.2, 9.5, 0.1, 7.4, 0.1, 4.8);
    context.bezierCurveTo(0.1, 2.2, 2.2, 0.1, 4.8, 0.1);
    context.bezierCurveTo(7.4, 0.1, 9.5, 2.2, 9.5, 4.8);
    context.closePath();
    let gradient = context.createRadialGradient(3.2, 3.2, 0.0, 3.2, 3.2, 7.6);

    gradient.addColorStop(0.52, "rgb(255, 255, 255)");
    gradient.addColorStop(0.76, "rgb(127, 127, 127)");
    gradient.addColorStop(1.00, "rgb(0, 0, 0)");
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 0.2;
    context.stroke();
    context.translate(-ball.x, -ball.y);
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.restore();
  }

  drawStartScreenText (context, canvas, level) {
    if (level.start === true) {
      context.font = "60px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Breakout", canvas.width / 2, 300);

      context.font = "20px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Welcome to Breakout", canvas.width / 2, 350);

      context.font = "20px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Your mouse controls the paddle", canvas.width / 2, 375);

      context.font = "20px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Click to start", canvas.width / 2, 400);
    }
  }

  // addPowerUp (context) {
  //   var powerUp = new PowerUp();
  // }
}

module.exports = Render;
