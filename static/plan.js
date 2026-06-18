let step = 0;
let userData = {
    origin: "", people: 1, days: 1, dates: "",
    transport: "", flight: "", currentSpend: 0, isLocal: false
};

function addMessage(text, type) {
    const msgDiv = document.getElementById('messages');
    const div = document.createElement('div');
    div.className = `message ${type} animate__animated animate__fadeInUp`;
    div.innerHTML = text;
    msgDiv.appendChild(div);
    msgDiv.scrollTop = msgDiv.scrollHeight;
}

async function handleInput() {
    console.log("HandleInput Fired!"); // Check F12 Console to see if this appears
    
    const inputField = document.getElementById('userInput');
    if (!inputField) {
        console.error("Input field with ID 'userInput' not found!");
        return;
    }

    const val = inputField.value.trim();
    
    // If the box is empty, don't do anything
    if (!val) return;

    // 1. Show user message in chat
    addMessage(val, 'user');
    
    // 2. Clear the input box immediately
    inputField.value = "";

    // 3. Logic Machine
    if (step === 0) {
        userData.origin = val;
        if (val.toLowerCase() === 'nagercoil') {
            userData.isLocal = true;
            addMessage("Local detected! 🚗 <b>Own Car</b> or <b>Local Cab</b>?", "bot");
            showLocalOptions();
            step = 10; // State for Local Transport
        } else {
            addMessage("How many people are traveling?", "bot");
            step = 1;
        }
    } else if (step === 1) {
        userData.people = parseInt(val) || 1;
        addMessage("How many days is the trip?", "bot");
        step = 2;
    } else if (step === 2) {
        userData.days = parseInt(val) || 1;
        addMessage("Enter Travel Dates (e.g. 1/4 - 4/4):", "bot");
        step = 3;
    } else if (step === 3) {
        userData.dates = val;
        if (userData.isLocal) {
            showFinalTrigger();
        } else {
            showFlightRecommendations();
        }
        step = 4;
    }
}

function showLocalOptions() {
    const opts = `
        <div class="card-opt" onclick="setLocalTransport('Own Car', 0)">🚗 Own Car</div>
        <div class="card-opt" onclick="setLocalTransport('Local Cab', 1500)">🚕 Local Cab (₹1,500)</div>`;
    addMessage(opts, "bot");
}

function setLocalTransport(type, cost) {
    userData.transport = type;
    userData.currentSpend += cost;
    addMessage(`Selected: ${type}`, "user");
    addMessage("How many people?", "bot");
    step = 1; // Back to people count
}

function showFlightRecommendations() {
    addMessage("Searching flights... ✈️", "bot");
    const flights = `
        <div class="card-opt" onclick="selectFlight('IndiGo', 8500)">✈️ IndiGo - ₹8,500/pp</div>
        <div class="card-opt" onclick="selectFlight('Air India', 9200)">✈️ Air India - ₹9,200/pp</div>`;
    addMessage(flights, "bot");
}

function selectFlight(name, price) {
    userData.flight = name;
    userData.transport = "Flight + Cab";
    userData.currentSpend += (price * userData.people);
    addMessage(`Selected ${name}. (Total: ₹${userData.currentSpend})`, "bot");
    showFinalTrigger();
}

function showFinalTrigger() {
    const summary = `
        <div class="summary-card bg-warning text-dark p-3 rounded mt-3">
            <h5>Ready to Go!</h5>
            <p>From: ${userData.origin} | Total Est: ₹${userData.currentSpend}</p>
            <button class="btn btn-dark w-100 fw-bold" onclick="generatePlan()">🚀 GENERATE AI PLAN</button>
        </div>`;
    addMessage(summary, "bot");
}

async function generatePlan() {
    const messages = document.getElementById('messages');
    messages.innerHTML = `<div class="msg bot">✨ AI is building your live itinerary...</div>`;

    const response = await fetch('/generate_plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData: userData })
    });
    const data = await response.json();
    const rawSteps = data.itinerary.split('###STEP###').filter(s => s.trim() !== "");
    
    messages.innerHTML = `
        <div class="budget-tracker">💰 Spent: ₹<span id="live-budget">${userData.currentSpend}</span></div>
        <div id="itinerary-container"></div>`;

    rawSteps.forEach((content, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `itinerary-item ${index === 0 ? 'active-step' : 'pending-step'}`;
        stepDiv.id = `step-${index}`;
        stepDiv.innerHTML = `${content}
            <div class="action-row mt-3">
                <input type="number" class="form-control mb-2" id="exp-${index}" placeholder="Add Expense (₹)">
                <button class="btn btn-success w-100" onclick="completeStep(${index})">✅ Visited</button>
            </div>`;
        document.getElementById('itinerary-container').appendChild(stepDiv);
    });
}

function completeStep(index) {
    const exp = parseInt(document.getElementById(`exp-${index}`).value) || 0;
    userData.currentSpend += exp;
    document.getElementById('live-budget').innerText = userData.currentSpend;

    document.getElementById(`step-${index}`).classList.replace('active-step', 'completed-step');
    const next = document.getElementById(`step-${index + 1}`);
    if (next) {
        next.classList.remove('pending-step');
        next.classList.add('active-step');
        next.scrollIntoView({ behavior: 'smooth' });
    }
}