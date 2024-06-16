class Text {
   constructor(x, y) {
      this.position = createVector(x, y);
      this.hidden = false;
      this.scaleFactor = 0;
   }

   reset() {
      this.hidden = false;
   }

   hide() {
      this.hidden = true;
   }

   size(t2) {
      this.scaleFactor = lerp(this.scaleFactor, 1, t2);
   }

   displayText() {
      if (this.hidden) return;
      push();
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      fill(255);
      noStroke();
      scale(this.scaleFactor);
      textSize(90);
      textAlign(RIGHT);
      text('1', 5, 30);
      textSize(45);
      textAlign(LEFT);
      text('ST', -5, 0); 
      pop();
   }
}