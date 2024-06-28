class Camera {
  constructor(x, y, z, cX, cY, cZ, uX, uY, uZ) {
    this.position = createVector(x, y, z);
    this.center = createVector(cX, cY, cZ);
    this.up = createVector(uX, uY, uZ);
    this.offset = createVector(0, -200, 400); // Default offset for following the ball
    this.manualControl = false;
  }

  update(golf_ball) {
    if (!ballIsStatic) {
      this.manualControl = false;
    }

    // Manual camera control
    if (keyIsDown(65)) { // 'A' key
      this.position.x -= 5;
      this.manualControl = true;
    }
    if (keyIsDown(68)) { // 'D' key
      this.position.x += 5;
      this.manualControl = true;
    }
    if (keyIsDown(87)) { // 'W' key
      this.position.z -= 5;
      this.manualControl = true;
    }
    if (keyIsDown(83)) { // 'S' key
      this.position.z += 5;
      this.manualControl = true;
    }
    if (keyIsDown(82)) { // 'R' key
      this.position.y += 5;
      this.manualControl = true;
    }
    if (keyIsDown(70)) { // 'F' key
      this.position.y -= 5;
      this.manualControl = true;
    }

    if (!this.manualControl) {
      
      let targetPosition = createVector(
        golf_ball.position.x + this.offset.x, //def of camera position
        golf_ball.position.y + this.offset.y,
        golf_ball.position.z + this.offset.z
      );

      this.position.x = lerp(this.position.x, targetPosition.x, 0.2);
      this.position.y = lerp(this.position.y, targetPosition.y, 0.2);
      this.position.z = lerp(this.position.z, targetPosition.z, 0.2);
    }
    //let camera move by following the golf_ball
    this.center.x = golf_ball.position.x; 
    this.center.y = golf_ball.position.y;
    this.center.z = golf_ball.position.z;
  }

  display() {
    camera(
      this.position.x, this.position.y, this.position.z,
      this.center.x, this.center.y, this.center.z,
      this.up.x, this.up.y, this.up.z
    );
    perspective(70);
  }
}