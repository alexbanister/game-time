
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

  // addPowerUp (context) {
  //   var powerUp = new PowerUp();
  // }
}

module.exports = Render;
