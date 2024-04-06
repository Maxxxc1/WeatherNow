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
    
    // Current day's weather/
    const currentTempFahrenheit = Math.round(data.list[0].main.temp);
    const currentDay = new Date(data.list[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
    currentWeather.innerHTML = `Current Day (${currentDay}): ${currentTempFahrenheit}°F`;

    // Display 5-day forecast //
    for (let i = 1; i <= 5; i++) {
        const forecast = forecastData[i * 8];
        const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        const temperatureFahrenheit = Math.round(forecast.main.temp);
        forecastDays[i - 1].innerHTML = `${day}: ${temperatureFahrenheit}°F`;
    }
}

// search button click
document.getElementById('searchButton').addEventListener('click', async function() {
    const city = document.getElementById('searchInput').value;
    const weatherData = await getWeather(city);
    updateForecast(weatherData);
});
