// GSAP ve ScrollToPlugin'i kaydet
gsap.registerPlugin(ScrollToPlugin);

// Navigasyon işlevleri
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = mobileMenu.querySelector('div');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    let isScrolling = false;
    let lastScrollY = window.scrollY;
    let ticking = false;
    const toast = new Toast();

    // Mobil menü toggle fonksiyonu
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (!isOpen) {
            mobileMenu.style.display = 'block';
            setTimeout(() => {
                mobileMenuContent.style.opacity = '1';
                mobileMenuContent.style.transform = 'translateY(0)';
            }, 10);
            mobileMenu.classList.add('active');
        } else {
            mobileMenuContent.style.opacity = '0';
            mobileMenuContent.style.transform = 'translateY(-0.5rem)';
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.remove('active');
            }, 300);
        }
    }

    // Mobil menü buton click eventi
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Sayfa dışı tıklamada menüyü kapat
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // İlk yüklemede aktif linki belirle
    updateActiveLink(window.scrollY);

    // Nav linkler için scroll ve active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            
            // İletişim linkine tıklandığında
            if (targetId === '#contact') {
                e.stopPropagation();
                toast.error('İletişim bölümü şu anda bakımdadır. En kısa sürede aktif olacaktır.', 5000);
                return;
            }

            if (isScrolling) return;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Mobil menüyü kapat
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }

                isScrolling = true;
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Gelişmiş scroll animasyonu
                const currentScroll = window.pageYOffset;
                const targetScroll = targetSection.offsetTop - 50;
                const distance = Math.abs(targetScroll - currentScroll);
                const duration = Math.min(1.5, 0.5 + distance / 3000);

                gsap.to(window, {
                    duration: duration,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 50,
                        autoKill: false
                    },
                    ease: "power2.inOut",
                    onComplete: () => {
                        isScrolling = false;
                        updateActiveLink(window.scrollY);
                    }
                });
            }
        });
    });

    // Scroll event listener - throttle ile optimize edildi
    let lastTime = 0;
    const throttleDelay = 100; // 100ms

    window.addEventListener('scroll', () => {
        const now = Date.now();
        
        if (now - lastTime >= throttleDelay) {
            if (!isScrolling) {
                lastScrollY = window.scrollY;
                handleScroll(lastScrollY);
                updateActiveLink(lastScrollY);
            }
            lastTime = now;
        }
    }, { passive: true });

    function handleScroll(scrollY) {
        const nav = document.querySelector('nav');
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    function updateActiveLink(scrollY) {
        if (isScrolling) return;

        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
});

// Sayfa yüklendiğinde ve resize olduğunda section offsetları güncelle
function updateSectionOffsets() {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        section.dataset.offset = section.offsetTop;
    });
}

window.addEventListener('load', updateSectionOffsets);
window.addEventListener('resize', debounce(updateSectionOffsets, 150));
