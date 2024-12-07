document.addEventListener("DOMContentLoaded", () => {
    // Visitor Info
    const visitorInfo = document.getElementById("visitor-info");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();
    
    if (lastVisit) {
        const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysBetween === 0) {
            visitorInfo.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitorInfo.textContent = "You last visited 1 day ago.";
        } else {
            visitorInfo.textContent = `You last visited ${daysBetween} days ago.`;
        }
    } else {
        visitorInfo.textContent = "Welcome! Let us know if you have any questions.";
    }

    localStorage.setItem("lastVisit", currentVisit);

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll(".lazy");
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                obs.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});
