const API_KEY = "e6954758a7704ada861105055252401"; // Replace with your API key

// Function to fetch weather data for a city
const fetchWeather = async (city) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Update UI with the weather data
    updateUI(data, city);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
};

// Function to update the UI with weather data and dynamic city info
const updateUI = (data, city) => {
  const temperature = data.current.temp_c; // Temperature in Celsius
  const humidity = data.current.humidity; // Humidity
  const precipitation = data.current.precip_mm; // Precipitation in mm
  const windSpeed = data.current.wind_kph; // Wind speed in km/h

  // Get elements from the DOM
  const weatherTempElement = document.querySelector(".weather-temp");
  const humidityElement = document.querySelector(".humidity");
  const precipitationElement = document.querySelector(".precipitation");
  const windSpeedElement = document.querySelector(".windspeed");
  const dayNameElement = document.querySelector("#day-name");
  const dateElement = document.querySelector("#date");
  const cityNameElement = document.querySelector("#city-name");
  const daysListElement = document.querySelector(".days-list");

  // Update weather info
  weatherTempElement.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = `${humidity}%`;
  precipitationElement.innerHTML = `${precipitation} mm`;
  windSpeedElement.innerHTML = `${windSpeed} km/h`;

  // Get current date and day of the week
  const currentDate = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = dayNames[currentDate.getDay()];
  const date = `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  // Update dynamic elements
  dayNameElement.innerHTML = dayName; // Change the day name (e.g., "Friday")
  dateElement.innerHTML = date; // Change the date (e.g., "28 Jan 2025")
  cityNameElement.innerHTML = city; // Change the city name (e.g., "Paris, FR")

  // Update the days list with forecast data
  const forecastDays = data.forecast.forecastday;

  // Clear the days list before adding new data
  daysListElement.innerHTML = "";

  // Loop through forecast days and display them
  forecastDays.forEach((forecastDay) => {
    const forecastDate = new Date(forecastDay.date);
    const dayName = dayNames[forecastDate.getDay()];

    const li = document.createElement("li");
    li.innerHTML = `
      <i class='bx bx-cloud' style='color:#ffffff'></i>
      <span>${dayName}</span>
      <span class="day-temp">${forecastDay.day.avgtemp_c}°C</span>
    `;
    daysListElement.appendChild(li);
  });
};

// Listen for the button click
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector(".loc-button");

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});
