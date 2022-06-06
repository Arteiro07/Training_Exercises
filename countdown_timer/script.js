const daysEL = document.getElementById('days');
const hoursEL = document.getElementById('hours');
const minutesEL = document.getElementById('minutes');
const secondsEL = document.getElementById('seconds');



const ICELAND = '1 june 2023'
const SECONDSINADAY = 86400;
const SECONDSINANHOUR = 3600;
const SECONDSINAMINUTE = 60;

function countdown(){
    const countdownToDate = new Date(ICELAND);
    const currentDate = new Date();
    var timeTo = Math.floor((countdownToDate-currentDate)/1000);
    const days = Math.floor(timeTo/SECONDSINADAY);
    timeTo = timeTo%SECONDSINADAY;
    const hours = Math.floor(timeTo/SECONDSINANHOUR);
    timeTo = timeTo%SECONDSINANHOUR;
    const minutes = Math.floor(timeTo/SECONDSINAMINUTE);
    timeTo = timeTo%SECONDSINAMINUTE
    const seconds = Math.floor(timeTo);
    console.log(days)
    console.log(hours)
    console.log(minutes)
    console.log(seconds)

    daysEL.innerHTML = days;
    hoursEL.innerHTML = formatTime(hours);
    minutesEL.innerHTML = formatTime(minutes);
    secondsEL.innerHTML = formatTime(seconds);

}
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

countdown();


setInterval(countdown, 1000)