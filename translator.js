class MultilingualTranslator {
    constructor() {
        this.translations = {};
        this.currentLanguage = 'eng';
        this.langSelect = document.getElementById('lang-select');
        this.langCodes = {
            'eng': 'en',
            'ua': 'uk',
            'de': 'de'
        };
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupEventListeners();
        this.applyTranslations();
    }

    async loadTranslations() {
        const languages = ['eng', 'ua', 'de'];
        
        for (const lang of languages) {
            try {
                const fileName = lang === 'eng' ? 'translations_en.json' : `translations_${lang}.json`;
                const response = await fetch(fileName);
                
                if (response.ok) {
                    this.translations[lang] = await response.json();
                } else {
                    if (lang !== 'eng') {
                        this.translations[lang] = this.translations['eng'] || {};
                    }
                }
            } catch (error) {
                if (lang !== 'eng') {
                    this.translations[lang] = this.translations['eng'] || {};
                }
            }
        }
    }

    setupEventListeners() {
        if (this.langSelect) {
            this.langSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.applyTranslations();
        this.updateBodyLangAttribute();
        this.updateCustomSelector(lang);
        this.updateReviews(lang); 
        localStorage.setItem('preferred-language', lang);
        if (this.langSelect) {
            this.langSelect.value = lang;
        }
    }

    updateBodyLangAttribute() {
        const bodyElement = document.body;
        const htmlLangCode = this.langCodes[this.currentLanguage] || this.langCodes['eng'];
        
        if (bodyElement) {
            bodyElement.setAttribute('lang', htmlLangCode);
        }
        
        const htmlElement = document.documentElement;
        if (htmlElement) {
            htmlElement.setAttribute('lang', htmlLangCode);
        }
    }

    updateCustomSelector(lang) {
        const selectedOption = document.querySelector('.selected-option');
        if (!selectedOption) return;

        const languageMapping = {
            'eng': {
                flag: 'Icons/gb.svg',
                text: this.getTranslation('english') || 'English'
            },
            'ua': {
                flag: 'Icons/ua.svg',
                text: this.getTranslation('ukrainian') || 'Ukrainian'
            },
            'de': {
                flag: 'Icons/Lang_de.svg',
                text: this.getTranslation('german') || 'German'
            }
        };

        const langData = languageMapping[lang] || languageMapping['eng'];
        
        const flagImg = selectedOption.querySelector('.flag');
        const textSpan = selectedOption.querySelector('.text');
        
        if (flagImg) {
            flagImg.src = langData.flag;
            flagImg.alt = langData.text;
        }
        
        if (textSpan) {
            textSpan.textContent = langData.text;
        }
    }

    applyTranslations() {
        const currentTranslations = this.translations[this.currentLanguage] || this.translations['eng'] || {};
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations.hasOwnProperty(key)) {
                const translation = currentTranslations[key];
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                    element.placeholder = translation;
                } else if (element.tagName === 'IMG') {
                    element.alt = translation;
                } else if (element.hasAttribute('title')) {
                    element.title = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        this.updateCustomSelector(this.currentLanguage);
    }

    getSavedLanguage() {
        return localStorage.getItem('preferred-language') || 'eng';
    }

    initWithSavedLanguage() {
        const savedLang = this.getSavedLanguage();
        this.changeLanguage(savedLang);
    }

    addTranslations(lang, translations) {
        if (!this.translations[lang]) {
            this.translations[lang] = {};
        }
        Object.assign(this.translations[lang], translations);
    }

    getTranslation(key) {
        const currentTranslations = this.translations[this.currentLanguage] || this.translations['eng'] || {};
        return currentTranslations[key] || key;
    }

    addLanguageCode(internalCode, htmlCode) {
        this.langCodes[internalCode] = htmlCode;
    }

    getCurrentLangCode() {
        return this.langCodes[this.currentLanguage] || this.langCodes['eng'];
    }

    updateReviews(lang) {
        if (window.setReviewLanguage && typeof window.setReviewLanguage === 'function') {
            window.setReviewLanguage(lang);
        }
    }
}

class MultilingualTranslatorNoStorage {
    constructor() {
        this.translations = {};
        this.currentLanguage = 'eng';
        this.langSelect = document.getElementById('lang-select');
        this.langCodes = {
            'eng': 'en',
            'ua': 'uk',
            'de': 'de'
        };
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupEventListeners();
        this.applyTranslations();
    }

    async loadTranslations() {
        const languages = ['eng', 'ua', 'de'];
        
        for (const lang of languages) {
            try {
                const fileName = lang === 'eng' ? 'translations_en.json' : `translations_${lang}.json`;
                const response = await fetch(fileName);
                
                if (response.ok) {
                    this.translations[lang] = await response.json();
                } else {
                    if (lang !== 'eng') {
                        this.translations[lang] = this.translations['eng'] || {};
                    }
                }
            } catch (error) {
                if (lang !== 'eng') {
                    this.translations[lang] = this.translations['eng'] || {};
                }
            }
        }
    }

    setupEventListeners() {
        if (this.langSelect) {
            this.langSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.applyTranslations();
        this.updateBodyLangAttribute();
        this.updateCustomSelector(lang);
        this.updateReviews(lang); 
        if (this.langSelect) {
            this.langSelect.value = lang;
        }
    }

    updateBodyLangAttribute() {
        const bodyElement = document.body;
        const htmlLangCode = this.langCodes[this.currentLanguage] || this.langCodes['eng'];
        
        if (bodyElement) {
            bodyElement.setAttribute('lang', htmlLangCode);
        }
        
        const htmlElement = document.documentElement;
        if (htmlElement) {
            htmlElement.setAttribute('lang', htmlLangCode);
        }
    }

    updateCustomSelector(lang) {
        const selectedOption = document.querySelector('.selected-option');
        if (!selectedOption) return;

        const languageMapping = {
            'eng': {
                flag: 'Icons/gb.svg',
                text: this.getTranslation('english') || 'English'
            },
            'ua': {
                flag: 'Icons/ua.svg',
                text: this.getTranslation('ukrainian') || 'Ukrainian'
            },
            'de': {
                flag: 'Icons/Lang_de.svg',
                text: this.getTranslation('german') || 'German'
            }
        };

        const langData = languageMapping[lang] || languageMapping['eng'];
        
        const flagImg = selectedOption.querySelector('.flag');
        const textSpan = selectedOption.querySelector('.text');
        
        if (flagImg) {
            flagImg.src = langData.flag;
            flagImg.alt = langData.text;
        }
        
        if (textSpan) {
            textSpan.textContent = langData.text;
        }
    }

    applyTranslations() {
        const currentTranslations = this.translations[this.currentLanguage] || this.translations['eng'] || {};
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations.hasOwnProperty(key)) {
                const translation = currentTranslations[key];
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else if (element.tagName === 'IMG') {
                    element.alt = translation;
                } else if (element.hasAttribute('title')) {
                    element.title = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        this.updateCustomSelector(this.currentLanguage);
    }

    getTranslation(key) {
        const currentTranslations = this.translations[this.currentLanguage] || this.translations['eng'] || {};
        return currentTranslations[key] || key;
    }

    addLanguageCode(internalCode, htmlCode) {
        this.langCodes[internalCode] = htmlCode;
    }

    getCurrentLangCode() {
        return this.langCodes[this.currentLanguage] || this.langCodes['eng'];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.translator = new MultilingualTranslator();
    
    if (window.translator.initWithSavedLanguage) {
        window.translator.initWithSavedLanguage();
    }
    
    setTimeout(() => {
        if (window.setReviewLanguage && typeof window.setReviewLanguage === 'function') {
            window.setReviewLanguage(window.translator.currentLanguage);
        }
    }, 100);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MultilingualTranslator, MultilingualTranslatorNoStorage };
}