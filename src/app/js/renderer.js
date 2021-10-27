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
  }else{
    window.api.timer.start(time);
    play = true;
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
  window.api.database.getData(courseName)
    .then(data => {
      time.textContent = data.time;
    });
  course.textContent = courseName;
});

buttonAdd.addEventListener('click', () => {
  let newCourse = fieldAdd.value;
  course.textContent = newCourse;
  time.textContent = '00:00:00';
  fieldAdd.value = '';
  window.api.send('course-add', newCourse);
});
