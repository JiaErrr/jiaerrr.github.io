class semiCircle {
   constructor(x, y, diameterX, diameterY, start, end, detail, color) {
      this.position = createVector(x, y);
      this.initialPosition = createVector(x, y);
      this.dX = diameterX;
      this.dY = diameterY;
      this.initialDY = diameterY;
      this.start = start;
      this.initialStart = start;
      this.end = end; 
      this.initialEnd = end; 
      this.detail = detail;
      this.color = color;
      this.stage = 0;
      this.hidden = false;
      this.rotation = 0;
   }

   reset() {
      this.hidden = false;
      this.position = createVector(this.initialPosition.x, this.initialPosition.y);
      this.stage = 0;
      this.dY = this.initialDY;
      this.start = this.initialStart;
      this.end = this.initialEnd;
   }

   hide() {
      this.hidden = true;
   }

   change(t) {
      if (this.start === 180 && this.color == '#FEFEEE') {
         switch (this.stage) {
         case 0:
            this.dY = lerp(this.dY, 200, t * 0.08);
            if (dist(0, this.dY, 0, 200) <= 1) {
               this.stage = 1;
            }
            break;
         case 1:
            this.position.y = lerp(this.position.y, 0, t * 0.08);
            break;
         }
      } 
      else if (this.start === 0 && this.color == '#FFCC00' && timer >= 4.7) { 
         switch (this.stage) {
         case 0:
            this.position.y = lerp(this.position.y, -15, t * 0.08);
            if (dist(0, this.position.y, 0, -15) <= 1) {
               this.stage = 1;
            }
            break;
         case 1:
            this.position.y = lerp(this.position.y, 0, t * 0.08);
            this.dX = lerp(this.dX, 200, t * 0.08);
            this.dY = lerp(this.dY, 200, t * 0.05);
            if (dist(0, this.position.y, 0, 0) <= 1) {
               this.stage = 2;
            }
            break;
         case 2:
            this.hidden = true;
            break;
         }
      }
   }

   changeS(t){
      this.start = lerp(this.start, 50, t * 0.5);
      this.end = lerp(this.end, 361, t * 0.1);
      if (this.end >= 360){
         this.end = 360;
      }
   }

   changeW(t){
      this.end = lerp(this.end, 100, t * 0.05);
      if (this.end >= 90){
         this.end = 100;
      }
   }

   display() {
      if (this.hidden) return;
      push();
      noStroke();
      fill(this.color);
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      arc(0, 0, this.dX, this.dY, this.start, this.end, this.detail); 
      pop();
   }

   displayS() {
      if (this.hidden) return;
      push();
      stroke("#FDB202");
      strokeWeight(1);
      fill('#FFCC00');
      rotate(this.rotation);
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      arc(0, 0, this.dX, this.dY, this.start, this.end, this.detail); 
      pop();
   }
}
