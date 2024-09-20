const ENTRY_STORAGE_KEY = 'entries';

function calculateAge({ dob }) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem(ENTRY_STORAGE_KEY)) || [];

    if (entries.length === 0) {
        console.log("No entries found, starting with an empty table.");
        return;
    }

    entries.forEach(addEntryToTable);
}

function addEntryToTable({ name, email, password, dob, acceptedTerms }) {
    const table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const passwordCell = newRow.insertCell(2);
    const dobCell = newRow.insertCell(3);
    const acceptedTermsCell = newRow.insertCell(4);

    nameCell.textContent = `${name}`;
    emailCell.textContent = `${email}`;
    passwordCell.textContent = `${password}`;
    dobCell.textContent = `${dob}`;
    acceptedTermsCell.textContent = `${acceptedTerms ? 'true' : 'false'}`;
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    const age = calculateAge({ dob });
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years old.");
        return;
    }

    const entry = { name, email, password, dob, acceptedTerms };

    const entries = JSON.parse(localStorage.getItem(ENTRY_STORAGE_KEY)) || [];
    entries.push(entry);
    localStorage.setItem(ENTRY_STORAGE_KEY, JSON.stringify(entries));

    addEntryToTable(entry);

    document.getElementById('registrationForm').reset();
});

window.onload = function() {
    loadEntries();
};
