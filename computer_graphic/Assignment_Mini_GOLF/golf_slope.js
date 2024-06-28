class Slope {
  constructor(start, end, angle) {
    this.start = start;
    this.end = end;
    this.angle = angle;
  }

  display() {
    push();
    fill('black');
    translate((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2, (this.start.z + this.end.z) / 2);
    rotateY(90);
    rotateX(this.angle - 1);
    plane(230);
    pop();
  }

  below(position, r) {
    if (position.x > this.start.x || position.x < this.end.x) {
      return false;
    }
    if (position.z > this.start.z || position.z < this.end.z) {
      return false;
    }

    let amt = (position.x - this.start.x) / (this.end.x - this.start.x);
    let slopeHeight = lerp(this.start.y, this.end.y, amt);
    return (position.y + r) - slopeHeight;
  }
}