// Function to handle form submission and generate resume PDF
function generateResume() {
    // Initialize jsPDF
    var doc = new jsPDF();

    // Retrieve data from personal information section
    let personalInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    // Set font style for the document
    doc.setFont("helvetica");
    doc.setFontSize(20);
    doc.text(20, 20, `Resume for ${personalInfo.name}`);

    // Format and add personal information to the PDF
    let y = 40;
    doc.setFontSize(14);
    doc.text(20, y, `Email: ${personalInfo.email}`);
    y += 10;
    doc.text(20, y, `Phone: ${personalInfo.phone}`);
    y += 10;
    doc.text(20, y, `Address: ${personalInfo.address}`);
    y += 20;

    // Retrieve data from education section
    let educationFields = document.querySelectorAll('#education-fields .education-field');
    let educations = [];
    educationFields.forEach((field, index) => {
        let school = field.querySelector('.school').value;
        let degree = field.querySelector('.degree').value;
        let year = field.querySelector('.year').value;
        if (school !== '' && degree !== '' && year !== '') {
            educations.push({
                school: school,
                degree: degree,
                year: year
            });
            // Add education details to the PDF
            doc.setFontStyle("bold");
            doc.text(20, y, `Education ${index + 1}: ${degree} in ${school} (${year})`);
            y += 10;
            doc.setFontStyle("normal");
        }
    });

    y += 10;

    // Retrieve data from experience section
    let experienceFields = document.querySelectorAll('#experience-fields .experience-field');
    let experiences = [];
    experienceFields.forEach((field, index) => {
        let company = field.querySelector('.company').value;
        let position = field.querySelector('.position').value;
        let duration = field.querySelector('.duration').value;
        if (company !== '' && position !== '' && duration !== '') {
            experiences.push({
                company: company,
                position: position,
                duration: duration
            });
            // Add experience details to the PDF
            doc.setFontStyle("bold");
            doc.text(20, y, `Experience ${index + 1}: ${position} at ${company} (${duration})`);
            y += 10;
            doc.setFontStyle("normal");
        }
    });

    y += 10;

    // Retrieve data from skills section
    let skillFields = document.querySelectorAll('#skills-fields .skill-field');
    let skills = [];
    skillFields.forEach((field, index) => {
        let skill = field.querySelector('.skill').value;
        if (skill !== '') {
            skills.push(skill);
            // Add skills to the PDF
            doc.text(20, y, `- ${skill}`);
            y += 10;
        }
    });

    // Save the PDF with a filename based on the user's name
    doc.save(`resume_${personalInfo.name.replace(/\s+/g, '_').toLowerCase()}.pdf`);
    // Add a line break
    y += 10;

    // Add a button to generate the PDF
    doc.text(20, y, "Generated using Resume Builder");
    y += 10;

    // Output the PDF as data URI
    doc.output('dataurlnewwindow');

    // Example of console logging the generated resume data
    console.log("Resume Generated:");
    console.log("Personal Information:", personalInfo);
    console.log("Educations:", educations);
    console.log("Experiences:", experiences);
    console.log("Skills:", skills);

    // You can further process this data to generate a formatted resume or output HTML
}

// Function to add new fields dynamically
function addField(containerId, fieldClass) {
    let container = document.getElementById(containerId);
    let newField = document.createElement('div');
    newField.classList.add(fieldClass);
    if (fieldClass === 'education-field') {
        newField.innerHTML = `
            <label for="school">School/University:</label>
            <input type="text" class="school" placeholder="Enter your school/university"><br>
            <label for="degree">Degree:</label>
            <input type="text" class="degree" placeholder="Enter your degree"><br>
            <label for="year">Year of Graduation:</label>
            <input type="number" class="year" placeholder="Enter year of graduation">
            <button class="add-field-btn" onclick="removeField(this)">Remove</button>
        `;
    } else if (fieldClass === 'experience-field') {
        newField.innerHTML = `
            <label for="company">Company:</label>
            <input type="text" class="company" placeholder="Enter company name"><br>
            <label for="position">Position:</label>
            <input type="text" class="position" placeholder="Enter your position"><br>
            <label for="duration">Duration:</label>
            <input type="text" class="duration" placeholder="Enter duration (e.g., 2018-2020)">
            <button class="add-field-btn" onclick="removeField(this)">Remove</button>
        `;
    } else if (fieldClass === 'skill-field') {
        newField.innerHTML = `
            <input type="text" class="skill" placeholder="Enter skill">
            <button class="add-field-btn" onclick="removeField(this)">Remove</button>
        `;
    }
    container.appendChild(newField);
}

// Function to remove a field
function removeField(button) {
    button.parentNode.remove();
}

// Event listener for the Generate Resume button
document.getElementById('generate-btn').addEventListener('click', generateResume);

// Event listener for Add Education button
document.getElementById('add-education-btn').addEventListener('click', function() {
    addField('education-fields', 'education-field');
});

// Event listener for Add Experience button
document.getElementById('add-experience-btn').addEventListener('click', function() {
    addField('experience-fields', 'experience-field');
});

// Event listener for Add Skill button
document.getElementById('add-skill-btn').addEventListener('click', function() {
    addField('skills-fields', 'skill-field');
});
