const parallaxScript = document.addEventListener('DOMContentLoaded', () => {
  const shiftFactor = 0.02;
  const maxShift = 40;
  const invertMovement = true;
  let animationFrame;

  document.addEventListener('mousemove', e => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cancelAnimationFrame(animationFrame);

    animationFrame = requestAnimationFrame(() => {
      document.querySelectorAll('.movable_S, .movable_M, .movable_L').forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let moveFactor = shiftFactor;
        if (item.classList.contains('movable_M')) moveFactor *= 1.5;
        if (item.classList.contains('movable_L')) moveFactor *= 2;

        let deltaX = (mouseX - centerX) * moveFactor;
        let deltaY = (mouseY - centerY) * moveFactor;

        if (invertMovement) {
          deltaX = -deltaX;
          deltaY = -deltaY;
        }

        deltaX = Math.max(-maxShift, Math.min(maxShift, deltaX));
        deltaY = Math.max(-maxShift, Math.min(maxShift, deltaY));

        item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    });
  });
});