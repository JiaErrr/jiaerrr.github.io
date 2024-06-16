let gears = [];
let circles = [];
let ribbons = [];
let texts = [];
let stars = [];
let semicircles = [];
let meters = [];
let curvedLines = [];
let rStars = [];
let rhombuses = [];
let pokers = [];
let timer = 0;
let t = 0;
let t2 = 0;
let img; // Declare img globally

function preload() {
   img = loadImage('image/crescendo_logo.png'); // Load the image in preload
}

function setup() {
   createCanvas(1280, 720);
   frameRate(165);
   angleMode(DEGREES);
   rectMode(CENTER);
   strokeCap(PROJECT);

   setupGears();
   setupCircles();
   setupText();
   setupRibbons();
   setupStars();
   setupSemiCircles();
   setupMeters();
   setupRandomStars();
   setupRhombuses();
   setupPokers();
   setupCurveLines();
}

function setupGears() {
   gears.push(new Gear(-95, 45, 100, 25, 8, 0.4, 0.3, 3, -165, -20));
   gears.push(new Gear(95, -45, 100, 25, 8, -0.4, -0.3, 3, 165, -100));
   gears.push(new Gear(50, 105, 50, 12.5, 8, 0.48, 0.4, 4, 100, 165));
}

function setupCircles() {
   circles.push(new Circle(0, 0, 0, 160, 120));
   circles.push(new Circle(0, 0, 0, 100, 90));
}

function setupText() {
   texts.push(new Text(0, 0));
}

function setupRibbons() {
   ribbons.push(new Ribbon(43.67, -120, 20, 21.835, -60));
   ribbons.push(new Ribbon(-43.67, -120, 340, -21.835, -60));
}

function setupStars() {
   stars.push(new Star(-70, -100.46, 1));
   stars.push(new Star(115, 37.27, 1));
   stars.push(new Star(-90, 82.37, 1));
}

function setupSemiCircles() {
   semicircles.push(new semiCircle(0, 10, 200, 240, 180, 0, PIE, '#FEFEEE'));
   semicircles.push(new semiCircle(0, 5, 215, 205, 0, 180, PIE, '#FFCC00'));
   semicircles.push(new semiCircle(0, 0, 200, 200, 0, 180, PIE, '#FFCC00'));
}

function setupMeters() {
   meters.push(new Meter(0, 0, 100));
}

function setupCurveLines() {
   curvedLines.push(new CurvedLine(0, 0, -70, -30, 40, 8, 2.5));
   curvedLines.push(new CurvedLine(0, 0, -65, -35, 20, 1, 2.0));
   curvedLines.push(new CurvedLine(0, 0, 140, 180, 20, 2, 2.0));
   curvedLines.push(new CurvedLine(0, 0, 140, 160, 40, 7, 2.0));
}

function setupRandomStars() {
   rStars.push(new RandomStar(-35, -180, 0.6, 0));
   rStars.push(new RandomStar(120, -120, 0.3, 3));
   rStars.push(new RandomStar(-70, -100, 0.3, -1));
   rStars.push(new RandomStar(-190, -55, 1.1, 4));
   rStars.push(new RandomStar(125, -35, 0.3, 40));
   rStars.push(new RandomStar(220, -30, 0.8, -7));
   rStars.push(new RandomStar(-230, 30, 0.2, -5));
   rStars.push(new RandomStar(-100, 140, 0.6, -20));
   rStars.push(new RandomStar(155, 60, 0.4, 50));
   rStars.push(new RandomStar(115, 130, 0.5, 0));
   rStars.push(new RandomStar(-10, 220, 0.3, 0));
}

function setupRhombuses() {
   rhombuses.push(new Rhombus(0, 0, 120));
}

function setupPokers() {
   pokers.push(new Poker(-45, -40, "♣"));
   pokers.push(new Poker(-15, -40, "♦"));
   pokers.push(new Poker(15, -40, "♠"));
   pokers.push(new Poker(45, -40, "♥"));
   pokers.push(new Poker(0, 0, ""));
}

function draw() {
   background(173, 216, 230);

   // Set timer for loop gif
   timer += deltaTime / 1000; // Convert deltaTime to seconds
   if (timer > 9.2) { // Adjust the duration as needed
      timer = 0;
      t = 0;
      t2 = 0;
      resetAll();
   }

   t = sin(timer * 3.5);
   t2 = sin(timer);

   push();
   imageMode(CENTER);
   translate(width /2 
      + 0, height /2 + -300)
   image(img, 0, 0, 150, 150);
   pop();

   updateAll();
   // displayDebugInfo();
}

function resetAll() {
   gears.forEach(gear => gear.reset());
   ribbons.forEach(ribbon => ribbon.reset());
   circles.forEach(circle => circle.reset());
   texts.forEach(text => text.reset());
   stars.forEach(star => star.reset());
   semicircles.forEach(semicircle => semicircle.reset());
   meters.forEach(meter => meter.reset());
   curvedLines.forEach(curvedLine => curvedLine.reset());
   rStars.forEach(rStar => rStar.reset());
   rhombuses.forEach(rhombus => rhombus.reset());
   pokers.forEach(poker => poker.reset());
}

function updateAll() {
   gears.forEach(gear => {
      gear.change();
      updateGearPosition(gear, t);
      if (!gear.hidden) {
         gear.display();
      }
   });

   ribbons.forEach(ribbon => {
      updateRibbonPosition(ribbon, t);
      if (ribbon.hidden) {
         ribbon.hideDisplay(t);
      }
   });

   circles.forEach(circle => {
      updateCirclePosition(t2);
      if (!circle.hidden) {
         circle.display();
      }
   });

   stars.forEach(star => {
      updateStarPosition(t);
      if (!star.hidden) {
         star.display();
      }
   });

   semicircles.forEach(semicircle => {
      updateSemiCirclePosition(t);
      if (semicircle.hidden) {
         semicircle.hide();
      }
   });

   meters.forEach(meter => {
      updateMeterPosition(meter, t);
      if (meter.hidden) {
         meter.hide();
      }
   });

   curvedLines.forEach(curvedLine => {
      updateCurveLinePositions();
      if (curvedLine.hidden) {
         curvedLine.hide();
      }
   });

   rStars.forEach(rStar => {
      updateRandomStarPositions();
      if (rStar.hidden) {
         rStar.hide();
      } else {
         rStar.display();
      }
   });

   if (timer >= 5.0) {
      semicircles[2].displayS();
   }
   if (timer > 6.5) {
      semicircles[0].changeW(t);
      semicircles[2].changeS(t);
   }
   if (timer > 6.8) {
      semicircles[0].hide();
      semicircles[2].hide();
   }
   
   updateRhombusPositions(t); 

   pokers.forEach(poker => {
      updatePokerPositions(t)
      if(!poker.hidden){
         poker.display();
      }
   });

   updateDisplayText(t2);
}

function updateGearPosition(gear, t) {
   if (timer >= 1 && timer < 1.5) {
      gear.moveToTarget(t);
   } else if (timer >= 1.5 && timer <= 2.0) {
      gear.moveToCenter(t);
   } else if (timer >= 1.6) {
      gear.hidden = true;
   }
}

function updateRibbonPosition(ribbon, t) {
   if (timer >= 1.65 && timer < 3.96) {
      ribbon.change();
      ribbon.move(t);
      ribbon.display();
   } else if (timer >= 3.70) {
      ribbon.hideDisplay(t);
      ribbon.display();
   }
}

function updateCirclePosition(t2) {
   if (timer >= 1.6 && timer < 1.8) {
      circles[0].hidden = false;
      circles[1].hidden = false;
      circles[0].sizeChangeBig(t2);
      circles[0].display();
   } else if (timer >= 1.8 && timer < 2.0) {
      circles[0].sizeChangeSmall(t2);
      circles[0].display();
   } else if (timer >= 2.0 && timer < 3.96) {
      circles[1].sizeChangeBig(t2);
      circles[1].display();
   } else if (timer >= 3.96) {
      circles[1].hidden = true;
   }
   if (timer < 1.6) {
      circles[0].hidden = true;
      circles[1].hidden = true;
   }
   if(timer > 6.8){
      circles[0].hide();
      circles[1].hide();
   }
}

function updateDisplayText(t2) {
   if (timer >= 1.6) {
      texts.forEach(text => {
         text.size(t2);
         text.displayText();
      });
   }
   if (timer >= 3.96) {
      texts.forEach(text => {
         text.hidden = true;
      });
   }
}

function updateStarPosition(t) {
   if (timer >= 1.67 && timer < 2.4) {
      stars[0].shine(t);
   } else if (timer >= 2.4 && timer < 3.13) {
      stars[1].shine(t);
   } else if (timer >= 3.13 && timer < 3.96) {
      stars[2].shine(t);
   }
}

function updateSemiCirclePosition(t) {
   if (timer >= 4.0) {
      semicircles[0].change(t);
      semicircles[0].display();
      semicircles[1].change(t);
      semicircles[1].display();
   }
   if(timer > 6.8){
      semicircles[0].hide();
      semicircles[1].hide();
   }
}

function updateMeterPosition(meter) {
   if (timer >= 5.0) {
      meter.display('arrow');
      meter.display('mid');
   }
   if (timer >= 5.2) {
      meter.change('mid');
      meter.change('ef');
      meter.display('ef');
   }
   if (timer >= 5.9) {
      meter.change('arrow');
      meter.display('marks');
      meter.change('marks');
   }
   if (timer >= 6.4) {
      meter.change('meter');
   }
   if(timer > 6.8){
      meter.hide();
   }
}

function updateCurveLinePositions() {
   if (timer >= 6.47 && timer < 6.8) {
      curvedLines.forEach(curvedLine => {
         curvedLine.change(t);
         curvedLine.display();
      });
   }
}

function updateRandomStarPositions() {
   for (let i = 0; i < rStars.length; i++) {
      if (timer >= 5.9 + i / 15) {
         rStars[i].fade();
         rStars[i].display();
      }
   }
}

function updateRhombusPositions(t) {
   rhombuses.forEach(rhombus => {
      if (timer >= 6.80 && timer < 6.9) {
         rhombus.displayC();
      }
      if (timer >= 6.90 && timer < 7.3) {
         rhombus.changeC(t); 
         rhombus.displayC();
      }
      if (timer >= 6.90 ) {
         rhombus.changeR(t);
         rhombus.displayRhombus();
      }
      if (timer >= 7.98) {
         rhombus.changeB(t);
         rhombus.displayBalls();
      }
   });
}

function updatePokerPositions(t){
   if(timer > 8.15){
      pokers[3].size(t);
      pokers[3].display();
   }
   if(timer > 8.2){
      pokers[4].change(t);
      pokers[4].displayRect();
   }
   if(timer > 8.25){
      pokers[2].size(t);
      pokers[2].display();
   }
   if(timer > 8.35){
      pokers[1].size(t);
      pokers[1].display();
   }
   if(timer > 8.45){
      pokers[0].size(t);
      pokers[0].display();
   }
}

function displayDebugInfo() {
   fill(0);
   noStroke();
   textSize(16);
   text("Frame Count: " + frameCount, 10, 20);
   text("Timer: " + nf(timer, 1, 2), 10, 40);
   text("Delta Time: " + nf(deltaTime, 1, 2), 10, 60);
   translate(width/2 , height/2);
}
