const apiKey = "YOUR_API_KEY_HERE"; // Replace this with your real API key

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => alert("City not found"));
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported");
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => displayWeather(data));
  });
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");

  if (data.cod !== 200) {
    weatherDiv.innerHTML = `<p>Error: ${data.message}</p>`;
    return;
  }

  weatherDiv.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Condition:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}
