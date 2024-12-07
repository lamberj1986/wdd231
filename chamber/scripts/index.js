document.addEventListener("DOMContentLoaded", async () => {
    // Get references to DOM elements
    const directory = document.getElementById("directory");
    const currentYearSpan = document.getElementById("currentYear");
    const lastModifiedSpan = document.getElementById("lastModified");
    const topThreeSection = document.getElementById("topThree");

    // Update footer dates
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    const lastModified = document.lastModified;
    lastModifiedSpan.textContent = `Last Updated: ${lastModified}`;

    // Fetch data from the JSON file and populate the full directory
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to fetch member data");

        const businesses = await response.json();
        populateDirectory(businesses);
        populateRandomTopThree(businesses);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }

    // Function to populate the full directory
    function populateDirectory(businesses) {
        businesses.forEach((business) => {
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

            // Address
            const address = document.createElement("p");
            address.textContent = `Address: ${business.address}`;
            card.appendChild(address);

            // Phone
            const phone = document.createElement("p");
            phone.textContent = `Phone: ${business.phone}`;
            card.appendChild(phone);

            // Website
            if (business.website) {
                const website = document.createElement("a");
                website.href = business.website;
                website.textContent = "Visit Website";
                website.target = "_blank";
                website.classList.add("website-link");
                card.appendChild(website);
            }

            // Membership Level
            if (business.membershipLevel) {
                const membership = document.createElement("p");
                membership.textContent = `Membership Level: ${business.membershipLevel}`;
                membership.classList.add("membership-level");
                card.appendChild(membership);
            }

            // Append card to directory
            directory.appendChild(card);
        });
    }

    // Function to populate the top three randomly selected businesses
    function populateRandomTopThree(businesses) {
        // Filter businesses with Gold or Silver membership levels
        const eligibleBusinesses = businesses.filter(
            (business) =>
                business.membershipLevel === "Gold" || business.membershipLevel === "Silver"
        );

        // Shuffle the filtered businesses and pick the first three
        const topThree = shuffleArray(eligibleBusinesses).slice(0, 3);

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

            // Address
            const address = document.createElement("p");
            address.textContent = `Address: ${business.address}`;
            card.appendChild(address);

            // Phone
            const phone = document.createElement("p");
            phone.textContent = `Phone: ${business.phone}`;
            card.appendChild(phone);

            // Website
            if (business.website) {
                const website = document.createElement("a");
                website.href = business.website;
                website.textContent = "Visit Website";
                website.target = "_blank";
                website.classList.add("website-link");
                card.appendChild(website);
            }

            // Membership Level
            if (business.membershipLevel) {
                const membership = document.createElement("p");
                membership.textContent = `Membership Level: ${business.membershipLevel}`;
                membership.classList.add("membership-level");
                card.appendChild(membership);
            }

            // Append card to the top three section
            topThreeSection.appendChild(card);
        });
    }

    // Utility function to shuffle an array
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const apiKey = "b91a523f5ebfaeb7404c1d6257bf6e42";
    const lat = "42.94"; // Latitude for Lowell, MI
    const lon = "-85.40"; // Longitude for Lowell, MI
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;

    // Fetch weather data
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

    // Display weather data on the webpage
    function displayWeather(data) {
        // Current weather
        document.getElementById("currentTemp").textContent = Math.round(data.current.temp);
        document.getElementById("highTemp").textContent = Math.round(data.daily[0].temp.max);
        document.getElementById("lowTemp").textContent = Math.round(data.daily[0].temp.min);

        // 5-day forecast
        const days = ["day1", "day2", "day3", "day4", "day5"];
        data.daily.slice(1, 6).forEach((day, index) => {
            const date = new Date(day.dt * 1000); // Convert timestamp to date
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            document.getElementById(days[index]).textContent = dayName;
            document.getElementById(`${days[index]}Temp`).textContent = Math.round(day.temp.day);
        });
    }
});

// Potential images to be used in the future:
// https://picsum.photos/id/99/ - Broken wagon
// https://picsum.photos/id/76/ - Bike on barn
// https://picsum.photos/id/176/ - Lakeshore with lighthouse
// https://picsum.photos/id/199/ - Beach at lake
// https://picsum.photos/id/852/ - Lake view at sunset
// The image can be pulled by either adding width and height at the end of the URL or
// by adding a single number at the end of the URL. For example: https://picsum.photos/id/852/200/300