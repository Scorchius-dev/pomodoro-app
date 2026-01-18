const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const themeBtn = document.querySelector(".btn-theme");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

let myInterval;
let isRunning = false;
let totalSeconds;
const defaultMinutes = Number.parseInt(minuteDiv.textContent) || 25;

function updateDisplay(minutes, seconds) {
  minuteDiv.textContent = String(minutes);
  secondDiv.textContent = seconds < 10 ? `0${seconds}` : String(seconds);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  totalSeconds = (Number.parseInt(minuteDiv.textContent) || defaultMinutes) * 60 + (Number.parseInt(secondDiv.textContent) || 0);

  myInterval = setInterval(() => {
    totalSeconds--;
    const minutesLeft = Math.max(0, Math.floor(totalSeconds / 60));
    const secondsLeft = Math.max(0, totalSeconds % 60);
    updateDisplay(minutesLeft, secondsLeft);

    if (minutesLeft === 0 && secondsLeft === 0) {
      clearInterval(myInterval);
      isRunning = false;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(myInterval);
  isRunning = false;
  updateDisplay(defaultMinutes, 0);
}

function toggleTheme() {
  const root = document.documentElement; // <html>
  const isLight = root.classList.toggle("theme-light");
  themeBtn.textContent = isLight ? "dark mode" : "light mode";
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
themeBtn.addEventListener("click", toggleTheme);


  

