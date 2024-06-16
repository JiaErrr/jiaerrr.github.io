class Circle {
   constructor(x, y, startR, targetR, endR) {
      this.initialPosition = createVector(x, y);
      this.initialRadius = startR;
      this.position = createVector(x, y);
      this.radius = 0;
      this.startR = startR;
      this.targetR = targetR;
      this.endR = endR;
      this.hidden = false;
   }

   reset() {
      this.hidden = false;
      this.position = createVector(this.initialPosition.x, this.initialPosition.y);
      this.radius = this.initialRadius;
   }

   hide() {
      this.hidden = true;
   }

   sizeChangeBig(t2) {
      this.radius = lerp(this.radius, this.targetR, t2);
   }

   sizeChangeSmall(t2) {
      this.radius = lerp(this.radius, this.endR, t2);
   }

   display() {
      if (this.hidden) return;
      push();
      translate((width / 2) + this.position.x, (height / 2) + this.position.y);
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      ellipse(0, 0, this.radius * 2);
      pop();
   }
}