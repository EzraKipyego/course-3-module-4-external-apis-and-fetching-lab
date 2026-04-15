// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

// DOM elements
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Click event
button.addEventListener("click", () => {
    const state = input.value.trim();

    fetchWeatherAlerts(state);

    input.value = "";
});

// FETCH FUNCTION (async/await required)
async function fetchWeatherAlerts(state) {
    try {
        // clear previous error
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");

        const response = await fetch(weatherApi + state);

        const data = await response.json();

        displayAlerts(data);

    } catch (error) {
        displayError(error.message);
    }
}

// DISPLAY ALERTS
function displayAlerts(data) {
    alertsDisplay.innerHTML = "";

    const alerts = data.features;

    const summary = document.createElement("h2");
    summary.textContent = `Current watches, warnings, and advisories for ${data.title || "Selected State"}: ${alerts.length}`;
    alertsDisplay.appendChild(summary);

    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        alertsDisplay.appendChild(li);
    });
}

// DISPLAY ERROR
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}