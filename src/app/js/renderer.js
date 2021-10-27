let linkAbout = document.querySelector('#link-about');
let buttonPlay = document.querySelector('.button-play');
let time = document.querySelector('.time');
let course = document.querySelector('.course');
let buttonAdd = document.querySelector('.button-add');
let fieldAdd = document.querySelector('.field-add');

linkAbout.addEventListener('click', function(){
    window.api.send("open-window-about", "some data");
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false;
buttonPlay.addEventListener('click', function(){
  if(play){
    window.api.timer.stop();
    play = false;
    window.api.send("course-stop", {course: course.textContent, time: time.textContent});
    new Notification('Timer Tron', {
      body: `Curso ${course.textContent} parado!!`,
      icon: 'img/stop-button.png',
    });
  }else{
    window.api.timer.start(time);
    play = true;
    new Notification('Timer Tron', {
      body: `Curso ${course.textContent} iniciado!!`,
      icon: 'img/play-button.png',
    });
  }
  imgs.reverse();
  buttonPlay.src = imgs[0];
});

window.onload = () => {
  window.api.database.getData(course.textContent)
    .then(data => {
      time.textContent = data.time;
    });
}

window.api.on('toggle-course', (courseName) => {
  window.api.timer.stop();
  buttonPlay.src = "img/play-button.svg";
  imgs.reverse();
  play = false;

  window.api.database.getData(courseName)
    .then(data => {
      console.log('data', data)
      time.textContent = data.time;
    })
    .catch(() => {
      console.log('Curso ainda não possui o JSON!');
      time.textContent = '00:00:00';
    });

  course.textContent = courseName;
});

window.api.on('start-or-stop-play', () => {
  let click = new MouseEvent('click');
  buttonPlay.dispatchEvent(click);
});

buttonAdd.addEventListener('click', () => {
  if(fieldAdd.value === ''){
    console.error('Campo de curso vazio!');
    return;
  }

  let newCourse = fieldAdd.value;
  course.textContent = newCourse;
  time.textContent = '00:00:00';
  fieldAdd.value = '';
  window.api.send('course-add', newCourse);
});
