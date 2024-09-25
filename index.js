const latitude = 38.028;
const longitude = -121.8847;


fetch('https://api.open-meteo.com/v1/forecast?latitude=38.028&longitude=-121.8847&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=GMT')
   .then(response => {
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       return response.json();
   })
   .then(data => {
       console.log('Weather Data:', data); 

       // Extracting the first hour's data from weather API
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
   })
   .catch(error => {
       console.error('Fetch error:', error);
   });

   