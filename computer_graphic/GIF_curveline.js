class CurvedLine {
   constructor(x, y, startAngle, endAngle, offset, weight, speed) {
      this.position = createVector(x, y);
      this.r = 120;
      this.startAngle = startAngle;
      this.endAngle = endAngle;
      this.offset = offset;
      this.weight = weight;
      this.speed = speed;
      this.maxSpeed = 50;
      this.angleOffset = 0;
      this.lengthOffset = 0;
      this.hidden = false;
      this.targetAngleOffset = 0;
      this.targetLengthOffset = 0;
   }

   reset() {
      this.hidden = false;
      this.angleOffset = 0;
      this.lengthOffset = 0;
      this.targetAngleOffset = 0;
   }

   hide() {
      this.hidden = true;
   }

   change(t) {
      this.targetAngleOffset += this.speed;
      this.angleOffset = lerp(this.angleOffset, this.targetAngleOffset, t * 0.0075);
      if (this.targetAngleOffset == this.maxSpeed){
         this.targetAngleOffset = this.maxSpeed;
      }
   }

   display() {
      if (this.hidden) return;

      stroke(255);
      noFill();
      strokeWeight(this.weight);

      push();
      translate((width / 2) + this.position.x, (height / 2) + this.position.y);
      beginShape();
      for (let angle = this.startAngle + this.angleOffset; angle <= this.endAngle + this.angleOffset; angle++) {
         let x = (this.r + this.offset + this.lengthOffset) * cos(angle);
         let y = (this.r + this.offset + this.lengthOffset) * sin(angle);
         vertex(x, y);
      }
      endShape();
      pop();
   }
}
