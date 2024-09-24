fetch('https://api.open-meteo.com/v1/forecast?latitude=38.028&longitude=-121.8847&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=GMT')
   .then(response => {
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       return response.json();
   })
   .then(data => {
       console.log('Weather Data:', data); // Log the weather data to the console
   })
   .catch(error => {
       console.error('Fetch error:', error);
   });
