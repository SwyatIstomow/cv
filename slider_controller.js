const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider_nav_icon');
// const slider = document.querySelector('.slider_bg');
const sliderContainer = document.querySelector('.slider_container') || document.querySelector('.slider-wrapper') // || slider.parentElement;

const slideAnimElements = {
  fadeIn: document.querySelectorAll('.slide_anim_fade'),
  slideUp: document.querySelectorAll('.slide_anim_up'),
  slideDown: document.querySelectorAll('.slide_anim_down'),
  slideLeft: document.querySelectorAll('.slide_anim_left'),
  slideRight: document.querySelectorAll('.slide_anim_right'),
  scaleIn: document.querySelectorAll('.slide_anim_scale'),
  rotateIn: document.querySelectorAll('.slide_anim_rotate')
};

if (sliderContainer) {
  sliderContainer.style.opacity = '0';
}

const getSlideAnimElements = (slideIndex) => {
  const result = {};
  
  for (const [animType, elements] of Object.entries(slideAnimElements)) {
    result[animType] = Array.from(elements).filter(el => 
      el.closest('.slide') === slides[slideIndex] || 
      el.dataset.slideIndex === slideIndex.toString()
    );
  }
  
  return result;
};

let indexSlide = 0;
let startX = 0;
let endX = 0;
let basicDeg = 113;
let currentDeg = 0;
let animDelay = 100;

const resetAllAnimations = () => {
  for (const elements of Object.values(slideAnimElements)) {
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = getInitialTransform(el);
      el.style.transition = 'none';
    });
  }
};

const getInitialTransform = (element) => {
  if (element.classList.contains('slide_anim_up')) {
    return 'translateY(50px)';
  } else if (element.classList.contains('slide_anim_down')) {
    return 'translateY(-50px)';
  } else if (element.classList.contains('slide_anim_left')) {
    return 'translateX(50px)';
  } else if (element.classList.contains('slide_anim_right')) {
    return 'translateX(-50px)';
  } else if (element.classList.contains('slide_anim_scale')) {
    return 'scale(0.8)';
  } else if (element.classList.contains('slide_anim_rotate')) {
    return 'rotate(-15deg)';
  } else {
    return 'none';
  }
};

const animateSlideElements = (slideIndex) => {
  for (const elements of Object.values(slideAnimElements)) {
    elements.forEach(el => {
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      el.style.opacity = '0';
      el.style.transform = getInitialTransform(el);
    });
  }
  
  setTimeout(() => {
    const elements = getSlideAnimElements(slideIndex);
    
    for (const [animType, elems] of Object.entries(elements)) {
      elems.forEach((el, i) => {
        const delay = (parseInt(el.dataset.animDelay) || i + 1) * animDelay;
        const duration = el.dataset.animDuration || '0.8s';
        
        setTimeout(() => {
          el.style.transition = `opacity ${duration} ease-out, transform ${duration} ease-out`;
          el.style.opacity = '1';
          el.style.transform = 'none';
        }, delay);
      });
    }
  }, 300);
};

const activeSlide = num => {
  if (indexSlide >= 0 && indexSlide < slides.length) {
    const currentElements = getSlideAnimElements(indexSlide);
    for (const elements of Object.values(currentElements)) {
      elements.forEach(el => {
        el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        el.style.opacity = '0';
        el.style.transform = getInitialTransform(el);
      });
    }
  }
  
  setTimeout(() => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - num) * (100 + 4)}%) scale(${1 - Math.abs(i - num) * 0.1})`;
    });
    
    if (num >= 0 && num < slides.length) {
      setTimeout(() => {
        animateSlideElements(num);
      }, 500);
    }
  }, 200);
};

const activeDot = num => {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[num].classList.add('active');
};

const activeBG = num => {
  if (num % 2 === 0) {
    currentDeg = 0;
  } else {
    currentDeg = 180;
  }
  // slider.style.transform = `translate(-50%, -50%) rotate(${currentDeg}deg)`;
};

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    indexSlide = i;
    activeSlide(indexSlide);
    activeDot(indexSlide);
    activeBG(indexSlide);
  });
});

slides.forEach(slide => {
  slide.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  slide.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });

  slide.addEventListener('touchend', () => {
    if (startX > endX + 50) {
      indexSlide = (indexSlide + 1) % slides.length;
    } else if (startX < endX - 50) {
      indexSlide = (indexSlide - 1 + slides.length) % slides.length;
    }
    activeSlide(indexSlide);
    activeDot(indexSlide);
    activeBG(indexSlide);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  slides.forEach((slide, i) => {
    slide.style.opacity = '0';
    slide.style.transition = '0s';
    slide.style.transform = 'translateX(0) scale(1)';
  });
  
  resetAllAnimations();
  
  setTimeout(() => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - indexSlide) * (100 + 4)}%) scale(${1 - Math.abs(i - indexSlide) * 0.1})`;
    });
    
    void document.body.offsetHeight;
    
    setTimeout(() => {
      if (sliderContainer) {
        sliderContainer.style.transition = 'opacity 0.8s ease';
        sliderContainer.style.opacity = '1';
      }
      
      slides.forEach((slide, i) => {
        slide.style.transition = '1.5s';
        slide.style.opacity = '1';
      });
      
      activeDot(indexSlide);
      activeBG(indexSlide);
      
      setTimeout(() => {
        animateSlideElements(indexSlide);
      }, 500);
    }, 100);
  }, 100);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    indexSlide = (indexSlide + 1) % slides.length;
    activeSlide(indexSlide);
    activeDot(indexSlide);
    activeBG(indexSlide);
  } else if (e.key === 'ArrowLeft') {
    indexSlide = (indexSlide - 1 + slides.length) % slides.length;
    activeSlide(indexSlide);
    activeDot(indexSlide);
    activeBG(indexSlide);
  }
});