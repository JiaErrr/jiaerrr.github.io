class Poker {
   constructor(x, y, suit) {
      this.position = createVector(x, y);
      this.initialPosition = createVector(x, y);
      this.scaleFactor = 0;
      this.scaleRect = 0.4;
      this.suit = suit;
      this.stage = 0;
      this.hidden = false;
   }

   reset() {
      this.hidden = false;
      this.position = createVector(this.initialPosition.x, this.initialPosition.y);
      this.scaleFactor = 0;
      this.stage = 0;
   }

   hide() {
      this.hidden = true;
   }

   size(t) {
      switch (this.stage){
         case 0:
            this.scaleFactor = lerp(this.scaleFactor, 1.1, t * 0.5);
            if(this.scaleFactor >= 1.0){
               this.stage = 1;
            }
            break;
         case 1:
            this.scaleFactor = lerp(this.scaleFactor, 1.75, t * 0.05);
            if(this.scaleFactor >= 1.7){
               this.stage = 2;
            }
            break;
         case 2:
            this.scaleFactor = lerp(this.scaleFactor, 1.0, t * 0.05);
            break;
      }
   }

   display() {
      if (this.hidden) return;
      push();
      translate((width / 2) + this.position.x, (height / 2) + this.position.y);
      fill(0);
      noStroke();
      scale(this.scaleFactor);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(this.suit, 0, 0);
      pop();
   }

   change(t){
      switch (this.stage){
         case 0:
            this.scaleRect = lerp(this.scaleRect, 1.51, t * 0.05);
            if(this.scaleRect >= 1.5){
               this.stage = 1;
            }
            break;
         case 1:
            this.scaleRect = lerp(this.scaleRect, 0.61, t * 0.05);
            if(this.scaleRect >= 0.6){
               this.stage = 2;
            }
            break;
         case 2:
            this.scaleRect = lerp(this.scaleRect, 1.0, t * 0.05);
            break;
      }
   }
   displayRect(){
      if (this.hidden) return;
      push();
      noStroke();
      translate((width / 2) + this.position.x, (height / 2) + this.position.y);
      fill(255, 87, 52);
      scale(this.scaleRect); 
      rect(0, 0, 288, 36)
      pop();
   }
}
