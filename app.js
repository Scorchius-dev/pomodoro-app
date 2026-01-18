 

// ========== DOM Element References ==========
const elements = {
  circleDisplay: document.querySelector(".app-circle"),
  messageDiv: document.querySelector(".app-message"),
  minuteDiv: document.querySelector(".minutes"),
  resetBtn: document.querySelector(".btn-reset"),
  secondDiv: document.querySelector(".seconds"),
  startBtn: document.querySelector(".btn-start"),
  themeBtn: document.querySelector(".btn-theme"),
};

// ========== Application State ==========
const state = {
  DEFAULT_MINUTES: 25,
  intervalId: null,
  isRunning: false,
  totalSeconds: 0,
};

// Initialize default minutes from DOM or fallback
state.DEFAULT_MINUTES = parseInt(elements.minuteDiv?.textContent, 10) || 25;

// ========== Display Update Function ==========
/**
 * Updates the timer display and aria label
 * @param {number} minutes - Minutes to display
 * @param {number} seconds - Seconds to display
 */
const updateDisplay = (minutes, seconds) => {
  if (!elements.minuteDiv || !elements.secondDiv) return;
  
  elements.minuteDiv.textContent = String(minutes);
  elements.secondDiv.textContent = seconds.toString().padStart(2, "0");
  
  // Update ARIA label for accessibility
  if (elements.circleDisplay) {
    const labelText = "Pomodoro timer showing " + minutes +
      " minutes and " + seconds + " seconds";
    elements.circleDisplay.setAttribute("aria-label", labelText);
  }
};

// ========== Button Label Update ==========
/**
 * Updates the start button label based on timer state
 */
const updateButtonLabel = () => {
  if (!elements.startBtn) return;
  
  const minutes = parseInt(elements.minuteDiv?.textContent, 10) || 0;
  const label = state.isRunning 
    ? "Pause the timer" 
    : `Start the ${minutes}-minute work session`;
  
  elements.startBtn.setAttribute("aria-label", label);
};

// ========== Timer Start/Pause Function ==========
/**
 * Starts the timer or pauses it if already running
 * Counts down each second and announces when complete
 */
const startTimer = () => {
  if (state.isRunning) {
    // Pause functionality
    clearInterval(state.intervalId);
    state.intervalId = null;
    state.isRunning = false;
    updateButtonLabel();
    return;
  }
  
  // Start timer
  state.isRunning = true;
  updateButtonLabel();
  
  const currentMinutes = parseInt(elements.minuteDiv?.textContent, 10) || state.DEFAULT_MINUTES;
  const currentSeconds = parseInt(elements.secondDiv?.textContent, 10) || 0;
  state.totalSeconds = currentMinutes * 60 + currentSeconds;

  // Run countdown every 1000ms (1 second)
  state.intervalId = setInterval(() => {
    state.totalSeconds = Math.max(0, state.totalSeconds - 1);
    const minutesLeft = Math.floor(state.totalSeconds / 60);
    const secondsLeft = state.totalSeconds % 60;
    
    updateDisplay(minutesLeft, secondsLeft);

    // Stop timer when it reaches zero
    if (state.totalSeconds === 0) {
      clearInterval(state.intervalId);
      state.intervalId = null;
      state.isRunning = false;
      updateButtonLabel();
      announce("Timer complete! 25 minutes of focused work done.");
    }
  }, 1000);
};

// ========== Timer Reset Function ==========
/**
 * Resets the timer back to default minutes (25)
 * Clears any active interval
 */
const resetTimer = () => {
  clearInterval(state.intervalId);
  state.intervalId = null;
  state.isRunning = false;
  state.totalSeconds = 0;
  
  updateDisplay(state.DEFAULT_MINUTES, 0);
  updateButtonLabel();
  announce("Timer reset to 25 minutes.");
};

// ========== Theme Toggle Function ==========
/**
 * Toggles between light and dark mode
 * Saves preference to localStorage
 */
const toggleTheme = () => {
  const root = document.documentElement;
  const isLight = root.classList.toggle("theme-light");
  const mode = isLight ? "Dark Mode" : "Light Mode";
  const ariaLabel = isLight ? "Switch to dark mode" : "Switch to light mode";
  
  if (elements.themeBtn) {
    elements.themeBtn.textContent = mode;
    elements.themeBtn.setAttribute("aria-label", ariaLabel);
  }
  
  // Persist theme choice in browser storage
  localStorage.setItem("theme", isLight ? "light" : "dark");
  announce(`${isLight ? "Light" : "Dark"} mode enabled.`);
};

// ========== Accessibility Announcement Function ==========
/**
 * Makes announcements to screen readers via ARIA live region
 * @param {string} message - Message to announce
 */
const announce = (message) => {
  if (!elements.messageDiv) return;
  
  elements.messageDiv.textContent = message;
  
  // Reset to default message after 3 seconds
  setTimeout(() => {
    if (elements.messageDiv) {
      elements.messageDiv.textContent = "Press start to begin";
    }
  }, 3000);
};

// ========== Keyboard Shortcuts ==========
/**
 * Keyboard controls:
 * - Space: Start/Pause timer
 * - R: Reset timer
 */
const handleKeyboardShortcut = (e) => {
  const target = e.target;
  const code = e.code;
  const key = e.key;
  const tagName = target && target.tagName ? target.tagName.toLowerCase() : "";
  const isTypingField = (
    tagName === "input" ||
    tagName === "textarea" ||
    (target && target.isContentEditable)
  );

  // Space bar: start/pause (avoid interfering with typing in inputs/textareas)
  if (code === "Space" && !isTypingField) {
    e.preventDefault();
    startTimer();
  } else if (
    (code === "KeyR" || (typeof key === "string" && key.toLowerCase() === "r")) &&
    !isTypingField
  ) {
    e.preventDefault();
    resetTimer();
  }
};

document.addEventListener("keydown", handleKeyboardShortcut);

// ========== Theme Initialization ==========
/**
 * Loads saved theme preference or uses system preference
 */
const initTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLight = savedTheme === "light" || (savedTheme !== "dark" && !prefersDark);
  
  if (isLight) {
    document.documentElement.classList.add("theme-light");
    if (elements.themeBtn) elements.themeBtn.textContent = "Dark Mode";
  } else {
    if (elements.themeBtn) elements.themeBtn.textContent = "Light Mode";
  }
};

// ========== Event Listeners ==========
elements.startBtn?.addEventListener("click", startTimer);
elements.resetBtn?.addEventListener("click", resetTimer);
elements.themeBtn?.addEventListener("click", toggleTheme);

// ========== Initialize App ==========
const init = () => {
  initTheme();
  updateButtonLabel();
};

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}



  

