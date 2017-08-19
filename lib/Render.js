class Render {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  addPowerUp (context){
    var powerUp = new PowerUp();
  }
}

module.exports = Render;
