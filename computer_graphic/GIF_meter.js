class Meter {
   constructor(x, y, radius) {
      this.position = createVector(x, y);
      this.radius = radius;
      this.hidden = false;
      this.midScale = 0.5;
      this.efScale = 0;
      this.scaleFactor = 0;
      this.arrowRotation = 0;
      this.meterRotation = 0;
      this.stage = 0; 
      this.markProgress = 0; 
   }

   reset() {
      this.hidden = false;
      this.midScale = 0;
      this.efScale = 0;
      this.arrowRotation = 0;
      this.stage = 0;
      this.markProgress = 0;
      this.meterRotation = 0;
   }

   hide() {
      this.hidden = true;
   }

   change(part = 'all') {
      if (part === 'all' || part === 'mid') this.changeMid();
      if (part === 'all' || part === 'ef') this.changeEf();
      if (part === 'all' || part === 'arrow') this.changeArrow();
      if (part === 'all' || part === 'marks') this.changeMarks();
      if (part === 'all' || part === 'meter') this.changeMeter();
   }

   changeMid(){
      // console.log(`Changing mid scale: ${this.midScale}`);
      this.midScale = lerp(this.midScale, 1, t * 0.6);
   }
   
   changeEf(){
      switch (this.stage) {
         case 0:
            this.scaleFactor = lerp(this.scaleFactor, 0.8, t * 0.25);
            this.efScale = lerp(this.efScale, 0.15, t * 0.25);
            if(this.efScale >= 0.148){
               this.scaleFactor = 0.8
               this.stage = 1;
            }
            break;
         case 1:
            this.efScale = lerp(this.efScale, 0.10, t * 0.25);
            if(this.efScale <= 0.109){
               this.stage = 2;
            }
            break;
         case 2:
            this.efScale = lerp(this.efScale, 0.15, t * 0.35);
            break;
      }
   }

   changeArrow(){
      // console.log(`Changing arrow rotation: ${this.arrowRotation}`);
      this.arrowRotation = lerp(this.arrowRotation, 150, t * 0.1);
   }

   changeMarks(){
      // Progressively reveal marks over time
      this.markProgress = lerp(this.markProgress, 1, t * 0.08);
   }

   changeMeter(){
      this.meterRotation = lerp(this.meterRotation, 120, t * 0.08);
   }

   display(part = 'all') {
      if (this.hidden) return;
      push();
      translate(width / 2 + this.position.x, height / 2 + this.position.y);
      if (timer >= 6.3){
         rotate(this.meterRotation);
      }
      if (part === 'all' || part === 'mid') this.displayMid();
      if (part === 'all' || part === 'ef') this.displayEf();
      if (part === 'all' || part === 'arrow') this.displayArrow();
      if (part === 'all' || part === 'marks') this.displayMarks();
      
      pop();
   }

   displayMid() {
      // console.log('Displaying mid part');
      push();
      fill(255, 204, 0);
      noStroke();
      scale(this.midScale);
      ellipse(0, 0, this.radius * 0.2, this.radius * 0.2);
      pop();
   }

   displayEf() {
      // console.log('Displaying ef part');
      push();
      textAlign(CENTER, CENTER);
      noStroke();
      fill(255, 204, 0);

      push();
      translate(-this.radius * 0.7, -this.radius * 0.25);
      circle(0, 0, this.radius * this.efScale);
      fill(0);
      scale(this.scaleFactor);
      text('E', 0, 0);
      pop();

      push();
      translate(this.radius * 0.7, -this.radius * 0.25);
      fill(255, 204, 0);
      circle(0, 0, this.radius * this.efScale);
      fill(0);
      scale(this.scaleFactor);
      text('F', 0, 0);
      pop();

      pop();
   }

   displayArrow() {
      // console.log('Displaying arrow');
      push();
      rotate(this.arrowRotation);
      fill("#FF5734");
      noStroke();
      triangle(0, 10, -50, 0, 0, -10);
      pop();
   }

   displayMarks() {
      push();
      strokeWeight(6);
      stroke("#FDB202");
      let mainMarks = [30, 60, 90, 120, 150];
      let minorMarks = [10, 20, 40, 50, 70, 80, 100, 110, 130, 140];
      let markThreshold = this.markProgress * mainMarks.length;
      for (let i = 0; i < markThreshold; i++) {
         let angle = mainMarks[i];
         push();
         rotate(angle);
         if (angle === 30) {
            line(-80, 2, -70, -7);
         } 
         else if (angle === 150) {
            line(-80, -2, -70, 7);
         } 
         else {
            line(-80, 0, -70, 0);
         }
         pop();
      }
      // Draw the minor marks
      let minorThreshold = this.markProgress * minorMarks.length;
      for (let j = 0; j < minorThreshold; j++) {
         let angle = minorMarks[j];
         if (angle <= 30 || angle >= 150) {
            continue;
         }
         push();
         strokeWeight(1);
         rotate(angle);
         line(-80, 0, -75, 0);
         pop();
      }
      pop();
   }

}