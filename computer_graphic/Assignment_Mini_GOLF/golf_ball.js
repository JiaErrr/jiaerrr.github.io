class GolfBall {
  constructor(x, y, z, m) {
    this.position = createVector(x, y, z);
    this.tempPosition = createVector(x, y, z);
    this.modelPosition = createVector(x, y, z);
    this.velocity = createVector();
    this.acceleration = createVector(0, 0, 0);
    this.maxVelocity = 40;
    this.mass = m;
    this.radius = sqrt(this.mass) * 5;
  }
  
  reset() {
    if (this.position.y > 500 || (dist(this.position.x, this.position.z, -400, 200) <= this.radius * 1.1) && this.position.y < 9 ) {
      this.position = createVector(this.tempPosition.x, this.tempPosition.y, this.tempPosition.z);
      this.velocity.set();
      console.log("WIN");
    }
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0, 0);
    this.velocity.limit(this.maxVelocity);
  
    if (this.isBallInHole()) {
      this.reset();
      console.log("WIN");
    } else {
      let diff1 = 0 - (this.position.y + this.radius);
      let diff2 = -118- (this.position.y + this.radius);
      if (diff1 < 1 && this.position.x > -100) {
        if (this.velocity.mag() < 0.21) { //let the ball speed up to static (no velocity)
          this.velocity.set(0, 0, 0);
          ballIsStatic = true;
        } else {
          ballIsStatic = false;
        }
      }
      if (diff2 < 1 && this.position.x < -100) {
        if (this.velocity.mag() < 0.21) { //let the ball speed up to static (no velocity)
          this.velocity.set(0, 0, 0);
          ballIsStatic = true;
        } else {
          ballIsStatic = false;
        }
      }
    }
  
    return this.velocity.mag() > 0;
  }
  

  display() {
    push();
    noStroke();
    fill(colorFill[3]);
    translate(this.position.x, this.position.y, this.position.z);
    sphere(this.radius);
    pop();
  }

  applyForceGravity(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  applyForce(direction, force) {
    this.velocity = direction.normalize().setMag(force);
    ballIsStatic = false;
  }

  applyFriction() {
    if (this.position.y + this.radius <= 0 || this.position.y + this.radius >= -118) {
      this.velocity.mult(0.94);
    }
  }

  applySlopeGravity(slope) {
    let below = slope.below(this.position, this.radius);
    if (below > 0) {
      this.velocity.mult(1.101);
      this.position.y -= below;
      this.acceleration.set(0.01 * slope.angle / 2.28, 0);
    }
  }

  checkGroundCollision() {
    if (this.position.x > -100 && this.position.x < 100 && this.position.z > -900 && this.position.z < 100) {
      if (this.position.y >= 0 - this.radius) {
        this.position.y = 0 - this.radius;
        this.velocity.y *= -0.9;
      }
    }
  
    if (this.position.x > -500 && this.position.x < -300 && this.position.z > 100 && this.position.z < 300) {
      if (this.position.y >= 0 - this.radius) {
        console.log(`${dist(this.position.x, this.position.z, -400, 200)}`);
        if (dist(this.position.x, this.position.z, -400, 200) <= this.radius * 1.1) {
          this.position.y = 20 - this.radius;
          this.velocity.y *= -0.9;
          this.reset();
          console.log("WIN");
        } else {
          this.position.y = 0 - this.radius;
          this.velocity.y *= -0.9;
        }
      }
    }
  
    // Check for collision on the slope
    if (this.position.x > -500 && this.position.x < -300 && this.position.z > -900 && this.position.z < -100) {
      if (this.position.y >= -118 - this.radius && this.position.y < -10) {
        if (!(this.position.x > -480 && this.position.x < -320 && this.position.z > -450 && this.position.z < -350)) {
          this.position.y = -118 - this.radius;
          this.velocity.y *= -0.9;
        }
      }
    }
  
    if(this.position.x > -500 && this.position.x < -300 && this.position.z < -100 && this.position.x > -500){
      if(this.position.x > -480 && this.position.x < -320 && this.position.z > -450 && this.position.z < -350
        && this.position.y >= -118 - this.radius && this.position.y < -10){
        if (!(this.position.x > -440 && this.position.x < -360 && this.position.z > -450 && this.position.z < -350)) {
          this.position.y = -118 - this.radius;
          this.velocity.y *= -0.9;
        }
      }
    }
  }
  
  isBallInHole() {
    let holePosition = createVector(-400, 8.82, 200);
    let distanceToHole = dist(this.position.x, this.position.y, this.position.z, holePosition.x, holePosition.y, holePosition.z);
  
    if (distanceToHole <= this.radius * 1.1) {
      return true;
    }
    return false;
  }
  
  checkModelCollisions() {
    let reflect = false;
    if (reflect){
      this.velocity.mult(0.94);
    }
    if(this.position.y === 0 - this.radius){
      //floor1 x
      if (this.position.x > 80 - this.radius && this.position.z > -880 + this.radius ) {
        this.velocity.x *= -1;
        this.position.x = 80 - this.radius;
        reflect = true;
      } 
      else if (this.position.x < -80 + this.radius && this.position.x > -100 && this.position.z > -720 + this.radius && this.position.z < 80 + this.radius) {
        this.velocity.x *= -1;
        this.position.x = -80 + this.radius;
        reflect = true;
      } 
      //floor1 z
      if (this.position.z < -880 + this.radius) {
        this.velocity.z *= -1;
        this.position.z = -880 + this.radius;
        reflect = true;
      }  
      //end place
      if (this.position.x < -480 + this.radius && this.position.z > -100 + this.radius && this.position.z > 100 && this.position.z < 300) {
        this.velocity.x *= -1;
        this.position.x = -480 + this.radius;
        reflect = true;
      } 
      else if (this.position.x > -320 - this.radius && this.position.x < -300 && this.position.z > -100 && this.position.z > 100 && this.position.z < 300) {
        this.velocity.x *= -1;
        this.position.x = -320 - this.radius;
        reflect = true;
      } 
      else if (this.position.z > 280 - this.radius && this.position.x > -500 && this.position.x < -300) {
        this.velocity.z *= -1;
        this.position.z = 280 - this.radius;
        reflect = true;
      }
    }
    //slope collisions
    if (this.position.z < -880 + this.radius && this.position.x < -100 && this.position.x > -500) {
      this.velocity.z *= -1;
      this.position.z = -880 + this.radius;
      reflect = true;
    } 
    else if (this.position.z > -720 - this.radius && this.position.z < -600 && this.position.x < -100 && this.position.x > -300) {
      this.velocity.z *= -1;
      this.position.z = -720 - this.radius;
      reflect = true;
    }

    else if(this.position.y <= -118){
      //floor 2 x left wall
      if (this.position.x < -480 + this.radius && this.position.z < -700 - this.radius && this.position.z > -880 + this.radius) {
        this.velocity.x *= -1;
        this.position.x = -480 + this.radius;
        reflect = true;
      } 
      else if (this.position.x > -320 - this.radius && this.position.z < -500 && this.position.z > -700) {
        this.velocity.x *= -1;
        this.position.x = -320 - this.radius;
        reflect = true;
      } 
      else if (this.position.x < -480 + this.radius && this.position.x < -200 && this.position.z < -100 && this.position.z > -300) {
        this.velocity.x *= -1;
        this.position.x = -480 + this.radius;
        reflect = true;
      }
      else if (this.position.x > -320 - this.radius && this.position.z < -300 && this.position.z > -500) {
        this.velocity.x *= -1;
        this.position.x = -320 - this.radius;
        reflect = true;
      } 
      else if (this.position.x < -480 + this.radius && this.position.z < -300 && this.position.z > -500) {
        this.velocity.x *= -1;
        this.position.x = -480 + this.radius;
        reflect = true;
      }
      //floor2 z
      if (this.position.z < -880 + this.radius && this.position.z < -100 && this.position.x > -500 && this.position.x < -300 ) {
        this.velocity.z *= -1;
        this.position.z = -880 + this.radius;
        reflect = true;
      }
      if(this.position.z < -101 && this.position.z > -151 && this.position.x > -500 && this.position.x < -300){
        this.velocity.mult(1.45);
      }
    }
  }
}