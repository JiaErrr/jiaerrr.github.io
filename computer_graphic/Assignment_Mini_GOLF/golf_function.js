let golf_ball;
let modelInstances = [];
let slope;
let straight, corner1, ramp, corner2, side, open, hole_square, gap;
let cameraInstance;
let ballIsStatic = true;
let lineVisible = false;
let startPos, endPos, direction, force;
let forceModifier = 0.5;
let maxForce = 22;
let start;
var colorFill = [
  '#D37676',
  '#B0C5A4',
  '#C7C8CC',
  '#EEEDEB'
]

function setup() {
  createCanvas(1280, 720, WEBGL);
  frameRate(165);
  angleMode(DEGREES);
  rectMode(CENTER);

  golf_ball = new GolfBall(0, -150, 0, 5);
  slope = new Slope(createVector(-100, 2, -700), createVector(-300, -118, -900), 60);
  cameraInstance = new Camera(0, -200, 400, 0, 0, 0, 0, 1, 0);

  modelInstances.push(new Model(0, 0, 0, straight, 0, 1, 0));
  modelInstances.push(new Model(0, 0, -200, straight, 0, 1, 0));
  modelInstances.push(new Model(0, 0, -400, straight, 0, 1, 0));
  modelInstances.push(new Model(0, 0, -600, straight, 0, 1, 0));
  modelInstances.push(new Model(0, 0, -800, corner1, 0, 1, 0));
  modelInstances.push(new Model(-200, -59, -800, ramp, 90, 1, 0));
  modelInstances.push(new Model(-400, -118, -800, corner2, 90, 1, 0));
  modelInstances.push(new Model(-400, -118, -600, side, 0, 1, 0));
  modelInstances.push(new Model(-400, -118, -400, gap, 0, 1, 0));
  modelInstances.push(new Model(-400, -118, -200, side, 180, 1, 0));
  modelInstances.push(new Model(-401, -30, 201, flag, 0, 0.7, 0));
  modelInstances.push(new Model(-400, 0, 200, hole_square, 180, 1, 0));
}

function preload() {
  flag = loadModel('../Assignment_Mini_GOLF/model/flag-blue.obj', true);
  straight = loadModel('../Assignment_Mini_GOLF/model/straight.obj', true);
  corner1 = loadModel('../Assignment_Mini_GOLF/model/square-corner-a.obj', true);
  ramp = loadModel('../Assignment_Mini_GOLF/model/ramp-d.obj', true);
  corner2 = loadModel('../Assignment_Mini_GOLF/model/square-corner-a.obj', true);
  side = loadModel('../Assignment_Mini_GOLF/model/side.obj', true);
  hole_square = loadModel('../Assignment_Mini_GOLF/model/hole-square.obj', true);
  end = loadModel('../Assignment_Mini_GOLF/model/end.obj', true);
  gap = loadModel('../Assignment_Mini_GOLF/model/gap.obj', true);
}

function draw() {
  background(225);
  ambientLight(128, 128, 128);
  directionalLight(128, 128, 128, 1, 2, 1);
  directionalLight(0, 1, 1, 1, -1, 0);
  cameraInstance.update(golf_ball);
  cameraInstance.display();

  modelInstances.forEach(modelInstance => {
    modelInstance.displayModel();
  });

  start = golf_ball.position.copy();
  let gravity = createVector(0, 0.2, 0); // World gravity
  let weight = p5.Vector.mult(gravity, golf_ball.mass); // Weight of the golf ball
  golf_ball.applyForceGravity(weight);
  golf_ball.applySlopeGravity(slope);
  golf_ball.applyFriction();
  golf_ball.update();
  golf_ball.reset();
  golf_ball.checkGroundCollision();
  golf_ball.checkModelCollisions();
  golf_ball.display();

  if (ballIsStatic) {
    // console.log(`${ballIsStatic}`);
    let mousePosition = createVector(mouseX - width / 2, golf_ball.position.y, mouseY - height / 2);
    drawLine(golf_ball, mousePosition, maxForce, forceModifier);
  }
}

function mousePressed() {
  if (ballIsStatic) {
    startPos = createVector(mouseX - width / 2, golf_ball.position.y, mouseY - height / 2);
    lineVisible = true;
  }
}

function mouseDragged() {
  if (ballIsStatic && lineVisible) {
    endPos = createVector(mouseX - width / 2, golf_ball.position.y, mouseY - height / 2);
    if (startPos && endPos) {
      let distance = p5.Vector.dist(startPos, endPos);
      force = constrain(distance * forceModifier, 0, maxForce);
    }
  }
}

function mouseReleased() {
  if (ballIsStatic && lineVisible) {
    lineVisible = false;
    endPos = createVector(mouseX - width / 2, golf_ball.position.y, mouseY - height / 2);
    direction = createVector(startPos.x - endPos.x, 0, startPos.z - endPos.z);
    if (direction.mag() > 0) {
      golf_ball.applyForce(direction, force);
      ballIsStatic = false;
    }
    force = 0;
  }
}

function drawLine(golf_ball, mousePosition, maxForce, forceModifier) {
  if (lineVisible) {
    let start = golf_ball.position.copy();

    // Use the current y value of the golf ball for the line
    let constantY = start.y;

    // Calculate the direction vector from the golf ball to the mouse position
    let direction = p5.Vector.sub(mousePosition, start);
    direction.y = start.y; // Ensure the line remains on the constant y-plane

    // Calculate the distance and constrain it by the max force
    let distance = direction.mag();
    let constrainedDistance = constrain(distance * forceModifier, 0, maxForce * 2);

    // Normalize the direction vector and scale by the constrained distance
    direction.normalize();
    direction.mult(constrainedDistance * 5);

    // Calculate the end position of the line
    let end = p5.Vector.add(start, direction);

    stroke(colorFill[2]);
    strokeWeight(10);
    line(start.x, constantY, start.z, end.x, constantY, end.z);
  }
}






