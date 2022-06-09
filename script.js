"use strict";
console.log("hello world");

let result, timer;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startTimer);

const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopTimer);

function startTimer() {
  let ss, mm, counter, targetSec;

  targetSec = 120;
  mm = 2;
  ss = 10;
  counter =0; 

  timer = window.setInterval(() => {
    if (timer !== null && targetSec > 0) {
      ss = parseInt(ss) < 10 ? "0" + ss : ss;
      //   console.log({ ss });
      mm = parseInt(mm) < 10 ? "0" + mm : mm;
      console.log({ mm });
    }
    result = document.getElementById("result");
    result.textContent = `00:${mm}:${ss}`;

    //もし秒がゼロになったらリセットする
    if (parseInt(ss) === 0) {
      ss = 60;
      counter += 1;
      console.log('hello')
      console.log({counter})
      if (counter > 0) {
          console.log('increment a minute')
        mm = parseInt(mm);
        console.log("??", { mm });
        mm -= counter;
      }
    }
    ss = parseInt(ss);
    ss--;
    mm = parseInt(mm); 
    console.log({ ss });
    targetSec--;
  }, 1000);
}

function stopTimer() {
  console.log("stop!!");

  //IDを取り消す
  window.clearInterval(timer);
  timer = null;
}

/*
参考

https://ict-skillup.com/javascript/2000/
*/
