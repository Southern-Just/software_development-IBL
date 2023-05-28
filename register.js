const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const journalSection = document.getElementById('journalSection');
const logoutBtn = document.getElementById('logoutBtn');
const username = document.getElementById('username');
const journalForm = document.getElementById('journalForm');
const entryTitleInput = document.getElementById('entryTitle');
const entryContentInput = document.getElementById('entryContent');
const entriesList = document.getElementById('entriesList');

loginForm.addEventListener('submit', login);
logoutBtn.addEventListener('click', logout);
journalForm.addEventListener('submit', saveEntry);

function login(event) {
  event.preventDefault();
  
  const username = usernameInput.value;
  const password = passwordInput.value;
  
  // Validate the username and password (e.g., check against a database)
  // For simplicity, we use a hardcoded check here
  if (username === 'admin' && password === 'password') {
    // Display the journal section and update the username
    journalSection.style.display = 'block';
    username.textContent = username;
    usernameInput.value = '';
    passwordInput.value = '';
    loginForm.style.display = 'none';
    fetchEntries(); // Fetch the existing journal entries
  } else {
    alert('Invalid username or password');
  }
}

function logout() {
  // Clear the username and show the login section
  journalSection.style.display = 'none';
  loginForm.style.display = 'block';
}

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
  // For simplicity, we skip the server-side code in this example
  // and assume the entry is successfully saved
  
  entryTitleInput.value = '';
  entryContentInput.value = '';
  fetchEntries(); // Refresh the entries list
}

function fetchEntries() {
  // Fetch the entries from the server using an AJAX request
  // For simplicity, we skip the server-side code in this example
  // and assume the entries are successfully retrieved
  const entries = [
    {
      title: 'First Entry',
      content: 'This is my first journal entry.',
      timestamp: '2023-05-26 10:00 AM'
    },
    {
      title: 'Second Entry',
      content: 'This is my second journal entry.',
      timestamp: '2023-05-27 2:30 PM'
    }
  ];
  
  displayEntries(entries);
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
