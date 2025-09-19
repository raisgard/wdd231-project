// --- Weather Section ---
const weatherContainer = document.getElementById('weather-info');
const apiKey = "Y11a8bd0e6aae3d2e741151b101474fd6";
const city = "Ibadan"; // Change to your city
const units = "metric";

async function fetchWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`);
    if (!response.ok) throw new Error("Weather data not available.");
    const data = await response.json();

    const current = data.list[0];
    const forecast = data.list.slice(1, 4);

    weatherContainer.innerHTML = `
      <p><strong>Now:</strong> ${current.main.temp.toFixed(1)}°C – ${current.weather[0].description}</p>
      <ul>
        ${forecast.map(item => `<li>${new Date(item.dt_txt).toLocaleDateString()}: ${item.main.temp.toFixed(1)}°C</li>`).join("")}
      </ul>
    `;
  } catch (err) {
    weatherContainer.innerHTML = `<p>Error loading weather data.</p>`;
    console.error(err);
  }
}

fetchWeather();

// --- Member Spotlights ---
async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json();

  // Filter silver & gold members
  const featured = members.filter(m => m.membership >= 2);

  // Randomly pick up to 3
  const selected = featured.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.getElementById('spotlight-container');
  container.innerHTML = selected.map(member => `
    <div class="spotlight-card">
      <img src="images/logos/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>${member.membership === 3 ? "Gold" : "Silver"} Member</strong></p>
    </div>
  `).join("");
}

loadSpotlights();

// --- Footer Year & Last Modified ---
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
