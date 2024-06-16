class RandomStar {
   constructor(x, y, size, angle = 0) {
   this.position = createVector(x, y);
   this.size = size;
   this.angle = angle;
   this.hidden = false;
   this.alpha = 0;
   this.stage = 0;
   }

   reset() {
   this.hidden = false;
   this.alpha = 0;
   this.stage = 0;
   }

   hide() {
   this.hidden = true;
   }

   fade() {
   if (this.stage === 0) {
      this.alpha = lerp(this.alpha, 255, t * 0.09); // Increment alpha
      if (this.alpha >= 254) {
         this.alpha = 255;
         this.stage = 1; 
      }
   } else if (this.stage === 1) {
      this.alpha = lerp(this.alpha, 0, t * 0.115); // Decrement alpha
      if (this.alpha <= 1) {
         this.alpha = 0;
      }
   }
   }
   display() {
   if (this.hidden) return;
   push();
   translate(width / 2 + this.position.x, height / 2 + this.position.y);
   fill(255, this.alpha);
   scale(this.size);
   noStroke();
   rotate(this.angle);
   // erase(this.alpha);
   beginShape();
   vertex(0, -30);
   vertex(5, -5);
   vertex(30, 0);
   vertex(5, 5);
   vertex(0, 30);
   vertex(-5, 5);
   vertex(-30, 0);
   vertex(-5, -5);
   endShape(CLOSE);
   // noErase();
   pop();
   }
}