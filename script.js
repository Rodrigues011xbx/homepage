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


document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO MENU MOBILE ---
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        menu.classList.toggle('translate-x-full');
        document.body.style.overflow = menu.classList.contains('translate-x-full') ? '' : 'hidden';
    };

    openBtn?.addEventListener('click', toggleMenu);
    closeBtn?.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', toggleMenu));


    // --- LÓGICA DE TROCA DE TEMA (DARK/LIGHT) ---
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;

    // Verifica se já existe uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Recarrega os ícones do Lucide para garantir que o ícone de sol/lua atualize
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    });
    
    // Inicializa ícones
    if (window.lucide) {
        window.lucide.createIcons();
    }
});


// Adicione esta função ao final do seu arquivo script.js
const initProjectPreviews = () => {
    const cards = document.querySelectorAll('.project-card-rich');
    const previewContainer = document.createElement('div');
    
    // Estilização do preview (oculto por padrão e escondido no mobile)
    previewContainer.className = 'fixed pointer-events-none z-[200] opacity-0 scale-95 transition-all duration-300 rounded-lg overflow-hidden border-2 border-brand shadow-2xl w-72 aspect-video hidden lg:block';
    previewContainer.style.backgroundSize = 'cover';
    previewContainer.style.backgroundPosition = 'center';
    document.body.appendChild(previewContainer);

    cards.forEach(card => {
        const projectImg = card.getAttribute('data-image');

        card.addEventListener('mouseenter', () => {
            if (projectImg) {
                previewContainer.style.backgroundImage = `url(${projectImg})`;
                previewContainer.classList.remove('opacity-0', 'scale-95');
                previewContainer.classList.add('opacity-100', 'scale-100');
            }
        });

        card.addEventListener('mousemove', (e) => {
            // Segue o mouse com leve atraso visual
            const x = e.clientX + 25;
            const y = e.clientY + 25;
            previewContainer.style.transform = `translate(${x}px, ${y}px)`;
            // Resetamos o top/left para usar o translate para melhor performance
            previewContainer.style.top = '0';
            previewContainer.style.left = '0';
        });

        card.addEventListener('mouseleave', () => {
            previewContainer.classList.add('opacity-0', 'scale-95');
            previewContainer.classList.remove('opacity-100', 'scale-100');
        });
    });
};

// Execute a função no final do DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... suas lógicas anteriores de tema e menu ...
    
    initProjectPreviews();
    
    // Re-inicializa os ícones do Lucide para os novos cards
    if (window.lucide) {
        window.lucide.createIcons();
    }
});