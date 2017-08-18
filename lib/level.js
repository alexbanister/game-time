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
    this.bricks.forEach((brick, i) => {
      if (brick.density < 1) {
        this.bricks[i] = '';
      }
      if (brick) {
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
    case 5:
      return [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
    default:
      return this.drawRandomLevel();
    }
  }
}

module.exports = Level;
