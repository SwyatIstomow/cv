class LightboxManager {
    constructor(options = {}) {
        this.config = {
            delayBeforeShow: options.delayBeforeShow || 3000,
            displayDuration: options.displayDuration || 5000,
            animationDuration: options.animationDuration || 800,
            easing: options.easing || 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            selector: options.selector || '.lightbox'
        };
        
        this.lightbox = null;
        this.isAnimating = false;
        this.timeoutIds = [];
        
        this.init();
    }
    
    init() {
        this.lightbox = document.querySelector(this.config.selector);
        
        if (!this.lightbox) {
            console.warn('Lightbox element not found');
            return;
        }
        
        this.setupInitialStyles();
        this.scheduleShow();
    }
    
    setupInitialStyles() {
        this.lightbox.style.transition = 'none';
        this.lightbox.style.transform = 'translateY(150%) scale(0.8)';
        this.lightbox.style.opacity = '0';
        this.lightbox.style.visibility = 'visible';
        this.lightbox.offsetHeight;
    }
    
    scheduleShow() {
        const timeoutId = setTimeout(() => {
            this.show();
        }, this.config.delayBeforeShow);
        
        this.timeoutIds.push(timeoutId);
    }
    
    show() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        this.lightbox.style.transition = `
            transform ${this.config.animationDuration}ms ${this.config.easing},
            opacity ${this.config.animationDuration}ms ease-out
        `;
        
        requestAnimationFrame(() => {
            this.lightbox.style.transform = 'translateY(0) scale(1)';
            this.lightbox.style.opacity = '1';
        });
        
        const hideTimeoutId = setTimeout(() => {
            this.hide();
        }, this.config.displayDuration);
        
        this.timeoutIds.push(hideTimeoutId);
        
        const animationTimeoutId = setTimeout(() => {
            this.isAnimating = false;
        }, this.config.animationDuration);
        
        this.timeoutIds.push(animationTimeoutId);
    }
    
    hide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        this.lightbox.style.transform = 'translateY(150%) scale(0.8)';
        this.lightbox.style.opacity = '0';
        
        const animationTimeoutId = setTimeout(() => {
            this.isAnimating = false;
        }, this.config.animationDuration);
        
        this.timeoutIds.push(animationTimeoutId);
    }
    
    forceShow() {
        this.clearTimeouts();
        this.show();
    }
    
    forceHide() {
        this.clearTimeouts();
        this.hide();
    }
    
    restart() {
        this.clearTimeouts();
        this.setupInitialStyles();
        this.scheduleShow();
    }
    
    clearTimeouts() {
        this.timeoutIds.forEach(id => clearTimeout(id));
        this.timeoutIds = [];
    }
    
    destroy() {
        this.clearTimeouts();
        if (this.lightbox) {
            this.lightbox.style.transition = 'none';
            this.lightbox.style.transform = '';
            this.lightbox.style.opacity = '';
            this.lightbox.style.visibility = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new LightboxManager({
        delayBeforeShow: 13000,
        displayDuration: 7000,
        animationDuration: 800,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
    
    window.lightboxManager = lightbox;
    
    const lightboxElement = document.querySelector('.lightbox');
    if (lightboxElement) {
        lightboxElement.addEventListener('click', () => {
            lightbox.forceHide();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            lightbox.forceShow();
        }
        if (e.key === 'h' && e.ctrlKey) {
            e.preventDefault();
            lightbox.forceHide();
        }
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            lightbox.restart();
        }
    });
});