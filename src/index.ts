"use strict";

const incorrectInputMsg = "Entrée incorrecte";
const shouldBePositiveNumMsg = "Veuillez entrer un nombre supérieur à zéro";
const tellEndOfBreaktimeMsg = "Jusqu'à";
const startBtnMsg = "Démarrer";
const restartBtnMsg = "Relancer";
const initialClockPanel = "00:00"
let ss: number | string = 0;
let mm: number | string = 0;
let targetSec = 0;
let intervalId = 0;
let hasStoppedOnce = false;
let clockPanel;

document.getElementById("title")!.textContent = "Minuterie⏰";
document.getElementById("startBtn")!.textContent = startBtnMsg;
document.getElementById("stopBtn")!.textContent = "Metter en pause";
document.getElementById("clearBtn")!.textContent = "Supprimer";
document.getElementById("clock-panel")!.textContent = initialClockPanel;

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
    document.getElementById("message")!.textContent = incorrectInputMsg;
    return;
  } else if (typeof mm === "number" && mm < 0) {
    document.getElementById("message")!.textContent = shouldBePositiveNumMsg;
    return;
  }
  document.getElementById("message")!.textContent = "";
  targetSec = mm * 60;
  ss = 0;
};

const startTimer = (): void => {
  if (!hasStoppedOnce) {
    initTimer();
  } else {
    document.getElementById("startBtn")!.textContent = startBtnMsg;
  }
  if (targetSec === 0) {
    return;
  }

  typeof mm === "number" ? message(mm) : mm;

  intervalId = window.setInterval(() => {
    if (intervalId !== null && targetSec > 0) {
      ss = typeof ss === "string" ? parseInt(ss) : ss;
      mm = typeof mm === "string" ? parseInt(mm) : mm;
      ss = ss < 10 && ss >= 0 ? "0" + ss : ss;
      mm = mm < 10 && mm >= 0 ? "0" + mm : mm;
    }
    clockPanel = document.getElementById("clock-panel");
    clockPanel!.textContent = `${mm}:${ss}`;

    ss = typeof ss === "string" ? parseInt(ss) : ss;
    mm = typeof mm === "string" ? parseInt(mm) : mm;

    // //分と秒がゼロになったら終了させ、効果音を鳴らす
    if (mm === 0 && ss === 0) {
      clearTimer();
      document.getElementById("clock-panel")!.textContent = initialClockPanel;
      document.body.style.backgroundColor = "antiquewhite";
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
  document.getElementById("startBtn")!.textContent = restartBtnMsg;
};

//初期化
const clearTimer = (): void => {
  window.clearInterval(intervalId!);
  intervalId = 0;
  hasStoppedOnce = false;
  targetSec = 0;
  document.getElementById("clock-panel")!.textContent = initialClockPanel;
  document.body.querySelector("input")!.value = "";
  document.getElementById("message")!.textContent = " ";
  document.getElementById("startBtn")!.textContent = startBtnMsg;
  document.body.style.backgroundColor = "antiquewhite";
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
  message!.textContent = `${tellEndOfBreaktimeMsg} ${hh}:${mm}`;
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

const startButton = document.getElementById("startBtn");
startButton!.addEventListener("click", startTimer);
const stopButton = document.getElementById("stopBtn");
stopButton!.addEventListener("click", stopTimer);
const clearButton = document.getElementById("clearBtn");
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
