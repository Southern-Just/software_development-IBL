const journalForm = document.getElementById('journalForm');
const entryTitleInput = document.getElementById('entryTitle');
const entryContentInput = document.getElementById('entryContent');
const entriesList = document.getElementById('entriesList');

journalForm.addEventListener('submit', saveEntry);

function saveEntry(event) {
  event.preventDefault();
  
  const title = entryTitleInput.value;
  const content = entryContentInput.value;
  
  const entry = {
    title,
    content,
    timestamp: new Date().toLocaleString()
  };
  
  // Send the entry to the server using an AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/entries');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(entry));
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        entryTitleInput.value = '';
        entryContentInput.value = '';
        fetchEntries(); // Refresh the entries list
      } else {
        console.error('Error:', xhr.status);
      }
    }
  };
}

function fetchEntries() {
  // Fetch the entries from the server using an AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/entries');
  xhr.send();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const entries = JSON.parse(xhr.responseText);
        displayEntries(entries);
      } else {
        console.error('Error:', xhr.status);
      }
    }
  };
}

function displayEntries(entries) {
  entriesList.innerHTML = '';
  
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.innerHTML = `
      <h2>${entry.title}</h2>
      <p>${entry.content}</p>
      <p>${entry.timestamp}</p>
    `;
    entriesList.appendChild(entryElement);
  });
}

// Fetch the entries when the page loads
fetchEntries();
