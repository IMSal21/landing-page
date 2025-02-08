// Function to load HTML content and its CSS
function loadSection(sectionId, htmlFile, cssFile) {
    fetch(htmlFile)
        .then(response => response.text())
        .then(data => {
            let section = document.getElementById(sectionId);
            if (section) {
                section.innerHTML = data;
                section.classList.add('fade-in'); // Add animation class
                observer.observe(section); // Observe the section
            }

            // Load CSS dynamically
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssFile;
            document.head.appendChild(link);
        })
        .catch(error => console.error(`Error loading ${htmlFile}:`, error));
}

// IntersectionObserver for repeated scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add animation when in view
        } else {
            entry.target.classList.remove('visible'); // Remove when out of view (repeats)
        }
    });
}, { threshold: 0.2 }); // Trigger animation when 20% of the section is visible

// Load all sections dynamically
document.addEventListener("DOMContentLoaded", function () {
    loadSection("header", "sections/header.html", "styles/header.css");
    loadSection("hero", "sections/hero.html", "styles/hero.css");
    loadSection("why", "sections/why.html", "styles/why.css");
    loadSection("services", "sections/services.html", "styles/services.css");
    loadSection("partners", "sections/partners.html", "styles/partners.css");
    loadSection("testimonials", "sections/testimonials.html", "styles/testimonials.css");
});
