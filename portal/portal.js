// Initial Data
const challenges = [];

function submitProblem() {
    const title = document.getElementById('probTitle').value;
    const desc = document.getElementById('probDesc').value;
    const loc = document.getElementById('location').value;

    if (!title || !desc) {
        alert("Please describe the problem clearly!");
        return;
    }

    // Create New Challenge Object
    const newChallenge = {
        title: title,
        desc: desc,
        location: loc,
        status: "Open",
        reward: "₹1000 / 200 Pts"
    };

    renderChallenge(newChallenge);
    clearForm();
    
    // Smooth Animation to see the new post
    window.scrollTo({ top: document.getElementById('solve').offsetTop - 20, behavior: 'smooth' });
}

function renderChallenge(data) {
    const feed = document.getElementById('challenge-feed');
    const html = `
        <div class="challenge-card p-4 mb-3 rounded border border-secondary bg-dark animate__animated animate__fadeInUp">
            <div class="d-flex justify-content-between">
                <span class="badge bg-info mb-2">New Challenge at ${data.location}</span>
                <span class="text-warning">Reward: ${data.reward}</span>
            </div>
            <h4>${data.title}</h4>
            <p class="text-secondary">${data.desc}</p>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-warning" onclick="alert('Solution Proposal Window Opened!')">Propose Solution</button>
                <button class="btn btn-sm btn-outline-secondary" onclick="this.innerText='Voted Up ✓'">Upvote</button>
            </div>
        </div>
    `;
    feed.insertAdjacentHTML('afterbegin', html);
}

function clearForm() {
    document.getElementById('probTitle').value = "";
    document.getElementById('probDesc').value = "";
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function openContribute() {
    // This simulates the 'Innovation Job' contribution
    const solution = prompt("Describe your innovative solution briefly:");
    if(solution) {
        alert("🚀 Innovation Received! Your proposal has been sent to the District Innovation Cell. You will receive points upon validation.");
    }
}