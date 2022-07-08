const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

var snake;
var apple

(function setup() {
	snake = new Snake();
	apple = new Apple();
	apple.generate();

	let score = 0;
	window.setInterval (() => {
		c.clearRect(0, 0, canvas.width, canvas.height);
		apple.draw();
		snake.update();
		snake.draw();

		if (snake.overlap(apple)) {
			apple.generate();
		}

		if (snake.eat(apple)) {
			apple.generate();
			snake.total++;
			score++;
		}

		document.querySelector('#score').innerHTML = score;

		if (snake.moved)
				increaseTimer();

		if (snake.dead) {
			snake.xSpeed = 0;
			snake.ySpeed = 0;
			confirm("Game Over" + "\n" + "Your score is " + score + " !")
			window.location.reload(true);
		}

	}, 100);

	window.addEventListener('keydown', ((evt) => {
		const direction = evt.key;
		snake.changeDirection(direction);
	}))

	let timer = 0

	function increaseTimer() {
		timer += 0.1;
		document.querySelector('#timer').innerHTML = Math.round(timer)
	}

}());
