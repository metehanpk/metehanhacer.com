document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const section = entry.target;
            const sectionElements = section.querySelectorAll('h2, p, .counter, .grid > div');
            
            // Ana bölüm animasyonu
            section.classList.add('visible');

            // İç elementlerin animasyonları
            sectionElements.forEach((element, index) => {
                setTimeout(() => {
                    if (element.classList.contains('counter')) {
                        element.classList.add('fade-in');
                        animateCounter(element);
                    } else if (element.tagName === 'H2') {
                        element.classList.add('slide-in');
                    } else {
                        element.classList.add('fade-up');
                    }
                }, index * 200);
            });

            // Bu bölümü bir daha gözlemlemeye gerek yok
            observer.unobserve(section);
        });
    }, options);

    // Her bölümü gözlemle
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Sayaç animasyonu
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16); // 60fps için
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        requestAnimationFrame(updateCounter);
    }
});
