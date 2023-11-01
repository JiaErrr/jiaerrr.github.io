# jiaerrr.github.io
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<style> /*Let content in grid*/
.parent {
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   grid-template-rows: repeat(6, 1fr);
   grid-column-gap: 50px;
   grid-row-gap: 50px;
   text-align: center;
   }
   .head { 
      grid-area: 1 / 1 / 2 / 6;
      text-align: center;
      font-size: larger;
   }
   .div1 { grid-area: 2 / 2 / 3 / 3; }
   .div2 { grid-area: 2 / 3 / 3 / 4; }
   .div3 { grid-area: 2 / 4 / 3 / 5; }
   .div4 { grid-area: 3 / 2 / 4 / 3; }
   .div5 { grid-area: 3 / 3 / 4 / 4; }
   .div6 { grid-area: 3 / 4 / 4 / 5; }
   .div7 { grid-area: 4 / 2 / 5 / 3; }
   .div8 { grid-area: 4 / 3 / 5 / 4; }
   .div9 { grid-area: 4 / 4 / 5 / 5; }
   .div10 { grid-area: 5 / 2 / 6 / 3; }
   .div11 { grid-area: 5 / 3 / 6 / 4; }
   .div12 { grid-area: 5 / 4 / 6 / 5; }

.spinner {
   /* Size */
   height: 4rem;
   width: 4rem;

   /* Create a curve at the top */
   border: 4px solid #d1d5db;
   border-top-color: #3b82f6;
   border-radius: 50%;

   animation: spinner 800ms linear infinite;
}

@keyframes spinner {
   from {
         transform: rotate(0deg);
   }
   to {
         transform: rotate(360deg);
   }
}
/*Button*/
.button-85 {
   padding: 0.6em 2em;
   border: none;
   outline: none;
   color: rgb(255, 255, 255);
   background: #111;
   cursor: pointer;
   position: relative;
   z-index: 0;
   border-radius: 10px;
   user-select: none;
   -webkit-user-select: none;
   touch-action: manipulation;
}

.button-85:before {
   content: "";
   background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
   );
   position: absolute;
   top: -2px;
   left: -2px;
   background-size: 400%;
   z-index: -1;
   filter: blur(5px);
   -webkit-filter: blur(5px);
   width: calc(100% + 4px);
   height: calc(100% + 4px);
   animation: glowing-button-85 20s linear infinite;
   transition: opacity 0.3s ease-in-out;
   border-radius: 10px;
}

@keyframes glowing-button-85 {
   0% {
      background-position: 0 0;
   }
   50% {
      background-position: 400% 0;
   }
   100% {
      background-position: 0 0;
   }
   }

.button-85:after {
   z-index: -1;
   content: "";
   position: absolute;
   width: 100%;
   height: 100%;
   background: #222;
   left: 0;
   top: 0;
   border-radius: 10px;
   }
h1{
   font-size: 65px;
   -webkit-text-stroke: 2px white;
}
a{
   text-decoration: none;
}
</style>
<body bgcolor="#111">
   <div class="parent">
      <div class="head"><h1>GitHub Work</h1></div>
      <div class="div1"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial1.html" target="_parent">Tutorial 1</a></div>
      <div class="div2"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial2.html" target="_parent">Tutorial 2</a></div>
      <div class="div3"><a class="button-85" href="https://jiaerrr.github.io/" target="_parent">Git Hub</a></div>
      <div class="div4"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial4.html" target="_parent">Tutorial 4</a></div>
      <div class="div5"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial5.html" target="_parent">Tutorial 5</a></div>
      <div class="div6"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial6.html" target="_parent">Tutorial 6</a></div>
      <div class="div7"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial7.html" target="_parent">Tutorial 7</a></div>
      <div class="div8"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial8.html" target="_parent">Tutorial 8</a></div>
      <div class="div9"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial9.html" target="_parent">Tutorial 9</a></div>
      <div class="div10"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial10.html" target="_parent">Tutorial 10</a></div>
      <div class="div11"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial11.html" target="_parent">Tutorial 11</a></div>
      <div class="div12"><a class="button-85" href="https://jiaerrr.github.io/lesson_activity/tutorial/tutorial15.html" target="_parent">Tutorial 15</a></div>
   </div>
</body>
</html>
