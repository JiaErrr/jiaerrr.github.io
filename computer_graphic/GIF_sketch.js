let maxSpeedOFgear = 0.38;
let timer = 0;
let gears = [];
let gS = 1;
let medal;
let cA1 = 0.0;
let cA2 = 0.0;
let a1 = 0.0;
let a2 = 0.0;
let a3 = 0.0;

function setup() {
   createCanvas(1280, 720);
   angleMode(DEGREES); // Set angle mode to DEGREES
   frameRate(20);

   let gear1 = new Gear(-115, 65, 100, 25, 8, 4.5); // Angle speed in degrees
   let gear2 = new Gear(115, -65, 100, 25, 8, -4.5); // Angle speed in degrees
   let gear3 = new Gear(65, 115, 50, 12.5, 8, 5.4); // Angle speed in degrees

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

   let t = min(timer, 1); // Time factor

   gears.forEach(gear => {
      gear.update(t);
      gear.display();
   });
   
   if (timer >= 65) {
      medal.drawCircle1(); 
   }
   if (timer >= 75) {
      medal.drawCircle2(); 
      medal.draw1ST(); 
   }

   if (frameCount >= 80) {
      medal.drawStar1();
   }

   if (frameCount >= 130) {
      medal.drawStar2();
   }

   if (frameCount >= 180) {
      medal.drawStar3();
   }
   
   // Timer
   timer += 1;  
   if (timer >= 300) {
      frameCount = 1;
      timer = 0;
      cA = 0;
      a1 = 0;
      a2 = 0;
      a3 = 0;
   }

   push();
   fill(255);
   textSize(20);
   text(frameCount, 200, 200);
   textSize(20);
   text(timer, 200, 250);
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
      if(frameCount >= 60){
         gS = 0;
      }
      else{
         gS = 1;
      }
      scale(gS);
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
   drawCircle1() {
      if(frameCount >= 60){
         if (cA1 <= 90){
            cA1 += 1;
         }
         else{
            cA1 = 90;
         }
      }
      let cS1 = abs(sin(cA1));
      push();
      translate((width / 2) + this.x, (height / 2) + this.y);
      scale(cS1);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      ellipse(0, 0, this.outerRadius);
      pop();
   }
   drawCircle2() {
      if(frameCount >= 70){
         if (cA2 <= 90){
            cA2 += 1;
         }
         else{
            cA2 = 90;
         }
      }
      let cS2 = abs(sin(cA2));
      push();
      translate((width / 2) + this.x, (height / 2) + this.y);
      scale(cS2);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      ellipse(0, 0, this.innerRadius);
      pop();
   }

   drawRibbon1() {
      push();
      translate(width / 2 + this.x, height / 2 + this.y);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
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
      push();
      translate(width / 2 + this.x, height / 2 + this.y);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
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

   

   draw1ST(){
      push();
      translate(width / 2 + this.x, height / 2 + this.y);
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

   drawStar1(){
      push();
      translate(width / 2 + this.x, height / 2 + this.y);
      fill(255);
      noStroke();
      if (a1 <= 180) {
         a1 += 3.5;
      } else {
         a1 -= 3.5;
      }
      let s1 = abs(sin(a1));  // Ensure scale is positive
      translate(-60, -75);
      scale(s1);
      rotate(35);
      ellipse(0, 0, 5, 70);
      rotate(-95);
      ellipse(0, 0, 6, 95);
      pop();
   }

   drawStar2(){
      push();
      translate(width / 2 + this.x, height / 2 + this.y);
      fill(255);
      noStroke();
      if (a2 <= 180) {
         a2 += 3.5;
      } else {
         a2 -= 3.5;
      }
      let s2 = abs(sin(a2));  // Ensure scale is positive
      translate(90, 35);
      scale(s2);
      rotate(35);
      ellipse(0, 0, 5, 70);
      rotate(-95);
      ellipse(0, 0, 6, 95);
      pop();
   }

   drawStar3(){
      push();
      translate(width / 2 + this.x, height / 2 + this.y);
      fill(255);
      noStroke();
      if (a3 <= 180) {
         a3 += 3.5;
      } else {
         a3 -= 3.5;
      }
      let s3 = abs(sin(a3));  // Ensure scale is positive
      translate(-85, 40);
      scale(s3);
      rotate(35);
      ellipse(0, 0, 5, 70);
      rotate(-95);
      ellipse(0, 0, 6, 95);
      pop();
   }
}
