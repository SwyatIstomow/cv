document.addEventListener('DOMContentLoaded', function() {
    const expertise = document.querySelector('.expertise');
    const expertiseItems = expertise.querySelectorAll('.expertise_item');
    const prevButton = document.getElementById('expert_prev');
    const nextButton = document.getElementById('expert_next');
    const mainBg = document.querySelector('.expertise_content_block');
    const secondBg = document.querySelector('.expertise_image_block');
    const title = document.querySelector('.expert_title');
    const colors = [
        { main: '#4F8CE5', second: '#4F8CE5', text: '#4F8CE5' },
        { main: '#FF7262', second: '#FF7262', text: '#FF7262' },
        { main: '#A259FF', second: '#A259FF', text: '#A259FF' }
    ];
    const itemsPerView = 3;
    let currentIndex = 0;
    const totalItems = expertiseItems.length;
    let currentPage = 0;
    let isAnimating = false;

    function updateColors() {
        const currentColors = colors[currentPage % colors.length];
        if (mainBg) {
            mainBg.style.transition = 'background-color 0.5s ease';
            mainBg.style.backgroundColor = currentColors.main;
        }
        if (secondBg) {
            secondBg.style.transition = 'background-color 0.5s ease';
            secondBg.style.backgroundColor = currentColors.second;
        }
        if (title) {
            title.style.transition = 'color 0.5s ease';
            title.style.color = currentColors.text;
        }
    }

    function updateView(direction = null) {
        if (isAnimating) return;
        isAnimating = true;
        const currentVisible = [];
        expertiseItems.forEach((item, index) => {
            if (!item.classList.contains('hide') && index >= 0 && index < totalItems) {
                currentVisible.push(item);
            }
        });
        const newVisible = [];
        for (let i = currentIndex; i < currentIndex + itemsPerView; i++) {
            if (i >= 0 && i < totalItems) {
                newVisible.push(expertiseItems[i]);
            }
        }
        let needFadeOut = false;
        currentVisible.forEach(item => {
            if (!newVisible.includes(item)) {
                item.classList.add('fade-out');
                needFadeOut = true;
            }
        });
        const fadeOutDelay = needFadeOut ? 500 : 0;
        updateColors();
        setTimeout(() => {
            currentVisible.forEach(item => {
                if (!newVisible.includes(item)) {
                    item.classList.remove('fade-out');
                    item.classList.add('hide');
                }
            });
            newVisible.forEach(item => {
                if (!currentVisible.includes(item)) {
                    item.classList.remove('hide');
                    item.classList.add('fade-in');
                    setTimeout(() => {
                        item.classList.remove('fade-in');
                    }, 500);
                }
            });
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }, fadeOutDelay);
        updateButtonStates();
    }

    function updateButtonStates() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex + itemsPerView >= totalItems;
        if (prevButton.disabled) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }
        if (nextButton.disabled) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }

    prevButton.addEventListener('click', function() {
        if (currentIndex > 0 && !isAnimating) {
            currentIndex -= itemsPerView;
            if (currentIndex < 0) {
                currentIndex = 0;
            }
            currentPage--;
            if (currentPage < 0) {
                currentPage = 0;
            }
            updateView('prev');
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentIndex + itemsPerView < totalItems && !isAnimating) {
            currentIndex += itemsPerView;
            if (currentIndex + itemsPerView > totalItems) {
                currentIndex = totalItems - itemsPerView;
                if (currentIndex < 0) {
                    currentIndex = 0;
                }
            }
            currentPage++;
            updateView('next');
        }
    });

    expertiseItems.forEach(item => {
        item.classList.add('hide');
    });

    updateColors();

    setTimeout(() => {
        for (let i = 0; i < itemsPerView && i < totalItems; i++) {
            expertiseItems[i].classList.remove('hide');
            expertiseItems[i].classList.add('fade-in');
            setTimeout(() => {
                expertiseItems[i].classList.remove('fade-in');
            }, 500);
        }
        updateButtonStates();
    }, 300);
});