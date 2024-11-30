// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Loader yönetimi
function initLoader() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const loaderPercentage = document.querySelector('.loader-percentage');

    if (!loaderWrapper || !loaderPercentage) {
        console.warn('Loader elementleri bulunamadı');
        return;
    }

    let progress = 0;
    
    function updateLoader() {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;
        
        loaderPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress === 100) {
            setTimeout(() => {
                loaderWrapper.style.opacity = '0';
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                    initializeAnimations();
                    initializePortfolio();
                }, 500);
            }, 500);
            return;
        }
        
        requestAnimationFrame(updateLoader);
    }
    
    requestAnimationFrame(updateLoader);
}

// Initialize animations
function initializeAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // About Section Animations
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutContent = aboutSection.querySelectorAll('.about-content');
        gsap.from(aboutContent, {
            scrollTrigger: {
                trigger: '#about',
                start: 'top center+=100',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2
        });
    }

    // Contact Section Animations
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const contactItems = contactSection.querySelectorAll('.flex.items-center');
        gsap.from(contactItems, {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center+=100',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -50,
            duration: 1,
            stagger: 0.2
        });
    }
}

// About Section Animations
function initializeAboutAnimations() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    // Ana başlık ve intro animasyonu
    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom-=100',
            end: 'center center',
            toggleActions: 'play none none reverse'
        }
    });

    introTl
        .from('#about-heading', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('#about p', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4');

    // Sol kolon animasyonları
    const leftColTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-content:first-child',
            start: 'top bottom-=50',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    leftColTl
        .from('.about-content:first-child article', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        })
        .from('.software-item', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)'
        }, '-=0.4');

    // Sağ kolon animasyonları
    const rightColTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-content:last-child',
            start: 'top bottom-=50',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    rightColTl
        .from('.experience-item', {
            x: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        })
        .from('.about-content:last-child article:last-child', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

    // Hover efektleri
    const softwareItems = document.querySelectorAll('.software-item');
    softwareItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('img'), {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ScrollTrigger yenileme
    ScrollTrigger.refresh();
}

// Contact Section Animations
function initializeContactAnimations() {
    const contactSection = document.querySelector('#contact');
    if (!contactSection) return;

    // Contact heading animation
    gsap.from('#contact h2', {
        scrollTrigger: {
            trigger: '#contact h2',
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Contact info animations
    const contactItems = document.querySelectorAll('#contact .flex');
    if (contactItems.length > 0) {
        gsap.from(contactItems, {
            scrollTrigger: {
                trigger: '#contact .space-y-6',
                start: 'top bottom-=50',
                end: 'bottom center',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
}

// Portfolio items data
const portfolioItems = [
    {
        title: "Tekstil Reklamı",
        description: "Kurumsal reklam videosu",
        type: "corporate",
        imageSrc: "./assets/corporate.jpg",
        videoSrc: "https://www.youtube.com/embed/qlP8xYfWh58?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: true
    },
    {
        title: "Oyun Editi",
        description: "Zula oyun montajı",
        type: "game",
        imageSrc: "./assets/zula.jpg",
        videoSrc: "https://www.youtube.com/embed/hFVmYeu51vo?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: false
    },
    {
        title: "Emlak Reklamı",
        description: "Emlak tanıtım",
        type: "estate",
        imageSrc: "./assets/yeni-klip.jpg",
        videoSrc: "https://www.youtube.com/embed/18KLYl_N7x8?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: false
    },
    {
        title: "Halloween",
        description: "Cadılar bayramında eğlenceli anlar",
        type: "game",
        imageSrc: "./assets/Ekran görüntüsü 2024-11-26 075159.png",
        videoSrc: "https://www.youtube.com/embed/kCAxUDbyRrI?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: true
    },
    {
        title: "İçecek Hazırlama",
        description: "İçecek hazırlama videosu",
        type: "special",
        imageSrc: "./assets/Ekran görüntüsü 2024-11-26 195713.png",
        videoSrc: "https://www.youtube.com/embed/rcREpY1e7vA?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: true
    },
    {
        title: "Sirk Videosu",
        description: "Kurumsal tanıtım",
        type: "corporate",
        imageSrc: "./assets/Ekran görüntüsü 2024-11-26 193557.png",
        videoSrc: "https://www.youtube.com/embed/zv5H_25jiAg?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: true
    },
    {
        title: "Oyun Editi Örneği 2",
        description: "Zula oyun montajı",
        type: "game",
        imageSrc: "./assets/Ekran görüntüsü 2024-11-26 063458.png",
        videoSrc: "https://www.youtube.com/embed/YJfkI9kuSEs?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: false
    },
    {
        title: "Tekstil Reklamı 2",
        description: "Kurumsal Tanıtım",
        type: "special",
        imageSrc: "./assets/Ekran görüntüsü 2024-11-26 235137.png",
        videoSrc: "https://www.youtube.com/embed/kaAFLfuZDJU?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: true
    },
    {
        title: "Sosyal Medya İçin Mizah İçerikleri",
        description: "",
        type: "center",
        imageSrc: "./assets/Ekran görüntüsü 2024-11-27 013848.png",
        videoSrc: "https://www.youtube.com/embed/dyyecdNEuF0?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: false
    },
    {
        title: "Logo Animasyonu Örneği",
        description: "Animasyon Çalışmalarım",
        type: "center-main",
        imageSrc: "./assets/Ekran görüntüsü 2024-11-28 201449.png",
        videoSrc: "https://www.youtube.com/embed/DwEdm3FLbzU?autoplay=1&modestbranding=1&rel=0&showinfo=0",
        isYoutube: true,
        isVertical: false
    }
];

// Initialize portfolio grid
function initializePortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) {
        console.warn('Portfolio grid elementi bulunamadı');
        return;
    }

    // Clear existing items
    portfolioGrid.innerHTML = '';

    // Create and append portfolio items
    portfolioItems.forEach(item => {
        const portfolioItem = createPortfolioItem(item);
        portfolioGrid.appendChild(portfolioItem);
    });

    // Add video hover events
    const videos = document.querySelectorAll('.portfolio-item video');
    videos.forEach(video => {
        video.parentElement.addEventListener('mouseenter', () => {
            video.play().catch(err => console.warn('Video oynatma hatası:', err));
        });
        video.parentElement.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Video modal events
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const portfolioItem = button.closest('.portfolio-item');
            const videoSrc = portfolioItem.querySelector('video').src;
            const title = portfolioItem.querySelector('h3').textContent;
            showVideoModal({ title, video: videoSrc });
        });
    });
}

function createPortfolioItem(item) {
    const article = document.createElement('article');
    article.className = `
        relative group overflow-hidden rounded-lg
        transform transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl
        cursor-pointer
    `;

    // Thumbnail container
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'relative aspect-video w-full overflow-hidden';

    // Ana thumbnail resmi
    const thumbnail = document.createElement('img');
    thumbnail.src = item.imageSrc;
    thumbnail.alt = item.title;
    thumbnail.className = `
        w-full h-full object-cover
        transform transition-all duration-500
        group-hover:scale-105 group-hover:blur-sm
    `;

    // Video önizleme katmanı
    if (item.isYoutube) {
        const previewContainer = document.createElement('div');
        previewContainer.className = `
            absolute inset-0 opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
        `;

        const videoId = item.videoSrc.match(/embed\/([^?]+)/)[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        
        previewContainer.style.backgroundImage = `url(${thumbnailUrl})`;
        previewContainer.style.backgroundSize = 'cover';
        previewContainer.style.backgroundPosition = 'center';
        previewContainer.style.filter = 'blur(8px)';
        
        thumbnailContainer.appendChild(previewContainer);
    }

    // Play button overlay
    const playButton = document.createElement('div');
    playButton.className = `
        absolute inset-0 flex items-center justify-center
        bg-black/40 opacity-0 group-hover:opacity-100
        transition-opacity duration-300
    `;
    
    const playIcon = document.createElement('div');
    playIcon.className = `
        w-16 h-16 flex items-center justify-center
        rounded-full bg-white/10 backdrop-blur-sm
        transform transition-transform duration-300
        group-hover:scale-110
    `;
    
    playIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
    `;

    // Info section
    const info = document.createElement('div');
    info.className = `
        absolute bottom-0 left-0 right-0
        bg-gradient-to-t from-black/80 to-transparent
        p-4 text-white
        transform transition-transform duration-300
    `;

    const title = document.createElement('h3');
    title.textContent = item.title;
    title.className = 'text-lg font-semibold mb-1';

    const description = document.createElement('p');
    description.textContent = item.description;
    description.className = 'text-sm text-gray-300';

    // Assembly
    playButton.appendChild(playIcon);
    info.appendChild(title);
    info.appendChild(description);
    thumbnailContainer.appendChild(thumbnail);
    thumbnailContainer.appendChild(playButton);
    article.appendChild(thumbnailContainer);
    article.appendChild(info);

    // Click handler
    article.onclick = () => showVideoModal(item);

    return article;
}

// Video modal fonksiyonu
function showVideoModal(item) {
    const modal = document.createElement('div');
    modal.className = `
        fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8
        bg-black/80 backdrop-blur-sm
    `;

    const modalContent = document.createElement('div');
    modalContent.className = `
        relative w-full mx-auto bg-gray-900 rounded-lg overflow-hidden
        ring-1 ring-white/10 shadow-lg
        ${item.isVertical ? 'max-w-[350px] sm:max-w-[400px]' : 'max-w-4xl'}
    `;
    
    const videoContainer = document.createElement('div');
    videoContainer.className = `
        ${item.isVertical ? 'aspect-[9/16]' : 'aspect-video'}
        relative
    `;
    
    const video = document.createElement('iframe');
    video.src = item.videoSrc;
    video.frameBorder = "0";
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    video.allowFullscreen = true;
    video.className = 'absolute inset-0 w-full h-full';

    const header = document.createElement('div');
    header.className = 'p-4 flex justify-between items-center border-b border-white/10';
    
    const title = document.createElement('h3');
    title.textContent = item.title;
    title.className = 'text-lg font-semibold text-white';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `;
    closeButton.className = 'text-gray-400 hover:text-white transition-colors';
    closeButton.onclick = () => {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => modal.remove()
        });
    };

    header.appendChild(title);
    header.appendChild(closeButton);
    videoContainer.appendChild(video);
    modalContent.appendChild(header);
    modalContent.appendChild(videoContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Escape tuşu ile kapatma
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeButton.click();
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Modal dışına tıklama ile kapatma
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeButton.click();
        }
    });

    // Modal açılış animasyonu
    gsap.from(modalContent, {
        y: 20,
        opacity: 0,
        duration: 0.3
    });
}

// Mobil menü yönetimi
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = mobileMenu.querySelector('div');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    let isAnimating = false;

    // Scroll kilitleme fonksiyonu
    function toggleScrollLock(lock) {
        document.body.style.overflow = lock ? 'hidden' : '';
        document.body.style.touchAction = lock ? 'none' : '';
    }

    // Menü buton durumunu güncelle
    function updateMenuButtonState(isOpen) {
        const spans = mobileMenuButton.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (isOpen) {
                span.style.transition = 'transform 0.3s ease-in-out';
                if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                else if (index === 1) span.style.opacity = '0';
                else if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                span.style.transition = 'transform 0.3s ease-in-out';
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    }

    // Mobil menü toggle
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isAnimating) toggleMobileMenu();
    });

    // Touch olayları için pasif listener
    document.addEventListener('touchstart', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            e.preventDefault();
            toggleMobileMenu();
        }
    }, { passive: false });

    // Sayfa dışı tıklamada menüyü kapat
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Mobil menü linklerine tıklama
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
            // Smooth scroll için timeout
            setTimeout(() => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    });

    function toggleMobileMenu() {
        if (isAnimating) return;
        isAnimating = true;
        
        const isOpen = mobileMenu.classList.contains('active');
        
        if (!isOpen) {
            mobileMenu.style.display = 'block';
            toggleScrollLock(true);
            updateMenuButtonState(true);
            
            requestAnimationFrame(() => {
                mobileMenuContent.style.opacity = '1';
                mobileMenuContent.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    mobileMenu.classList.add('active');
                    isAnimating = false;
                }, 300);
            });
        } else {
            mobileMenuContent.style.opacity = '0';
            mobileMenuContent.style.transform = 'translateY(-0.5rem)';
            toggleScrollLock(false);
            updateMenuButtonState(false);
            
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.remove('active');
                isAnimating = false;
            }, 300);
        }
    }
}

// Navigation
function initNavigation() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });

        // Mobil menüdeki linklere tıklandığında menüyü kapat
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    function closeMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }

    // Handle navigation clicks
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                closeMenu();
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active link on scroll
    let ticking = false;
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                [...navLinks, ...mobileNavLinks].forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Debounce yardımcı fonksiyonu
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll animasyonları için ekran boyutuna göre ayarlama
const updateScrollAnimations = () => {
    const isMobile = window.innerWidth < 768;
    
    gsap.utils.toArray('.about-content > div').forEach((section, i) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: isMobile ? 0 : i * 0.2
        });
    });
};

// Ekran boyutu değiştiğinde animasyonları güncelle
window.addEventListener('resize', debounce(updateScrollAnimations, 250));

// Sayfa yüklendiğinde animasyonları başlat
window.addEventListener('load', () => {
    updateScrollAnimations();
});

document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initializeAnimations();
    initializeAboutAnimations();
    initializeContactAnimations();
    initNavigation();
    initMobileMenu();
});