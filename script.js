document.addEventListener('DOMContentLoaded', function() {
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

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navBtns = document.querySelectorAll('.nav-btn');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        navBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });

        // Prevent clicks inside menu from closing it
        mainNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}); 