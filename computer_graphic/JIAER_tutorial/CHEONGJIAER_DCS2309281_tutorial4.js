// let angle = 0;
//Draw five squares with different colors at different places
var colorsRGB = [
   'black',
   'green',
   'blue',
   'purple',
   'red',
   'orange',
   'yellow',
   '#23ecff',
   '#fd32fe',
   'grey',
   'black',
   'green',
   'blue',
   'red'
];
function setup() {
   createCanvas(800, 800);
   angleMode(DEGREES);
   rectMode(CENTER);
}

function draw() {
   background(220);
   for (let i = 0; i < 10; i++){
      push();
      rotate(i * 3.5);
      fill(0);
      line(0, 0, 200, 200);
      translate(200, 200);
      fill(colorsRGB[i]);
      rect(0, 0, 100, 100);
      pop();
   }
}




// function draw() {
//    background(220);   
//    for (let i = 0; i < 14; i++){
//       push();
//       translate(width / 2, height / 2);
//       rotate(i * (360 / 14));
//       fill(colorsRGB[i]);
//       rect(150, 50, 100, 100);  // Adjust the position to match the layout
//       pop();
//    }
// }
