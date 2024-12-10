document.addEventListener("DOMContentLoaded", async () => {
    const topThreeSection = document.getElementById("memberSpotlight");

    console.log("TopThreeSection element:", topThreeSection);

    // Fetch data from the JSON file and populate the top three businesses
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to fetch member data");

        const businesses = await response.json();
        console.log("Fetched businesses:", businesses);
        populateRandomTopThree(businesses);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }

    // Function to populate the top three randomly selected businesses
    function populateRandomTopThree(businesses) {
        // Filter businesses with Gold or Silver membership levels
        const eligibleBusinesses = businesses.filter(
            (business) =>
                business.membershipLevel === "Gold" || business.membershipLevel === "Silver"
        );

        console.log("Eligible businesses:", eligibleBusinesses);

        // Shuffle the filtered businesses and pick the first three
        const topThree = shuffleArray(eligibleBusinesses).slice(0, 3);

        console.log("Top three businesses:", topThree);

        // Populate the top three section
        topThree.forEach((business) => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            // Business Logo
            const logo = document.createElement("img");
            logo.src = business.image || business.logo;
            logo.alt = `${business.name} Logo`;
            card.appendChild(logo);

            // Business Name
            const name = document.createElement("h2");
            name.textContent = business.name;
            card.appendChild(name);

            // Tagline
            if (business.tagline) {
                const tagline = document.createElement("p");
                tagline.textContent = `"${business.tagline}"`;
                tagline.classList.add("tagline");
                card.appendChild(tagline);
            }

            // Membership Level
            if (business.membershipLevel) {
                const membership = document.createElement("p");
                membership.textContent = `Membership Level: ${business.membershipLevel}`;
                membership.classList.add("membership-level");
                card.appendChild(membership);
            }

            topThreeSection.appendChild(card);
        });
    }

    // Function to shuffle an array
    function shuffleArray(array) {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // Fetch weather data
    const fetchWeather = async () => {
        const apiKey = "b91a523f5ebfaeb7404c1d6257bf6e42";
        const lat = "42.94";
        const lon = "-85.40";
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

        try {
            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) throw new Error("Weather data fetch failed");
            const weatherData = await weatherResponse.json();

            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) throw new Error("Forecast data fetch failed");
            const forecastData = await forecastResponse.json();

            return { weatherData, forecastData };
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    };

    // Render weather card with icon
    const renderWeatherCard = (data) => {
        if (!data) {
            document.getElementById("currentWeather").innerHTML = "Weather data unavailable.";
            return;
        }

        const { weatherData, forecastData } = data;

        const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        const weatherDescription = weatherData.weather[0].description;
        const capitalizedDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        document.getElementById("weatherIcon").src = weatherIcon;
        document.getElementById("weatherDesc").textContent = capitalizedDescription;
        document.getElementById("currentTemp").textContent = weatherData.main.temp.toFixed(1);

        // Render 3-day forecast
        const forecastList = forecastData.list.filter((item, index) => index % 8 === 0).slice(1, 4);
        forecastList.forEach((forecast, index) => {
            const day = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            const forecastText = `${day}: ${forecast.main.temp.toFixed(1)} °F`;
            document.getElementById(`forecastDay${index + 1}`).textContent = forecastText;
        });
    };

    // Fetch and display weather
    const weatherData = await fetchWeather();
    renderWeatherCard(weatherData);
});