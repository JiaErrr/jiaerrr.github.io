let randomPoint;

function setup(){
   createCanvas(500, 500);
   randomPoint = new RandomPoint(width/2, height/2);
   background(0);
}

function draw(){
   randomPoint.random();
   randomPoint.drawPoint();
}

class RandomPoint{
   constructor(x, y){
      this.position = createVector(x, y);
   }

   random(){
      this.position.x = this.position.x + random(-1, 1);
      this.position.y = this.position.y + random(-1, 1);
   }

   drawPoint(){
      stroke(255, 100);
      strokeWeight(2);
      point(this.position.x, this.position.y);
   }
}