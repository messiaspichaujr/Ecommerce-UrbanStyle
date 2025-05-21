// Modo Noturno
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  themeToggle.innerHTML = html.dataset.theme === 'dark' 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';  

  localStorage.setItem('theme', html.dataset.theme);
});

const savedTheme = localStorage.getItem('theme') || 'light';
html.dataset.theme = savedTheme;
themeToggle.innerHTML = savedTheme === 'dark' 
  ? '<i class="fas fa-sun"></i>' 
  : '<i class="fas fa-moon"></i>';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loading').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.loading').style.display = 'none';
    }, 300);
  }, 500);
});

document.querySelector('.close-cart').addEventListener('click', (e) => {
  e.stopPropagation();
  document.querySelector('.cart-dropdown').style.opacity = '0';
  document.querySelector('.cart-dropdown').style.visibility = 'hidden';
  document.querySelector('.cart-dropdown').style.transform = 'translateY(20px)';
});

document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;

  showNotification('Obrigado por assinar nossa newsletter!');
  e.target.querySelector('input').value = '';
});

function showNotification(message) {
  const notification = document.querySelector('.notification');
  notification.querySelector('.notification-text').textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}