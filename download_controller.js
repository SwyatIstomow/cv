const downloadLinks = {
    en: 'Istomov - en.pdf',
    uk: 'Istomov - ua.pdf',
    de: 'Istomov - de.pdf'
};

function getCurrentLanguage() {
    const bodyLang = document.body.getAttribute('lang');
    return bodyLang || 'en'; 
}

function updateDownloadLinks() {
    const currentLang = getCurrentLanguage();
    const downloadButtons = document.querySelectorAll('a#download_btn');
    
    downloadButtons.forEach(button => {
        if (downloadLinks[currentLang]) {
            button.href = downloadLinks[currentLang];
        } else {
            button.href = downloadLinks.en;
        }
    });
}

function initDownloadController() {
    updateDownloadLinks();
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                updateDownloadLinks();
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['lang']
    });
}

document.addEventListener('DOMContentLoaded', initDownloadController);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDownloadController);
} else {
    initDownloadController();
}