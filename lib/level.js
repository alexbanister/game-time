const Brick = require('./brick.js');
class Level {
  constructor (currentLevel = 1) {
    this.currentLevel = currentLevel;
    this.bricks = this.buildBricks();
  }

  buildBricks (){
    let allBricks = [];
    let counter = 0;
    let x = 44;
    let y = 44;
    this.getLevelTemplate(this.currentLevel).forEach((i) => {
      let brick = new Brick(x, y, 75, 25, i);
      allBricks.push(brick);
      x += 76;
      counter++;
      if (counter === 12) {
        counter = 0;
        y = y+26;
        x = 44;
      }
    });
    return allBricks
  }

  drawLevel (context) {
    this.bricks.forEach((brick) => {
      if (brick.density > 0) {
        brick.makeBrick(context);
      }
    });
  }

  getLevelBackground () {
    let colors = [ '',
      'rgb(247, 202, 136)',
      'rgb(183, 247, 227)',
      'rgb(190, 200, 244)',
      'rgb(246, 182, 195)'
    ];
    let background = 'rgb(225, 225, 200)';
    if (colors[this.currentLevel]) {
      background = colors[this.currentLevel];
    }
    return background;
  }

  getLevelTemplate (level) {
    switch (level) {
      case 1:
        return [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
      case 2:
        return [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ];
      case 3:
        return [
          1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1,
          1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,
          1, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1,
          1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1,
          1, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 1,
          1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1,
          0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0
        ];
      case 4:
        return [
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
          0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0
        ];
    }

  }

  drawBackground(context) {
    var alpha = context.globalAlpha;
    var gradient;

    // layer1/Rectangle
    context.save();
    context.beginPath();
    context.moveTo(1000.0, 600.1);
    context.lineTo(0.0, 600.1);
    context.lineTo(0.0, 0.1);
    context.lineTo(1000.0, 0.1);
    context.lineTo(1000.0, 600.1);
    context.closePath();
    context.fillStyle = this.getLevelBackground();
    context.fill();
    context.lineWidth = 0.2;
    context.stroke();

    // layer1/Group

    // layer1/Group/Path
    context.save();
    context.beginPath();
    context.moveTo(990.0, 0.0);
    context.lineTo(990.0, 599.5);
    context.lineTo(1000.0, 599.5);
    context.lineTo(1000.0, 0.0);
    context.lineTo(990.0, 0.0);
    context.closePath();
    gradient = context.createLinearGradient(1000.0, 299.8, 990.0, 299.8);
    gradient.addColorStop(0.00, "rgb(109, 110, 112)");
    gradient.addColorStop(0.34, "rgb(255, 255, 255)");
    gradient.addColorStop(1.00, "rgb(128, 130, 132)");
    context.fillStyle = gradient;
    context.fill();
    context.stroke();

    // layer1/Group/Path
    context.beginPath();
    context.moveTo(0.0, 0.0);
    context.lineTo(0.0, 599.5);
    context.lineTo(10.0, 599.5);
    context.lineTo(10.0, 0.0);
    context.lineTo(0.0, 0.0);
    context.closePath();
    gradient = context.createLinearGradient(0.7, 299.8, 9.7, 299.8);
    gradient.addColorStop(0.00, "rgb(109, 110, 112)");
    gradient.addColorStop(0.34, "rgb(255, 255, 255)");
    gradient.addColorStop(1.00, "rgb(128, 130, 132)");
    context.fillStyle = gradient;
    context.fill();
    context.stroke();

    // layer1/Path
    context.restore();
    context.beginPath();
    context.moveTo(990.0, 10.1);
    context.lineTo(990.0, 0.1);
    context.lineTo(990.0, 0.1);
    context.bezierCurveTo(990.0, 0.1, 990.0, 0.1, 1001.0, 0.1);
    context.lineTo(21.0, 0.1);
    context.lineTo(10.0, 10.1);
    context.lineTo(990.0, 10.1);
    context.closePath();
    context.fillStyle = "rgb(204, 102, 102)";
    context.fill();
    context.lineWidth = 1.0;
    context.stroke();

    // layer1/Group

    // layer1/Group/Path
    context.save();
    context.beginPath();
    context.moveTo(990.0, 0.1);
    context.bezierCurveTo(990.0, 0.1, 990.0, 0.1, 1001.0, 0.1);
    context.lineTo(10.0, 0.1);
    context.lineTo(10.0, 10.1);
    context.lineTo(990.0, 10.1);
    context.lineTo(990.0, 0.1);
    context.lineTo(990.0, 0.1);
    context.closePath();
    gradient = context.createLinearGradient(505.5, 10.1, 505.5, 0.1);
    gradient.addColorStop(0.00, "rgb(109, 110, 112)");
    gradient.addColorStop(0.34, "rgb(255, 255, 255)");
    gradient.addColorStop(1.00, "rgb(128, 130, 132)");
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 0.2;
    context.stroke();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(9.8, 27.1);
    context.lineTo(0.3, 27.1);
    context.lineTo(0.3, 26.1);
    context.lineTo(9.8, 26.1);
    context.lineTo(9.8, 27.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(9.8, 26.1);
    context.lineTo(0.3, 26.1);
    context.lineTo(0.3, 25.1);
    context.lineTo(9.8, 25.1);
    context.lineTo(9.8, 26.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(9.8, 127.1);
    context.lineTo(0.3, 127.1);
    context.lineTo(0.3, 126.1);
    context.lineTo(9.8, 126.1);
    context.lineTo(9.8, 127.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(9.8, 126.1);
    context.lineTo(0.3, 126.1);
    context.lineTo(0.3, 125.1);
    context.lineTo(9.8, 125.1);
    context.lineTo(9.8, 126.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(9.8, 227.1);
    context.lineTo(0.3, 227.1);
    context.lineTo(0.3, 226.1);
    context.lineTo(9.8, 226.1);
    context.lineTo(9.8, 227.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(9.8, 226.1);
    context.lineTo(0.3, 226.1);
    context.lineTo(0.3, 225.1);
    context.lineTo(9.8, 225.1);
    context.lineTo(9.8, 226.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(9.8, 327.1);
    context.lineTo(0.3, 327.1);
    context.lineTo(0.3, 326.1);
    context.lineTo(9.8, 326.1);
    context.lineTo(9.8, 327.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(9.8, 326.1);
    context.lineTo(0.3, 326.1);
    context.lineTo(0.3, 325.1);
    context.lineTo(9.8, 325.1);
    context.lineTo(9.8, 326.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(9.8, 427.1);
    context.lineTo(0.3, 427.1);
    context.lineTo(0.3, 426.1);
    context.lineTo(9.8, 426.1);
    context.lineTo(9.8, 427.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(9.8, 426.1);
    context.lineTo(0.3, 426.1);
    context.lineTo(0.3, 425.1);
    context.lineTo(9.8, 425.1);
    context.lineTo(9.8, 426.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(9.8, 527.1);
    context.lineTo(0.3, 527.1);
    context.lineTo(0.3, 526.1);
    context.lineTo(9.8, 526.1);
    context.lineTo(9.8, 527.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(9.8, 526.1);
    context.lineTo(0.3, 526.1);
    context.lineTo(0.3, 525.1);
    context.lineTo(9.8, 525.1);
    context.lineTo(9.8, 526.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(999.7, 27.1);
    context.lineTo(990.3, 27.1);
    context.lineTo(990.3, 26.1);
    context.lineTo(999.7, 26.1);
    context.lineTo(999.7, 27.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(999.7, 26.1);
    context.lineTo(990.3, 26.1);
    context.lineTo(990.3, 25.1);
    context.lineTo(999.7, 25.1);
    context.lineTo(999.7, 26.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(999.7, 127.1);
    context.lineTo(990.3, 127.1);
    context.lineTo(990.3, 126.1);
    context.lineTo(999.7, 126.1);
    context.lineTo(999.7, 127.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(999.7, 126.1);
    context.lineTo(990.3, 126.1);
    context.lineTo(990.3, 125.1);
    context.lineTo(999.7, 125.1);
    context.lineTo(999.7, 126.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(999.7, 227.1);
    context.lineTo(990.3, 227.1);
    context.lineTo(990.3, 226.1);
    context.lineTo(999.7, 226.1);
    context.lineTo(999.7, 227.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(999.7, 226.1);
    context.lineTo(990.3, 226.1);
    context.lineTo(990.3, 225.1);
    context.lineTo(999.7, 225.1);
    context.lineTo(999.7, 226.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(999.7, 327.1);
    context.lineTo(990.3, 327.1);
    context.lineTo(990.3, 326.1);
    context.lineTo(999.7, 326.1);
    context.lineTo(999.7, 327.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(999.7, 326.1);
    context.lineTo(990.3, 326.1);
    context.lineTo(990.3, 325.1);
    context.lineTo(999.7, 325.1);
    context.lineTo(999.7, 326.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(999.7, 427.1);
    context.lineTo(990.3, 427.1);
    context.lineTo(990.3, 426.1);
    context.lineTo(999.7, 426.1);
    context.lineTo(999.7, 427.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(999.7, 426.1);
    context.lineTo(990.3, 426.1);
    context.lineTo(990.3, 425.1);
    context.lineTo(999.7, 425.1);
    context.lineTo(999.7, 426.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(999.7, 527.1);
    context.lineTo(990.3, 527.1);
    context.lineTo(990.3, 526.1);
    context.lineTo(999.7, 526.1);
    context.lineTo(999.7, 527.1);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(999.7, 526.1);
    context.lineTo(990.3, 526.1);
    context.lineTo(990.3, 525.1);
    context.lineTo(999.7, 525.1);
    context.lineTo(999.7, 526.1);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(597.6, 9.9);
    context.lineTo(597.6, 0.4);
    context.lineTo(598.6, 0.4);
    context.lineTo(598.6, 9.9);
    context.lineTo(597.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(598.6, 9.9);
    context.lineTo(598.6, 0.4);
    context.lineTo(599.6, 0.4);
    context.lineTo(599.6, 9.9);
    context.lineTo(598.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(697.6, 9.9);
    context.lineTo(697.6, 0.4);
    context.lineTo(698.6, 0.4);
    context.lineTo(698.6, 9.9);
    context.lineTo(697.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(698.6, 9.9);
    context.lineTo(698.6, 0.4);
    context.lineTo(699.6, 0.4);
    context.lineTo(699.6, 9.9);
    context.lineTo(698.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(797.6, 9.9);
    context.lineTo(797.6, 0.4);
    context.lineTo(798.6, 0.4);
    context.lineTo(798.6, 9.9);
    context.lineTo(797.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(798.6, 9.9);
    context.lineTo(798.6, 0.4);
    context.lineTo(799.6, 0.4);
    context.lineTo(799.6, 9.9);
    context.lineTo(798.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(897.6, 9.9);
    context.lineTo(897.6, 0.4);
    context.lineTo(898.6, 0.4);
    context.lineTo(898.6, 9.9);
    context.lineTo(897.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(898.6, 9.9);
    context.lineTo(898.6, 0.4);
    context.lineTo(899.6, 0.4);
    context.lineTo(899.6, 9.9);
    context.lineTo(898.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(497.6, 9.9);
    context.lineTo(497.6, 0.4);
    context.lineTo(498.6, 0.4);
    context.lineTo(498.6, 9.9);
    context.lineTo(497.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(498.6, 9.9);
    context.lineTo(498.6, 0.4);
    context.lineTo(499.6, 0.4);
    context.lineTo(499.6, 9.9);
    context.lineTo(498.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(397.6, 9.9);
    context.lineTo(397.6, 0.4);
    context.lineTo(398.6, 0.4);
    context.lineTo(398.6, 9.9);
    context.lineTo(397.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(398.6, 9.9);
    context.lineTo(398.6, 0.4);
    context.lineTo(399.6, 0.4);
    context.lineTo(399.6, 9.9);
    context.lineTo(398.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(297.6, 9.9);
    context.lineTo(297.6, 0.4);
    context.lineTo(298.6, 0.4);
    context.lineTo(298.6, 9.9);
    context.lineTo(297.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(298.6, 9.9);
    context.lineTo(298.6, 0.4);
    context.lineTo(299.6, 0.4);
    context.lineTo(299.6, 9.9);
    context.lineTo(298.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(197.6, 9.9);
    context.lineTo(197.6, 0.4);
    context.lineTo(198.6, 0.4);
    context.lineTo(198.6, 9.9);
    context.lineTo(197.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(198.6, 9.9);
    context.lineTo(198.6, 0.4);
    context.lineTo(199.6, 0.4);
    context.lineTo(199.6, 9.9);
    context.lineTo(198.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // layer1/Group
    context.restore();

    // layer1/Group/Rectangle
    context.save();
    context.globalAlpha = alpha * 0.20;
    context.beginPath();
    context.moveTo(97.6, 9.9);
    context.lineTo(97.6, 0.4);
    context.lineTo(98.6, 0.4);
    context.lineTo(98.6, 9.9);
    context.lineTo(97.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();

    // layer1/Group/Rectangle
    context.beginPath();
    context.moveTo(98.6, 9.9);
    context.lineTo(98.6, 0.4);
    context.lineTo(99.6, 0.4);
    context.lineTo(99.6, 9.9);
    context.lineTo(98.6, 9.9);
    context.closePath();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();
    context.restore();
    context.restore();
  }
}

module.exports = Level;
