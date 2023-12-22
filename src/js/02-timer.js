// Described in documentation
import flatpickr from 'flatpickr';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', function () {
  // Add leading zero to a number if less than 10
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      handleDateSelection(selectedDates[0]);
    },
  };

  flatpickr('#datetime-picker', options);

  const startBtn = document.getElementById('start-btn');
  const timerElement = document.getElementById('timer');
  let countdownInterval;

  function handleDateSelection(selectedDate) {
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
    startBtn.addEventListener('click', startCountdown);
  }

  function startCountdown() {
    const selectedDate = flatpickr('#datetime-picker').selectedDates[0];
    const currentDate = new Date();
    let timeDifference = selectedDate.getTime() - currentDate.getTime();

    countdownInterval = setInterval(function () {
      const remainingTime = convertMs(timeDifference);
      displayTimer(remainingTime);

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        startBtn.disabled = true;
      }

      timeDifference -= 1000;
    }, 1000);
  }

  function displayTimer(remainingTime) {
    const days = addLeadingZero(remainingTime.days);
    const hours = addLeadingZero(remainingTime.hours);
    const minutes = addLeadingZero(remainingTime.minutes);
    const seconds = addLeadingZero(remainingTime.seconds);

    timerElement.textContent = `${days}:${hours}:${minutes}:${seconds}`;
  }

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
});
