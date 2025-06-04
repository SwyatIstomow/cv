function updateBorderRadius() {
    const element = document.querySelector('.slider');
    const element2 = document.querySelector('.expertise');
    const element3 = document.querySelector('.portfolio_list_block');
    const currentWidth = window.innerWidth;
    element.style.zoom = `${currentWidth / 1920}`;
    if (currentWidth <= 960) {
        element3.style.zoom = `${currentWidth / 960}`;
    } else {
        element3.style.zoom = `1`;
    }
}

window.addEventListener('resize', updateBorderRadius);
document.addEventListener('DOMContentLoaded', updateBorderRadius);
