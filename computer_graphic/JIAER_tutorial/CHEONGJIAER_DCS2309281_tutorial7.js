let position;
let x = 0;
let y = 0;
let xSpeed = 5;
let ySpeed = 5;

function setup(){
   createCanvas(600, 600);
   position = createVector(x, y);
   position.x = random(0, width);
   position.y = random(0, width);
}

function draw(){
   
   background(238, 156, 167);
   fill(255);
   ellipse(position.x, position.y, 50,50);

   position.x = position.x + xSpeed;
   position.y = position.y + ySpeed;

   
   if(position.x > width - 25 || position.x < 0 + 25){
      xSpeed = xSpeed * -1;
   }
   if(position.y > height - 25|| position.y < 0 + 25){
      ySpeed = ySpeed * -1;
   }
}