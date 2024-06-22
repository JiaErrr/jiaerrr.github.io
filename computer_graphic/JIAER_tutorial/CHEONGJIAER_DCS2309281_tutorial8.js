let img;
let angle =0;
let angle1 = 0;
function preload() {
   img = loadImage('../image/gengar.jpg');
}



function setup() {
   createCanvas(900, 500, WEBGL);
   angleMode(DEGREES);
}

function draw() {
   angle = angle + deltaTime / 40 ;
   scale(0.6);

   rotateY(angle);
   ambientLight(128, 128, 128) 
   directionalLight(128, 128, 128, 1, 4, -2);
   orbitControl();
   noStroke();
   background(225);
   fill('#674FA7');

   push();
   translate(0, 175);
   fill('black');
   rotateX(90);
   box(500, 500, 30);
   pop();
   //body
   push();
   rotateY(180);
   texture(img);
   textureMode(IMAGE);
   ellipsoid(150, 150, 130);
   pop();
   // Right leg
   push();
   translate(75, 100);
   cylinder(45, 150);
   pop();
   push();
   translate(75, 160, 35);
   rotateX(65);
   cone(40, 80);
   pop();
   push();
   translate(50, 160, 35);
   rotateX(65);
   rotate(20);
   cone(35, 80);
   pop();
   push();
   translate(100, 160, 35);
   rotateX(65);
   rotate(-20);
   cone(35, 80);
   pop();
   //left Leg
   push();
   translate(-75, 100);
   cylinder(45, 150);
   pop();
   push();
   translate(-75, 160, 35);
   rotateX(65);
   cone(40, 80);
   pop();
   push();
   translate(-50, 160, 35);
   rotateX(65);
   rotate(-20);
   cone(35, 80);
   pop();
   push();
   translate(-100, 160, 35);
   rotateX(65);
   rotate(20);
   cone(35, 80);
   pop();
   // LEft Hand
   push();
   translate(-130, -15, 25);
   rotate(45);
   rotateX(25);
   cylinder(35, 105);
   pop();
   push();
   translate(-160, 15, 45);
   sphere(35);
   pop();
   push();
   translate(-170, 25, 55);
   rotate(45);
   rotateX(25);
   cone(30, 85);
   pop();
   push();
   translate(-170, 15, 55);
   rotate(75);
   rotateX(25);
   cone(30, 90);
   pop();
   push();
   translate(-165, 35, 55);
   rotate(25);
   rotateX(25);
   cone(30, 75);
   pop();
   // Right Hand
   push();
   rotateX(angle1);
   push();
   translate(130, -15, 25);
   rotate(-45);
   rotateX(25);
   cylinder(35, 105);
   pop();
   push();
   translate(160, 15, 45);
   sphere(35);
   pop();
   push();
   translate(170, 25, 55);
   rotate(-45);
   rotateX(25);
   cone(30, 85);
   pop();
   push();
   translate(170, 15, 55);
   rotate(-75);
   rotateX(25);
   cone(30, 90);
   pop();
   push();
   translate(165, 35, 55);
   rotate(-25);
   rotateX(25);
   cone(30, 75);
   pop();
   pop();
   //right ear
   push();
   translate(140, -130);
   rotate(225);
   rotateX(-10);
   cone(45, 150);
   pop();
   //left ear
   push();
   translate(-140, -130);
   rotate(-225);
   rotateX(-10);
   cone(45, 150);
   pop();
   //hair
   push();
   translate(-50, -120);
   rotate(-200);
   cone(76, 100);
   pop();
   push();
   translate(-25, -140);
   rotate(-180);
   cone(56, 50);
   pop();
   push();
   translate(10, -140);
   rotate(-180);
   cone(56, 50);
   pop();
   push();
   translate(50, -120);
   rotate(-160);
   cone(76, 100);
   pop();

   //back
   push();
   translate(-50, -130, -65);
   rotateX(230);
   cone(25, 75);
   pop()
   push();
   translate(50, -130, -65);
   rotateX(230);
   cone(25, 75);
   pop()
   //back2  
   push();
   translate(-65, -60, -115);
   rotateX(290);
   rotate(25);
   cone(25, 75);
   pop()
   push();
   translate(65, -60, -115);
   rotateX(290);
   rotate(-25);
   cone(25, 75);
   pop()
   //back3
   push();
   translate(-85, 0, -125);
   rotateX(290);
   rotate(25);
   cone(25, 75);
   pop()
   push();
   translate(85, 0, -125);
   rotateX(290);
   rotate(-25);
   cone(25, 75);
   pop()
   //back4
   push();
   translate(0, -80, -105);
   rotateX(280);
   cone(25, 75);
   pop()
   push();
   translate(0, -55, -115);
   rotateX(280);
   cone(25, 75);
   pop()
   push();
   translate(0, -35, -120);
   rotateX(280);
   cone(25, 75);
   pop()
   push();
   translate(0, -10, -125);
   rotateX(280);
   cone(25, 75);
   pop()
   push();
   translate(0, 10, -120);
   rotateX(290);
   cone(25, 75);
   pop()
   //Tail
   push();
   translate(0, 80, -100);
   rotateX(280);
   cone(85, 150);
   pop()
   push();
   translate(0, 80, -165);
   rotateX(270);
   cone(30, 95);
   pop();
   push();
   translate(0, 80, -195);
   rotateX(260);
   cone(10, 75);
   pop();
}
