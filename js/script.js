const templates = {
    template1: [
        "Math", "Science", "English", "History", "Geography"
    ],
    template2: [
        "Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"
    ]
    // Add more templates as needed
};

document.getElementById('template-select').addEventListener('change', updatePlan);

function updatePlan() {
    const selectedTemplate = document.getElementById('template-select').value;
    const hoursPerDay = document.getElementById('hours-per-day').value;
    const daysPerWeek = document.getElementById('days-per-week').value;

    document.getElementById('hours-display').innerText = hoursPerDay;
    document.getElementById('days-display').innerText = daysPerWeek;

    const subjects = templates[selectedTemplate];
    const planContainer = document.getElementById('study-plan');
    planContainer.innerHTML = '';

    for (let i = 0; i < daysPerWeek; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        for (let j = 0; j < hoursPerDay; j++) {
            const hourDiv = document.createElement('div');
            hourDiv.classList.add('hour');
            hourDiv.innerText = subjects[j % subjects.length];
            dayDiv.appendChild(hourDiv);
        }

        planContainer.appendChild(dayDiv);
    }
}
