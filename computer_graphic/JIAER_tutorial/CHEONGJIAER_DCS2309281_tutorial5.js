function setup() {
   createCanvas(innerWidth, innerHeight, WEBGL); // Enable 3D rendering
   frameRate(165);
}
   
function draw() {
   background(0);
   rotateX(frameCount * 0.01);
   rotateY(frameCount * 0.01);   

   scale(10, -10); // Scale up and flip the y-axis

   stroke(255, 221, 225); // Disable stroke for filled shape
   strokeWeight(random(5.2));
   fill(238, 156, 167);

   let xOffset = mouseX - innerWidth / 2; //  offset based on mouseX
   let yOffset = mouseY - innerHeight / 2; // offset based on mouseY

   beginShape(); // Begin the shape
   for (let t = 0; t <= TWO_PI; t += 0.01) {
      let x = 16 * pow(sin(t), 3) + xOffset; 
      let y = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t) + yOffset; 
      let z1 = 5; 
      let z2 = -5; 
      vertex(x, y, z1); 
      vertex(x, y, z2); 
   }
   endShape();
}
