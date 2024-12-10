document.addEventListener("DOMContentLoaded", async () => {
    // Get references to DOM elements
    const directory = document.getElementById("directory");
    const topThreeSection = document.getElementById("topThree");

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

    // Get the current year and last modified date
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});