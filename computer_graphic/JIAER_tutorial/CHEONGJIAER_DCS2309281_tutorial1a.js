function setup(){
   createCanvas(800, 800);
}

function draw(){
   background(255,255,255);
   noStroke();

   //try changing these colors
   colorA = color(238, 156, 167);
   colorB = color(255, 221, 225);

   for (let i = 0;i<12;i++){
      //converts i to a fraction between 0 and 1
      position = map(i,0,12,0,1);

      //that position determines where the LerpedColor
      //is between colorA and colorB
      LerperColor = lerpColor(colorA,colorB,position);

      fill (LerperColor);
      rect (0,i*height/12,width,height/12);
   }
   
   //Shape -- circle 
   fill(232, 223, 202);
   ellipse(150, 150, 80, 80);

   //Shape -- four-sided shape
   fill(232, 223, 202);
   quad(450, 250, 550, 250, 450, 350, 550, 350);

   //Shape -- triangle
   fill(232, 223, 202);
   triangle(400, 400, 400, 500, 500, 400);

   //Shape -- square
   fill(232, 223, 202);
   square(450, 110, 80);

   //Shape -- heart
   beginShape();
   vertex(200, 550);
   bezierVertex(200, 450, 350, 400, 350, 350);
   bezierVertex(350, 300, 250, 250, 200, 340);
   bezierVertex(150, 250, 50, 300, 50, 350);
   bezierVertex(50, 400, 200, 450, 200, 550);
   endShape();


}

