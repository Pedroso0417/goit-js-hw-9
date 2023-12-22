document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  let colorChangeInterval;

  startBtn.addEventListener('click', startColorChange);
  stopBtn.addEventListener('click', stopColorChange);

  function startColorChange() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    colorChangeInterval = setInterval(changeBackgroundColor, 1000);
  }

  function stopColorChange() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(colorChangeInterval);
  }

  function changeBackgroundColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  }
});
