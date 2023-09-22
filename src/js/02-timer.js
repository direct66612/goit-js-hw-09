import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  startbtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  timer: document.querySelector('.timer'),
};
refs.startbtn.disabled = true;
let pressedDate;
let currentDate;
let formatDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pressedDate = new Date(selectedDates[0]);
    currentDate = new Date();
    if (pressedDate.getTime() < currentDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startbtn.disabled = false;
    }
  },
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function handleClick() {
  refs.startbtn.disabled = true;
  const timerId = setInterval(() => {
    formatDate = pressedDate - Date.now();
    if (formatDate > 0) {
      refs.daysEl.innerHTML = addLeadingZero(convertMs(formatDate).days);
      refs.hoursEl.innerHTML = addLeadingZero(convertMs(formatDate).hours);
      refs.minutesEl.innerHTML = addLeadingZero(convertMs(formatDate).minutes);
      refs.secondsEl.innerHTML = addLeadingZero(convertMs(formatDate).seconds);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}
refs.startbtn.addEventListener('click', handleClick);
const instance = flatpickr('#datetime-picker', options);
