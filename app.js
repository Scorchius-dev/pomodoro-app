 

// Pomodoro Timer Application
/*global document, localStorage, window, clearInterval, setInterval,
setTimeout */

// DOM Element References
var elements = {
    circleDisplay: document.querySelector(".app-circle"),
    messageDiv: document.querySelector(".app-message"),
    minuteDiv: document.querySelector(".minutes"),
    resetBtn: document.querySelector(".btn-reset"),
    secondDiv: document.querySelector(".seconds"),
    startBtn: document.querySelector(".btn-start"),
    themeBtn: document.querySelector(".btn-theme")
};

// Application State
var state = {
    DEFAULT_MINUTES: 25,
    intervalId: null,
    isRunning: false,
    totalSeconds: 0
};

// Initialize default minutes from DOM or fallback
if (elements.minuteDiv && elements.minuteDiv.textContent) {
    state.DEFAULT_MINUTES = parseInt(
        elements.minuteDiv.textContent,
        10
    );
}
if (!state.DEFAULT_MINUTES) {
    state.DEFAULT_MINUTES = 25;
}

// Updates the timer display and ARIA label
function updateDisplay(minutes, seconds) {
    var labelText;
    var secondsText;

    if (!elements.minuteDiv || !elements.secondDiv) {
        return;
    }

    elements.minuteDiv.textContent = String(minutes);
    secondsText = seconds.toString();
    if (secondsText.length < 2) {
        secondsText = "0" + secondsText;
    }
    elements.secondDiv.textContent = secondsText;

    if (elements.circleDisplay) {
        labelText = "Pomodoro timer showing " + minutes +
            " minutes and " + seconds + " seconds";
        elements.circleDisplay.setAttribute(
            "aria-label",
            labelText
        );
    }
}

// Updates the start button label based on timer state
function updateButtonLabel() {
    var minutes;
    var label;

    if (!elements.startBtn) {
        return;
    }

    minutes = 0;
    if (elements.minuteDiv && elements.minuteDiv.textContent) {
        minutes = parseInt(
            elements.minuteDiv.textContent,
            10
        ) || 0;
    }

    label = (
        state.isRunning
        ? "Pause the timer"
        : "Start the " + minutes + "-minute work session"
    );

    elements.startBtn.setAttribute("aria-label", label);
}

// Starts the timer or pauses it if already running
function startTimer() {
    var currentMinutes;
    var currentSeconds;

    if (state.isRunning) {
        clearInterval(state.intervalId);
        state.intervalId = null;
        state.isRunning = false;
        updateButtonLabel();
    } else {
        state.isRunning = true;
        updateButtonLabel();

        currentMinutes = state.DEFAULT_MINUTES;
        if (elements.minuteDiv &&
                elements.minuteDiv.textContent) {
            currentMinutes = parseInt(
                elements.minuteDiv.textContent,
                10
            ) || state.DEFAULT_MINUTES;
        }

        currentSeconds = 0;
        if (elements.secondDiv &&
                elements.secondDiv.textContent) {
            currentSeconds = parseInt(
                elements.secondDiv.textContent,
                10
            ) || 0;
        }

        state.totalSeconds = currentMinutes * 60 +
            currentSeconds;

        state.intervalId = setInterval(function () {
            var minutesLeft;
            var secondsLeft;

            if (state.totalSeconds > 0) {
                state.totalSeconds = state.totalSeconds - 1;
            }

            minutesLeft = Math.floor(state.totalSeconds / 60);
            secondsLeft = state.totalSeconds % 60;

            updateDisplay(minutesLeft, secondsLeft);

            if (state.totalSeconds === 0) {
                clearInterval(state.intervalId);
                state.intervalId = null;
                state.isRunning = false;
                updateButtonLabel();
                announce(
                    "Timer complete! 25 minutes" +
                    " of focused work done."
                );
            }
        }, 1000);
    }
}

// Resets the timer back to default minutes
function resetTimer() {
    clearInterval(state.intervalId);
    state.intervalId = null;
    state.isRunning = false;
    state.totalSeconds = 0;

    updateDisplay(state.DEFAULT_MINUTES, 0);
    updateButtonLabel();
    announce("Timer reset to 25 minutes.");
}

// Toggles between light and dark mode
function toggleTheme() {
    var root;
    var isLight;
    var mode;
    var ariaLabel;

    root = document.documentElement;
    isLight = root.classList.toggle("theme-light");

    mode = (
        isLight
        ? "Dark Mode"
        : "Light Mode"
    );
    ariaLabel = (
        isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

    if (elements.themeBtn) {
        elements.themeBtn.textContent = mode;
        elements.themeBtn.setAttribute("aria-label", ariaLabel);
    }

    localStorage.setItem(
        "theme",
        (
            isLight
            ? "light"
            : "dark"
        )
    );

    if (isLight) {
        announce("Light mode enabled.");
    } else {
        announce("Dark mode enabled.");
    }
}

// Makes announcements to screen readers
function announce(message) {
    if (!elements.messageDiv) {
        return;
    }

    elements.messageDiv.textContent = message;

    setTimeout(function () {
        if (elements.messageDiv) {
            elements.messageDiv.textContent =
                "Press start to begin";
        }
    }, 3000);
}

// Handles keyboard shortcuts
function handleKeyboardShortcut(e) {
    var target;
    var code;
    var key;
    var tagName;
    var isTypingField;

    target = e.target;
    code = e.code;
    key = e.key;
    tagName = "";

    if (target && target.tagName) {
        tagName = target.tagName.toLowerCase();
    }

    isTypingField = (
        tagName === "input" ||
        tagName === "textarea" ||
        (target && target.isContentEditable)
    );

    if (code === "Space" && !isTypingField) {
        e.preventDefault();
        startTimer();
    } else if (!isTypingField) {
        if (code === "KeyR" ||
                (typeof key === "string" &&
                key.toLowerCase() === "r")) {
            e.preventDefault();
            resetTimer();
        }
    }
}

// Loads saved theme preference or uses system preference
function initTheme() {
    var savedTheme;
    var prefersDark;
    var isLight;

    savedTheme = localStorage.getItem("theme");
    prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    isLight = savedTheme === "light" ||
        (savedTheme !== "dark" && !prefersDark);

    if (isLight) {
        document.documentElement.classList.add(
            "theme-light"
        );
        if (elements.themeBtn) {
            elements.themeBtn.textContent = "Dark Mode";
        }
    } else {
        if (elements.themeBtn) {
            elements.themeBtn.textContent = "Light Mode";
        }
    }
}

// Initializes the application
function init() {
    initTheme();
    updateButtonLabel();
}

// Event Listeners
if (elements.startBtn) {
    elements.startBtn.addEventListener("click", startTimer);
}
if (elements.resetBtn) {
    elements.resetBtn.addEventListener("click", resetTimer);
}
if (elements.themeBtn) {
    elements.themeBtn.addEventListener("click", toggleTheme);
}

document.addEventListener("keydown", handleKeyboardShortcut);

// Run initialization when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

  

