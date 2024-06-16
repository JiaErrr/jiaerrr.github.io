class Star {
   constructor(x, y) {
      this.position = createVector(x, y);
      this.hidden = false;
      this.scaleFactor = 0; 
      this.growing = true; 
      this.stage = 0;
   }

   reset() {
      this.hidden = false;
      this.scaleFactor = 0;
      this.growing = true;
      this.stage = 0; 
   }

   hide() {
      this.hidden = true;
   }

   shine(t) {
      if (this.growing) {
         switch (this.stage) {
            case 0:
               this.scaleFactor = lerp(this.scaleFactor, 1.2, t * 0.4);
               if (this.scaleFactor >= 1.19) {
                  this.stage = 1;
               }
               break;
            case 1:
               this.scaleFactor = lerp(this.scaleFactor, 1.0, t * 0.5);
               if (this.scaleFactor <= 1.01) {
                  this.stage = 2;
               }
               break;
            case 2:
               this.scaleFactor = lerp(this.scaleFactor, 0.0, t * 0.2);
               break;
         }
      }
      this.display(); 
   }

   display() {
      if (this.hidden) return;
      push();
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      fill(255);
      noStroke();
      scale(this.scaleFactor);
      rotate(35);
      ellipse(0, 0, 5, 70);
      rotate(-95);
      ellipse(0, 0, 6, 95);
      pop();
   }

   displayStar() {
      if (this.hidden) return;
      push();
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      fill(255);
      scale(this.scaleFactor);
      noStroke();
      beginShape();
      vertex(0, -30);
      vertex(5, -5);
      vertex(30, 0);
      vertex(5, 5);
      vertex(0, 30);
      vertex(-5, 5);
      vertex(-30, 0);
      vertex(-5, -5);
      endShape();
      pop();
   }
}
