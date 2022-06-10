"use strict";
console.log("hello world");

let timer;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startTimer);

const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopTimer);

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearTimer);

function startTimer() {
  let ss, mm, targetSec, result;
  let counter = 0;

  targetSec = 120;
  mm = 0;
  ss = 10;

  //もしタイマーが再開であれば、経過した時間から開始する
  let startTime = document.getElementById("result").textContent.split(":");
  if (parseInt(startTime[2]) > 0) {
    mm = startTime[1];
    ss = startTime[2];
  }

  timer = window.setInterval(() => {
    if (timer !== null && targetSec > 0) {
      ss = parseInt(ss);
      mm = parseInt(mm);
      ss = ss < 10 && ss >= 0 ? "0" + ss : ss;
      mm = mm < 10 && mm >= 0 ? "0" + mm : mm;
    }
    result = document.getElementById("result");
    result.textContent = `00:${mm}:${ss}`;

    ss = parseInt(ss);
    mm = parseInt(mm);

    //秒がゼロになったら60に初期化する
    if (mm > 0 && ss === 0) {
      ss = 60;
      counter += 1;
      //counterで分の経過を計算する
      if (counter > 0) {
        mm -= counter;
      }
    } else if (mm === 0 && ss === 0) {
      console.log("fin");
      stopTimer();
      return;
    }
    ss--;
    console.log({ mm });
    console.log({ ss });
    targetSec--;
  }, 1000);
}

function stopTimer() {
  window.clearInterval(timer);
  timer = null;
}

//setIntervalID, タイマーを初期化
function clearTimer() {
  window.clearInterval(timer);
  timer = null;
  document.getElementById("result").textContent = "00:00:00";
}

/*
参考

https://ict-skillup.com/javascript/2000/
*/
