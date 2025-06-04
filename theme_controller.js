
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
document.querySelector('.theme_switcher_circle1').setAttribute('data-theme', currentTheme);


function toggleTheme() {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('.theme_switcher_circle1').setAttribute('data-theme', newTheme);
}


document.getElementById('themeToggle').addEventListener('click', toggleTheme);