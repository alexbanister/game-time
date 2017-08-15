const Block = require('./block.js');
const style = require('./style.css');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var block = new Block(10, 10, 10, 10);


function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  block.doTheBlockThing(context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('click', function (e) {
  blocks.push(new Block(e.x, e.y, 10, 10));
});
