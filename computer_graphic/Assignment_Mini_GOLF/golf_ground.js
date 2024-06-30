class Ground {
  constructor(x, y, z, i, r) {
    this.position = createVector(x, y, z);
    this.i = i;
    this.r = r;
  }

  display() {
    push();
    fill(colorFill[this.i]);
    noStroke();
    translate(this.position.x, this.position.y, this.position.z);
    rotate(this.r);
    box(160, 14.25, 200.01);
    pop();
  }

  displaySide() {
    push();
    fill(colorFill[this.i]);
    noStroke();
    translate(this.position.x, this.position.y, this.position.z);
    rotateY(this.r);
    box(180.01, 14.25, 200.01);
    pop();
  }

  displaySlope() {
    push();
    fill(colorFill[this.i]);
    noStroke();
    translate(this.position.x, this.position.y, this.position.z);
    rotate(this.r);
    box(240.5, 14.25, 180);
    pop();
  }

  displayCorner() {
    push();
    fill(colorFill[this.i]);
    noStroke();
    translate(this.position.x, this.position.y, this.position.z);
    rotate(this.r);
    box(199.9, 12.25, 200.01);
    pop();
  }

  displayGap() {
    push();
    noStroke();
    fill(colorFill[this.i]);
    translate(this.position.x, this.position.y, this.position.z);
    push();
    translate(0, 0, 75);
    box(180, 14.25, 50.01);
    pop();
    push();
    translate(0, 0, -75);
    box(180, 14.25, 50.01);
    pop();
    push();
    translate(-60, 0, 0);
    box(40.01, 14.25, 100);
    pop();
    push();
    translate(60, 0, 0);
    box(40.01, 14.25, 100);
    pop();
    pop();
  }

  displayEnd() {
    push();
    noStroke();
    fill(colorFill[this.i]);
    translate(this.position.x, this.position.y, this.position.z);
    push();
    translate(0, 0, 45);
    rotateY(21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(0, 0, 45);
    rotateY(-21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(0, 0, -45);
    rotateY(21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(0, 0, -45);
    rotateY(-21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(45, 0, 0);
    rotateY(21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(45, 0, 0);
    rotateY(-21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(-45, 0, 0);
    rotateY(21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(-45, 0, 0);
    rotateY(-21);
    box(60, 14.25, 60);
    pop();
    push();
    translate(-50, 0, -56.1);
    box(60, 14.25, 88);
    translate(50, 0, -5);
    box(60, 14.25, 78);
    translate(50, 0, 5);
    box(60, 14.25, 88);
    translate(0, 0, 45);
    box(60, 14.25, 88);
    translate(0, 0, 55);
    box(60, 14.25, 88);
    translate(-50, 0, 10);
    box(60, 14.25, 78);
    translate(-50, 0, 0);
    box(60, 14.25, 78);
    translate(0, 0, -50);
    box(60, 14.25, 78);
    pop();
    translate(0, 2.9, 0);
    box(60, 7.25, 78);
    pop();
  }

  displaySpeed(){
    push();
    noStroke();
    texture(speed);
    translate(-20,0,0);
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(90);
    rotateZ(90);
    plane(50);
    pop();
  }
}
