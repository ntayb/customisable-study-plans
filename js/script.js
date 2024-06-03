const subjects = [
    "English Adv", "English Std", "English Studies", "English Ext 1", "English Ext 2", "EAL/D", "Math Std 1",
    "Math Std 2", "Math Adv", "Math Ext 1", "Math Ext 2", "Biology", "Chemistry", "Earth & Env Sci", "Physics",
    "Investigating Sci", "Science Ext", "Ancient History", "Modern History", "History Ext", "Business Studies",
    "Economics", "Geography", "Legal Studies", "Society & Culture", "Studies of Religion I", "Studies of Religion II",
    "Chinese", "French", "German", "Indonesian", "Italian", "Japanese", "Korean", "Modern Greek", "Spanish",
    "Vietnamese", "Classical Greek", "Latin", "Dance", "Drama", "Music 1", "Music 2", "Music Ext", "Visual Arts",
    "Agriculture", "Design & Tech", "Engineering Studies", "Food Tech", "Industrial Tech", "IPT", "SDD", "Textiles & Design",
    "PDHPE", "CAFS", "Business Services", "Construction", "Hospitality", "IDT", "Primary Industries", "Retail Services",
    "Tourism", "Aboriginal Studies"
];

document.addEventListener("DOMContentLoaded", function() {
    populateSubjects();
    populateTemplates();
});

function populateSubjects() {
    const subjectsSelect = document.getElementById('subjects-select');
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectsSelect.appendChild(option);
    });
}

function populateTemplates() {
    const templatesSelect = document.getElementById('template-select');
    for (let i = 1; i <= 50; i++) {
        const option = document.createElement('option');
        option.value = `template${i}`;
        option.textContent = `Template ${i}`;
        templatesSelect.appendChild(option);
    }
}

function updateSubjectInputs() {
    const selectedSubjects = Array.from(document.getElementById('subjects-select').selectedOptions).map(option => option.value);
    const subjectDetailsContainer = document.getElementById('subject-details-container');
    subjectDetailsContainer.innerHTML = '';

    selectedSubjects.forEach(subject => {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject-detail');

        subjectDiv.innerHTML = `
            <h5>${subject}</h5>
            <label for="${subject}-time">Study Time (minutes):</label>
            <input type="number" id="${subject}-time" class="form-control" value="60" min="1">
            <label for="${subject}-days">Days:</label>
            <div id="${subject}-days" class="form-check">
                ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `
                <input type="checkbox" id="${subject}-${day.toLowerCase()}" class="form-check-input">
                <label for="${subject}-${day.toLowerCase()}" class="form-check-label">${day}</label>`).join('')}
            </div>
            <label for="${subject}-task">Specific Task:</label>
            <input type="text" id="${subject}-task" class="form-control" placeholder="E.g., Chapter 1, Practice Problems">
            <label for="${subject}-diff-times">Different times for each day:</label>
            <input type="checkbox" id="${subject}-diff-times" class="form-check-input" onchange="toggleDifferentTimes('${subject}')">
            <div id="${subject}-times-container" class="mt-2"></div>
        `;

        subjectDetailsContainer.appendChild(subjectDiv);
    });
}

function toggleDifferentTimes(subject) {
    const container = document.getElementById(`${subject}-times-container`);
    if (document.getElementById(`${subject}-diff-times`).checked) {
        container.innerHTML = `
            ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `
            <label for="${subject}-${day.toLowerCase()}-time">Study Time on ${day} (minutes):</label>
            <input type="number" id="${subject}-${day.toLowerCase()}-time" class="form-control" value="60" min="1">`).join('')}
        `;
    } else {
        container.innerHTML = '';
    }
}

function generateStudyPlan() {
    const selectedSubjects = Array.from(document.getElementById('subjects-select').selectedOptions).map(option => option.value);
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const template = document.getElementById('template-select').value;

    if (!startTime || !endTime) {
        alert("Please select start and end times.");
        return;
    }

    const studyPlan = [];
    selectedSubjects.forEach(subject => {
        const days = [];
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
            if (document.getElementById(`${subject}-${day.toLowerCase()}`).checked) {
                const time = document.getElementById(`${subject}-diff-times`).checked 
                    ? document.getElementById(`${subject}-${day.toLowerCase()}-time`).value 
                    : document.getElementById(`${subject}-time`).value;
                days.push({ day, time });
            }
        });
        studyPlan.push({ subject, days, task: document.getElementById(`${subject}-task`).value });
    });

    const planContainer = document.getElementById('study-plan');
    planContainer.innerHTML = '';

    studyPlan.forEach(({ subject, days, task }) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject-plan');
        subjectDiv.classList.add(template);
        subjectDiv.innerHTML = `<h5>${subject}</h5><p>${task}</p>`;
        days.forEach(({ day, time }) => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.innerText = `${day}: ${time} minutes`;
            subjectDiv.appendChild(dayDiv);
        });
        planContainer.appendChild(subjectDiv);
    });
}

function generateImage() {
    html2canvas(document.getElementById('study-plan')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'study-plan.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
