let maxSpeedOFgear = 0.38;
let timer = 0;
let gears = [];
let medal;

function setup() {
   createCanvas(1280, 720);
   angleMode(DEGREES); // Set angle mode to DEGREES
   frameRate(165);

   let gear1 = new Gear(-115, 65, 100, 25, 8, 9); // Angle speed in degrees
   let gear2 = new Gear(115, -65, 100, 25, 8, -9); // Angle speed in degrees
   let gear3 = new Gear(65, 115, 50, 12.5, 8, 10.8); // Angle speed in degrees

   medal = new Medal(0,0, 200, 180);

   gear1.setStartPosition(-115, 65);
   gear2.setStartPosition(115, -65);
   gear3.setStartPosition(65, 115);

   gears.push(gear1);
   gears.push(gear2);
   gears.push(gear3);
}

function draw() {
   background(173, 216, 230); // Light blue background

   let t = min(frameCount / 80, 1); // Time factor

   gears.forEach(gear => {
      gear.update(t);
      gear.display();
   });
   
   if (frameCount >= 72.5) {
      medal.drawRibbon1();
      medal.drawRibbon2();
      medal.drawCircle(); 
      medal.draw1ST(); 
   }

   if (frameCount >= 73.5) {
      
   }
   
   // Timer
   timer += 1;  
   if (timer >= 300) {
      frameCount = 0;
      timer = 0;
   }
   push();
   fill(255);
   text(frameCount, 200, 200);
   pop();
}


class Gear {
   constructor(x, y, radius, toothDepth, numTeeth, angleSpeed) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.toothDepth = toothDepth;
      this.numTeeth = numTeeth;
      this.angleSpeed = angleSpeed;
      this.angle = 0;
   }

   update(t) {
      this.x = lerp(this.startX, 0, t);
      this.y = lerp(this.startY, 0, t);
      this.angle += this.angleSpeed * t;
   }

   display() {
      push();
      translate(width / 2 + this.x, height / 2 + this.y);
      rotate(this.angle);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);

      beginShape();
      for (let i = 0; i < 360; i += 360 / this.numTeeth) {
         let angle1 = i;
         let angle2 = i + 180 / this.numTeeth;
         let outerX1 = cos(angle1) * this.radius;
         let outerY1 = sin(angle1) * this.radius;
         let innerX1 = cos(angle1) * (this.radius - this.toothDepth);
         let innerY1 = sin(angle1) * (this.radius - this.toothDepth);
         let outerX2 = cos(angle2) * this.radius;
         let outerY2 = sin(angle2) * this.radius;
         let innerX2 = cos(angle2) * (this.radius - this.toothDepth);
         let innerY2 = sin(angle2) * (this.radius - this.toothDepth);

         vertex(innerX1, innerY1);
         vertex(outerX1, outerY1);
         vertex(outerX2, outerY2);
         vertex(innerX2, innerY2);
      }
      endShape(CLOSE);
      // Draw hole
      fill(173, 216, 230);
      ellipse(0, 0, this.radius * 0.6, this.radius * 0.6);

      pop();
   }

   setStartPosition(x, y) {
      this.startX = x;
      this.startY = y;
   }
}

class Medal {
   constructor(x, y, outerRadius, innerRadius) {
      this.x = x;
      this.y = y;
      this.outerRadius = outerRadius;
      this.innerRadius = innerRadius;
   }
   
   drawRibbon1() {
      translate(width / 2 + this.x, height / 2 + this.y);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      push();
      rotate(25);
      beginShape();
      vertex(-40, 0);
      vertex(40, 0);
      vertex(40, 250);
      vertex(0, 215);
      vertex(-40, 250);
      endShape(CLOSE);
      pop();
   }
   drawRibbon2() {
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      push();
      rotate(335);
      beginShape();
      vertex(-40, 0);
      vertex(40, 0);
      vertex(40, 250);
      vertex(0, 215);
      vertex(-40, 250);
      endShape(CLOSE);
      pop();
   }

   drawCircle() {
      push();
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      ellipse(0, 0, this.outerRadius);
      ellipse(0, 0, this.innerRadius);
      pop();
   }

   draw1ST(){
      push();
      fill(255);
      noStroke();
      textSize(90);
      textAlign(RIGHT);
      text('1', 5, 30);
      textSize(45);
      textAlign(LEFT);
      text('ST', -5, 0);
      pop();
   }
}
