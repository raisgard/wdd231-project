const apiKey = "11a8bd0e6aae3d2e741151b101474fd6"; // Replace with your real OpenWeatherMap API key
const city = "Ibadan,NG";

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    // Current weather
    const current = data.list[0];
    document.getElementById("current-weather").innerHTML = `
      <p><strong>${data.city.name}</strong></p>
      <p>${current.weather[0].description}</p>
      <p>${Math.round(current.main.temp)}°C</p>
    `;

    // 3-day forecast
    const forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = "";
    for (let i = 1; i <= 3; i++) {
      const forecast = data.list[i * 8]; // roughly 24-hour interval
      const date = new Date(forecast.dt * 1000);
      forecastEl.innerHTML += `
        <div class="forecast-day">
          <p>${date.toDateString()}</p>
          <p>${Math.round(forecast.main.temp)}°C</p>
        </div>
      `;
    }
  } catch (err) {
    document.getElementById("current-weather").textContent = "Weather data not available.";
    console.error(err);
  }
}

getWeather();
