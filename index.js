// Function to calculate age from date of birth
function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birth date in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Function to load previously saved entries from localStorage
function loadEntries() {
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

    // Check if there are any saved entries and populate the table
    if (savedEntries.length === 0) {
        console.log("No entries found; starting with an empty table.");
        return; // Do not add rows if there are no saved entries
    }

    savedEntries.forEach(entry => addEntryToTable(entry));
}

// Function to add a new row to the table
function addEntryToTable(entry) {
    const tableBody = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();

    // Insert cells in the new row
    const nameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const dobCell = newRow.insertCell(3);
    const acceptedTermsCell = newRow.insertCell(4);

    // Populate cell values
    nameCell.textContent = entry.name;
    emailCell.textContent = entry.email;
    passwordCell.textContent = entry.password; // Display actual password (consider security)
    dobCell.textContent = entry.dob;
    acceptedTermsCell.textContent = entry.acceptedTerms ? 'Yes' : 'No';
}

// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh on form submission

    // Retrieve form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Check age validity
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return; // Prevent form submission if age is not valid
    }

    // Create and save the entry
    const entry = { name, email, password, dob, acceptedTerms };
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    // Add the new entry to the table
    addEntryToTable(entry);

    // Reset the form fields
    document.getElementById('registrationForm').reset();
});

// Load entries from localStorage when the page loads
window.onload = loadEntries;
