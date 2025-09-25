// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initScrollAnimations();
    initCounters();
    initParticleEffects();
    initSmoothScroll();
    initMobileMenu();
    initTypingEffect();
    initFloatingElements();
    initHoverEffects();
    initLoadingAnimations();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(`
        .about-card,
        .feature-card,
        .timeline-item,
        .stat-card,
        .section-header
    `);
    
    animatedElements.forEach((el, index) => {
        // Add different animation classes based on position
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('scale-in');
        }
        observer.observe(el);
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleMain = document.querySelector('.title-main');
    const titleSub = document.querySelector('.title-sub');
    
    if (titleMain && titleSub) {
        const mainText = titleMain.textContent;
        const subText = titleSub.textContent;
        
        titleMain.textContent = '';
        titleSub.textContent = '';
        titleSub.style.opacity = '0';
        
        // Type main title
        let i = 0;
        const typeMain = () => {
            if (i < mainText.length) {
                titleMain.textContent += mainText.charAt(i);
                i++;
                setTimeout(typeMain, 100);
            } else {
                // Start sub title after main is done
                setTimeout(() => {
                    titleSub.style.opacity = '1';
                    let j = 0;
                    const typeSub = () => {
                        if (j < subText.length) {
                            titleSub.textContent += subText.charAt(j);
                            j++;
                            setTimeout(typeSub, 50);
                        }
                    };
                    typeSub();
                }, 500);
            }
        };
        
        setTimeout(typeMain, 1000);
    }
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-elements > div');
    
    floatingElements.forEach((element, index) => {
        // Random initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        element.style.left = randomX + '%';
        element.style.top = randomY + '%';
        
        // Add random movement
        setInterval(() => {
            const newX = Math.random() * 100;
            const newY = Math.random() * 100;
            
            element.style.transition = 'all 10s ease-in-out';
            element.style.left = newX + '%';
            element.style.top = newY + '%';
        }, 10000 + (index * 2000));
    });
}

// Particle effects
function initParticleEffects() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        hero.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            createParticle(particleContainer);
        }
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        opacity: 0.6;
        pointer-events: none;
    `;
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    // Animate particle
    const animateParticle = () => {
        const duration = 3000 + Math.random() * 2000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        
        particle.animate([
            { 
                left: startX + '%', 
                top: startY + '%',
                opacity: 0.6,
                transform: 'scale(1)'
            },
            { 
                left: endX + '%', 
                top: endY + '%',
                opacity: 0,
                transform: 'scale(0.5)'
            }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        }).addEventListener('finish', () => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = '0.6';
            animateParticle();
        });
    };
    
    // Start animation with random delay
    setTimeout(animateParticle, Math.random() * 2000);
}

// Hover effects
function initHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .buy-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });
    
    // Card tilt effect
    const cards = document.querySelectorAll('.feature-card, .about-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Trigger entrance animations
            const heroElements = document.querySelectorAll('.hero-text > *');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.animation = `fadeInUp 0.8s ease forwards`;
                }, index * 200);
            });
        }, 500);
    });
}

// Add CSS for loading states
const loadingStyles = `
    .loading * {
        animation-play-state: paused !important;
    }
    
    .loading .hero-text > * {
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Mouse cursor effects
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('button, a, .card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize cursor effects on desktop only
if (window.innerWidth > 768) {
    initCursorEffects();
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .floating-elements');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${rate}px)`;
        });
    });
}

initParallax();

// Easter eggs
function initEasterEggs() {
    let clickCount = 0;
    const logo = document.querySelector('.nav-logo');
    
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 5) {
                // Trigger confetti effect
                createConfetti();
                clickCount = 0;
            }
        });
    }
}

function createConfetti() {
    const colors = ['#FF6B35', '#F7931E', '#FFD23F', '#8B5CF6', '#3B82F6'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        confetti.animate([
            { 
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight + 20}px) rotate(720deg)`,
                opacity: 0
            }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            confetti.remove();
        });
    }
}

initEasterEggs();

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const tempImg = new Image();
                tempImg.onload = () => {
                    img.style.opacity = '1';
                };
                tempImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };
}

initPerformanceOptimizations();

// Add some fun sound effects (optional)
function initSoundEffects() {
    const buttons = document.querySelectorAll('button, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Create a subtle click sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// Initialize sound effects only if user has interacted with the page
document.addEventListener('click', () => {
    initSoundEffects();
}, { once: true });

// Console easter egg
console.log(`
🚀 TRENCHMAN TO THE MOON! 🚀
     
     Welcome to the console, fellow developer!
     
     You've found the secret developer area.
     
     Fun fact: This website was built with love,
     memes, and a lot of Romanian enthusiasm!
     
     Type 'trenchman.launch()' to see something cool!
`);

window.trenchman = {
    launch: function() {
        createConfetti();
        console.log('🚀 LAUNCHING TO THE MOON! 🌙');
        
        // Change page title temporarily
        const originalTitle = document.title;
        document.title = '🚀 TRENCHMAN IS LAUNCHING! 🚀';
        
        setTimeout(() => {
            document.title = originalTitle;
        }, 5000);
    }
};
