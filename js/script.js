const subjects = [
    "English Adv",
    "English Std",
    "English Studies",
    "English Ext 1",
    "English Ext 2",
    "EAL/D",
    "Math Std 1",
    "Math Std 2",
    "Math Adv",
    "Math Ext 1",
    "Math Ext 2",
    "Biology",
    "Chemistry",
    "Earth & Env Sci",
    "Physics",
    "Investigating Sci",
    "Science Ext",
    "Ancient History",
    "Modern History",
    "History Ext",
    "Business Studies",
    "Economics",
    "Geography",
    "Legal Studies",
    "Society & Culture",
    "Studies of Religion I",
    "Studies of Religion II",
    "Chinese",
    "French",
    "German",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Modern Greek",
    "Spanish",
    "Vietnamese",
    "Classical Greek",
    "Latin",
    "Dance",
    "Drama",
    "Music 1",
    "Music 2",
    "Music Ext",
    "Visual Arts",
    "Agriculture",
    "Design & Tech",
    "Engineering Studies",
    "Food Tech",
    "Industrial Tech",
    "IPT",
    "SDD",
    "Textiles & Design",
    "PDHPE",
    "CAFS",
    "Business Services",
    "Construction",
    "Hospitality",
    "IDT",
    "Primary Industries",
    "Retail Services",
    "Tourism",
    "Aboriginal Studies"
];

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
            <div id="${subject}-times-container
