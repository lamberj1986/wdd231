document.addEventListener("DOMContentLoaded", async () => {
    // Get references to DOM elements
    const gridViewButton = document.getElementById("gridView");
    const listViewButton = document.getElementById("listView");
    const directory = document.getElementById("directory");

    // Toggle views
    gridViewButton.addEventListener("click", () => {
        directory.classList.add("grid");
        directory.classList.remove("list");
    });

    listViewButton.addEventListener("click", () => {
        directory.classList.add("list");
        directory.classList.remove("grid");
    });

    // Fetch data from the JSON file
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to fetch member data");

        const businesses = await response.json();
        populateDirectory(businesses);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }

    // Function to populate the directory
    function populateDirectory(businesses) {
        businesses.forEach((business) => {
            const card = document.createElement("div");
            card.classList.add("member-card"); // Match with CSS class name
    
            // Business Logo
            const logo = document.createElement("img");
            logo.src = business.image || business.logo; // Support for both "image" and "logo"
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
                website.target = "_blank"; // Open in new tab
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
});