document.addEventListener('DOMContentLoaded', function() {

    const topS = document.querySelectorAll('.top_anim_S');
    const topM = document.querySelectorAll('.top_anim_M');
    const topL = document.querySelectorAll('.top_anim_L');
    const bottomS = document.querySelectorAll('.bottom_anim_S');
    const bottomM = document.querySelectorAll('.bottom_anim_M');
    const bottomL = document.querySelectorAll('.bottom_anim_L');
    const leftS = document.querySelectorAll('.left_anim_S');
    const leftM = document.querySelectorAll('.left_anim_M');
    const leftL = document.querySelectorAll('.left_anim_L');
    const rightS = document.querySelectorAll('.right_anim_S');
    const rightM = document.querySelectorAll('.right_anim_M');
    const rightL = document.querySelectorAll('.right_anim_L');
    
    const elementsWithDelay = [
        { elements: topS, delay: 0 },
        { elements: topM, delay: 100 },
        { elements: topL, delay: 200 },
        { elements: bottomS, delay: 0 },
        { elements: bottomM, delay: 100 },
        { elements: bottomL, delay: 200 },
        { elements: leftS, delay: 0 },
        { elements: leftM, delay: 100 },
        { elements: leftL, delay: 200 },
        { elements: rightS, delay: 0 },
        { elements: rightM, delay: 100 },
        { elements: rightL, delay: 200 }
    ];
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                let delay = 0;
                for (const group of elementsWithDelay) {
                    group.elements.forEach(el => {
                        if (el === element) {
                            delay = group.delay;
                        }
                    });
                }
                
                setTimeout(() => {
                    element.classList.add('animate-visible');
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }
    
    const observer = new IntersectionObserver(handleIntersect, options);
    
    elementsWithDelay.forEach(group => {
        group.elements.forEach(element => {
            observer.observe(element);
        });
    });
    
    function checkInitialVisibility() {
        elementsWithDelay.forEach(group => {
            group.elements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const isVisible = (
                    rect.top <= window.innerHeight &&
                    rect.bottom >= 0
                );
                
                if (isVisible) {
                    setTimeout(() => {
                        element.classList.add('animate-visible');
                    }, group.delay + index * 50);
                    
                    observer.unobserve(element);
                }
            });
        });
    }
    
    setTimeout(checkInitialVisibility, 100);
});