document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);

    // Toggle menu function
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Event listeners for menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Event listener for overlay
    menuOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Prevent menu from closing when clicking inside
    mainNav.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Form submission handling
    const enquiryForm = document.querySelector('.enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert('Thank you for your enquiry! We will contact you soon.');
            e.target.reset();
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.category-card, .car-card').forEach(card => {
        observer.observe(card);
    });

    // Sample data for Pune locations
    const puneLocations = [
        "Shivajinagar", "Kothrud", "Hinjewadi", "Wakad", "Baner", "Aundh", "Pimple Saudagar",
        "Viman Nagar", "Kharadi", "Koregaon Park", "Camp", "Deccan", "Bavdhan", "Katraj",
        "Hadapsar", "Magarpatta", "Kondhwa", "Bibwewadi", "Sinhagad Road", "Pune Station"
    ];

    // Sample data for Maharashtra locations
    const maharashtraLocations = [
        "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Pune",
        "Thane", "Pimpri-Chinchwad", "Amravati", "Nanded", "Sangli", "Malegaon",
        "Jalgaon", "Akola", "Latur", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji"
    ];

    // Function to filter locations based on search input
    function filterLocations(input, locations) {
        return locations.filter(location => 
            location.toLowerCase().includes(input.toLowerCase())
        );
    }

    // Function to create and display search results
    function showSearchResults(input, resultsContainer, locations) {
        const searchResults = filterLocations(input, locations);
        resultsContainer.innerHTML = '';
        
        if (searchResults.length > 0) {
            searchResults.forEach(location => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.textContent = location;
                resultItem.addEventListener('click', () => {
                    input.value = location;
                    resultsContainer.style.display = 'none';
                });
                resultsContainer.appendChild(resultItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.style.display = 'none';
        }
    }

    // Initialize search functionality when DOM is loaded
    const puneSearch = document.getElementById('puneSearch');
    const maharashtraSearch = document.getElementById('maharashtraSearch');
    const puneResults = document.getElementById('puneResults');
    const maharashtraResults = document.getElementById('maharashtraResults');

    // Pune location search
    puneSearch.addEventListener('input', (e) => {
        showSearchResults(e.target.value, puneResults, puneLocations);
    });

    // Maharashtra location search
    maharashtraSearch.addEventListener('input', (e) => {
        showSearchResults(e.target.value, maharashtraResults, maharashtraLocations);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            puneResults.style.display = 'none';
            maharashtraResults.style.display = 'none';
        }
    });
}); 