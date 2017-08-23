const Render = require('./Render.js');
const Brick = require('./Brick.js');
const Ball = require('./Ball.js');
const Player = require('./Player.js');
const PowerUp = require('./PowerUp.js');
const Level = require('./Level.js');
const Style = require('./style.css');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var player = new Player();
var level = new Level(1);
var ball = new Ball();
var render = new Render(0, 0, 0, 0);

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // level.drawBackground(context);
  level.drawLevel(context);
  // level.drawStartScreenBackground(context);
  render.drawStartScreenText(context, canvas, level);
  render.drawPaddle(context, player);
  render.displayScore(context, canvas, player)
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
    player.currentPowerUps.forEach((powerUp) => {
      powerUp.drawPowerUp();
    })
  }
  //ball.checkForGameOver(canvas, context, player);

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove',
player.movePaddle.bind(player, canvas), false);
canvas.addEventListener('click', player.launchBall.bind(player, ball, level, canvas), false);
canvas.addEventListener('click', level.restartGame.bind(level, ball, player));


requestAnimationFrame(gameLoop);
