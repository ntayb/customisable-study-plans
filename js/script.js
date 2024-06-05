document.getElementById('add-subject').addEventListener('click', addSubject);
document.getElementById('generate-plan').addEventListener('click', generatePlan);

function addSubject() {
    const subjectInput = document.getElementById('subject-input');
    const subject = subjectInput.value.trim();
    if (subject) {
        const li = document.createElement('li');
        li.textContent = subject;
        li.appendChild(createRemoveButton());
        document.getElementById('subject-list').appendChild(li);
        subjectInput.value = '';
    }
}

function createRemoveButton() {
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.addEventListener('click', () => {
        button.parentElement.remove();
    });
    return button;
}

function generatePlan() {
    const template = document.getElementById('template').value;
    const subjects = Array.from(document.getElementById('subject-list').children).map(li => li.textContent.replace('Remove', '').trim());
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    if (!validateForm(template, subjects, startTime, endTime)) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const plan = createStudyPlan(template, subjects, startTime, endTime);
    displayPlan(plan);
}

function validateForm(template, subjects, startTime, endTime) {
    return template && subjects.length > 0 && startTime && endTime;
}

function createStudyPlan(template, subjects, startTime, endTime) {
    return subjects.map(subject => `${subject}: ${startTime} - ${endTime}`);
}

function displayPlan(plan) {
    const planResult = document.getElementById('plan-result');
    const studyPlanDiv = document.getElementById('study-plan');
    studyPlanDiv.innerHTML = '';

    plan.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item;
        studyPlanDiv.appendChild(p);
    });

    planResult.hidden = false;
}

document.getElementById('download-plan').addEventListener('click', () => {
    const studyPlanDiv = document.getElementById('study-plan');
    html2canvas(studyPlanDiv).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'study-plan.png';
        link.click();
    });
});
