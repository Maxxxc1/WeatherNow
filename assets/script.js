// API key for OpenWeatherMap
const apiKey = '748bfaf4c851def5a65ff6ba9042f7a7';

//OpenWeatherMap API //
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
// -weather
function updateForecast(data) {
    const forecastData = data.list;
    const forecastDays = document.querySelectorAll('.dailyForecast');
    const currentWeather = document.querySelector('.currentDay');
    const cityName = data.city.name;
    
    // Current day's weather/
    const currentTempFahrenheit = Math.round(data.list[0].main.temp);
    const currentHumidity = data.list[0].main.humidity;
    const currentWindSpeed = data.list[0].wind.speed;
    const currentIcon = data.list[0].weather[0].icon;
    const currentDescription = data.list[0].weather[0].description;
    const currentDay = new Date(data.list[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    currentWeather.innerHTML = `
        <h3>${cityName}</h3>
        <p>Current Day (${currentDay}): ${currentTempFahrenheit}°F</p>
        <p><img src="http://openweathermap.org/img/wn/${currentIcon}.png" alt="${currentDescription}"> ${currentDescription}</p>
        <p>Humidity: ${currentHumidity}%</p>
        <p>Wind Speed: ${currentWindSpeed} mph</p>
    `;

    // Display 5-day forecast //
    for (let i = 1; i <= 5; i++) {
        const forecast = forecastData[i * 8 - 1]; // Selecting data for 24-hour intervals
        const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        const temperatureFahrenheit = Math.round(forecast.main.temp);
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const icon = forecast.weather[0].icon;
        const description = forecast.weather[0].description;
        
        forecastDays[i - 1].innerHTML =
        `
            <h4>${day}</h4>
            <p><img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}"> ${description}</p>
            <p>Temperature: ${temperatureFahrenheit}°F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} mph</p>
        `
    }
}

// search button click
document.getElementById('searchButton').addEventListener('click', async function() {
    const city = document.getElementById('searchInput').value;
    const weatherData = await getWeather(city);
    updateForecast(weatherData);
});
