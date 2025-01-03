// script.js

// Custom times for each ingredient (in seconds)
const customTimes = {
  HotDogB: 11, // 5 minutes
  HotDogS: 11, // 2 minutes
};

let countdownIntervals = {}; // Store intervals for each timer
let isRunning = {}; // Track the running state of each timer

// Function to start or reset the timer
function toggleTimer(id) {
  // Get the dynamic elements
  const ingredientSelect = document.getElementById("cook" + id);
  const countdownDisplay = document.getElementById("countdown" + id);
  const audio = document.getElementById("audio");

  // Check if the timer is running
  if (isRunning[id]) {
    // Stop the timer and reset
    clearInterval(countdownIntervals[id]);
    isRunning[id] = false;
    countdownDisplay.textContent = "00:00";
    return;
  }

  // Get the selected ingredient
  const selectedIngredient = ingredientSelect.value;
  const timeInSeconds = customTimes[selectedIngredient];

  if (!timeInSeconds) {
    alert("Please select a valid ingredient!");
    return;
  }

  // Update the timer display immediately
  updateDisplay(timeInSeconds, countdownDisplay);

  // Start the interval
  let remainingTime = timeInSeconds;
  isRunning[id] = true;
  countdownIntervals[id] = setInterval(() => {
    remainingTime--;

    // Update the display
    updateDisplay(remainingTime, countdownDisplay);

    // Stop when the time reaches zero
    if (remainingTime <= 0) {
      clearInterval(countdownIntervals[id]);
      isRunning[id] = false;
      audio.play();
    }
  }, 1000);
}

// Function to update the display
function updateDisplay(seconds, countdownDisplay) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  countdownDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

// Attach event listener dynamically for each button
function initializeTimers(ids) {
  ids.forEach((id) => {
    const startButton = document.getElementById("start-button" + id);
    isRunning[id] = false; // Initialize the running state
    startButton.addEventListener("click", () => toggleTimer(id));
  });
}

// Initialize timers with unique ids (e.g., [1, 2, 3])
initializeTimers([1, 2, 3]);
