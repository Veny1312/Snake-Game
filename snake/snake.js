function Snake() {
  this.x = 200;
  this.y = 200;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.lastkey;
  this.total = 0;
  this.tail = [];
  this.moved = 0;
  this.dead = false;

  this.draw = function() {
      c.fillStyle = '#7FFFD4';
    for (let i = 0; i < this.tail.length ; i++) {
      c.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    c.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y};

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y > canvas.height ) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    }

    for (let i = 1; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y)
      this.dead = true;
    }
  }

  this.eat = function(apple) {
    if (this.x === apple.x && this.y === apple.y) {
      return true;
    }
    return false;
  }

  this.overlap = function(apple) {
    for (let i = 0; i < this.tail.length; i++) {
      if (apple.x === this.tail[i].x && apple.y === this.tail[i].y)
      return true;
    }
    return false;
  }

  this.changeDirection = function(direction) {
    switch (direction) {
      case 'ArrowUp':
         if (snake.lastkey != 'ArrowDown') {
          this.xSpeed = 0;
          this.ySpeed = -scale * 1;
          snake.lastkey = 'ArrowUp'
          snake.moved = 1;
        }
        break;
      case 'ArrowDown':
        if (snake.lastkey != 'ArrowUp')  {
          this.xSpeed = 0;
          this.ySpeed = scale * 1;
          snake.lastkey = 'ArrowDown'
          snake.moved = 1;
        }
        break;
      case 'ArrowRight':
        if (snake.lastkey != 'ArrowLeft') {
          this.xSpeed = scale * 1;
          this.ySpeed = 0;
          snake.lastkey = 'ArrowRight'
          snake.moved = 1;
        }
        break;
      case 'ArrowLeft':
        if (snake.lastkey != 'ArrowRight') {
          this.xSpeed = -scale * 1;
          this.ySpeed = 0;
          snake.lastkey = 'ArrowLeft'
          snake.moved = 1
        }
          break;
    }
  }

}
