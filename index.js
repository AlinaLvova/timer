const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let startTime;
  let requestId;

  return (seconds) => {
    startTime = Date.now();

    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = Math.floor(timeInSeconds % 60);

      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const updateTimer = () => {
      //истекшее время
      const elapsedTime = Date.now() - startTime;
      //оставшееся время
      const remainingSeconds = Math.max(Math.ceil(seconds - elapsedTime / 1000), 0);

      timerEl.textContent = formatTime(remainingSeconds);

      if (remainingSeconds > 0) {
        requestId = requestAnimationFrame(updateTimer);
      }
    };

    // Если уже запущен таймер, то отменяем его
    if (requestId) {
      cancelAnimationFrame(requestId);
    }

    updateTimer();
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = parseInt(inputEl.value) || '';
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
