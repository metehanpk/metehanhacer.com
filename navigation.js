// GSAP ve ScrollToPlugin'i kaydet
gsap.registerPlugin(ScrollToPlugin);

// Navigasyon işlevleri
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let isScrolling = false;
    let lastScrollY = window.scrollY;
    let ticking = false;

    // İlk yüklemede aktif linki belirle
    updateActiveLink(window.scrollY);

    // Nav linkler için scroll ve active state
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (isScrolling) return;

            const targetId = e.currentTarget.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
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
                    onStart: () => {
                        gsap.to(targetSection, {
                            duration: 0.5,
                            scale: 1.02,
                            ease: "power2.out"
                        });
                    },
                    onComplete: () => {
                        isScrolling = false;
                        updateActiveLink(window.scrollY);
                        gsap.to(targetSection, {
                            duration: 0.5,
                            scale: 1,
                            ease: "power2.out"
                        });
                    }
                });
            }
        });
    });

    // Scroll event listener
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll(lastScrollY);
                if (!isScrolling) {
                    updateActiveLink(lastScrollY);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function handleScroll(scrollY) {
        if (scrollY > 100) {
            navMenu.classList.add('scrolled');
        } else {
            navMenu.classList.remove('scrolled');
        }
    }

    function updateActiveLink(scrollY) {
        if (isScrolling) return;

        const sections = document.querySelectorAll('section[id], header[id]');
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        const isAtBottom = (windowHeight + scrollY) >= documentHeight - 50;
        
        if (isAtBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#contact') {
                    link.classList.add('active');
                }
            });
            return;
        }

        // Görünür bölüm tespiti
        let currentSection = null;
        let maxVisibility = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = rect.height;
            const visibleHeight = Math.min(windowHeight, Math.max(0, 
                Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
            ));
            const visibilityRatio = visibleHeight / sectionHeight;

            if (visibilityRatio > maxVisibility) {
                maxVisibility = visibilityRatio;
                currentSection = section;
            }
        });

        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection.id}`) {
                    link.classList.add('active');
                }
            });
        }
    }
});

// Sayfa yüklendiğinde ve resize olduğunda section offsetları güncelle
let sectionOffsets = {};
function updateSectionOffsets() {
    document.querySelectorAll('section[id]').forEach(section => {
        sectionOffsets[section.id] = section.offsetTop;
    });
}
    
window.addEventListener('load', updateSectionOffsets);
window.addEventListener('resize', updateSectionOffsets);
