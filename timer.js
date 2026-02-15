/*************************************************
 * TEST PAGE SETUP (ONLY FOR TEST DEPLOY)
 * Everything in this section exists only
 * to create a temporary test webpage
 *************************************************/

// Create page styling
document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.background = "#f4f4f4";

// Create counter display
const counterEl = document.createElement("div");
counterEl.id = "timeCounter";
counterEl.style.fontSize = "2rem";
counterEl.style.marginBottom = "20px";
counterEl.textContent = "0d 00h 00m";
document.body.appendChild(counterEl);

// Create reset button
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset";
resetBtn.style.padding = "10px 20px";
resetBtn.style.fontSize = "1rem";
resetBtn.style.cursor = "pointer";
document.body.appendChild(resetBtn);

/*************************************************
 * TIMER LOGIC (REAL FUNCTIONAL CODE)
 * This is the part you'd keep for production
 *************************************************/

// Load or initialize start time
let startTime = localStorage.getItem("startTime");

if (!startTime) {
  startTime = Date.now();
  localStorage.setItem("startTime", startTime);
} else {
  startTime = Number(startTime);
}

// Update counter
function updateCounter() {
  const diff = Date.now() - startTime;

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  counterEl.textContent =
    `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
}

// Reset counter with confirmation
function resetCounter() {
  const confirmed = confirm("Reset the timer?");
  if (!confirmed) return;

  startTime = Date.now();
  localStorage.setItem("startTime", startTime);
  updateCounter();
}

// Start timer
updateCounter();
setInterval(updateCounter, 1000);

// Button listener
resetBtn.addEventListener("click", resetCounter);
