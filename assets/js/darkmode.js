const body = document.querySelector('body');
const toggle = document.querySelector('#toggle');
const sunIcon = document.querySelector('.toggle .bxs-sun');
const moonIcon = document.querySelector('.toggle .bx-moon');

function updateUI(isDarkMode) {
  body.classList.toggle('dark', isDarkMode);
  sunIcon.className = isDarkMode ? 'bx bx-sun' : 'bx bxs-sun';
  moonIcon.className = isDarkMode ? 'bx bxs-moon' : 'bx bx-moon';
}

const isDarkMode = localStorage.getItem('darkMode') === 'true';

updateUI(isDarkMode);

toggle.addEventListener('change', () => {
  const isDarkMode = body.classList.toggle('dark');
  localStorage.setItem('darkMode', isDarkMode);
  updateUI(isDarkMode);
});
