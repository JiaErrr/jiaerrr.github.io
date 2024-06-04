function setup() {
   createCanvas(500, 500);
   frameRate(15);
}

function draw() {
   background(255);
   translate(random(0, width/2), random(0, height/2));
   strokeWeight(random(1, 10));
   line(random(0, width),random(0, width), 40, 40);
   line(random(0, width),random(0, width), 40, 40);
}

