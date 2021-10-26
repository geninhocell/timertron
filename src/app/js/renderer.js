let linkAbout = document.querySelector('#link-about');
let buttonPlay = document.querySelector('.button-play');
let time = document.querySelector('.time');

linkAbout.addEventListener('click', function(){
    window.api.send("open-window-about", "some data");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
buttonPlay.addEventListener('click', function(){
  imgs.reverse();
  window.api.timerStart(time);
  buttonPlay.src = imgs[0];
});

window.api.receive("time-start-from-main", (data) => {
  console.log(`Received ${JSON.stringify(data)} from main process`);
});

// window.api.send("toMain", "some data");

