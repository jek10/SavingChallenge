// Generate 100 unique random amounts (e.g., 1 to 100 shuffled)
function generateEnvelopes() {
    let amounts = Array.from({length: 100}, (_, i) => i + 1);
    for (let i = amounts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amounts[i], amounts[j]] = [amounts[j], amounts[i]];
    }
    return amounts;
}

// Load or initialize data from localStorage
let envelopes = JSON.parse(localStorage.getItem('envelopes')) || generateEnvelopes();
let history = JSON.parse(localStorage.getItem('history')) || [];
let lastDrawDate = localStorage.getItem('lastDrawDate') || null;

// Check if today is a new day
const today = new Date().toDateString();
if (lastDrawDate !== today && envelopes.length > 0) {
    document.getElementById('drawBtn').disabled = false;
} else {
    document.getElementById('drawBtn').disabled = true;
    document.getElementById('result').textContent = envelopes.length > 0 ? 'Already drew today!' : 'Challenge complete!';
}

// Draw button event
document.getElementById('drawBtn').addEventListener('click', () => {
    const amount = envelopes.pop(); // Draw last for randomness
    history.push({ date: today, amount });
    localStorage.setItem('envelopes', JSON.stringify(envelopes));
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('lastDrawDate', today);
    document.getElementById('result').textContent = `Put ₱${amount} in today's envelope!`; // Changed $ to ₱
    document.getElementById('drawBtn').disabled = true;
    updateHistory();
});

// Display history
function updateHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date}: ₱${entry.amount}`; // Changed $ to ₱
        list.appendChild(li);
    });
}
updateHistory();