// Inicializar Ícones Lucide
lucide.createIcons();

// Lógica de Troca de Tema (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Verifica preferência anterior
if (localStorage.theme === 'light') {
    html.classList.remove('dark');
} else {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    }
});

// Lógica do Cursor Customizado
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// Configuração do ScrollReveal
const revealConfig = {
    distance: '30px',
    duration: 1000,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 100
};

ScrollReveal().reveal('.reveal-up', { ...revealConfig, origin: 'bottom' });
ScrollReveal().reveal('.reveal-left', { ...revealConfig, origin: 'left', distance: '50px', delay: 100 });
ScrollReveal().reveal('.reveal-right', { ...revealConfig, origin: 'right', distance: '50px', delay: 100 });

// Ajuste da Navbar no Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('py-2', 'shadow-sm');
        nav.classList.remove('py-4');
    } else {
        nav.classList.add('py-4');
        nav.classList.remove('py-2', 'shadow-sm');
    }
});