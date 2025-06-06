function updateBorderRadius() {
    const element = document.querySelector('.slider');
    const element3 = document.querySelector('.portfolio_list_block');
    const currentWidth = window.innerWidth;
    scaleFactor = currentWidth / 1920
    element.style.zoom = `${scaleFactor}`;
    if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
        element.style.fontSize = `${16 * scaleFactor}px`;
        document.documentElement.style.fontSize = `${16 * scaleFactor}px`;
    }

    if ((currentWidth <= 960) && (currentWidth > 745)) {
        element3.style.zoom = `${currentWidth / 960}`;
    } else if (currentWidth <= 745) {
        element3.style.zoom = `${currentWidth / 800}`;
    } else {
        element3.style.zoom = `1`;
    }
}

window.addEventListener('resize', updateBorderRadius);
document.addEventListener('DOMContentLoaded', updateBorderRadius);
