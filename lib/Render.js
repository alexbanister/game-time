
class Render {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawPaddle(context, player) {
    let alpha = context.globalAlpha;
    let gradient;

    // layer1/Rectangle
    context.translate(player.x, player.y);
    context.save();
    context.scale(player.scale, 1);
    context.beginPath();
    context.moveTo(92.5, 15.0);
    context.lineTo(7.5, 15.0);
    context.bezierCurveTo(3.4, 15.0, 0.0, 11.6, 0.0, 7.5);
    context.lineTo(0.0, 7.5);
    context.bezierCurveTo(0.0, 3.4, 3.4, -0.0, 7.5, -0.0);
    context.lineTo(92.5, -0.0);
    context.bezierCurveTo(96.6, -0.0, 100.0, 3.4, 100.0, 7.5);
    context.lineTo(100.0, 7.5);
    context.bezierCurveTo(100.0, 11.6, 96.6, 15.0, 92.5, 15.0);
    context.closePath();
    gradient = context.createLinearGradient(50.0, -0.0, 50.0, 15.0);
    gradient.addColorStop(0.00, "rgb(0, 0, 0)");
    gradient.addColorStop(0.27, "rgb(255, 255, 255)");
    gradient.addColorStop(1.00, "rgb(0, 0, 0)");
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 0.5;
    context.stroke();

    // layer1/Rectangle
    context.globalAlpha = alpha * 0.30;
    context.beginPath();
    context.moveTo(92.5, 14.5);
    context.lineTo(7.5, 14.5);
    context.bezierCurveTo(3.7, 14.5, 0.5, 11.3, 0.5, 7.5);
    context.lineTo(0.5, 7.5);
    context.bezierCurveTo(0.5, 3.6, 3.7, 0.5, 7.5, 0.5);
    context.lineTo(92.5, 0.5);
    context.bezierCurveTo(96.4, 0.5, 99.5, 3.6, 99.5, 7.5);
    context.lineTo(99.5, 7.5);
    context.bezierCurveTo(99.5, 11.3, 96.4, 14.5, 92.5, 14.5);
    context.closePath();
    context.lineWidth = 0.5;
    context.strokeStyle = "rgb(255, 255, 255)";
    context.stroke();

    // layer1/Line
    context.globalAlpha = alpha * 0.25;
    context.beginPath();
    context.moveTo(7.5, 1.0);
    context.lineTo(7.5, 14.0);
    context.lineWidth = 0.5;
    context.strokeStyle = "rgb(0, 0, 0)";
    context.stroke();

    // layer1/Line
    context.beginPath();
    context.moveTo(93.1, 1.0);
    context.lineTo(93.1, 14.0);
    context.stroke();

    // layer1/Line
    context.beginPath();
    context.moveTo(50.0, 1.0);
    context.lineTo(50.0, 14.0);
    context.stroke();
    context.restore();
    context.translate(-player.x, -player.y);
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

  drawBackground (context, canvas, level) {
    context.fillStyle = level.getLevelBackground();
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

module.exports = Render;
