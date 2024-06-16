class Ribbon {
   constructor(x, y, angle, mX, mY) {
      this.initialPosition = createVector(x, y);
      this.position = createVector(x, y);
      this.midPosition = createVector(mX, mY); // Middle position for smoother transition
      this.targetPosition = createVector(0, 0);
      this.angle = angle;
      this.hidden = false;
      this.stage = 0; // 0: to mid, 1: back to initial, 2: to target
   }

   reset() {
      this.hidden = false;
      this.position = createVector(this.initialPosition.x, this.initialPosition.y);
      this.stage = 0;
   }

   move(t) {
      if (this.angle === 20) {
         switch (this.stage) {
            case 0:
               this.position.x = lerp(this.position.x, this.targetPosition.x, t * 0.8);
               this.position.y = lerp(this.position.y, this.targetPosition.y, t * 0.8);
               if (dist(this.position.x, this.position.y, this.targetPosition.x, this.targetPosition.y) <= 1) {
                  this.stage = 1;
               }
               break;
            case 1:
               this.position.x = lerp(this.position.x, this.midPosition.x, t * 0.8);
               this.position.y = lerp(this.position.y, this.midPosition.y, t * 0.8);
               if (dist(this.position.x, this.position.y, this.midPosition.x, this.midPosition.y) <= 1) {
                  this.stage = 2;
               }
               break;
            case 2:
               this.position.x = lerp(this.position.x, this.targetPosition.x, t * 0.8);
               this.position.y = lerp(this.position.y, this.targetPosition.y, t * 0.8);
               break;
         }
      }
      else if (this.angle == 340){
         switch (this.stage) {
            case 0:
               this.position.x = lerp(this.position.x, this.midPosition.x, t * 0.8);
               this.position.y = lerp(this.position.y, this.midPosition.y, t * 0.8);
               if (dist(this.position.x, this.position.y, this.midPosition.x, this.midPosition.y) <= 1) {
                  this.stage = 1;
               }
               break;
            case 1:
               this.position.x = lerp(this.position.x, this.targetPosition.x, t * 0.8);
               this.position.y = lerp(this.position.y, this.targetPosition.y, t * 0.8);
               if (dist(this.position.x, this.position.y, this.targetPosition.x, this.targetPosition.y) <= 1) {
                  this.stage = 2;
               }
               break;
            case 2:
               this.position.x = lerp(this.position.x, this.targetPosition.x - 15, t * 0.6);
               this.position.y = lerp(this.position.y, this.targetPosition.y + 15, t * 0.6);
               if (dist(this.position.x, this.position.y, this.midPosition.x, this.midPosition.y) <= 30) {
                  this.stage = 3;
               }
               break;
            case 3:
               this.position.x = lerp(this.position.x, this.targetPosition.x, t * 0.7);
               this.position.y = lerp(this.position.y, this.targetPosition.y, t * 0.7);
         }
      }
   }

   hide() {
      this.hidden = true;
   }

   change() {
      if (this.angle == 20) {
         this.position.y = -tan(70) * this.position.x;
      } 
      else if (this.angle == 340) {
         this.position.y = tan(70) * this.position.x;
      } 
      else {
         this.hidden = true;
      }
   }

   hideDisplay(t) {
      if (this.angle == 20) {
         if (timer >= 4.05){
            this.position.x = lerp(this.position.x, this.initialPosition.x, t * 0.5);
            this.position.y = lerp(this.position.y, this.initialPosition.y, t * 0.5);
            if (dist(this.position.x, this.position.y, this.initialPosition.x, this.initialPosition.y) <= 1) {
               this.hidden = true;
         }
         }
         
      } 
      else if (this.angle == 340) {
         this.position.x = lerp(this.position.x, this.initialPosition.x, t * 0.5);
         this.position.y = lerp(this.position.y, this.initialPosition.y, t * 0.5);
         if (dist(this.position.x, this.position.y, this.initialPosition.x, this.initialPosition.y) <= 1) {
            this.hidden = true;
         }
      } 
      else {
         this.hidden = true;
      }
   }

   display() {
      if (this.hidden) return;
      push();
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      rotate(this.angle);
      beginShape();
      vertex(-40, 80);
      vertex(40, 80);
      vertex(40, 250);
      vertex(0, 215);
      vertex(-40, 250);
      endShape(CLOSE);
      pop();
   }
}
