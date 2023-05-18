// Base code from 
// Array of Objects
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/7.3-array-of-objects.html
// https://youtu.be/fBqaA7zRO58
// https://editor.p5js.org/codingtrain/sketches/1y_xfueO



let smoking = [];
let smokeColor;
let object;

//creates the canvas and the ball 
function setup() {
  createCanvas(windowWidth, windowHeight);
  smokeColor = color(255, 5);
  ball = new PhysicsObject(width / 2, height / 2, 8);
}
//sets up the size of the smoke circles and has it controlled by the mouse drag function
function mouseDragged() {
  let r = random(30, 70);
  let b = new Smoke(mouseX, mouseY, r, smokeColor);
  smoking.push(b);
}
//sets the background of th canvas as well as connecting the movement to the smoke function
function draw() {
  background(0);

  ball.update();
  ball.display();

  for (let smoke of smoking) {
    smoke.move();
    smoke.show();
    if (ball.intersects(smoke)) {
      smoke.reset();
    }
  }

  for (let i = 0; i < smoking.length; i++) {
    smoking[i].move();
    smoking[i].show();
  }
}
//links the z key to the color function
function keyTyped() {
  if (key === 'z') {
    smokeColor = color(random(255), random(255), random(255), random(5, 10));
  }
}

// controls the movement of the smoke function
class Smoke {
  constructor(x, y, r, smokeColor) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.smokeColor = smokeColor;
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  show() {
    noStroke();
    fill(this.smokeColor, 5);
    ellipse(this.x, this.y, this.r * 2);
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
  }
}
//applies the physics for the interaction between the ball and smoke objects
class PhysicsObject {
  constructor(x, y, radius) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.radius = radius;
    this.maxSpeed = 5;
  }

  update() {
    this.handleInput();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.checkEdges();
  }
  


  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.3, 0));
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.applyForce(createVector(0.3, 0));
    }
    if (keyIsDown(UP_ARROW)) {
      this.applyForce(createVector(0, -0.3));
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.applyForce(createVector(0, 0.3));
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  intersects(smoke) {
    let distance = dist(this.position.x, this.position.y, smoke.x, smoke.y);
    return distance < this.radius + smoke.r;
  }
}
