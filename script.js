
// ================================
// DOM Elements
// ================================

// Main city heading
const cityName = document.getElementById("cityName");

// Current date and time
const dateLine = document.getElementById("dateLine");

// Current temperature
const temperature = document.getElementById("temperature");

// Weather condition text
const condition = document.getElementById("condition");

// Weather details
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// Forecast section
const forecastList = document.getElementById("forecastList");

// Search form elements
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

// Current location button
const locationButton = document.getElementById("locationButton");

// Status message
const statusMessage = document.getElementById("statusMessage");

// Main weather animation container
const mainWeatherArt = document.getElementById("mainWeatherArt");

// Temperature unit buttons
const unitButtons = document.querySelectorAll(".unit");


// ================================
// Fallback Weather Data
// Used when API data is unavailable
// ================================

const fallbackWeather = {
  name: "Weather App",
  country: "India",
  timezone: "America/Toronto",

  current: {
    time: "2026-03-25T22:15",
    temp: 0,
    feels: 0,
    humidity: 0,
    wind: 0,
    pressure: 0,
    code: 0,
  },

  daily: [
    { date: "2026-03-25", max: 23, min: 14, code: 3 },
    { date: "2026-03-26", max: 26, min: 18, code: 0 },
    { date: "2026-03-27", max: 25, min: 17, code: 45 },
    { date: "2026-03-28", max: 22, min: 13, code: 61 },
    { date: "2026-03-29", max: 24, min: 11, code: 95 },
    { date: "2026-03-30", max: 23, min: 0, code: 95 },
    { date: "2026-03-31", max: 23, min: 0, code: 95 },
    { date: "2026-04-01", max: 23, min: 0, code: 95 },
    { date: "2026-04-02", max: 23, min: 0, code: 95 },
    { date: "2026-04-03", max: 23, min: 0, code: 95 },


  ],
};


// ================================
// Global Variables
// ================================

// Active temperature unit (c/f)
let activeUnit = "c";

// Currently displayed weather
let activeWeather = fallbackWeather;


// ================================
// Weather Codes Mapping
// Converts weather codes to text and UI type
// ================================

const weatherCodes = {
  0: ["Clear sky", "clear"],
  1: ["Mainly clear", "partly-cloudy"],
  2: ["Partly cloudy", "partly-cloudy"],
  3: ["Overcast clouds", "cloudy"],
  45: ["Haze", "haze"],
  48: ["Haze", "haze"],
  51: ["Light drizzle", "rain"],
  53: ["Drizzle", "rain"],
  55: ["Heavy drizzle", "rain"],
  56: ["Freezing drizzle", "rain"],
  57: ["Freezing drizzle", "rain"],
  61: ["Light Rain", "rain"],
  63: ["Rain", "rain"],
  65: ["Heavy rain", "rain"],
  66: ["Freezing rain", "rain"],
  67: ["Freezing rain", "rain"],
  71: ["Light snow", "cloudy"],
  73: ["Snow", "cloudy"],
  75: ["Heavy snow", "cloudy"],
  77: ["Snow grains", "cloudy"],
  80: ["Rain showers", "rain"],
  81: ["Rain showers", "rain"],
  82: ["Heavy showers", "rain"],
  85: ["Snow showers", "cloudy"],
  86: ["Snow showers", "cloudy"],
  95: ["Thunderstorm", "thunder"],
  96: ["Thunderstorm", "thunder"],
  99: ["Thunderstorm", "thunder"],
};


// ================================
// Temperature Utilities
// ================================

// Convert Celsius to Fahrenheit
function toFahrenheit(value) {
  return Math.round((value * 9) / 5 + 32);
}

// Return temperature according to selected unit
function formatTemp(value) {
  const rounded = Math.round(value);
  return activeUnit === "c" ? rounded : toFahrenheit(rounded);
}

// Return proper temperature symbol
function unitSuffix() {
  return activeUnit === "c" ? "°C" : "°F";
}


// ================================
// Weather Helper Functions
// ================================

// Get weather description and UI type
function weatherInfo(code) {
  return weatherCodes[code] || ["Partly cloudy", "partly-cloudy"];
}


// ================================
// Date Formatting Functions
// ================================

// Format current date and time
function formatDateTime(time, timezone) {
  const date = new Date(time);

  const weekdayDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: timezone,
  }).format(date);

  const localTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone,
  }).format(date);

  return `${weekdayDate} | ${localTime}`;
}

// Format forecast day name
function formatDay(dateText, timezone) {
  const date = new Date(`${dateText}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: timezone,
  }).format(date);
}


// ================================
// Weather Icon Generator
// Generates animated weather visuals
// ================================

function iconMarkup(type, size = "mini-icon") {

  if (type === "clear") {
    return `<div class="${size} weather-visual clear"><span class="sun"></span></div>`;
  }

  if (type === "haze") {
    return `
      <div class="${size} weather-visual haze">
        <span class="haze-lines">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>`;
  }

  if (type === "rain") {
    return `
      <div class="${size} weather-visual rain">
        <span class="cloud">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span class="rain-drops">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>`;
  }

  if (type === "thunder") {
    return `
      <div class="${size} weather-visual thunder">
       <span class="cloud">
         <span></span>
         <span></span>
         <span></span>
       </span>
       <span class="bolt one"></span>
       <span class="bolt two"></span>
      </div>`;
  }

  if (type === "partly-cloudy") {
    return `
      <div class="${size} weather-visual partly-cloudy">
        <span class="moon"></span>
        <span class="spark spark-one"></span>
        <span class="spark spark-two"></span>
        <span class="cloud">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>`;
  }

  return `
    <div class="${size} weather-visual cloudy">
      <span class="cloud">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>`;
}


// ================================
// Render Weather Data on UI
// ================================

function render(weather) {

  const [currentText, currentType] =
    weatherInfo(weather.current.code);

  const suffix = unitSuffix();

  cityName.textContent =
    weather.country ? `${weather.name}` : weather.name;

  dateLine.textContent =
    formatDateTime(weather.current.time, weather.timezone);

  temperature.textContent =
    formatTemp(weather.current.temp);

  condition.textContent =
    currentText;

  feelsLike.textContent =
    `${formatTemp(weather.current.feels)}${suffix}`;

  humidity.textContent =
    `${Math.round(weather.current.humidity)}%`;

  wind.textContent =
    `${Math.round(weather.current.wind)} km/h`;

  pressure.textContent =
    `${Math.round(weather.current.pressure)} hPa`;

  mainWeatherArt.innerHTML =
    iconMarkup(currentType, "weather-visual large");

  forecastList.innerHTML = weather.daily
    .map((day) => {

      const [description, type] =
        weatherInfo(day.code);

      return `
        <article class="forecast-day">
            <h2>${formatDay(day.date, weather.timezone)}</h2>
            ${iconMarkup(type)}
            <p class="forecast-desc">${description}</p>
            <p class="forecast-temp">
              ${formatTemp(day.max)}° - ${formatTemp(day.min)}°
            </p>
       </article>
      `;
    })
    .join("");
}


// ================================
// Status Message Handler
// ================================

function setStatus(message) {
  statusMessage.textContent = message;

  if (message) {
    window.setTimeout(() => {
      statusMessage.textContent = "";
    }, 3800);
  }
}


// ================================
// Generic Fetch Function
// ================================

async function fetchJson(url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}


// ================================
// Get City Coordinates
// Using Open-Meteo Geocoding API
// ================================

async function getCityCoordinates(query) {

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;

  const data = await fetchJson(url);

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  const place = data.results[0];

if (data.results[0].name.length < 2) {
  throw new Error("City not found");
}
    

  return {
    name: place.name,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone,
  };
}


// ================================
// Get Weather Forecast
// ================================

async function getForecast(place) {

  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "10",
  });

  const data =
    await fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`);

  return {
    name: place.name,
    country: place.country,

    timezone:
      data.timezone ||
      place.timezone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone,

    current: {
      time: data.current.time,
      temp: data.current.temperature_2m,
      feels: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      pressure: data.current.surface_pressure,
      code: data.current.weather_code,
    },

    daily: data.daily.time.map((date, index) => ({
      date,
      max: data.daily.temperature_2m_max[index],
      min: data.daily.temperature_2m_min[index],
      code: data.daily.weather_code[index],
    })),
  };
}


// ================================
// Load Weather By City Name
// ================================

async function loadCity(query) {

  const place = await getCityCoordinates(query);

  activeWeather = await getForecast(place);

  render(activeWeather);
}


// ================================
// Load Weather By Coordinates
// ================================

async function loadCoordinates(latitude, longitude) {

  const place = {
    name: "Current Location",
    country: "",
    latitude,
    longitude,
    timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  activeWeather =
    await getForecast(place);

  render(activeWeather);
}


// ================================
// Search Form Event
// ================================

searchForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const query = cityInput.value.trim();

  // Empty input validation
  if (!query) {
    setStatus("❌ Please Enter a City Name.");
    return;
  }

  // Loading message when search button is clicked
  setStatus("🔍 Searching city...");

  try {

  await loadCity(query);

  cityInput.value = "";

  setStatus("");

} catch (error) {

  setStatus("❌ Enter correct city name.");

}
});


// ================================
// Current Location Event
// ================================

locationButton.addEventListener("click", () => {

  if (!navigator.geolocation) {
    setStatus("Location is not supported in this browser.");
    return;
  }

  setStatus("Finding your location...");

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      try {

        await loadCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );

        setStatus("");

      } catch (error) {

        setStatus("Weather service unavailable.");
      }
    },

    () => setStatus("Location permission was not allowed.")
  );
});


// ================================
// Temperature Unit Toggle
// ================================

unitButtons.forEach((button) => {

  button.addEventListener("click", () => {

    activeUnit = button.dataset.unit;

    unitButtons.forEach((item) =>
      item.classList.toggle("active", item === button)
    );

    render(activeWeather);
  });
});


// ================================
// Initial Render
// ================================

render(activeWeather);


// ================================
// Default City Load On Startup
// ================================

loadCity("Gwalior").catch(() => {

  render(fallbackWeather);

  setStatus("Showing demo forecast.");
});