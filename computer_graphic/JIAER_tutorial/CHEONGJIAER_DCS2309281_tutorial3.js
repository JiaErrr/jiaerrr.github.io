// module aliases
var Engine = Matter.Engine,
//Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];


function setup() {
   createCanvas(500,500);
   background(255,192,203);
   engine = Engine.create();
   world = engine.world;
   Engine.run(engine); 
   // Create ground
   var ground_options = {
      isStatic: true
   };
   ground = Bodies.rectangle(250, height, width, 10, ground_options);
   //add ground to the world
   World.add(world, ground);
}

function mousePressed() {
   boxes.push(new Box(mouseX,mouseY,30,30));
}

function draw() {
   background(255,192,203);
   for (var i=0; i < boxes.length; i++) {
      boxes[i].show();
   }
   //display ground
   noStroke();
   fill(255);
   rectMode(CENTER);
   rect(ground.position.x, ground.position.y, width, 10);
}

function Box(x,y,w,h){
   this.body = Bodies.rectangle(x,y,w,h);
   this.w = w;
   this.h = h;
   World.add(world, this.body);

   this.show = function(){
      var pos = this.body.position;
      var angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rectMode(CENTER); //let the rectangle at 
      rotate(angle);
      fill(255);
      stroke(random(255),random(255),random(255));
      strokeWeight(2.5);
      rect(0,0,this.w,this.h);
      pop();
   }
} 

