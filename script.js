document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = slideCount - 1;
        } else if (slideIndex >= slideCount) {
            slideIndex = 0;
        }

        currentSlide = slideIndex;

        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', function() {
        goToSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentSlide + 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    function initAnimations() {
        const animatedElements = document.querySelectorAll('.t-animate');

        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
                rect.bottom >= 0
            );
        }

        function checkAnimationsOnLoad() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('t-animate_started');
                }
            });
        }

        function checkAnimationsOnScroll() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('t-animate_started')) {
                    element.classList.add('t-animate_started');
                }
            });
        }

        const heroBlock = document.getElementById('hero');
        if (heroBlock) {
            setTimeout(() => {
                heroBlock.classList.add('t-animate_started');
            }, 100);
        }

        checkAnimationsOnLoad();

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    checkAnimationsOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    initAnimations();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.advantage-card, .step-card, .stat-item, .slide');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
