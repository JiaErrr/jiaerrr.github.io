let golf_ball;
let home, setting, start_button, setting_button;
let modelInstances = [];
let grounds = [];
let slope;
let straight, corner1, ramp, corner2, side, open, hole_square, gap;
let cameras = [];
let star_page = true;
let game_page = false;
let game_play = false;
let ballIsStatic = true;
let lineVisible = false;
let startPos, endPos, direction, force;
let forceModifier = 0.2;
let maxForce = 13;
let start;
let settingsContainer; // Settings container
let menu; 
let currentVolume = 0.5;
var colorFill = [
  '#D37676',
  '#B0C5A4',
  '#C7C8CC',
  '#EEEDEB',
  '#FDFFAB'
];
let constrainedDistance = 0; 
let showGround = true; 

function setup() {
  
  let canvas = createCanvas(1280, 720, WEBGL);
  canvas.center();
  canvas.position(windowWidth / 2 - width / 2, 150); // Correct the canvas position
  frameRate(165);
  angleMode(DEGREES);
  rectMode(CENTER);

  golf_ball = new GolfBall(0, -150, 0, 5);
  slope = new Slope(createVector(-100, 2, -700), createVector(-300, -118, -900), 60);
  cameras.push(new Camera(0, -200, 400, 0, 0, 0, 0, 1, 0));
  cameras.push(new Camera(500, -400, 500, 0, 0, 0, 0, 1, 0));

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
  modelInstances.push(new Model(-401, -50, 220, flag, 0, 0.5, 0));
  modelInstances.push(new Model(-400, 0, 200, hole_square, 180, 1, 0));

  grounds.push(new Ground(-400, -109, -400, 1, 0));
  grounds.push(new Ground(-200, -50, -800, 1, 30));
  grounds.push(new Ground(0, 9, 0, 1, 0));
  grounds.push(new Ground(0, 9, -200, 1, 0));
  grounds.push(new Ground(0, 9, -400, 1, 0));
  grounds.push(new Ground(0, 9, -600, 1, 0));
  grounds.push(new Ground(0, 8, -780, 1, 0));
  grounds.push(new Ground(-400, -110, -780, 1, 0));
  grounds.push(new Ground(-410, -109, -600, 1, 0));
  grounds.push(new Ground(-390, -109, -200, 1, 0));
  grounds.push(new Ground(-400, 9, 200, 1, 0));
  grounds.push(new Ground(-425, -118, -150, 3, 0));
  grounds.push(new Ground(-375, -118, -150, 3, 0));
  grounds.push(new Ground(-325, -118, -150, 3, 0));

  displayHome();
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
  speed = loadImage('../Assignment_Mini_GOLF/model/speed_up.png');
  gamePlay = loadImage('../Assignment_Mini_GOLF/model/game_play.jpg');
  menu = loadSound('../Assignment_Mini_GOLF/model/menu.mp3');
  
}

function displayHome() {
  home = createElement('img');
  setting = createDiv();
  start_button = createButton('Play');
  setting_button = createButton('Setting');

  home.position(windowWidth / 2 - 180, 200); // Correct the home image position
  home.size(360, 360);
  home.attribute('src', '../Assignment_Mini_GOLF/model/mini_golf_party.png');

  setting.position(windowWidth / 2 - 180, height/2); // Correct the home image position
  setting.size(500, 500);
  setting.attribute('src', '');

  start_button.position(windowWidth / 2 - 100, 600); // Correct the start button position
  start_button.size(200, 50);
  start_button.style('color', '#012721');
  start_button.style('border', '3px solid #012721');
  start_button.style('border-radius', '100px');
  start_button.style('background-color', '#FCE8D0');
  start_button.style('font-family', 'Rockwell');
  start_button.style('font-size', '20px');
  start_button.style('cursor', 'pointer');
  start_button.style('transition', '0.5s');
  start_button.mouseOver(() => {
    start_button.style('color', '#FCE8D0');
    start_button.style('background-color', '#012721');
  });
  start_button.mouseOut(() => {
    start_button.style('color', '#012721');
    start_button.style('background-color', '#FCE8D0');
    start_button.style('border', '3px solid #012721');
  });
  start_button.mousePressed(startGame); 

  setting_button.position(windowWidth / 2 - 100, 700); 
  setting_button.size(200, 50);
  setting_button.style('color', '#012721');
  setting_button.style('border', '3px solid #012721');
  setting_button.style('border-radius', '100px');
  setting_button.style('background-color', '#FCE8D0');
  setting_button.style('font-family', 'Rockwell');
  setting_button.style('font-size', '20px');
  setting_button.style('cursor', 'pointer');
  setting_button.style('transition', '0.5s');
  setting_button.mouseOver(() => {
    setting_button.style('color', '#FCE8D0');
    setting_button.style('background-color', '#012721');
  });
  setting_button.mouseOut(() => {
    setting_button.style('color', '#012721');
    setting_button.style('background-color', '#FCE8D0');
    setting_button.style('border', '3px solid #012721');
  });
  setting_button.mousePressed(displaySetting); 

  // Start the background music and loop it if not already playing
  if (menu.isLoaded() && !menu.isPlaying()) {
    menu.setLoop(true);
    menu.play();
  }
}

function displaySetting() {
  // Remove any existing settings container
  if (settingsContainer) {
    settingsContainer.remove();
  }

  // Create settings container
  settingsContainer = createDiv();
  settingsContainer.id('settingsContainer');
  settingsContainer.position(windowWidth / 2 - 262, 150);
  settingsContainer.size(500, 400);
  settingsContainer.style('background-color', '#FCE8D0');
  settingsContainer.style('border', '2px solid #012721');
  settingsContainer.style('border-radius', '20px');
  settingsContainer.style('padding', '20px');
  
  // Sound volume control
  let soundLabel = createP('Sound:');
  soundLabel.parent(settingsContainer);
  soundLabel.style('font-family', 'Rockwell');
  soundLabel.style('font-size', '20px');
  soundLabel.style('color', '#012721');
  console.log('Sound label created');

  let volumeSlider = createSlider(0, 1, currentVolume, 0.01); 
  volumeSlider.parent(settingsContainer);
  volumeSlider.style('-webkit-appearance', 'none');
  volumeSlider.style('appearance', 'none');
  volumeSlider.style('-width', '100%');
  volumeSlider.style('background', '#012721');
  volumeSlider.style('border-radius', '5px');
  volumeSlider.style('cursor', 'pointer');
  volumeSlider.style('outline', 'none');
  volumeSlider.style('opacity', '0.7');
  volumeSlider.style('-webkit-transition', '.2s');
  volumeSlider.style('transition', 'opacity . 2s');
  volumeSlider.input(() => {
    currentVolume = volumeSlider.value(); 
    menu.setVolume(currentVolume);
  });

  // Ball color selection
  let colorLabel = createP('Ball Color:');
  colorLabel.parent(settingsContainer);
  colorLabel.style('font-family', 'Rockwell');
  colorLabel.style('font-size', '20px');
  colorLabel.style('color', '#012721');
  console.log('Color label created');

  colorFill.forEach((color) => {
    let colorButton = createButton('');
    colorButton.parent(settingsContainer);
    colorButton.style('background-color', color);
    colorButton.style('border', 'none');
    colorButton.style('border-radius', '50%');
    colorButton.style('width', '30px');
    colorButton.style('height', '30px');
    colorButton.style('margin', '5px');
    colorButton.style('cursor', 'pointer');
    if (golf_ball.fill_color === color) {
      colorButton.style('border', '5px solid #012721');
    }
    colorButton.mousePressed(() => {
      golf_ball.fill_color = color;
      console.log('Selected ball color:', color);
      document.querySelectorAll('button').forEach(btn => btn.style.border = 'none'); // Remove border from all buttons
      colorButton.style('border', '5px solid #012721');
    });
  });


  // Save button
  let saveButton = createButton('SAVE');
  saveButton.parent(settingsContainer);
  saveButton.position(200, 350); // Adjust position as needed
  saveButton.size(220, 50);
  saveButton.style('color', '#FCE8D0');
  saveButton.style('width', '120px');
  saveButton.style('background-color', '#012721');
  saveButton.style('border', 'none');
  saveButton.style('border-radius', '100px');
  saveButton.style('font-family', 'Rockwell');
  saveButton.style('font-size', '20px');
  saveButton.style('cursor', 'pointer');
  saveButton.mousePressed(() => {
    settingsContainer.remove(); // Remove settings container
  });
  saveButton.mouseOut(() => {
    saveButton.style('color', '#FCE8D0');
    saveButton.style('background-color', '#012721');
  });
  saveButton.mouseOver(() => {
    saveButton.style('color', '#012721');
    saveButton.style('background-color', '#FCE8D0');
    saveButton.style('border', '3px solid #012721');
  });

  // Hide settings page if clicked outside
  settingsContainer.mousePressed((e) => e.stopPropagation());
  canvas.mousePressed(() => settingsContainer.remove());
}

function startGame() {
  home.remove();
  start_button.remove();
  setting_button.remove();
  star_page = false;
  game_page = true;

  let gamePlay = createElement('img');
  gamePlay.attribute('src', '../Assignment_Mini_GOLF/model/game_play.jpg');
  gamePlay.position(windowWidth / 2 - 300, windowHeight / 2 - 200); // Adjust the position
  gamePlay.size(600, 400); // Adjust the size
  gamePlay.mouseClicked(() => {
    gamePlay.remove(); // Remove the image on click
    game_play = true; // Set the flag to true after starting the game
  });
}

function draw() {
  background(225);
  ambientLight(128, 128, 128);
  directionalLight(128, 128, 128, 1, 5, 1);

  if (star_page) {
    cameras[1].updateStart();
    cameras[1].display();
    if (showGround) {
      drawGround();
    }
  } 
  else if (game_page) {
    cameras[0].update(golf_ball);
    cameras[0].display();
    drawGround();

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
      let mousePosition = createVector(mouseX - width / 2, golf_ball.position.y, mouseY - height / 2);
      drawLine(golf_ball, mousePosition, maxForce, forceModifier);
    }

    if (golf_ball.isBallInHole() === true) {
      resetGame(); // Call the resetGame function when the ball is in the hole
    }
  }
}

function resetGame() {
  star_page = true;
  game_page = false;
  game_play = false; // Reset game_play flag to allow restarting
  showGround = true; 
  golf_ball.reset();
  displayHome(); 
  loop();
}


function drawGround(){
  modelInstances.forEach(modelInstance => {
    modelInstance.displayModel();
  });
  grounds[0].displayGap();
  grounds[1].displaySlope();
  grounds[2].display();
  grounds[3].display();
  grounds[4].display();
  grounds[5].display();
  grounds[6].displayCorner();
  grounds[7].displayCorner();
  grounds[8].displaySide();
  grounds[9].displaySide();
  grounds[10].displayEnd();
  grounds[11].displaySpeed();
  grounds[12].displaySpeed();
  grounds[13].displaySpeed();
}

function mousePressed() {
  if (ballIsStatic) {
    let mouse3D = screenToWorld(mouseX, mouseY);
    startPos = createVector(mouse3D.x, golf_ball.position.y, mouse3D.z);
    lineVisible = true;
    constrainedDistance = 0;
  }
}

function mouseDragged() {
  if (ballIsStatic && lineVisible) {
    let mouse3D = screenToWorld(mouseX, mouseY);
    endPos = createVector(mouse3D.x, golf_ball.position.y, mouse3D.z);
    if (startPos && endPos) {
      let distance = p5.Vector.dist(startPos, endPos);
      force = constrain(distance * forceModifier, 0, maxForce);
      constrainedDistance = constrain(distance * forceModifier, 0, maxForce * 2); // Update constrainedDistance
    }
  }
}

function mouseReleased() {
  if (ballIsStatic && lineVisible) {
    let mouse3D = screenToWorld(mouseX, mouseY);
    endPos = createVector(mouse3D.x, golf_ball.position.y, mouse3D.z);
    direction = createVector(startPos.x - endPos.x, 0, startPos.z - endPos.z);
    if (direction.mag() > 0) {
      force = constrain(direction.mag() * forceModifier, 0, maxForce);
      golf_ball.applyForce(direction, force);
      ballIsStatic = false;
    }
    lineVisible = false;
    constrainedDistance = 0; 
  }
}

function screenToWorld(screenX, screenY) {
  let x = screenX - width / 2;
  let y = screenY - height / 2;
  return createVector(x, 0, y); // Adjust the y-coordinate based on your game logic
}

function drawLine(golf_ball, mousePosition) {
  if (lineVisible) {
    let start = golf_ball.position.copy();
    let direction = p5.Vector.sub(mousePosition, start);
    direction.normalize();
    direction.mult(constrainedDistance * 5);
    let end = p5.Vector.add(start, direction);
    stroke(colorFill[2]);
    strokeWeight(10);
    line(start.x, start.y, start.z, end.x, end.y, end.z);
  }
}
