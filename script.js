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

  mm = document.body.querySelector("input").value; 
  if(!mm){
    console.log("please set minutes"); 
    return; 
  }
  mm = parseInt(mm); 
  // console.log({mm}); 
  ss = 0; 
  targetSec = mm * 60; 


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
      //分と秒がゼロになったら終了させる
    } else if (mm === 0 && ss === 0) {
      console.log("fin");
      stopTimer();
      return;
      //残り10秒になったら1秒ごとに背景の色を切り替える
    } else if ( mm === 0 && ss < 10 && ss % 2 === 0 ){
      document.body.style.background = "orange";  
    } else if (mm === 0 && ss < 10 && ss % 2 === 1){
      document.body.style.background = "white";
    }
    ss--;
    // console.log({ mm });
    // console.log({ ss });
    targetSec--;
  }, 1000);

  message(); 
}

function stopTimer() {
  window.clearInterval(timer);
  timer = null;
  document.getElementById("result").textContent = "00:00:00";
}

//setIntervalID, タイマーとメッセージを初期化
function clearTimer() {
  window.clearInterval(timer);
  timer = null;
  document.getElementById("result").textContent = "00:00:00";
  document.body.querySelector("input").value = ""; 
  document.getElementById('message').textContent = " "; 
}

function message(){
  let breakTime = document.body.querySelector("input").value; 
  breakTime = parseInt(breakTime); 

  let now = new Date; 
  let hh = now.getHours(); 
  let mm = now.getMinutes(); 

  mm = mm + breakTime; 
  let counter = 0; 
  while(mm > 59){
    mm-=60;
    counter++; 
  }
  if(counter > 0){
    hh += counter; 
  }
  console.log({hh})
  console.log({mm})


  hh = hh < 10 ?  "0" + hh : hh; 
  mm = mm < 10 ?  "0" + mm : mm;

  let message = document.getElementById('message'); 
  message.textContent = `休憩時間は ${hh}:${mm} までです`
}

  

/*
参考
https://ict-skillup.com/javascript/2000/
*/
