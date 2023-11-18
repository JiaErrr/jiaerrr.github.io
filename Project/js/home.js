let oMain = document.querySelector('#main');
let oMask = document.querySelector('.mask');
let aImg = document.querySelectorAll('#main div');
let aButton = document.querySelectorAll('.mask_btn');
let speed = -5;


oMain.innerHTML += oMain.innerHTML
let move = () => {
   if (oMain.offsetLeft < - oMain.offsetWidth / 2){
      oMain.style.left = '0';
   }
   if (oMain.offsetLeft > 0){
      oMain.style.left = - oMain.offsetWidth / 2 + 'px';
   }
   oMain.style.left = oMain.offsetLeft + speed + 'px';
};
let timer = setInterval(move, 30);
   oMask.addEventListener('mouseover', () => {
      clearInterval(timer);
   });
   oMask.addEventListener('mouseout', () => {
      timer = setInterval(move, 30);
   });
   aButton[0].onclick = () => {
      speed = -5;
   };
   aButton[1].onclick = () => {
      speed = 5;
   };

   let oMain2 = document.querySelector('#main2');
   let oMask2 = document.querySelector('.mask2');
   let aImg2 = document.querySelectorAll('#main2 div');
   let aButton2 = document.querySelectorAll('.mask_btn2');
   let speed2 = -5;
   
   
   oMain2.innerHTML += oMain2.innerHTML
   let move2 = () => {
      if (oMain2.offsetLeft < - oMain2.offsetWidth / 2){
         oMain2.style.left = '0';
      }
      if (oMain2.offsetLeft > 0){
         oMain2.style.left = - oMain2.offsetWidth / 2 + 'px';
      }
      oMain2.style.left = oMain2.offsetLeft + speed2 + 'px';
   };
   let timer2 = setInterval(move2, 30);
      oMask2.addEventListener('mouseover', () => {
         clearInterval(timer2);
      });
      oMask2.addEventListener('mouseout', () => {
         timer2 = setInterval(move2, 30);
      });
   
      aButton2[0].onclick = () => {
         speed2 = -5;
      };
      aButton2[1].onclick = () => {
         speed2 = 5;
      };


let oMain3 = document.querySelector('#main3');
let oMask3 = document.querySelector('.mask3');
let aImg3 = document.querySelectorAll('#main3 div');
let aButton3 = document.querySelectorAll('.mask_btn3');
let speed3 = -5;
oMain3.innerHTML += oMain3.innerHTML
let move3 = () => {
   if (oMain3.offsetLeft < - oMain3.offsetWidth / 2){
      oMain3.style.left = '0';
   }
   if (oMain3.offsetLeft > 0){
      oMain3.style.left = - oMain3.offsetWidth / 2 + 'px';
   }
   oMain3.style.left = oMain3.offsetLeft + speed3 + 'px';
};
let timer3 = setInterval(move3, 30);
   oMask3.addEventListener('mouseover', () => {
      clearInterval(timer3);
   });
   oMask3.addEventListener('mouseout', () => {
      timer3 = setInterval(move3, 30);
   });
   aButton3[0].onclick = () => {
      speed3 = -5;
   };
   aButton3[1].onclick = () => {
      speed3 = 5;
   };




