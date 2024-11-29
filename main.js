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
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        const skillItems = aboutSection.querySelectorAll('.skill-item');
        if (skillItems.length > 0) {
            gsap.from(skillItems, {
                scrollTrigger: {
                    trigger: skillItems[0],
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse'
                },
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    }

    // Contact Section Animations
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const contactInfo = contactSection.querySelector('.contact-info');
        const contactForm = contactSection.querySelector('#contact-form');

        if (contactInfo && contactForm) {
            gsap.from([contactInfo, contactForm], {
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }

        const socialIcons = contactSection.querySelectorAll('.contact-info svg');
        if (socialIcons.length > 0) {
            gsap.from(socialIcons, {
                scrollTrigger: {
                    trigger: socialIcons[0],
                    start: 'top center+=150',
                    toggleActions: 'play none none reverse'
                },
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            });
        }
    }
}

// About Section Animations
function initializeAboutAnimations() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    // Performans için animasyonları batch halinde çalıştır
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });

    // Ana başlık animasyonu
    tl.from('#about-heading', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Sol ve sağ kolonlar için animasyon
    const columns = aboutSection.querySelectorAll('.about-content');
    columns.forEach((column, index) => {
        tl.from(column, {
            x: index === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');
    });

    // Yazılım ikonları için stagger animasyon
    const softwareItems = aboutSection.querySelectorAll('.software-item');
    tl.from(softwareItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)'
    }, '-=0.2');

    // Deneyim maddeleri için stagger animasyon
    const experienceItems = aboutSection.querySelectorAll('.about-content:last-child li');
    tl.from(experienceItems, {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    }, '-=0.2');

    // Scroll trigger yenileme için observer ekle
    ScrollTrigger.refresh();
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
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item relative group overflow-hidden rounded-lg shadow-xl';
        portfolioItem.innerHTML = `
            <div class="relative aspect-video overflow-hidden bg-gray-900">
                <video src="${item.videoSrc}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" muted loop></video>
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button class="play-button bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 shadow-purple-strong">
                        İzle
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
                <p class="text-gray-400">${item.description}</p>
                <span class="inline-block mt-2 text-sm font-medium text-purple-400">${item.type}</span>
            </div>
        `;
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

// Video modal functionality
function showVideoModal({ title, video }) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 transition-opacity duration-300';
    modal.innerHTML = `
        <div class="relative w-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <div class="flex justify-between items-center p-4 border-b border-gray-800">
                <h3 class="text-xl font-semibold text-white">${title}</h3>
                <button class="close-modal text-gray-400 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="relative aspect-video">
                <video src="${video}" class="w-full h-full object-contain" controls autoplay></video>
            </div>
        </div>
    `;

    // Close modal events
    const closeModal = () => {
        modal.classList.add('opacity-0');
        setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Add modal to body
    document.body.appendChild(modal);
    // Trigger reflow for animation
    modal.offsetHeight;
    modal.classList.remove('opacity-0');
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (!contactForm || !formStatus) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) return;

        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Gönderiliyor...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Form validation
            if (!validateFormData(data)) {
                throw new Error('Lütfen tüm zorunlu alanları doldurun.');
            }
            
            // Simulate form submission (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showFormStatus('success', 'Mesajınız başarıyla gönderildi!');
            contactForm.reset();
            
        } catch (error) {
            showFormStatus('error', error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    function validateFormData(data) {
        const requiredFields = ['name', 'email', 'message'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        for (const field of requiredFields) {
            if (!data[field] || !data[field].trim()) {
                return false;
            }
        }
        
        if (!emailRegex.test(data.email)) {
            throw new Error('Lütfen geçerli bir e-posta adresi girin.');
        }
        
        return true;
    }

    function showFormStatus(type, message) {
        formStatus.classList.remove('hidden', 'text-red-500', 'text-green-500');
        formStatus.classList.add(type === 'success' ? 'text-green-500' : 'text-red-500');
        formStatus.textContent = message;
        
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    }
}

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

// Form gönderimi için responsive kontrol
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Form gönderimi sırasında butonu devre dışı bırak
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Gönderiliyor...';
            
            // Form gönderimi simülasyonu
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Başarılı gönderim
            showToast('Mesajınız başarıyla gönderildi!', 'success');
            contactForm.reset();
        } catch (error) {
            showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        } finally {
            // Butonu tekrar aktif et
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.innerHTML = 'Gönder';
        }
    });
}

// Toast bildirimi için responsive stil
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 p-4 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } transform transition-all duration-300 translate-y-full opacity-0`;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Toast'u göster
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        toast.style.transform = 'translateY(100%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initializeAnimations();
    initializeAboutAnimations();
    initContactForm();
    initNavigation();
});