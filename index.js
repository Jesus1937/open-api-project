const latitude = 38.028;
const longitude = -121.8847;

// Get the DOM elements for buttons and sections
const hourlyBtn = document.getElementById('hourly-btn');
const dailyBtn = document.getElementById('daily-btn');
const hourlyWeather = document.getElementById('hourly-weather');
const dailyWeather = document.getElementById('daily-weather');

// Function to fetch and display hourly weather data
function getHourlyWeather() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=GMT`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Hourly Weather Data:', data);

            // Display the hourly data
            const temp = data.hourly.temperature_2m[0];
            const humidity = data.hourly.relative_humidity_2m[0];
            const windSpeed = data.hourly.wind_speed_10m[0];
            const windDirection = data.hourly.wind_direction_10m[0];
            const windGusts = data.hourly.wind_gusts_10m[0];

            document.getElementById('temperature').innerText = `Temperature: ${temp} °C`;
            document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
            document.getElementById('wind-speed').innerText = `Wind Speed: ${windSpeed} km/h`;
            document.getElementById('wind-direction').innerText = `Wind Direction: ${windDirection}°`;
            document.getElementById('wind-gusts').innerText = `Wind Gusts: ${windGusts} km/h`;

            // Show the hourly section and hide the daily section
            hourlyWeather.style.display = 'block';
            dailyWeather.style.display = 'none';
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Function to fetch and display daily weather data
function getDailyWeather() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum,sunrise,sunset&timezone=GMT`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Daily Weather Data:', data);

            // Display the daily data
            const precipitation = data.daily.precipitation_sum[0];
            const sunrise = data.daily.sunrise[0];
            const sunset = data.daily.sunset[0];

            document.getElementById('precipitation').innerText = `Precipitation: ${precipitation} mm`;
            document.getElementById('sunrise').innerText = `Sunrise: ${new Date(sunrise).toLocaleTimeString()}`;
            document.getElementById('sunset').innerText = `Sunset: ${new Date(sunset).toLocaleTimeString()}`;

            // Show the daily section and hide the hourly section
            dailyWeather.style.display = 'block';
            hourlyWeather.style.display = 'none';
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Add event listeners to buttons to trigger the appropriate fetch
hourlyBtn.addEventListener('click', getHourlyWeather);
dailyBtn.addEventListener('click', getDailyWeather);

// Optionally, load one of the data points by default
getHourlyWeather();
