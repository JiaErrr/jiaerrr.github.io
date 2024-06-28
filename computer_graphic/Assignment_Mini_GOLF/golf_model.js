class Model {
  constructor(x, y, z, model, rotate, size, i) {
    this.position = createVector(x, y, z);
    this.model = model;
    this.rotate = rotate;
    this.size = size;
    this.i = i;
  }

  displayModel() {
    if (this.model) {
      push();
      noStroke();
      fill(colorFill[this.i]);
      translate(this.position.x, this.position.y, this.position.z);
      scale(this.size);
      rotateY(this.rotate);
      rotateX(180);
      model(this.model);
      pop();
    } else {
      console.log('Model not loaded');
    }
  }
}