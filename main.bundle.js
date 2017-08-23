/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Render = __webpack_require__(1);
	const Brick = __webpack_require__(2);
	const Ball = __webpack_require__(3);
	const Player = __webpack_require__(4);
	const PowerUp = __webpack_require__(5);
	const Level = __webpack_require__(6);
	const Style = __webpack_require__(7);

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var player = new Player();
	var level = new Level(1);
	var ball = new Ball();
	var render = new Render(0, 0, 0, 0);

	function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  // level.drawBackground(context);
	  level.drawLevel(context);
	  // level.drawStartScreenBackground(context);
	  render.drawStartScreenText(context, canvas, level);
	  render.drawPaddle(context, player);
	  render.displayScore(context, canvas, player);
	  render.displayLives(context, player);
	  render.displayLevel(context, level, canvas);
	  render.makeBall(context, ball);
	  ball.stickyBall(player);
	  ball.checkForCollisionsWithBrick(level, player);
	  ball.checkForCollisionsWithWall(canvas.width);
	  ball.checkForCollisionsWithPaddle(player);
	  level.checkGameState(canvas, context, player, ball);
	  //level.currentPowerUps[0].powerUp();
	  if (player.currentPowerUps.length > 0) {
	    player.currentPowerUps.forEach(powerUp => {
	      powerUp.drawPowerUp();
	    });
	  }
	  //ball.checkForGameOver(canvas, context, player);

	  requestAnimationFrame(gameLoop);
	}

	canvas.addEventListener('mousemove', player.movePaddle.bind(player, canvas), false);
	canvas.addEventListener('click', player.launchBall.bind(player, ball, level, canvas), false);
	canvas.addEventListener('click', level.restartGame.bind(level, ball, player));

	requestAnimationFrame(gameLoop);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	
	class Render {
	  constructor(x, y, width, height) {
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
	    context.textAlign = "left";
	    context.fillText("Lives: " + player.balls, 15, 25);
	  }

	  displayLevel(context, level, canvas) {
	    context.font = "16px Monospace";
	    context.fillStyle = "black";
	    context.textAlign = "center";
	    context.fillText("Level: " + level.currentLevel, canvas.width / 2, 25);
	  }

	  displayScore(context, canvas, player) {
	    context.font = "16px Monospace";
	    context.fillStyle = "black";
	    context.textAlign = "right";
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

	  drawStartScreenText(context, canvas, level) {
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const Render = __webpack_require__(1);

	class Brick extends Render {
	  constructor(x, y, width, height, density = 1) {
	    super(x, y, width, height);
	    this.density = density;
	  }

	  makeBrick(context) {
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

	  getBrickColor() {
	    let colors = ['', 'rgb(247, 123, 62)', 'rgb(247, 62, 62)', 'rgb(247, 62, 151)', 'rgb(199, 62, 247)', 'rgb(62, 64, 247)', 'rgb(62, 153, 247)', 'rgb(62, 247, 231)', 'rgb(62, 247, 103)', 'rgb(160, 247, 62)', 'rgb(247, 234, 62)'];
	    let brickColor = 'rgb(200, 200, 200)';

	    if (colors[this.density]) {
	      brickColor = colors[this.density];
	    }
	    return brickColor;
	  }

	  checkForPowerUps() {}
	}

	module.exports = Brick;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	const Render = __webpack_require__(1);

	class Ball extends Render {
	  constructor(x, y, width = 10, height = 10, velocity = 0) {
	    super(x, y, width, height);
	    this.velocityX = velocity;
	    this.velocityY = velocity;
	  }

	  stickyBall(player) {
	    if (this.velocityX === 0 && this.velocityY === 0) {
	      this.x = player.x + (player.width / 2 - this.width / 2);
	      this.y = 553;
	    }
	  }

	  checkAllBricks(level) {
	    return level.bricks.filter(brick => {
	      return brick.y + 25 >= this.y && brick.y <= this.y + 10 && brick.x + 75 >= this.x && brick.x <= this.x + 10;
	    });
	  }

	  bounceBall(hitBricks) {
	    if (hitBricks[0].y < this.y + 10 && hitBricks[0].y > this.y || hitBricks[0].y + 25 > this.y && hitBricks[0].y + 25 < this.y + 10) {
	      this.velocityY = this.velocityY * -1;
	    }
	    if (hitBricks[0].x < this.x + 10 && hitBricks[0].x > this.x || hitBricks[0].x + 25 > this.x && hitBricks[0].x + 25 < this.x + 10) {
	      this.velocityX = this.velocityX * -1;
	    }
	  }

	  checkForCollisionsWithBrick(level, player) {
	    let hitBricks = this.checkAllBricks(level);

	    if (hitBricks.length > 0) {
	      player.ckeckForPowerUp(hitBricks[0]);
	      this.bounceBall(hitBricks);
	      level.updateHitBricks(level.getBrickIndexs(hitBricks));
	      player.increaseScore(level.getBrickIndexs(hitBricks));
	    }
	  }

	  checkForCollisionsWithWall(width) {
	    if (this.y <= 0) {
	      this.velocityY = this.velocityY * -1;
	    }
	    if (this.x <= 0 || this.x + 10 >= width) {
	      this.velocityX = this.velocityX * -1;
	    }
	  }

	  checkForCollisionsWithPaddle(player) {
	    if (this.y + 10 > player.y - 1 && this.y + 10 < player.y + 2 && this.x + 10 > player.x && this.x < player.x + player.width) {
	      this.velocityY += .1;
	      this.velocityX = (this.x - player.x - player.width / 2) / (player.width / 4);
	      this.velocityY = this.velocityY * -1;
	      return true;
	    } else {
	      return false;
	    }
	  }
	}

	module.exports = Ball;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const Render = __webpack_require__(1);
	const PowerUp = __webpack_require__(5);

	class Player extends Render {
	  constructor(x = 450, width = 100, height = 20, score = 0, balls = 3) {
	    super(x, 565, width, height);
	    this.score = score;
	    this.balls = balls;
	    this.currentPowerUps = [];
	    this.activePowerUp;
	  }

	  ckeckForPowerUp(brick) {
	    if (Math.random() > .01) {
	      this.currentPowerUps.push(new PowerUp(brick.x + 17, brick.y, 36, 20, this));
	    }
	  }

	  removePowerUp(powerUp) {
	    let thisIndex = this.currentPowerUps.findIndex(powerUpFromArray => {
	      return powerUp.x === powerUpFromArray.x && powerUp.y === powerUpFromArray.y;
	    });

	    this.currentPowerUps.slice(thisIndex, 1);
	  }

	  movePaddle(canvas, e) {
	    this.x = e.layerX - this.width / 2;
	    if (this.x < 10) {
	      this.x = 10;
	    } else if (this.x > canvas.width - (this.width + 10)) {
	      this.x = canvas.width - (this.width + 10);
	    }
	  }

	  launchBall(ball, level, canvas) {
	    level.start = false;
	    if (ball.velocityX === 0 && ball.velocityY === 0) {
	      ball.velocityX = -1.8;
	      ball.velocityY = -1.8;
	    }
	    canvas.classList.remove('fail');
	  }

	  increaseScore(theyGotHit) {
	    theyGotHit.forEach(() => {
	      this.score++;
	    });
	  }

	  addBall() {}

	  removeBall() {
	    this.balls--;
	  }

	}

	module.exports = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const Render = __webpack_require__(1);
	const Ball = __webpack_require__(3);

	class powerUp extends Render {
	  constructor(x, y, width, height, player) {
	    super(x, y, width, height);
	    this.powerUpList = [{
	      fillStyle: 'green',
	      power: this.extraLife,
	      arg: player
	    }, {
	      fillStyle: 'blue',
	      power: this.smallPaddle,
	      arg: player
	    }, {
	      fillStyle: 'purple',
	      power: this.largePaddle,
	      arg: player
	      // this.threeBalls,
	      // this.guns,
	      // this.wreckingBall,
	      // this.stickyPaddle
	    }], this.powerUp = this.powerUpList[Math.floor(Math.random() * this.powerUpList.length)];
	    this.context = document.getElementById('game').getContext('2d');
	    this.player = player;
	    this.velocity = Math.random() * 1.5 + 1;
	  }

	  drawPowerUp() {
	    this.context.beginPath();
	    this.context.rect(this.x, this.y, this.width, this.height);
	    this.context.fillStyle = this.powerUp.fillStyle;
	    this.context.fill();
	    this.context.closePath();
	    this.y += this.velocity;
	    this.hitPaddle();
	    this.fallOffScreen();
	  }

	  removePowerUp() {
	    this.player.width = 100;
	  }

	  extraLife() {
	    this.arg.balls++;
	  }

	  smallPaddle() {
	    this.arg.width = this.arg.width / 2;
	  }

	  largePaddle() {
	    this.arg.width = this.arg.width * 1.5;
	  }

	  // threeBalls (canvas, level, render) {
	  //   let ball2 = new Ball(this.player.x + (this.player.width / 2), this.player.y - 12, 10, 10, 1.8);
	  //   let ball3 = new Ball(this.player.x + (this.player.width / 2), this.player.y - 12, 10, 10, -1.8);
	  //
	  //   render.makeBall(this.context, ball2);
	  //   render.makeBall(this.context, ball3);
	  //   ball2.checkForCollisionsWithBrick(level, this.player);
	  //   ball2.checkForCollisionsWithWall(canvas.width);
	  //   ball2.checkForCollisionsWithPaddle(this.player);
	  //   ball3.checkForCollisionsWithBrick(level, this.player);
	  //   ball3.checkForCollisionsWithWall(canvas.width);
	  //   ball3.checkForCollisionsWithPaddle(this.player);
	  //
	  //   this.context.beginPath();
	  //   this.context.rect(this.x, this.y, this.width, this.height);
	  //   this.context.fillStyle = "red";
	  //   this.context.fill();
	  //   this.context.closePath();
	  //   this.hitPaddle ();
	  //   this.fallOffScreen ();
	  //   this.y += this.velocity;
	  // }
	  //
	  // guns () {
	  //   this.context.beginPath();
	  //   this.context.rect(this.x, this.y, this.width, this.height);
	  //   this.context.fillStyle = "purple";
	  //   this.context.fill();
	  //   this.context.closePath();
	  //   this.hitPaddle ();
	  //   this.fallOffScreen ();
	  //   this.y += this.velocity;
	  // }
	  //
	  // wreckingBall () {
	  //   this.context.beginPath();
	  //   this.context.rect(this.x, this.y, this.width, this.height);
	  //   this.context.fillStyle = "grey";
	  //   this.context.fill();
	  //   this.context.closePath();
	  //   this.hitPaddle ();
	  //   this.fallOffScreen ();
	  //   this.y += this.velocity;
	  // }

	  // stickyPaddle () {
	  //   //Build ball array
	  //   if ((this.y + 10 > this.arg.y - 1 &&
	  //        this.y + 10 < this.arg.y + 2) &&
	  //       (this.x + 10 > this.arg.x &&
	  //        this.x < this.arg.x + this.arg.width)) {
	  //     ball.velocityY = 0;
	  //     ball.velocityX = 0;
	  //   }
	  // }

	  fallOffScreen() {
	    if (this.y > 600) {
	      let thisIndex = this.player.currentPowerUps.findIndex(powerUp => {
	        return powerUp.x === this.x && powerUp.y === this.y;
	      });

	      this.player.currentPowerUps.splice(thisIndex, 1);
	    }
	  }

	  hitPaddle() {
	    if (this.y + this.height >= this.player.y && this.y <= this.player.y + this.player.height && this.x + this.width >= this.player.x && this.x <= this.player.x + this.player.width) {
	      let thisIndex = this.player.currentPowerUps.findIndex(powerUp => {
	        return powerUp.x === this.x && powerUp.y === this.y;
	      });

	      this.player.activePowerUp = this.player.currentPowerUps.splice(thisIndex, 1);
	      this.removePowerUp();
	      this.powerUp.power();
	    }
	  }
	}
	module.exports = powerUp;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const Brick = __webpack_require__(2);

	class Level {
	  constructor(currentLevel = 1) {
	    this.currentLevel = currentLevel;
	    this.start = true;
	    this.bricks = this.buildBricks();
	    this.gameOver = false;
	  }

	  buildBricks() {
	    let allBricks = [];
	    let counter = 0;
	    let x = 44;
	    let y = 44;

	    this.getLevelTemplate(this.currentLevel).forEach(i => {
	      let brick = new Brick(x, y, 75, 25, i);

	      allBricks.push(brick);
	      x += 76;
	      counter++;
	      if (counter === 12) {
	        counter = 0;
	        y = y + 26;
	        x = 44;
	      }
	    });
	    return allBricks;
	  }

	  getBrickIndexs(hitBricks) {
	    let theyGotHit = [];

	    hitBricks.forEach(hitBrick => {
	      theyGotHit.push(this.bricks.findIndex(brick => {
	        return brick.x === hitBrick.x && brick.y === hitBrick.y;
	      }));
	    });
	    return theyGotHit;
	  }

	  updateHitBricks(theyGotHit) {
	    theyGotHit.forEach(i => {
	      this.bricks[i].density--;
	    });
	  }

	  drawLevel(context) {
	    this.bricks.forEach((brick, i) => {
	      if (brick.density < 1) {
	        this.bricks[i] = '';
	      }
	      if (brick) {
	        brick.makeBrick(context);
	      }
	    });
	  }

	  checkGameState(canvas, context, player, ball) {
	    let activeBricks = this.bricks.filter(brick => {
	      return brick.density > 0 && brick.density < 10;
	    });

	    if (activeBricks.length === 0) {
	      ball.velocityX = 0;
	      ball.velocityY = 0;
	      this.currentLevel++;
	      this.bricks = this.buildBricks();
	    }

	    if (ball.y > canvas.height) {
	      player.removeBall();
	      ball.velocityX = 0;
	      ball.velocityY = 0;
	      canvas.classList.add('fail');
	    }
	    if (player.balls === 0) {
	      this.gameOver = true;
	      context.font = "60px Monospace";
	      context.fillStyle = "#BEC3C1";
	      context.textAlign = "center";
	      context.fillText("Game Over", canvas.width / 2, 300);

	      context.font = "20px Monospace";
	      context.fillStyle = "#BEC3C1";
	      context.textAlign = "center";
	      context.fillText("Click to start a new game", canvas.width / 2, 350);
	    }
	  }

	  restartGame(ball, player) {
	    if (this.gameOver === true) {
	      this.gameOver = false;
	      this.currentLevel = 1;
	      this.bricks = this.buildBricks();
	      player.score = 0;
	      player.balls = 3;
	      ball.velocityY = 0;
	      ball.velocityX = 0;
	    }
	  }

	  getLevelBackground() {
	    let colors = ['', 'rgb(247, 123, 62)', 'rgb(247, 62, 62)', 'rgb(247, 62, 151)', 'rgb(199, 62, 247)', 'rgb(62, 64, 247)', 'rgb(62, 153, 247)', 'rgb(62, 247, 231)', 'rgb(62, 247, 103)', 'rgb(160, 247, 62)', 'rgb(247, 234, 62)'];
	    let background = 'rgb(225, 225, 200)';

	    if (colors[this.currentLevel]) {
	      background = colors[this.currentLevel];
	    }
	    return background;
	  }

	  drawRandomLevel() {
	    let randomLevel = [];

	    for (var i = 0; i < 84; i++) {
	      let brickDensity = Math.floor(Math.random() * this.currentLevel);

	      randomLevel.push(brickDensity);
	    }
	    return randomLevel;
	  }

	  getLevelTemplate(level) {
	    switch (level) {
	      case 1:
	        return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	      case 2:
	        return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	      case 3:
	        return [1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1, 1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1, 1, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0];
	      case 4:
	        return [4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4, 0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0];
	      case 5:
	        return [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 5, 1, 1, 1, 1, 1, 1, 5, 1, 5, 5, 1, 5, 1, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
	      case 6:
	        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	      case 7:
	        return [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 10000, 3, 3, 10000, 0, 0, 0, 0, 10000, 2, 2, 10000, 10000, 10000, 10000, 10000, 10000, 2, 2, 10000, 10000, 0, 2, 2, 10000, 10000, 10000, 10000, 2, 2, 0, 10000, 10000, 10000, 10000, 0, 0, 0, 0, 0, 0, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 0, 0, 0, 0, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 2, 2, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 0, 0, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 0, 0, 0, 0, 10000, 10000, 10000, 10000];
	      default:
	        return this.drawRandomLevel();
	    }
	  }
	}

	module.exports = Level;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "canvas {\n  border: 1px solid #000000;\n  background: #4E5B57;\n  display: block;\n  margin: auto;\n}\n.fail {\n  background: #cd4d4d;\n  transition: all 250ms ease;\n}\n", ""]);

	// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);