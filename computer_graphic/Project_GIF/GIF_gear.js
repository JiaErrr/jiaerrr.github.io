class Gear {
   constructor(x, y, radius, toothDepth, numTeeth, velocity, acceleration, velocityLimit, targetX, targetY) {
      this.initialVelocity = velocity;
      this.initialAngle = 0;
      this.initialPosition = createVector(x, y);
      this.position = createVector(x, y);
      this.targetPosition = createVector(targetX, targetY);
      this.radius = radius;
      this.toothDepth = toothDepth;
      this.numTeeth = numTeeth;
      this.velocity = velocity;
      this.acceleration = acceleration;
      this.velocityLimit = velocityLimit;
      this.angle = 0;
      this.hidden = false;
   }

   reset() {
      this.velocity = this.initialVelocity;
      this.angle = this.initialAngle;
      this.position = createVector(this.initialPosition.x, this.initialPosition.y);
      this.hidden = false;
   }

   change() {
      this.velocity += this.acceleration * (deltaTime / 100); // Set acceleration
      this.velocity = constrain(this.velocity, -this.velocityLimit, this.velocityLimit); // Limit the velocity
      this.angle += this.velocity * (deltaTime / 10); // Let gear rotate
   }

   moveToTarget(t) {
      this.position.x = lerp(this.position.x, this.targetPosition.x, t);
      this.position.y = lerp(this.position.y, this.targetPosition.y, t);
   }

   moveToCenter(t) {
      this.position.x = lerp(this.position.x, 0, t);
      this.position.y = lerp(this.position.y, 0, t);
   }

   hide() {
      this.hidden = true;
   }

   display() {
      if (this.hidden) return; // Check the hidden property
      push();
      fill(255, 204, 0);
      stroke("#FDB202");
      strokeWeight(2);
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      rotate(this.angle);
      beginShape(); // Draw GearShape
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
      fill(173, 216, 230);
      ellipse(0, 0, this.radius * 0.6, this.radius * 0.6); // Draw hole
      pop();
   }
}