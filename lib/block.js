class Block {
  constructor (x, y, width, height, xDir, yDir, xVelocity, yVelocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xDir = xDir || 1;
    this.yDir = yDir || 1;
    this.xVelocity = xVelocity || 1;
    this.yVelocity = yVelocity || 1;
  }

  doTheBlockThing(ctx){
      var gradient;

      // layer1/Ellipse
      ctx.translate(this.x, this.y);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(9.5, 4.8);
      ctx.bezierCurveTo(9.5, 7.4, 7.4, 9.5, 4.8, 9.5);
      ctx.bezierCurveTo(2.2, 9.5, 0.1, 7.4, 0.1, 4.8);
      ctx.bezierCurveTo(0.1, 2.2, 2.2, 0.1, 4.8, 0.1);
      ctx.bezierCurveTo(7.4, 0.1, 9.5, 2.2, 9.5, 4.8);
      ctx.closePath();
      gradient = ctx.createRadialGradient(3.2, 3.2, 0.0, 3.2, 3.2, 7.6);
      gradient.addColorStop(0.52, "rgb(255, 255, 255)");
      gradient.addColorStop(0.76, "rgb(127, 127, 127)");
      gradient.addColorStop(1.00, "rgb(0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.lineWidth = 0.2;
      ctx.stroke();
      ctx.restore();
      ctx.translate(-this.x, -this.y);
      this.x++;
      this.y++;
  }

  moveBlock(){
    if (this.x > 590 || this.x < 0) {
      // this.xVelocity = this.xVelocity * this.xDir;
      this.xVelocity = Math.floor((Math.random() * 5)) * this.xDir;
      this.x = 590 - this.xVelocity;
      this.xDir = this.xDir * -1;
    }
    if (this.y > 590 || this.y < 0) {
      // this.yVelocity = this.yVelocity * this.yDir;
      this.yVelocity = Math.floor((Math.random() * 5)) * this.yDir;
      this.y = 590 - this.yVelocity;
      this.yDir = this.yDir * -1;
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}


module.exports = Block;
