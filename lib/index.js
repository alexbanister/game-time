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
var level = new Level(7);
var ball = new Ball();
// var render = new Render();

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // level.drawBackground(context);
  level.drawLevel(context);
  // level.drawStartScreenBackground(context);
  level.drawStartScreenText(context, canvas);
  player.drawPaddle(context);
  player.displayScore(context, canvas)
  player.displayLives(context, canvas);
  player.displayLevel(context, level, canvas);
  ball.makeBall(context);
  ball.stickyBall(player);
  ball.checkForCollisionsWithBrick(level, player);
  ball.checkForCollisionsWithWall(canvas.width);
  ball.checkForCollisionsWithPaddle(player);
  level.checkGameState(canvas, context, player, ball);
  //ball.checkForGameOver(canvas, context, player);

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', player.movePaddle.bind(player, canvas), false);
canvas.addEventListener('click', player.launchBall.bind(player, ball, level, canvas), false);
canvas.addEventListener('click', level.restartGame.bind(level, ball, player));


requestAnimationFrame(gameLoop);
