let position;
let x = 100;
let y = 100;
let xSpeed = 5;
let ySpeed = 5;


function setup(){
   createCanvas(640, 480);
   background(0);
   position = createVector(x, y)
}

function draw(){
   background(0);
   stroke(0);
   fill(127);
   circle(position.x, position.y, 48);
   
   position.x = position.x + xSpeed;
   position.y = position.y + ySpeed;

   
   if(position.x > width || position.x < 0){
      xSpeed = xSpeed * -1;
   }
   if(position.y > height || position.y < 0){
      ySpeed = ySpeed * -1;
   }
}