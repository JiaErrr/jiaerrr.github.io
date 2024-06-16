class Rhombus {
   constructor(x, y, radius) {
      this.initialPosition = createVector(x, y);
      this.position = createVector(x, y);
      this.rhombus = createVector(x, y);
      this.radius = radius;
      this.initialRadius = radius;
      this.tempRadius = radius;
      this.size = 0;
      this.hidden = false;
      this.circleHidden = false;
      this.stage = 0;
      this.color = color(254, 204, 0);
   }

   reset() {
      this.hidden = false;
      this.circleHidden = false;
      this.position = this.initialPosition.copy();
      this.rhombus = createVector(0, 0); // Reset rhombus to initial values
      this.radius = this.initialRadius;
      this.tempRadius = this.initialRadius;
      this.size = 0;
      this.stage = 0;
      this.color = color(254, 204, 0);
   }

   hide(part = 'all') {
      if (part === 'all') {
         this.hidden = true;
         this.circleHidden = true; // Also hide the circle if hiding all
      } else if (part === 'circle') {
         this.circleHidden = true;
      }
   }

   changeC(t) {
      this.tempRadius = lerp(this.tempRadius, 150, t * 0.087);
      if (this.tempRadius >= 148) {
         this.circleHidden = true;
      }
   }

   changeR(t) {
      this.rhombus.x = lerp(this.rhombus.x, 240, t * 0.09);
      this.rhombus.y = lerp(this.rhombus.y, 120, t * 0.088);
      if (this.rhombus.x >= 200) {
         this.color = color(243, 237, 227);
      }
   }

   displayC() {
      if (this.hidden || this.circleHidden) return; // Check for circleHidden
      push();
      translate((width / 2) + this.position.x, (height / 2) + this.position.y);
      fill(255, 204, 0);
      noStroke();
      ellipse(0, 0, this.tempRadius * 2, this.radius * 2.1);
      pop();
   }

   displayRhombus() {
      if (this.hidden) return;
      push();
      stroke(255, 204, 0);
      strokeJoin(BEVEL);
      strokeWeight(20);
      fill(this.color);
      translate(width / 2, height / 2);
      beginShape();
      vertex(-5, -this.rhombus.y);
      vertex(5, -this.rhombus.y);
      vertex(this.rhombus.x, -15);
      vertex(this.rhombus.x, 15);
      vertex(5, this.rhombus.y);
      vertex(-5, this.rhombus.y);
      vertex(-this.rhombus.x, 15);
      vertex(-this.rhombus.x, -15);
      endShape(CLOSE);
      pop();
   }

   drawBallsOnSide(x1, y1, x2, y2) {
      const balls = 8;
      for (let i = 0; i <= balls; i++) {
         const x = lerp(x1, x2, i / balls);
         const y = lerp(y1, y2, i / balls);
         push();
         translate(width / 2, height / 2);
         fill(255, 255, 255);
         noStroke();
         ellipse(x, y, this.size);
         pop();
      }
   }

   changeB(t) {
      switch (this.stage) {
         case 0:
            this.size = lerp(this.size, 22, t * 0.1);
            if (this.size >= 21.5) {
               this.stage = 1;
            }
            break;
         case 1:
            this.size = lerp(this.size, 18, t * 0.08);
            break;
      }
   }

   displayBalls() {
      this.drawBallsOnSide(0, -105, 225, -10.5);
      this.drawBallsOnSide(0, 105, 225, 10.5);
      this.drawBallsOnSide(0, -105, -225, -10.5);
      this.drawBallsOnSide(0, 105, -225, 10.5);
   }
}
