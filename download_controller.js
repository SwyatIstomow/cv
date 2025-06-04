// Переменные с ссылками на файлы для разных языков
const downloadLinks = {
    en: 'Istomov - en.pdf',
    uk: 'Istomov - ua.pdf',
    de: 'Istomov - de.pdf'
};

// Функция для определения текущего языка страницы
function getCurrentLanguage() {
    const bodyLang = document.body.getAttribute('lang');
    return bodyLang || 'en'; // По умолчанию английский, если язык не указан
}

// Функция для обновления ссылок скачивания
function updateDownloadLinks() {
    const currentLang = getCurrentLanguage();
    const downloadButtons = document.querySelectorAll('a#download_btn');
    
    downloadButtons.forEach(button => {
        if (downloadLinks[currentLang]) {
            button.href = downloadLinks[currentLang];
            console.log(`Обновлена ссылка для языка ${currentLang}: ${downloadLinks[currentLang]}`);
        } else {
            // Если язык не найден, используем английский по умолчанию
            button.href = downloadLinks.en;
            console.log(`Язык ${currentLang} не найден, используется английский: ${downloadLinks.en}`);
        }
    });
}

// Функция для инициализации контроллера
function initDownloadController() {
    // Обновляем ссылки при загрузке страницы
    updateDownloadLinks();
    
    // Наблюдатель за изменениями атрибута lang в body
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                updateDownloadLinks();
            }
        });
    });
    
    // Начинаем наблюдение за изменениями атрибута lang
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['lang']
    });
}

// Запускаем контроллер после загрузки DOM
document.addEventListener('DOMContentLoaded', initDownloadController);

// Альтернативный способ - если нужно запустить немедленно
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDownloadController);
} else {
    initDownloadController();
}