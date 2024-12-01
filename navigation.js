// GSAP ve ScrollToPlugin'i kaydet
gsap.registerPlugin(ScrollToPlugin);

// Navigasyon işlevleri
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    let isScrolling = false;
    let lastScrollY = window.scrollY;
    const toast = new Toast();

    // Mobil menü toggle fonksiyonu
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (!isOpen) {
            // Menüyü aç
            document.body.style.overflow = 'hidden';
            mobileMenu.style.display = 'flex';
            requestAnimationFrame(() => {
                mobileMenu.classList.add('active');
                gsap.to(mobileMenu, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        } else {
            // Menüyü kapat
            gsap.to(mobileMenu, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    mobileMenu.classList.remove('active');
                    mobileMenu.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Mobil menü buton click eventi
    mobileMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Mobil menü linkleri için event listener
    mobileLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const targetId = link.getAttribute('href');
            
            // İletişim linkine tıklandığında
            if (targetId === '#contact') {
                toast.error('İletişim bölümü şu anda bakımdadır. En kısa sürede aktif olacaktır.', 5000);
                toggleMobileMenu();
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            // Önce menüyü kapat
            toggleMobileMenu();
            
            // Menü kapanma animasyonunu bekle
            await new Promise(resolve => setTimeout(resolve, 300));

            // Smooth scroll
            const headerHeight = document.querySelector('nav').offsetHeight || 0;
            const offset = headerHeight + 20;

            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: offset,
                    autoKill: false
                },
                ease: 'power2.out'
            });

            // URL'i güncelle
            history.pushState(null, '', targetId);
        });
    });

    // Desktop nav linkleri için event listener
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const targetId = link.getAttribute('href');
            
            if (targetId === '#contact') {
                toast.error('İletişim bölümü şu anda bakımdadır. En kısa sürede aktif olacaktır.', 5000);
                return;
            }

            if (isScrolling) return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            isScrolling = true;

            try {
                // Aktif linki güncelle
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Header yüksekliğini hesapla
                const headerHeight = document.querySelector('nav').offsetHeight || 0;
                const offset = headerHeight + 50;

                // Smooth scroll animasyonu
                await gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: offset,
                        autoKill: false
                    },
                    ease: 'power2.out'
                });

                // URL'i güncelle
                history.pushState(null, '', targetId);
            } catch (error) {
                console.error('Scroll error:', error);
            } finally {
                isScrolling = false;
                updateActiveLink(window.scrollY);
            }
        });
    });

    // Scroll event listener with Lodash debounce
    window.addEventListener('scroll', _.debounce(function() {
        if (!isScrolling) {
            lastScrollY = window.scrollY;
            handleScroll(lastScrollY);
            updateActiveLink(lastScrollY);
        }
    }, 100));

    function handleScroll(scrollY) {
        const nav = document.querySelector('nav');
        if (nav) {
            if (scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }

    function updateActiveLink(scrollY) {
        if (isScrolling) return;

        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('nav').offsetHeight || 0;
        const offset = headerHeight + 100;
        
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        const allLinks = [...navLinks, ...mobileLinks];
        allLinks.forEach(link => {
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
    const headerHeight = document.querySelector('nav').offsetHeight || 0;
    
    sections.forEach(section => {
        section.dataset.offset = section.offsetTop - headerHeight;
    });
}

window.addEventListener('load', updateSectionOffsets);
window.addEventListener('resize', _.debounce(updateSectionOffsets, 150));
