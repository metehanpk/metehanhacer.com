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
        imageSrc: "/assets/corporate.jpg",
        videoSrc: "/assets/corporate_compressed.mp4"
    },
    {
        title: "Oyun Editi",
        description: "Zula oyun montajı",
        type: "game",
        imageSrc: "/assets/zula.jpg",
        videoSrc: "/assets/zula_compressed.mp4"
    },
    {
        title: "Emlak Reklamı",
        description: "Emlak tanıtım",
        type: "estate",
        imageSrc: "/assets/yeni-klip.jpg",
        videoSrc: "/assets/yeni_klip_compressed.mp4"
    },
    {
        title: "Halloween",
        description: "Cadılar bayramında eğlenceli anlar",
        type: "game",
        imageSrc: "/assets/Ekran görüntüsü 2024-11-26 075159.png",
        videoSrc: "/assets/halloween_compressed.mp4"
    },
    {
        title: "İçecek Hazırlama",
        description: "İçecek hazırlama videosu",
        type: "special",
        imageSrc: "/assets/Ekran görüntüsü 2024-11-26 195713.png",
        videoSrc: "/assets/son_deneme_compressed.mp4"
    },
    {
        title: "Sirk Videosu",
        description: "Kurumsal tanıtım",
        type: "corporate",
        imageSrc: "/assets/Ekran görüntüsü 2024-11-26 193557.png",
        videoSrc: "/assets/sirk_compressed.mp4"
    },
    {
        title: "Oyun Editi Örneği 2",
        description: "Zula oyun montajı",
        type: "game",
        imageSrc: "/assets/Ekran görüntüsü 2024-11-26 063458.png",
        videoSrc: "/assets/4_compressed.mp4"
    },
    {
        title: "Tekstil Reklamı 2",
        description: "Kurumsal Tanıtım",
        type: "special",
        imageSrc: "/assets/Ekran görüntüsü 2024-11-26 235137.png",
        videoSrc: "/assets/3_compressed.mp4"
    },
    {
        title: "Sosyal Medya İçin Mizah İçerikleri",
        description: "",
        type: "center",
        imageSrc: "/assets/Ekran görüntüsü 2024-11-27 013848.png",
        videoSrc: "/assets/comp_1_compressed.mp4"
    },
    {
        title: "Logo Animasyonu Örneği",
        description: "Animasyon Çalışmalarım",
        type: "center-main",
        imageSrc: "/assets/Ekran görüntüsü 2024-11-28 201449.png",
        videoSrc: "/assets/alevli_adidas_compressed.mp4"
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
    const portfolioItem = document.createElement('div');
    portfolioItem.className = 'group relative overflow-hidden rounded-xl bg-purple-950/30 transition-all duration-300 hover:bg-purple-950/40';
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'aspect-[16/12] overflow-hidden relative';
    
    // Video önizleme
    const previewVideo = document.createElement('video');
    previewVideo.src = item.videoSrc;
    previewVideo.className = 'h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm';
    previewVideo.muted = true;
    previewVideo.loop = true;
    previewVideo.playsInline = true;

    // Thumbnail image (fallback ve ilk yükleme için)
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = item.imageSrc;
    thumbnailImg.className = 'absolute inset-0 w-full h-full object-cover transition-opacity duration-300';
    thumbnailImg.alt = item.title;
    
    // Hover overlay
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center';
    
    const playButton = document.createElement('button');
    playButton.className = 'play-button bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 shadow-purple-strong flex items-center gap-2';
    playButton.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        İzle
    `;
    
    overlay.appendChild(playButton);
    imageContainer.appendChild(thumbnailImg);
    imageContainer.appendChild(previewVideo);
    imageContainer.appendChild(overlay);
    portfolioItem.appendChild(imageContainer);
    
    const content = document.createElement('div');
    content.className = 'p-4';
    content.innerHTML = `
        <h3 class="text-lg font-semibold text-white">${item.title}</h3>
        <p class="text-sm text-gray-400">${item.description}</p>
        <span class="inline-block mt-2 text-xs text-purple-400">${item.type}</span>
    `;
    
    portfolioItem.appendChild(content);

    // Hover olayları
    portfolioItem.addEventListener('mouseenter', () => {
        thumbnailImg.style.opacity = '0';
        previewVideo.play().catch(() => {});
    });

    portfolioItem.addEventListener('mouseleave', () => {
        thumbnailImg.style.opacity = '1';
        previewVideo.pause();
        previewVideo.currentTime = 0;
    });

    // Modal açma olayı
    playButton.addEventListener('click', () => {
        showVideoModal(item);
    });
    
    return portfolioItem;
}

// Video modal fonksiyonu
function showVideoModal(item) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 opacity-0 transition-all duration-300 backdrop-blur-sm';

    function checkVideoOrientation(video) {
        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                const isVertical = video.videoHeight > video.videoWidth;
                resolve(isVertical);
            };
            if (video.readyState >= 2) {
                const isVertical = video.videoHeight > video.videoWidth;
                resolve(isVertical);
            }
        });
    }

    const testVideo = document.createElement('video');
    testVideo.src = item.videoSrc;
    
    checkVideoOrientation(testVideo).then(isVertical => {
        const modalContent = document.createElement('div');
        modalContent.className = `
            relative bg-gradient-to-br from-purple-950/90 to-black/90 
            rounded-2xl p-4 sm:p-6 w-full transform scale-95 transition-all duration-300 
            shadow-2xl shadow-purple-900/20 border border-purple-500/10
            mx-4 sm:mx-6
        `;
        
        // Responsive modal genişlikleri
        if (isVertical) {
            modalContent.style.maxWidth = window.innerWidth < 640 ? '100%' : '500px';
        } else {
            modalContent.style.maxWidth = window.innerWidth < 640 ? '100%' : '1200px';
        }

        // Header bölümü
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between mb-4';
        
        const titleContainer = document.createElement('div');
        titleContainer.className = 'flex items-center gap-2 sm:gap-3';
        
        const playIcon = document.createElement('div');
        playIcon.className = 'w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 flex items-center justify-center';
        playIcon.innerHTML = `
            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
        `;

        const title = document.createElement('h3');
        title.className = 'text-base sm:text-xl font-semibold text-white/90 truncate';
        title.textContent = item.title;
        
        titleContainer.appendChild(playIcon);
        titleContainer.appendChild(title);

        const closeButton = document.createElement('button');
        closeButton.className = `
            text-white/70 hover:text-white transition-colors
            w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center
        `;
        closeButton.innerHTML = `
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;

        header.appendChild(titleContainer);
        header.appendChild(closeButton);
        
        // Video container
        const videoContainer = document.createElement('div');
        videoContainer.className = `
            ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}
            relative rounded-xl overflow-hidden bg-black/50
            ring-1 ring-white/10 shadow-lg
        `;
        
        const video = document.createElement('video');
        video.src = item.videoSrc;
        video.className = 'w-full h-full object-contain';
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true; // Mobil cihazlar için önemli

        // Footer bölümü - Mobilde gizlenebilir
        const footer = document.createElement('div');
        footer.className = 'mt-4 text-xs sm:text-sm text-white/50 hidden sm:block';
        footer.textContent = item.description || '';
        
        videoContainer.appendChild(video);
        modalContent.appendChild(header);
        modalContent.appendChild(videoContainer);
        modalContent.appendChild(footer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Touch olayları için kaydırma engellemesi
        document.body.style.overflow = 'hidden';

        // Animasyonlar
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        });
        
        function closeModal(immediate = false) {
            document.body.style.overflow = ''; // Kaydırmayı geri aç
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(95%)';
            modalContent.style.opacity = '0';
            
            const delay = immediate ? 0 : 300;
            setTimeout(() => {
                document.body.removeChild(modal);
                video.pause();
            }, delay);
        }
        
        closeButton.addEventListener('click', () => closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Touch olayları için
        modal.addEventListener('touchstart', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
        });

        // Ekran yönü değiştiğinde modal boyutunu güncelle
        window.addEventListener('resize', () => {
            if (isVertical) {
                modalContent.style.maxWidth = window.innerWidth < 640 ? '100%' : '500px';
            } else {
                modalContent.style.maxWidth = window.innerWidth < 640 ? '100%' : '1200px';
            }
        });
    });
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
});