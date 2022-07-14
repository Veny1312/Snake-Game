const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

var snake;
var apple;
let addTime = 0.1;
let interval = 100;
let fastEnabled = false;
let turboEnabled = false;
let timer = 0;
let score = 0;


function setFast() {
	if(fastEnabled) {
		document.getElementById('fast').style.backgroundColor = "red";
		document.getElementById('fast').value = "FAST Disabled";
		fastEnabled = false;
		addTime = 0.1;
		interval = 100;
		clearInterval(speed);
		speed = setInterval(setup , interval);
	} else {
		document.getElementById('fast').style.backgroundColor = "lightgreen";
		document.getElementById('fast').value = "FAST Enabled";
		fastEnabled = true;
		addTime = 0.05;
		interval = 50;
		clearInterval(speed);
		speed = setInterval(setup , interval);
	}
}

function setTurbo() {
	if(turboEnabled) {
		document.getElementById('turbo').style.backgroundColor = "red";
		document.getElementById('turbo').value = "TURBO Disabled";
		turboEnabled = false;
		addTime = 0.1;
		interval = 100;
		clearInterval(speed);
		speed = setInterval(setup , interval);
	} else {
		document.getElementById('turbo').style.backgroundColor = "lightgreen";
		document.getElementById('turbo').value = "TURBO Enabled";
		turboEnabled = true;
		addTime = 0.025;
		interval = 25;
		clearInterval(speed);
		speed = setInterval(setup , interval);
	}
}


snake = new Snake();
apple = new Apple();
apple.generate();

function setup() {

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

	window.addEventListener('keydown', ((evt) => {
		const direction = evt.key;
		snake.changeDirection(direction);
	}))

	function increaseTimer() {
		timer += addTime;
		document.querySelector('#timer').innerHTML = Math.round(timer)
	}
	console.log(addTime)
};
 let speed = setInterval(setup , interval);
