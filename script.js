// 1. Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 2. Mobile Menu Toggle
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// 3. Smooth Scroll Active Link Switcher
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});


function startAi() {
    const input = document.getElementById('userQuery').value;
    if (input.trim() === "") {
        alert("Tell our AI what you're looking for!");
    } else {
        // Full Stack Logic: Save query and move to plan page
        localStorage.setItem('userTripGoal', input);
        window.location.href = './templates/plan.html';
    }
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-up');
        }
    });
});



const weatherData = {
    updateWeather: async function() {
        const tempEl = document.getElementById('temp-display');
        const condEl = document.getElementById('condition-display');
        const humidEl = document.getElementById('humidity-display');
        const windEl = document.getElementById('wind-display');
        const timeEl = document.getElementById('last-updated');

        try {
            // Replace 'YOUR_API_KEY' with a real key from OpenWeatherMap
            // Using a fetch to OpenWeatherMap for Kanyakumari (ID: 1267599)
            // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kanyakumari&units=metric&appid=YOUR_API_KEY`);
            // const data = await response.json();
            
            // Simulation for now with your data provided
            tempEl.innerText = `29°C`;
            condEl.innerText = `Sunny`;
            humidEl.innerText = `65%`;
            windEl.innerText = `12 km/h`;
            
            const now = new Date();
            timeEl.innerText = `Updated at: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        } catch (error) {
            console.error("Weather fetch failed", error);
        }
    }
};

// Initial Call
weatherData.updateWeather();

// Update every 60,000 milliseconds (1 minute)
setInterval(weatherData.updateWeather, 60000);

// Initialize ScrollReveal
const sr = ScrollReveal({
    distance: '80px',
    duration: 1500,
    delay: 200,
    reset: true // Set to false if you only want it to happen once
});

// Animate Left Side
sr.reveal('.reveal-left', { origin: 'left' });

// Animate Right Side
sr.reveal('.reveal-right', { origin: 'right', delay: 400 });

// Animate the Pills one by one
sr.reveal('.pill', { interval: 200, origin: 'bottom' });

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Toggle Active Class
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        const cards = document.querySelectorAll('.place-card');

        cards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});



// Adding Food Section to the ScrollReveal logic
ScrollReveal().reveal('.food-card', {
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    interval: 200, // Cards will pop up one by one
    reset: false
});


// Add this to your script.js
ScrollReveal().reveal('.culture-card', {
    interval: 200,
    origin: 'right',
    distance: '100px',
    duration: 1200,
    opacity: 0,
    scale: 0.9
});

ScrollReveal().reveal('.culture-footer', {
    delay: 500,
    duration: 1500,
    origin: 'bottom'
});


const travelData = {
    mumbai: [
        { route: "Flight to TRV Airport, then Private Taxi", price: "₹8,240" },
        { route: "Direct Train (Kanyakumari Express)", price: "₹945" }
    ],
    delhi: [
        { route: "Flight to TRV Airport, then Car", price: "₹10,616" },
        { route: "Thirukkural SF Express", price: "₹1,150" }
    ],
    chennai: [
        { route: "Kanyakumari SF Express (Daily)", price: "₹560" },
        { route: "Setc Ultra Deluxe Bus", price: "₹850" }
    ],
    bangalore: [
        { route: "Island Express (16526)", price: "₹480" },
        { route: "KSRTC AC Sleeper Bus", price: "₹1,450" }
    ],
    other: [
        { route: "Connect via Chennai or Trivandrum", price: "Varies" }
    ]
};

function updateTravelOptions() {
    const city = document.getElementById('citySelect').value;
    const wrapper = document.getElementById('optionsWrapper');
    
    // Get data for selected city, or default to 'other' if city not in list
    const options = travelData[city] || travelData['other'];

    wrapper.innerHTML = options.map(opt => `
        <div class="option-card">
            <div class="route-info">
                <div class="route-icon">🧳</div>
                <div class="route-text">${opt.route}</div>
            </div>
            <div class="price-action">
                <div class="price-tag">
                    <small>Booking Options Starting From</small>
                    <span>${opt.price}</span>
                </div>
                <a href="#" class="book-btn">BOOK NOW</a>
            </div>
        </div>
    `).join('');
}


// Add this to your script.js
ScrollReveal().reveal('.geo-item', {
    interval: 200, // Elements will appear one by one
    origin: 'bottom',
    distance: '30px',
    duration: 1200,
    opacity: 0,
    scale: 0.9
});


// Ensure this is in your script.js
ScrollReveal().reveal('.plan-hero-card', {
    duration: 1500,
    opacity: 0,
    scale: 0.9,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false
});

ScrollReveal().reveal('.nav-col', {
    interval: 150,
    origin: 'bottom',
    distance: '20px',
    duration: 1000
});