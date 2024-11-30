class Toast {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };

        toast.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 opacity-0 translate-x-full`;
        toast.textContent = message;

        this.container.appendChild(toast);

        // Animasyon için setTimeout kullanımı
        setTimeout(() => {
            toast.classList.remove('opacity-0', 'translate-x-full');
        }, 10);

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => {
                this.container.removeChild(toast);
            }, 300);
        }, duration);
    }

    success(message, duration) {
        this.show(message, 'success', duration);
    }

    error(message, duration) {
        this.show(message, 'error', duration);
    }

    info(message, duration) {
        this.show(message, 'info', duration);
    }

    warning(message, duration) {
        this.show(message, 'warning', duration);
    }
}

// Global toast instance
window.toast = new Toast();

// Toast notification system
function showMaintenancePopup() {
    // Eğer zaten açık bir popup varsa, yeni popup'ı gösterme
    if (document.getElementById('maintenance-popup')) {
        return;
    }

    // Scroll'u kilitle
    document.body.style.overflow = 'hidden';

    // Overlay'i önce ekle
    const overlay = document.createElement('div');
    overlay.id = 'maintenance-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0px);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(overlay);

    // Popup container oluştur
    const popup = document.createElement('div');
    popup.id = 'maintenance-popup';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #8B5CF6;
        border-radius: 15px;
        padding: 2rem;
        z-index: 1000;
        text-align: center;
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        backdrop-filter: blur(10px);
        min-width: 300px;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // İçerik oluştur
    const content = document.createElement('div');
    content.innerHTML = `
        <h2 style="
            color: #8B5CF6;
            font-size: 1.8rem;
            margin-bottom: 1rem;
            font-weight: bold;
        ">Bakım Modu</h2>
        <p style="
            color: white;
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        ">İletişim bölümü şu anda bakımdadır.<br>En kısa sürede aktif edilecektir.</p>
        <button onclick="closeMaintenancePopup()" style="
            background: #8B5CF6;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            outline: none;
        ">Tamam</button>
    `;

    // Popup'ı sayfaya ekle
    popup.appendChild(content);
    document.body.appendChild(popup);

    // ESC tuşu ile kapatma
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeMaintenancePopup();
        }
    };
    document.addEventListener('keydown', escHandler);

    // Overlay'e tıklayarak kapatma
    overlay.addEventListener('click', closeMaintenancePopup);

    // Animasyonları başlat
    requestAnimationFrame(() => {
        overlay.style.background = 'rgba(0, 0, 0, 0.7)';
        overlay.style.backdropFilter = 'blur(5px)';
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Popup'ı kapatma fonksiyonu
function closeMaintenancePopup() {
    const popup = document.getElementById('maintenance-popup');
    const overlay = document.getElementById('maintenance-overlay');

    if (!popup || !overlay) return;

    // Scroll'u serbest bırak
    document.body.style.overflow = '';

    // ESC event listener'ı kaldır
    document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMaintenancePopup();
    });

    // Kapanış animasyonları
    popup.style.opacity = '0';
    popup.style.transform = 'translate(-50%, -50%) scale(0.95)';
    overlay.style.background = 'rgba(0, 0, 0, 0)';
    overlay.style.backdropFilter = 'blur(0px)';

    // Elementleri temizle
    setTimeout(() => {
        popup.remove();
        overlay.remove();
    }, 300);
}

// İletişim butonuna tıklandığında popup'ı göster
document.addEventListener('DOMContentLoaded', () => {
    const contactButtons = document.querySelectorAll('a[href="#contact"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showMaintenancePopup();
        });
    });
});
