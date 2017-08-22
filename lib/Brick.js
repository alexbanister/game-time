const Render = require('./Render.js');

class Brick extends Render {
  constructor (x, y, width, height, density = 1) {
    super(x, y, width, height);
    this.density = density;

  }

  makeBrick (context) {
    context.translate(this.x, this.y);

    // layer1/Rectangle
    context.save();
    context.beginPath();
    context.moveTo(72.7, 25.0);
    context.lineTo(2.3, 25.0);
    context.bezierCurveTo(1.0, 25.0, 0.0, 24.0, 0.0, 22.7);
    context.lineTo(0.0, 2.3);
    context.bezierCurveTo(0.0, 1.0, 1.0, 0.0, 2.3, 0.0);
    context.lineTo(72.7, 0.0);
    context.bezierCurveTo(74.0, 0.0, 75.0, 1.0, 75.0, 2.3);
    context.lineTo(75.0, 22.7);
    context.bezierCurveTo(75.0, 24.0, 74.0, 25.0, 72.7, 25.0);
    context.closePath();
    context.fillStyle = this.getBrickColor();
    context.fill();
    let gradient = context.createLinearGradient(37.5, 0.0, 37.5, 25.0);

    gradient.addColorStop(0.00, "rgba(0, 0, 0, .2)");
    gradient.addColorStop(0.15, "rgba(0, 0, 0, .0)");
    gradient.addColorStop(0.27, "rgba(0, 0, 0, .2)");
    gradient.addColorStop(0.74, "rgba(0, 0, 0, .5)");
    gradient.addColorStop(1.00, "rgba(0, 0, 0, .6)");
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 0.2;
    context.stroke();

    // layer1/Rectangle
    context.globalAlpha = context.globalAlpha * 0.20;
    context.beginPath();
    context.moveTo(75.0, 12.0);
    context.lineTo(0.0, 12.0);
    context.lineTo(0.0, 11.0);
    context.lineTo(75.0, 11.0);
    context.lineTo(75.0, 12.0);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Rectangle
    context.beginPath();
    context.moveTo(75.0, 11.0);
    context.lineTo(0.0, 11.0);
    context.lineTo(0.0, 10.0);
    context.lineTo(75.0, 10.0);
    context.lineTo(75.0, 11.0);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Rectangle
    context.beginPath();
    context.moveTo(38.2, 25.0);
    context.lineTo(37.2, 25.0);
    context.lineTo(37.2, 0.0);
    context.lineTo(38.2, 0.0);
    context.lineTo(38.2, 25.0);
    context.closePath();
    context.fill();

    // layer1/Rectangle
    context.beginPath();
    context.moveTo(39.2, 25.0);
    context.lineTo(38.2, 25.0);
    context.lineTo(38.2, 0.0);
    context.lineTo(39.2, 0.0);
    context.lineTo(39.2, 25.0);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();
    context.restore();
    context.translate(-this.x, -this.y);
  }

  getBrickColor () {
    let colors = [ '',
      'rgb(247, 123, 62)',
      'rgb(247, 62, 62)',
      'rgb(247, 62, 151)',
      'rgb(199, 62, 247)',
      'rgb(62, 64, 247)',
      'rgb(62, 153, 247)',
      'rgb(62, 247, 231)',
      'rgb(62, 247, 103)',
      'rgb(160, 247, 62)',
      'rgb(247, 234, 62)'
    ];
    let brickColor = 'rgb(200, 200, 200)';

    if (colors[this.density]) {
      brickColor = colors[this.density];
    }
    return brickColor;
  }

  checkForPowerUps () {

  }
}

module.exports = Brick;
