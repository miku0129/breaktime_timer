"use strict";

let ss: number | string = 0;
let mm: number | string = 0;
let targetSec = 0;
let intervalId = 0;
let hasStoppedOnce = false;
let result;

//全角から半角に変換
const convertHankaku = (str: string): string => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
};

const initTimer = (): void => {
  //タイマー開始直後は入力値から値を取得する。入力時は半角に変換する
  mm = document.body.querySelector("input")!.value;
  mm = convertHankaku(mm);
  mm = typeof mm === "string" ? parseInt(mm) : mm;

  //未入力、ゼロよりも小さな値にはメッセージを返す
  if (!mm) {
    console.log("set minutes");
    document.getElementById("message")!.textContent = "Incorrect input";
    return;
  } else if (typeof mm === "number" && mm < 0) {
    console.log("should be a positive number");
    document.getElementById("message")!.textContent =
      "Please enter a number greater than zero";
    return;
  }
  document.getElementById("message")!.textContent = "";
  targetSec = mm * 60;
  ss = 0;
};

const startTimer = (): void => {
  if (!hasStoppedOnce) {
    initTimer();
  }
  if (targetSec === 0) {
    return;
  }

  typeof mm === "number" ? message(mm) : console.log(typeof mm);

  intervalId = window.setInterval(() => {
    if (intervalId !== null && targetSec > 0) {
      console.log("timer", mm, ":", ss);

      ss = typeof ss === "string" ? parseInt(ss) : ss;
      mm = typeof mm === "string" ? parseInt(mm) : mm;
      ss = ss < 10 && ss >= 0 ? "0" + ss : ss;
      mm = mm < 10 && mm >= 0 ? "0" + mm : mm;
    }
    result = document.getElementById("result");
    result!.textContent = `${mm}:${ss}`;

    ss = typeof ss === "string" ? parseInt(ss) : ss;
    mm = typeof mm === "string" ? parseInt(mm) : mm;

    // //分と秒がゼロになったら終了させ、効果音を鳴らす
    if (mm === 0 && ss === 0) {
      console.log("fin");
      clearTimer();
      document.getElementById("result")!.textContent = "00:00";
      document.body.style.backgroundColor = "palegoldenrod";
      playaudio();
      return;
      //残り10秒になったら1秒ごとに背景の色を切り替える
    } else if (mm === 0 && ss < 10 && ss % 2 === 0) {
      document.body.style.background = "gold";
    } else if (mm === 0 && ss < 10 && ss % 2 === 1) {
      document.body.style.background = "greenyellow";
    }

    //経過時間を計算する
    targetSec--;
    mm = Math.floor(targetSec / 60);
    ss = targetSec - mm * 60;
  }, 1000);
};

const stopTimer = (): void => {
  hasStoppedOnce = true;
  window.clearInterval(intervalId!);
  intervalId = 0;
};

//初期化
const clearTimer = (): void => {
  window.clearInterval(intervalId!);
  intervalId = 0;
  hasStoppedOnce = false;
  targetSec = 0;
  document.getElementById("result")!.textContent = "00:00";
  document.body.querySelector("input")!.value = "";
  document.getElementById("message")!.textContent = " ";
  document.body.style.backgroundColor = "palegoldenrod";
  stopaudio();
};

function message(breakTime: number) {
  let now = new Date();
  let hh: number | string = now.getHours();
  let mm: number | string = now.getMinutes();

  mm = mm + breakTime;
  let counter = 0;
  while (mm > 59) {
    mm -= 60;
    counter++;
  }
  if (counter > 0) {
    hh += counter;
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  let message = document.getElementById("message");
  message!.textContent = `Break time is until ${hh}:${mm}`;
}

//音楽を鳴らす
function playaudio() {
  const player = <HTMLVideoElement>document.getElementById("audio")!;
  player.play();
}
//音楽を止める
function stopaudio() {
  const player = <HTMLVideoElement>document.getElementById("audio")!;
  player.pause();
}

const startButton = document.getElementById("startButton");
startButton!.addEventListener("click", startTimer);

const stopButton = document.getElementById("stopButton");
stopButton!.addEventListener("click", stopTimer);

const clearButton = document.getElementById("clearButton");
clearButton!.addEventListener("click", clearTimer);

/*
参考
タイマー作成
https://ict-skillup.com/javascript/2000/

https://www.yoheim.net/blog.php?q=20191101

タイマー終了時に音を鳴らす <audio>タグの使い方
https://novicengineering.com/javascript_timer_4/

音源
https://developers.google.com/assistant/tools/sound-library/alarms
*/
