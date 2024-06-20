"use strict";

let timer: number | undefined;

const startButton = document.getElementById("startButton");
startButton!.addEventListener("click", startTimer);

const stopButton = document.getElementById("stopButton");
stopButton!.addEventListener("click", stopTimer);

const clearButton = document.getElementById("clearButton");
clearButton!.addEventListener("click", clearTimer);

function startTimer() {
  let ss: number | string, mm: number | string, targetSec: number, result;

  //入力値から値を取得する。入力時は半角に変換する
  mm = document.body.querySelector("input")!.value;
  mm = hankaku(mm);
  mm = typeof mm === "string" ? parseInt(mm) : mm;
  targetSec = mm * 60;
  ss = 0;

  //未入力、ゼロよりも小さな値にはメッセージを返す
  if (!mm) {
    console.log("set minutes");
    document.getElementById("message")!.textContent = "入力が不正です";
    return;
  } else if (mm < 0) {
    console.log("should be a positive number");
    document.getElementById("message")!.textContent =
      "ゼロより大きな数値を入力してください";
    return;
  }

  //もしタイマーが再開であれば、経過した時間から開始する
  let startTime = document.getElementById("result")!.textContent!.split(":");
  if (parseInt(startTime[2]) > 0) {
    mm = startTime[1];
    ss = startTime[2];
  }

  typeof mm === "string" ? message(parseInt(mm)) : mm;

  timer = window.setInterval(() => {
    if (timer !== null && targetSec > 0) {
      ss = typeof ss === "string" ? parseInt(ss) : ss;
      mm = typeof mm === "string" ? parseInt(mm) : mm;
      ss = ss < 10 && ss >= 0 ? "0" + ss : ss;
      mm = mm < 10 && mm >= 0 ? "0" + mm : mm;
    }
    result = document.getElementById("result");
    result!.textContent = `00:${mm}:${ss}`;

    ss = typeof ss === "string" ? parseInt(ss) : ss;
    mm = typeof mm === "string" ? parseInt(mm) : mm;

    //分と秒がゼロになったら終了させ、効果音を鳴らす
    if (mm === 0 && ss === 0) {
      console.log("fin");
      stopTimer();
      document.getElementById("result")!.textContent = "00:00:00";
      document.body.style.backgroundColor = "antiquewhite";
      playaudio();
      return;
      //残り10秒になったら1秒ごとに背景の色を切り替える
    } else if (mm === 0 && ss < 10 && ss % 2 === 0) {
      document.body.style.background = "orange";
    } else if (mm === 0 && ss < 10 && ss % 2 === 1) {
      document.body.style.background = "yellow";
    }

    //経過時間を計算する
    targetSec--;
    mm = Math.floor(targetSec / 60);
    ss = targetSec - mm * 60;
  }, 1000);
}

function stopTimer() {
  window.clearInterval(timer);
  //   timer = null;
  timer = undefined;
}

//setIntervalID, タイマーとメッセージを初期化
function clearTimer() {
  window.clearInterval(timer);
  //   timer = null;
  timer = undefined;
  document.getElementById("result")!.textContent = "00:00:00";
  document.body.querySelector("input")!.value = "";
  document.getElementById("message")!.textContent = " ";
  document.body.style.backgroundColor = "antiquewhite";

  stopaudio();
}

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
  message!.textContent = `休憩時間は ${hh}:${mm} までです`;
}

//全角から半角に変換
function hankaku(str: string) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
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

/*
参考
タイマー作成
https://ict-skillup.com/javascript/2000/

https://www.yoheim.net/blog.php?q=20191101

タイマー終了時に音を鳴らす <audio>タグの使い方
https://novicengineering.com/javascript_timer_4/

Googleドライブ内の音声ファイルをaudioタグで再生する
※実際にはファイルIDの後に拡張子は不要だった
https://www.pre-practice.net/2019/03/googleaudio.html

Googleドライブ上のファイルに直接アクセスする
https://qiita.com/rot-z/items/299ac40361690c51ce1d
*/
