// API key for WDD231
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=b91a523f5ebfaeb7404c1d6257bf6e42';

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-caption');

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Debugging purposes
            displayResults(data);
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    const temperature = data.main.temp.toFixed(1); // Round to one decimal place
    const iconCode = data.weather[0].icon; // Get weather icon code
    const description = data.weather[0].description; // Get weather description

    // Update the DOM
    currentTemp.innerHTML = `${temperature}&deg;F`;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', description);
    captionDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1); // Capitalize first letter
}

apiFetch();