// Função para inicializar o Preview dos Projetos
const initProjectPreviews = () => {
    const cards = document.querySelectorAll('.project-card-rich');
    if (cards.length === 0) return;

    const previewContainer = document.createElement('div');
    previewContainer.className = 'fixed pointer-events-none z-[200] opacity-0 scale-95 transition-all duration-300 rounded-lg overflow-hidden border-2 border-brand shadow-2xl w-72 aspect-video hidden lg:block';
    previewContainer.style.backgroundSize = 'cover';
    previewContainer.style.backgroundPosition = 'center';
    previewContainer.style.top = '0';
    previewContainer.style.left = '0';
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
            const x = e.clientX + 25;
            const y = e.clientY + 25;
            previewContainer.style.transform = `translate(${x}px, ${y}px)`;
        });

        card.addEventListener('mouseleave', () => {
            previewContainer.classList.add('opacity-0', 'scale-95');
            previewContainer.classList.remove('opacity-100', 'scale-100');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Ícones Lucide
    lucide.createIcons();

    const html = document.documentElement;

    // 2. Lógica Unificada de Tema (PC e Mobile)
    const themeButtons = document.querySelectorAll('#theme-toggle, .theme-btn, #theme-toggle-mobile');
    
    // Função para aplicar o tema
    const setTheme = (isDark) => {
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        // Atualiza os ícones após a troca
        lucide.createIcons();
    };

    // Verifica preferência salva
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Listener para todos os botões de tema
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            setTheme(!isDark);
        });
    });

    // 3. Lógica do Menu Mobile
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        if (menu) {
            menu.classList.toggle('translate-x-full');
            document.body.style.overflow = menu.classList.contains('translate-x-full') ? '' : 'hidden';
        }
    };

    openBtn?.addEventListener('click', toggleMenu);
    closeBtn?.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', toggleMenu));

    // 4. Cursor Customizado
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2)');
            el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
        });
    }

    // 5. Ajuste da Navbar no Scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('py-2', 'shadow-sm');
                nav.classList.remove('py-4');
            } else {
                nav.classList.add('py-4');
                nav.classList.remove('py-2', 'shadow-sm');
            }
        }
    });

    // 6. ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
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
    }

    // 7. Iniciar Previews de Projetos
    initProjectPreviews();
});