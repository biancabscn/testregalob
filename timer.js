/************************************************************
 * CONFIGURATION
 * Set the retroactive start date ONCE here.
 * The timer will always measure time since this moment.
 ************************************************************/
const RETRO_START_TIME = new Date("2026-01-01T00:00:00Z").getTime();
const STORAGE_KEY = "retroTimerStart";

/************************************************************
 * TEST PAGE CREATION (TEST DEPLOY ONLY)
 * This section creates a simple UI so the timer can run
 * standalone without any HTML file changes.
 ************************************************************/

// Basic page styling
document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.background = "#f4f4f4";

// Timer display
const counterEl = document.createElement("div");
counterEl.id = "timeCounter";
counterEl.style.fontSize = "2rem";
counterEl.style.marginBottom = "20px";
document.body.appendChild(counterEl);

// Reset button
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Timer";
resetBtn.style.padding = "10px 20px";
resetBtn.style.fontSize = "1rem";
resetBtn.style.cursor = "pointer";
document.body.appendChild(resetBtn);

/************************************************************
 * TIMER STATE INITIALIZATION
 * - Timer NEVER starts at page load
 * - Uses stored value if available
 * - Otherwise falls back to RETRO_START_TIME
 ************************************************************/

let startTime = localStorage.getItem(STORAGE_KEY);

if (!startTime) {
  startTime = RETRO_START_TIME;
  localStorage.setItem(STORAGE_KEY, startTime);
} else {
  startTime = Number(startTime);
}

/************************************************************
 * TIMER UPDATE LOGIC
 * Calculates days / hours / minutes since startTime
 ************************************************************/

function updateCounter() {
  const diff = Date.now() - startTime;

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  counterEl.textContent =
    `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
}

/************************************************************
 * RESET HANDLER
 * Resets the timer back to the original retroactive start
 * and persists the reset.
 ************************************************************/

function resetTimer() {
  if (!confirm("Reset the timer back to the original start date?")) return;

  startTime = RETRO_START_TIME;
  localStorage.setItem(STORAGE_KEY, startTime);
  updateCounter();
}

/************************************************************
 * START TIMER
 ************************************************************/

updateCounter();
setInterval(updateCounter, 1000);
resetBtn.addEventListener("click", resetTimer);

