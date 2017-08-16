const Render = require('./render.js');
const Brick = require('./brick.js');
const Ball = require('./ball.js');
const Player = require('./player.js');
const PowerUp = require('./powerUp.js');
const Level = require('./level.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var level = new Level();

// var render = new Render();
// var ball = new Ball(10, 10, 10, 10);

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
 // ball.doTheBallThing(context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
