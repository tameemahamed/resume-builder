// Function to handle form submission and generate resume PDF
function generateResume() {
    let y = 70;
    var doc = new jsPDF();

    // Retrieve data from personal information section
    let personalInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    // Set background color
    doc.setFillColor(255,255,255); 
    doc.rect(0, 0, 210, 297, 'F');

    // Add profile image
    let profileImg = document.getElementById('profile-img').files[0];
    let defaultImg = 'images/default-avatar.jpg';

    let addProfileImage = (base64Image) => {
        doc.addImage(base64Image, 'JPEG', 150, 10, 50, 50);
        finalizeResume();
    };

    if (profileImg) {
        let reader = new FileReader();
        reader.onload = function (event) {
            addProfileImage(event.target.result);
        };
        reader.readAsDataURL(profileImg);
    } else {
        loadDefaultImage(defaultImg, addProfileImage);
    }

    function loadDefaultImage(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            let reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    function finalizeResume() {
        

        // Set font style and add personal information
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 128); // dark blue
        doc.text(20, 30, `${personalInfo.name}`);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // black
        doc.setFont("helvetica", "normal");
        
        doc.setFont("helvetica", "bold");
        doc.text(20, y, `Email: `);
        doc.setFont("helvetica", "normal");
        doc.text(42, y, `${personalInfo.email}`);
        y += 10;

        doc.setFont("helvetica", "bold");
        doc.text(20, y, `Phone: `);
        doc.setFont("helvetica", "normal");
        doc.text(42, y, `${personalInfo.phone}`);
        y += 10;

        doc.setFont("helvetica", "bold");
        doc.text(20, y, `Address: `);
        doc.setFont("helvetica", "normal");
        doc.text(42, y, `${personalInfo.address}`);
        y += 20;

        // Add education details
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 128); // dark blue
        doc.text(20, y, "Education");
        y += 10;

        let educationFields = document.querySelectorAll('#education-fields .education-field');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // black
        doc.setFont("helvetica", "normal");
        educationFields.forEach((field, index) => {
            let school = field.querySelector('.school').value;
            let degree = field.querySelector('.degree').value;
            let year = field.querySelector('.year').value;
            if (school !== '' && degree !== '' && year !== '') {
                doc.text(20, y, `-------------------------------------------------------------------------------------------------------------`);
                y += 5;
                doc.setFont("helvetica", "bold");
                doc.text(30, y, `${degree}`);
                y += 10;
                doc.setFont("helvetica", "normal");
                doc.text(30, y, `${school}`);
                y += 10;
                doc.text(30, y, `Passing Year: ${year}`);
                y += 5;
            }
        });
        doc.text(20, y, `-------------------------------------------------------------------------------------------------------------`);
        y += 15;

        // Add experience details
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 128); // dark blue
        doc.text(20, y, "Work Experience");
        y += 10;

        let experienceFields = document.querySelectorAll('#experience-fields .experience-field');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // black
        doc.setFont("helvetica", "normal");
        experienceFields.forEach((field, index) => {
            let company = field.querySelector('.company').value;
            let position = field.querySelector('.position').value;
            let duration = field.querySelector('.duration').value;
            if (company !== '' && position !== '' && duration !== '') {
                doc.text(30, y, `- ${position} at ${company} for ${duration} years`);
                y += 10;
            }
        });
        

        // Add skills
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 128); // dark blue
        doc.text(20, y, "Skills");
        y += 10;
        let skillFields = document.querySelectorAll('#skills-fields .skill-field');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // black
        doc.setFont("helvetica", "normal");
        let x=20;
        let i=0;
        let ch='';
        const charWidth = 2;
        skillFields.forEach((field, index) => {
            let skill = field.querySelector('.skill').value;
            if (skill !== '') {
                console.log(x);
                doc.text(x, y, `${ch}${skill}` );
                if(ch.length==0) ch=' ';
                x += (skill.length +ch.length) * charWidth;
                ch=', ';
            }
        });


        // Add footer note
        y = doc.internal.pageSize.height - 20;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128); // grey
        doc.text(20, y, "made by tameem ahamed");

        // Save the PDF with a filename based on the user's name
        doc.save(`resume_${personalInfo.name.replace(/\s+/g, '_').toLowerCase()}.pdf`);
        
    
    }
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
