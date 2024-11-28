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
