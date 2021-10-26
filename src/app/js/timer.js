const moment = require('moment');

function formatSecondsToHours(seconds){
  return moment().startOf('day').seconds(seconds).format('HH:mm:ss');
};

let seconds;
let intervalId;
module.exports = {
  start(el){
    let time = moment.duration(el.textContent);
    seconds = time.asSeconds();

    clearInterval(intervalId);
    intervalId = setInterval(() => {
      seconds++;
      el.textContent = formatSecondsToHours(seconds);
    }, 1000);
  },
  stop(){
    clearInterval(intervalId);
  },
}
