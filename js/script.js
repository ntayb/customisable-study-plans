document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('template-select').addEventListener('change', generateStudyPlan);
    document.getElementById('subjects-select').addEventListener('change', updateSubjectDetails);
});

function updateSubjectDetails() {
    const subjectsSelect = document.getElementById('subjects-select');
    const selectedSubjects = Array.from(subjectsSelect.selectedOptions).map(option => option.value);
    const subjectDetailsContainer = document.getElementById('subject-details-container');

    subjectDetailsContainer.innerHTML = ''; // Clear previous details

    selectedSubjects.forEach(subject => {
        const subjectDetailDiv = document.createElement('div');
        subjectDetailDiv.className = 'form-group';
        subjectDetailDiv.innerHTML = `
            <label for="${subject}-study-min">Study Min for ${subject}:</label>
            <input type="number" id="${subject}-study-min" class="form-control" placeholder="Minutes">
        `;
        subjectDetailsContainer.appendChild(subjectDetailDiv);
    });
}

function generateStudyPlan() {
    const templateSelect = document.getElementById('template-select').value;
    const subjectsSelect = document.getElementById('subjects-select');
    const selectedSubjects = Array.from(subjectsSelect.selectedOptions).map(option => option.value);
    const studyPlanDiv = document.getElementById('study-plan');

    let studyPlanHTML = '';

    switch(templateSelect) {
        case 'template1':
            studyPlanHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Time</th>
                            ${selectedSubjects.map(subject => `<th>${subject}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${generateTimeSlots().map(timeSlot => `
                            <tr>
                                <td>${timeSlot}</td>
                                ${selectedSubjects.map(subject => `<td id="${subject}-${timeSlot.replace(':', '')}"></td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            break;
        // Add cases for other templates
        default:
            studyPlanHTML = '<p>Please select a template.</p>';
    }

    studyPlanDiv.innerHTML = studyPlanHTML;

    // Fill in study times for each subject
    selectedSubjects.forEach(subject => {
        const studyMin = document.getElementById(`${subject}-study-min`).value || 0;
        distributeStudyTime(subject, studyMin);
    });
}

function generateTimeSlots() {
    const startTime = document.getElementById('start-time').value || '08:00';
    const endTime = document.getElementById('end-time').value || '18:00';

    let timeSlots = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);
    const endTimeDate = new Date(`1970-01-01T${endTime}:00`);

    while (currentTime <= endTimeDate) {
        timeSlots.push(currentTime.toTimeString().substr(0, 5));
        currentTime.setMinutes(currentTime.getMinutes() + 60);
    }

    return timeSlots;
}

function distributeStudyTime(subject, studyMin) {
    const timeSlots = generateTimeSlots();
    const slotsCount = timeSlots.length;
    const studyPerSlot = Math.floor(studyMin / slotsCount);
    const extraStudy = studyMin % slotsCount;

    timeSlots.forEach((timeSlot, index) => {
        const cellId = `${subject}-${timeSlot.replace(':', '')}`;
        const studyTime = studyPerSlot + (index < extraStudy ? 1 : 0);
        document.getElementById(cellId).innerText = `${studyTime} min`;
    });
}

