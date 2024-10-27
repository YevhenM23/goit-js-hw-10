import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const date = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const timer = document.querySelectorAll(".value");
startBtn.disabled = true;
let userSelectedDate;
let isTimerActive = false;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
       iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
    }

    else {
      userSelectedDate = selectedDates[0].getTime();

      if (!isTimerActive) {
        startBtn.disabled = false;
        startBtn.classList.add("active")
      };
      
    }
  },
});

function start() {
  startBtn.disabled = true;
  startBtn.classList.remove("active");
  date.disabled = true;
  isTimerActive = true;
  
  const intervalId = setInterval(() => { 
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      return;
    }
    
    const time = convertMs(deltaTime);
    onTick(time);
    
  }, 1000)
}

function onTick({ days, hours, minutes, seconds }) {
  const [daysElem, hoursElem, minutesElem, secondsElem] = timer;
  daysElem.textContent = days;
  hoursElem.textContent = hours;
  minutesElem.textContent = minutes;
  secondsElem.textContent = seconds;
}

startBtn.addEventListener("click", start);


function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = addLeadingZero(Math.floor(ms / day));
  
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}