// ========== DOM Element References ==========
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const themeBtn = document.querySelector(".btn-theme");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
const circleDisplay = document.querySelector(".app-circle");

// ========== State Variables ==========
let myInterval; // Stores the setInterval ID for the timer
let isRunning = false; // Tracks whether the timer is currently active
let totalSeconds; // Remaining seconds on the current timer
const defaultMinutes = Number.parseInt(minuteDiv.textContent) || 25; // Default 25-minute Pomodoro session

// ========== Display Update Function ==========
/**
 * Updates the timer display and aria label
 * @param {number} minutes - Minutes to display
 * @param {number} seconds - Seconds to display
 */
function updateDisplay(minutes, seconds) {
  minuteDiv.textContent = String(minutes);
  secondDiv.textContent = seconds < 10 ? `0${seconds}` : String(seconds);
  
  // Update ARIA label for accessibility
  circleDisplay.setAttribute("aria-label", `Pomodoro timer showing ${minutes} minutes and ${seconds} seconds`);
}

// ========== Button Label Update ==========
/**
 * Updates the start button label based on timer state
 */
function updateButtonLabel() {
  const minutes = Number.parseInt(minuteDiv.textContent);
  const seconds = Number.parseInt(secondDiv.textContent);
  startBtn.setAttribute("aria-label", isRunning 
    ? "Pause the timer" 
    : `Start the ${minutes}-minute work session`);
}

// ========== Timer Start/Pause Function ==========
/**
 * Starts the timer or pauses it if already running
 * Counts down each second and announces when complete
 */
function startTimer() {
  if (isRunning) {
    // Pause functionality - stop the interval and reset state
    clearInterval(myInterval);
    isRunning = false;
    updateButtonLabel();
    return;
  }
  
  // Start timer - set running state and calculate total seconds
  isRunning = true;
  updateButtonLabel();
  totalSeconds = (Number.parseInt(minuteDiv.textContent) || defaultMinutes) * 60 + (Number.parseInt(secondDiv.textContent) || 0);

  // Run countdown every 1000ms (1 second)
  myInterval = setInterval(() => {
    totalSeconds--;
    const minutesLeft = Math.max(0, Math.floor(totalSeconds / 60));
    const secondsLeft = Math.max(0, totalSeconds % 60);
    updateDisplay(minutesLeft, secondsLeft);

    // Stop timer when it reaches zero
    if (minutesLeft === 0 && secondsLeft === 0) {
      clearInterval(myInterval);
      isRunning = false;
      updateButtonLabel();
      // Announce completion to screen readers
      announce("Timer complete! 25 minutes of focused work done.");
    }
  }, 1000);
}

// ========== Timer Reset Function ==========
/**
 * Resets the timer back to default minutes (25)
 * Clears any active interval
 */
function resetTimer() {
  clearInterval(myInterval);
  isRunning = false;
  updateDisplay(defaultMinutes, 0);
  updateButtonLabel();
  announce("Timer reset to 25 minutes.");
}

// ========== Theme Toggle Function ==========
/**
 * Toggles between light and dark mode
 * Saves preference to localStorage
 */
function toggleTheme() {
  const root = document.documentElement;
  const isLight = root.classList.toggle("theme-light");
  themeBtn.textContent = isLight ? "Dark Mode" : "Light Mode";
  themeBtn.setAttribute("aria-label", isLight 
    ? "Switch to dark mode" 
    : "Switch to light mode");
  // Persist theme choice in browser storage
  localStorage.setItem("theme", isLight ? "light" : "dark");
  announce((isLight ? "Light" : "Dark") + " mode enabled.");
}

// ========== Accessibility Announcement Function ==========
/**
 * Makes announcements to screen readers via ARIA live region
 * @param {string} message - Message to announce
 */
function announce(message) {
  const messageDiv = document.querySelector(".app-message");
  if (messageDiv) {
    messageDiv.textContent = message;
    // Reset to default message after 3 seconds
    setTimeout(() => {
      messageDiv.textContent = "Press start to begin";
    }, 3000);
  }
}

// ========== Keyboard Shortcuts ==========
/**
 * Keyboard controls:
 * - Space: Start/Pause timer
 * - R: Reset timer
 */
document.addEventListener("keydown", (e) => {
  const target = e.target;
  const tag = target && target.tagName ? target.tagName.toLowerCase() : "";
  const isTypingField = tag === "input" || tag === "textarea" || (target && target.isContentEditable);

  // Space bar: start/pause (avoid interfering with typing in inputs/textareas)
  if (e.code === "Space" && !isTypingField) {
    e.preventDefault();
    startTimer();
  }
  // R key: reset (avoid interfering with typing)
  if ((e.code === "KeyR" || (typeof e.key === "string" && e.key.toLowerCase() === "r")) && !isTypingField) {
    e.preventDefault();
    resetTimer();
  }
});

// ========== Theme Initialization ==========
/**
 * Loads saved theme preference or uses system preference
 */
function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || (saved !== "dark" && window.matchMedia("(prefers-color-scheme: light)").matches)) {
    document.documentElement.classList.add("theme-light");
    themeBtn.textContent = "Dark Mode";
  } else {
    themeBtn.textContent = "Light Mode";
  }
}

// ========== Event Listeners ==========
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
themeBtn.addEventListener("click", toggleTheme);

// ========== Initialize App ==========
initTheme();
updateButtonLabel();



  

