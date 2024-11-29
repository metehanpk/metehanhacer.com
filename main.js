// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// DOM Elements with cached selectors
const DOM = {
    loaderPercentage: document.querySelector('.loader-percentage'),
    loaderWrapper: document.querySelector('.loader-wrapper'),
    content: document.querySelector('.content'),
    portfolioGrid: document.querySelector('#portfolio .grid'),
    body: document.body,
    init() {
        // Lazy load media
        this.initLazyLoad();
    },
    initLazyLoad() {
        const options = {
            root: null,
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    if (target.dataset.src) {
                        target.src = target.dataset.src;
                        if (target.tagName === 'VIDEO') target.load();
                    }
                    observer.unobserve(target);
                }
            });
        }, options);

        // Observe all media elements with data-src
        document.querySelectorAll('img[data-src], video[data-src]').forEach(el => observer.observe(el));
    }
};

// Optimized loader animation
class LoaderAnimation {
    constructor() {
        this.progress = 0;
        this.isComplete = false;
        this.rafId = null;
    }

    update() {
        if (this.isComplete) return;
        
        this.progress = Math.min(100, this.progress + Math.random() * 8);
        if (DOM.loaderPercentage) {
            DOM.loaderPercentage.textContent = `${Math.round(this.progress)}%`;
        }
        
        if (this.progress < 100) {
            this.rafId = requestAnimationFrame(() => this.update());
        } else {
            this.complete();
        }
    }

    complete() {
        this.isComplete = true;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        if (DOM.loaderWrapper && DOM.content) {
            DOM.loaderWrapper.style.opacity = '0';
            DOM.content.style.display = 'block';
            
            requestAnimationFrame(() => {
                DOM.content.classList.add('visible');
                DOM.loaderWrapper.style.display = 'none';
                initializeAnimations();
            });
        }
    }

    start() {
        this.rafId = requestAnimationFrame(() => this.update());
    }
}

// Start loader when page loads
window.addEventListener('load', () => {
    const loader = new LoaderAnimation();
    loader.start();
});

function initializeAnimations() {
    // Hero section animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    });
}

// Portfolio items data
const portfolioItems = [
    {
        title: 'Oyun Editi Örneği',
        description: 'Zula oyun montajı',
        thumbnail: 'assets/zula.jpg',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/zula',
        type: 'game'
    },
    {
        title: 'Tekstil Reklamı',
        description: 'Kurumsal tanıtım',
        thumbnail: 'assets/corporate.jpg',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/corporate',
        type: 'corporate'
    },
    {
        title: 'Emlak Reklamı',
        description: 'Emlak tanıtım',
        thumbnail: 'assets/yeni-klip.jpg',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/yeni-klip',
        type: 'estate'
    },
    {
        title: 'Halloween',
        description: 'Cadılar bayramında eğlenceli anlar',
        thumbnail: 'assets/Ekran görüntüsü 2024-11-26 075159.png',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/halloween',
        type: 'game'
    },
    {
        title: 'İçecek Hazırlama',
        description: 'İçecek hazırlama videosu',
        thumbnail: 'assets/Ekran görüntüsü 2024-11-26 195713.png',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/son-deneme',
        type: 'special'
    },
    {
        title: 'Sirk Videosu',
        description: 'Kurumsal tanıtım',
        thumbnail: 'assets/Ekran görüntüsü 2024-11-26 193557.png',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/sirk',
        type: 'corporate'
    },
    {
        title: 'Oyun Editi Örneği 2',
        description: 'Zula oyun montajı',
        thumbnail: 'assets/Ekran görüntüsü 2024-11-26 063458.png',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/4',
        type: 'game'
    },
    {
        title: 'Tekstil Reklamı 2',
        description: 'Kurumsal Tanıtım',
        thumbnail: 'assets/Ekran görüntüsü 2024-11-26 235137.png',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/3',
        type: 'special'
    },
    {
        title: 'Sosyal Medya İçin Mizah İçerikleri',
        description: '',
        thumbnail: 'assets/Ekran görüntüsü 2024-11-27 013848.png',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/comp-1',
        type: 'center'
    },
    {
        title: 'Logo Animasyonu Örneği',
        description: 'Animasyon Çalışmalarım',
        thumbnail: 'assets/Ekran görüntüsü 2024-11-28 201449.png',
        video: 'https://res.cloudinary.com/drhgvt8rz/video/upload/v1/metehanhacer/alevli-adidas',
        type: 'center-main'
    }
];

// Create portfolio items
function createPortfolioItem(title, description, imageSrc, videoSrc, type = '') {
    const portfolioItem = document.createElement('div');
    const typeClass = `portfolio-item ${type} cursor-pointer transform transition-all duration-300 hover:scale-[1.02]`;
    const aspectRatio = type === 'corporate' ? 'aspect-[9/16]' : 'aspect-[16/9]';
    
    // Özel margin ve genişlik ayarı
    let marginClass = '';
    let widthClass = '';
    
    if (title === 'Oyun Editi Örneği 2') {
        marginClass = '-ml-32';
        widthClass = 'w-[500px] relative -top-[22rem]';
    } else if (title === 'İçecek Hazırlama') {
        marginClass = '-ml-[32rem]';
        widthClass = 'w-[550px]';
    } else if (title === 'Sirk Videosu') {
        marginClass = '-ml-[33rem]';
        widthClass = 'w-[500px]';
    } else if (title === 'Tekstil Reklamı 2') {
        marginClass = 'ml-[27rem]';
        widthClass = 'w-[570px] relative -top-[65rem]';
    } else if (title === 'Sosyal Medya İçin Mizah İçerikleri') {
        marginClass = '-ml-[5rem]';
        widthClass = 'w-[570px] relative -top-[44rem] z-50';
    } else if (title === 'Logo Animasyonu Örneği') {
        marginClass = 'ml-[59rem]';
        widthClass = 'w-[570px] relative -top-[44.5rem] z-40';
    }
    
    portfolioItem.className = `${typeClass} ${marginClass} ${widthClass}`;
    portfolioItem.innerHTML = `
        <div class="relative ${aspectRatio} overflow-hidden rounded-2xl group shadow-lg transition-all duration-300 hover:shadow-xl">
            <img src="${imageSrc}" alt="${description}" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm" style="${title === 'Tekstil Reklamı 2' ? 'object-position: center 25%;' : ''}" />
            <video src="${videoSrc}" class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500" style="${title === 'Tekstil Reklamı 2' ? 'object-position: center 25%;' : ''} ${title === 'Halloween' ? 'transform: translate(-50%, -50%) scale(2.2); top: 50%; left: 50%; height: 150%; width: auto; object-position: center 25%;' : ''}" loop muted></video>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <div class="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <h3 class="text-2xl font-bold mb-3 text-white/90">${title}</h3>
                    ${description ? `<p class="mb-4 text-white/75">${description}</p>` : ''}
                    <button class="play-button px-6 py-2 bg-white/20 hover:bg-purple-600/50 text-white/90 hover:text-white transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Videoyu İzle
                        </span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Video modal açma olayı
    portfolioItem.addEventListener('click', () => {
        showVideoModal({
            title: title,
            video: videoSrc
        });
    });

    // Hover durumunda video oynatma
    const video = portfolioItem.querySelector('video');
    portfolioItem.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
    });
    portfolioItem.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });

    return portfolioItem;
}

// Video modal fonksiyonu
function showVideoModal(videoData) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md';
    modal.style.opacity = '0';
    
    modal.innerHTML = `
        <div class="video-modal-container relative bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-gray-900/90 rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-all duration-500 ease-out">
            <!-- Neon Border Effect -->
            <div class="absolute inset-0 rounded-2xl glow-border"></div>
            
            <!-- Video Wrapper -->
            <div class="video-wrapper relative flex items-center justify-center bg-black/75 p-1">
                <!-- Purple Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-tr from-purple-900/15 via-transparent to-purple-600/15 pointer-events-none"></div>
                
                <video 
                    src="${videoData.video}" 
                    class="video-element object-contain rounded-xl"
                    controls
                    controlsList="nodownload"
                    playsinline
                    style="--plyr-color-main: #8B5CF6;"
                ></video>
                
                <!-- Top Controls -->
                <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <h2 class="text-xl font-bold text-white drop-shadow-lg truncate pr-4 opacity-0 transform -translate-y-2 transition-all duration-300 text-shadow-purple glow-text">${videoData.title}</h2>
                    <div class="flex items-center gap-3">
                        <button class="minimize-modal p-2.5 rounded-xl bg-black/40 hover:bg-purple-600/50 text-white/90 hover:text-white transform hover:scale-105 transition-all duration-300 border border-purple-500/30 hover:border-purple-500 shadow-purple-strong">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                            </svg>
                        </button>
                        <button class="close-modal p-2.5 rounded-xl bg-black/40 hover:bg-red-600/50 text-white/90 hover:text-white transform hover:scale-105 transition-all duration-300 border border-red-500/30 hover:border-red-500 shadow-red-strong">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Stil ekleyelim
    const style = document.createElement('style');
    style.textContent = `
        .glow-border {
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.5),
                        0 0 50px rgba(139, 92, 246, 0.3),
                        0 0 75px rgba(139, 92, 246, 0.2),
                        inset 0 0 30px rgba(139, 92, 246, 0.3);
            opacity: 0.6;
            transition: all 0.5s ease;
        }
        
        .video-modal-container:hover .glow-border {
            opacity: 0.8;
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.6),
                        0 0 60px rgba(139, 92, 246, 0.4),
                        0 0 90px rgba(139, 92, 246, 0.3),
                        inset 0 0 40px rgba(139, 92, 246, 0.4);
        }
        
        .text-shadow-purple {
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.8),
                         0 0 35px rgba(139, 92, 246, 0.6);
            animation: softGlow 3s ease-in-out infinite alternate;
        }
        
        @keyframes softGlow {
            0% {
                text-shadow: 0 0 20px rgba(139, 92, 246, 0.8),
                            0 0 35px rgba(139, 92, 246, 0.6);
            }
            50% {
                text-shadow: 0 0 25px rgba(139, 92, 246, 0.9),
                            0 0 45px rgba(139, 92, 246, 0.7),
                            0 0 60px rgba(139, 92, 246, 0.4);
            }
            100% {
                text-shadow: 0 0 20px rgba(139, 92, 246, 0.8),
                            0 0 35px rgba(139, 92, 246, 0.6);
            }
        }
        
        .shadow-purple-strong {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5),
                        0 0 35px rgba(139, 92, 246, 0.3);
            transition: all 0.3s ease;
        }
        
        .shadow-purple-strong:hover {
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.6),
                        0 0 45px rgba(139, 92, 246, 0.4);
        }
        
        .shadow-red-strong {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.5),
                        0 0 35px rgba(239, 68, 68, 0.3);
            transition: all 0.3s ease;
        }
        
        .shadow-red-strong:hover {
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.6),
                        0 0 45px rgba(239, 68, 68, 0.4);
        }
        
        .video-element::-webkit-media-controls-panel {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
        }
        
        .video-element::-webkit-media-controls-play-button {
            filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.8));
        }
        
        .video-element::-webkit-media-controls-timeline {
            filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.8));
        }
        
        .video-element::-webkit-media-controls-current-time-display,
        .video-element::-webkit-media-controls-time-remaining-display {
            text-shadow: 0 0 15px rgba(139, 92, 246, 0.8);
            color: white;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const video = modal.querySelector('video');
    const videoWrapper = modal.querySelector('.video-wrapper');
    const title = modal.querySelector('h2');
    const minimizeBtn = modal.querySelector('.minimize-modal');
    const container = modal.querySelector('.video-modal-container');

    // Video boyutlarına göre container'ı ayarla
    video.addEventListener('loadedmetadata', () => {
        const videoRatio = video.videoWidth / video.videoHeight;
        const windowRatio = window.innerWidth / window.innerHeight;
        const padding = 32; // 2rem padding her yönden
        
        let containerWidth, containerHeight;
        
        if (videoRatio > 1) {
            if (videoRatio > windowRatio) {
                // Video ekrandan daha geniş
                containerWidth = Math.min(window.innerWidth - padding * 2, 1600);
                containerHeight = containerWidth / videoRatio;
                
                // Yükseklik kontrolü
                if (containerHeight > window.innerHeight - padding * 2) {
                    containerHeight = window.innerHeight - padding * 2;
                    containerWidth = containerHeight * videoRatio;
                }
            } else {
                // Video ekrandan daha dar
                containerHeight = window.innerHeight - padding * 2;
                containerWidth = containerHeight * videoRatio;
                
                // Genişlik kontrolü
                if (containerWidth > window.innerWidth - padding * 2) {
                    containerWidth = window.innerWidth - padding * 2;
                    containerHeight = containerWidth / videoRatio;
                }
            }
        } else {
            if (1/videoRatio > windowRatio) {
                // Video ekrandan daha uzun
                containerHeight = window.innerHeight - padding * 2;
                containerWidth = containerHeight * videoRatio;
            } else {
                // Video ekrandan daha kısa
                containerWidth = Math.min((window.innerWidth - padding * 2) * 0.7, 500);
                containerHeight = containerWidth / videoRatio;
                
                // Yükseklik kontrolü
                if (containerHeight > window.innerHeight - padding * 2) {
                    containerHeight = window.innerHeight - padding * 2;
                    containerWidth = containerHeight * videoRatio;
                }
            }
        }
        
        // Container boyutlarını ayarla
        container.style.width = `${containerWidth}px`;
        container.style.height = `${containerHeight}px`;
        
        // Video wrapper boyutlarını ayarla
        videoWrapper.style.width = '100%';
        videoWrapper.style.height = '100%';
        
        // Video elementini ayarla
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';

        // Video oynatmayı başlat
        video.play().catch(error => {
            console.log("Video otomatik oynatılamadı:", error);
        });

        // Başlığı göster
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    });

    // Pencere yeniden boyutlandırıldığında video boyutlarını güncelle
    const updateVideoSize = () => {
        if (!video.videoWidth) return;
        
        const videoRatio = video.videoWidth / video.videoHeight;
        const windowRatio = window.innerWidth / window.innerHeight;
        const padding = 32;
        
        let containerWidth, containerHeight;
        
        if (videoRatio > 1) {
            if (videoRatio > windowRatio) {
                containerWidth = Math.min(window.innerWidth - padding * 2, 1600);
                containerHeight = containerWidth / videoRatio;
                if (containerHeight > window.innerHeight - padding * 2) {
                    containerHeight = window.innerHeight - padding * 2;
                    containerWidth = containerHeight * videoRatio;
                }
            } else {
                containerHeight = window.innerHeight - padding * 2;
                containerWidth = containerHeight * videoRatio;
                if (containerWidth > window.innerWidth - padding * 2) {
                    containerWidth = window.innerWidth - padding * 2;
                    containerHeight = containerWidth / videoRatio;
                }
            }
        } else {
            if (1/videoRatio > windowRatio) {
                containerHeight = window.innerHeight - padding * 2;
                containerWidth = containerHeight * videoRatio;
            } else {
                containerWidth = Math.min((window.innerWidth - padding * 2) * 0.7, 500);
                containerHeight = containerWidth / videoRatio;
                if (containerHeight > window.innerHeight - padding * 2) {
                    containerHeight = window.innerHeight - padding * 2;
                    containerWidth = containerHeight * videoRatio;
                }
            }
        }
        
        container.style.width = `${containerWidth}px`;
        container.style.height = `${containerHeight}px`;
    };

    window.addEventListener('resize', updateVideoSize);

    // Minimize fonksiyonu
    minimizeBtn.addEventListener('click', () => {
        container.classList.toggle('scale-75');
        container.classList.toggle('opacity-90');
    });

    // Modal hover efektleri
    container.addEventListener('mouseenter', () => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    });

    container.addEventListener('mouseleave', () => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-8px)';
    });

    // Kapatma işlemleri
    const closeModal = () => {
        modal.style.opacity = '0';
        container.style.transform = 'scale(0.95)';
        document.body.style.overflow = '';
        video.pause();
        window.removeEventListener('resize', updateVideoSize);
        setTimeout(() => {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }, 300);
    };

    const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal();
    };

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', handleEscape);

    // Modal açılış animasyonu
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        container.style.transform = 'scale(1)';
    });
}

// Generate all portfolio items at once
const fragment = document.createDocumentFragment();
portfolioItems.forEach(item => fragment.appendChild(createPortfolioItem(item.title, item.description, item.thumbnail, item.video, item.type)));
DOM.portfolioGrid.appendChild(fragment);

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const loaderPercentage = document.querySelector('.loader-percentage');
    let progress = 0;
    
    // Simulate loading progress with adjusted speed
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;
        
        loaderPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderWrapper.classList.add('fade-out');
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                }, 300);
            }, 200);
        }
    }, 35);

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mainNav.classList.contains('translate-x-0');
            if (isOpen) {
                mainNav.classList.remove('translate-x-0');
                mainNav.classList.add('translate-x-full');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                mainNav.classList.remove('translate-x-full');
                mainNav.classList.add('translate-x-0');
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });

        // Menü linklerine tıklandığında menüyü kapat
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) { // lg breakpoint
                    mainNav.classList.remove('translate-x-0');
                    mainNav.classList.add('translate-x-full');
                    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                }
            });
        });
    }

    // Responsive video kontrolleri
    function adjustVideoSize() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (window.innerWidth < 768) { // md breakpoint
                video.setAttribute('playsinline', '');
                video.setAttribute('preload', 'metadata');
            }
        });
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde video boyutlarını ayarla
    window.addEventListener('load', adjustVideoSize);
    window.addEventListener('resize', adjustVideoSize);

    // Portfolio grid düzeni için responsive ayarlar
    function adjustPortfolioGrid() {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            if (window.innerWidth < 640) { // sm breakpoint
                portfolioGrid.style.gridTemplateColumns = '1fr';
            } else if (window.innerWidth < 1024) { // lg breakpoint
                portfolioGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                portfolioGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
        }
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde grid düzenini ayarla
    window.addEventListener('load', adjustPortfolioGrid);
    window.addEventListener('resize', adjustPortfolioGrid);

    // Lazy loading için IntersectionObserver
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.removeAttribute('data-src');
                    }
                    videoObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Tüm videoları gözlemle
        document.querySelectorAll('video[data-src]').forEach(video => {
            videoObserver.observe(video);
        });
    }

    // Mouse follower implementation
    // Mouse cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        requestAnimationFrame(function() {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
        });
    });

    // Add hover effect
    const links = document.querySelectorAll('a, button, .portfolio-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            dot.classList.add('dot-hover');
        });

        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            dot.classList.remove('dot-hover');
        });
    });

    // Optimized scroll animations
    const initScrollAnimations = () => {
        gsap.utils.toArray('.counter').forEach(counter => {
            const value = parseInt(counter.textContent);
            gsap.from(counter, {
                textContent: 0,
                duration: 2,
                ease: 'power1.inOut',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    once: true
                }
            });
        });
    };

    // Form handling with validation and feedback
    const initContactForm = () => {
        const form = document.querySelector('#contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Form validation
            if (!name || !email || !message) {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return;
            }

            try {
                const response = await fetch('https://formsubmit.co/ajax/metehanhacer2@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: 'Yeni Portfolio İletişim Formu Mesajı',
                        _template: 'table'
                    })
                });

                const result = await response.json();
                
                if (result.success) {
                    alert('Mesajınız başarıyla gönderildi!');
                    form.reset();
                } else {
                    throw new Error('Form gönderilemedi');
                }
            } catch (error) {
                alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                console.error('Form submission error:', error);
            }
        });
    };

    initScrollAnimations();
    initContactForm();
});