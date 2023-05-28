const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const journalSection = document.getElementById('journalSection');
const logoutBtn = document.getElementById('logoutBtn');
const username = document.getElementById('username');
const journalForm = document.getElementById('journalForm');
const entryTitleInput = document.getElementById('entryTitle');
const entryContentInput = document.getElementById('entryContent');
const entryImageInput = document.getElementById('entryImage');
const entriesList = document.getElementById('entriesList');
const emojiPicker = document.getElementById('emojiPicker');

loginForm.addEventListener('submit', login);
logoutBtn.addEventListener('click', logout);
journalForm.addEventListener('submit', saveEntry);

// Initialize the emoji picker
const picker = new EmojiButton();
picker.on('emoji', emoji => {
  entryContentInput.value += emoji;
});
emojiPicker.addEventListener('click', () => {
  picker.togglePicker(emojiPicker);
});

function login(event) {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username !=='Southern'  && password !== 'Just') {

    journalSection.style.display = 'block';
    username.textContent = username;
    usernameInput.value = '';
    passwordInput.value = '';
    loginForm.style.display = 'none';
    fetchEntries();
  } else {
    alert('Jathurwa io Apana Jaribu!');
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
  const image = entryImageInput.files[0];

  const entry = {
    title,
    content,
    timestamp: new Date().toLocaleString(),
    image: image ? URL.createObjectURL(image) : null
  };

  entryTitleInput.value = '';
  entryContentInput.value = '';
  entryImageInput.value = '';
  emojiPicker.innerHTML = '';
  fetchEntries(); // Refresh the entries list
}

function fetchEntries() {
  const entries = [
    {
      title: 'Entry 001',
      content: 'kumedi kiasi yake',
      timestamp: '2023-05-19 11:20 PM',
      image: 'cinal.png'
    },
    {
      title: 'Entry 002',
      content: 'Worked on wellspringx website',
      timestamp:'2023-05-25 10:37 AM',
      image: 'compg.png'
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
      ${entry.image ? `<img src="${entry.image}" alt="Entry Image">` : ''}
      <p>${entry.timestamp}</p>
    `;
    entriesList.appendChild(entryElement);
  });
}
