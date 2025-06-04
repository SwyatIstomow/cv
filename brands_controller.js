document.addEventListener("DOMContentLoaded", function() {
    const brandsList = document.querySelector('.brands_list');
    const brandsMainBlock = document.querySelector('.brands_main_block');
    const brandsItems = document.querySelectorAll('.brands_item');
    if (brandsItems.length === 0) return;
    brandsItems.forEach(item => {
        const clone = item.cloneNode(true);
        brandsList.appendChild(clone);
    });
    const totalItems = brandsItems.length;
    const scrollTime = 5 * totalItems;
    const animationName = `scrollBrands ${scrollTime}s linear infinite`;
    brandsList.style.animation = animationName;
    brandsMainBlock.addEventListener('mouseenter', function() {
        brandsList.style.animationPlayState = 'paused';
    });
    brandsMainBlock.addEventListener('mouseleave', function() {
        brandsList.style.animationPlayState = 'running';
    });
    window.addEventListener('resize', function() {
        const containerWidth = brandsList.scrollWidth / 2;
        document.documentElement.style.setProperty('--scroll-width', `-${containerWidth}px`);
    });
    window.dispatchEvent(new Event('resize'));
});