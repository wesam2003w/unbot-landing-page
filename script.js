/**
 * UNBOT Website JavaScript
 * هذا الملف يحتوي على جميع التأثيرات التفاعلية والرسوم المتحركة للموقع
 */

// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // إزالة شاشة التحميل
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 800);
    }, 1500);

    // تهيئة مؤشر الماوس المخصص
    initCustomCursor();
    
    // تهيئة مكتبة AOS للتأثيرات الحركية عند التمرير
    initAOS();
    
    // تهيئة تأثيرات الخلفية
    initBackgroundEffects();
    
    // تهيئة تأثيرات العناصر ثلاثية الأبعاد
    init3DObjects();
    
    // تهيئة شريط التنقل
    initNavigation();
    
    // تهيئة أحداث الأزرار
    initButtonEvents();
    
    // تهيئة تأثير التمرير
    initScrollEffects();
    
    // تهيئة تأثير النص المتحرك
    initScrollingText();
    
    // تهيئة تأثير تساقط الجزيئات
    initParticlesFall();
    
    // تهيئة النوافذ المنبثقة
    initModals();
});

/**
 * تهيئة مؤشر الماوس المخصص
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // تأخير حركة المتابع قليلاً لإنشاء تأثير السحب
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // تغيير حجم المؤشر عند التحويم فوق العناصر القابلة للنقر
    document.querySelectorAll('a, button, input[type="submit"], .feature-item, .logo-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.opacity = '0.2';
        });
        
        item.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.opacity = '0.5';
        });
    });
    
    // إخفاء المؤشر المخصص عند مغادرة النافذة
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });
    
    // إظهار المؤشر المخصص عند دخول النافذة
    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
}

/**
 * تهيئة مكتبة AOS للتأثيرات الحركية عند التمرير
 */
function initAOS() {
    // التحقق من وجود مكتبة AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: false,
            offset: 100,
            delay: 100
        });
    } else {
        // إضافة تأثيرات بديلة إذا لم تكن المكتبة متاحة
        addFallbackAnimations();
    }
}

/**
 * إضافة تأثيرات بديلة إذا لم تكن مكتبة AOS متاحة
 */
function addFallbackAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // إضافة تأخير حسب خاصية data-aos-delay
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.classList.add('aos-init');
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

/**
 * تهيئة تأثيرات الخلفية
 */
function initBackgroundEffects() {
    const gridLines = document.querySelector('.grid-lines');
    
    // تهيئة particles.js إذا كان متاحاً
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#6c5ce7'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6c5ce7',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    } else {
        // إنشاء تأثير بديل للجزيئات إذا لم تكن المكتبة متاحة
        createFallbackParticles();
    }
    
    // تأثير حركة الشبكة عند تحريك الماوس
    if (gridLines) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // تحريك الشبكة بناءً على موضع الماوس
            gridLines.style.transform = `perspective(1000px) rotateX(${60 + mouseY * 5}deg) rotateY(${mouseX * 5}deg) scale(2)`;
        });
    }
}

/**
 * إنشاء تأثير بديل للجزيئات إذا لم تكن مكتبة particles.js متاحة
 */
function createFallbackParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fallback-particles';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '-2';
    particlesContainer.style.overflow = 'hidden';
    document.body.appendChild(particlesContainer);
    
    // إنشاء 50 جزيء
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

/**
 * إنشاء جزيء واحد للتأثير البديل
 * @param {HTMLElement} container - حاوية الجزيئات
 */
function createParticle(container) {
    const particle = document.createElement('div');
    
    // تعيين خصائص الجزيء
    particle.style.position = 'absolute';
    particle.style.width = (Math.random() * 5 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = '#6c5ce7';
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // تعيين موضع الجزيء
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = posX + '%';
    particle.style.top = posY + '%';
    
    // إضافة حركة للجزيء
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.transition = `transform ${duration}s linear ${delay}s, opacity 1s ease`;
    
    // إضافة الجزيء إلى الحاوية
    container.appendChild(particle);
    
    // تحريك الجزيء
    setTimeout(() => {
        const moveX = (Math.random() - 0.5) * 50;
        const moveY = (Math.random() - 0.5) * 50;
        particle.style.transform = `translate(${moveX}vw, ${moveY}vh)`;
        
        // إعادة تعيين الجزيء بعد انتهاء الحركة
        setTimeout(() => {
            container.removeChild(particle);
            createParticle(container);
        }, duration * 1000);
    }, 100);
}

/**
 * تهيئة تأثيرات العناصر ثلاثية الأبعاد
 */
function init3DObjects() {
    const sphere = document.querySelector('.sphere');
    const cube = document.querySelector('.cube');
    
    if (sphere || cube) {
        // إضافة تأثير الدوران للمكعب والكرة عند تحريك الماوس
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            if (cube) {
                // تعديل دوران المكعب بناءً على موضع الماوس
                cube.style.transform = `rotateX(${30 + mouseY * 20}deg) rotateY(${mouseX * 360}deg)`;
            }
            
            if (sphere) {
                // تحريك الكرة قليلاً بناءً على موضع الماوس
                sphere.style.transform = `translate(${(mouseX - 0.5) * 40}px, ${(mouseY - 0.5) * 40}px)`;
            }
        });
        
        // إضافة تأثير الضوء للكرة
        if (sphere) {
            createLightEffect(sphere);
        }
    }
    
    // تهيئة المكعب المركزي في قسم الشركاء
    const centerCube = document.querySelector('.cube-3d');
    if (centerCube) {
        // إضافة تأثير دوران مستمر للمكعب المركزي
        centerCube.style.animation = 'rotate 15s linear infinite';
    }
}

/**
 * إنشاء تأثير الضوء للعناصر
 * @param {HTMLElement} element - العنصر المراد إضافة تأثير الضوء له
 */
function createLightEffect(element) {
    // إضافة تأثير توهج متغير
    setInterval(() => {
        if (element) {
            const intensity = 0.6 + Math.random() * 0.4;
            element.style.boxShadow = `0 0 ${30 + Math.random() * 20}px rgba(108, 92, 231, ${intensity})`;
        }
    }, 2000);
}

/**
 * تهيئة شريط التنقل وسلوكه
 */
function initNavigation() {
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('nav ul li a, .mobile-menu ul li a');
    
    // تغيير شكل شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // تفعيل القائمة المتنقلة للهواتف
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // تغيير شكل زر القائمة
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // تفعيل التمرير السلس عند النقر على روابط التنقل
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                        
                        // إعادة زر القائمة إلى شكله الأصلي
                        const spans = mobileMenuToggle.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                    
                    // التمرير إلى القسم المستهدف
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // تحديث الرابط النشط
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // تحديث الرابط النشط عند التمرير
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * تهيئة أحداث الأزرار والتفاعلات
 */
function initButtonEvents() {
    // أزرار الدعوة للعمل
    const buttons = document.querySelectorAll('button');
    const demoBtn = document.querySelector('.demo-btn');
    const tutorialBtn = document.querySelector('.tutorial-btn');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // إضافة تأثير النقر لجميع الأزرار
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // إنشاء تأثير تموج عند النقر
            createRippleEffect(e, this);
        });
    });
    
    // تفعيل أزرار تسجيل الدخول وإنشاء الحساب
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal('login-modal');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            openModal('signup-modal');
        });
    }
    
    // تفعيل زر الفيديو التعليمي
    if (tutorialBtn) {
        tutorialBtn.addEventListener('click', function() {
            openModal('video-modal');
            // تعيين مصدر الفيديو
            const iframe = document.querySelector('#video-modal iframe');
            if (iframe) {
                iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            }
        });
    }
    
    // تفعيل زر التمرير للأعلى
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * إنشاء تأثير تموج عند النقر على الأزرار
 * @param {Event} e - حدث النقر
 * @param {HTMLElement} button - زر النقر
 */
function createRippleEffect(e, button) {
    // إزالة أي تأثيرات سابقة
    const ripples = button.querySelectorAll('.ripple');
    ripples.forEach(ripple => ripple.remove());
    
    // إنشاء عنصر التموج
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    // تحديد موضع وحجم التموج
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    // إزالة التموج بعد انتهاء التأثير
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * تهيئة تأثيرات التمرير
 */
function initScrollEffects() {
    // تأثير ظهور العناصر عند التمرير
    const heroContent = document.querySelector('.hero-content');
    const hero3DObjects = document.querySelector('.hero-3d-objects');
    
    // تطبيق تأثير الظهور المتدرج للقسم الرئيسي
    if (heroContent && hero3DObjects) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        hero3DObjects.style.opacity = '0';
        hero3DObjects.style.transform = 'translateY(20px) scale(0.95)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                hero3DObjects.style.transition = 'opacity 1s ease, transform 1s ease';
                hero3DObjects.style.opacity = '1';
                hero3DObjects.style.transform = 'translateY(0) scale(1)';
            }, 300);
        }, 300);
    }
    
    // زر التمرير للأعلى
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });
    }
}

/**
 * تهيئة تأثير النص المتحرك
 */
function initScrollingText() {
    const textWrapper = document.querySelector('.text-wrapper');
    
    if (textWrapper) {
        // التأكد من أن النص يتحرك بسلاسة
        const spans = textWrapper.querySelectorAll('span');
        
        // إضافة المزيد من النسخ لضمان استمرارية الحركة
        for (let i = 0; i < 3; i++) {
            spans.forEach(span => {
                const clone = span.cloneNode(true);
                textWrapper.appendChild(clone);
            });
        }
    }
}

/**
 * تهيئة تأثير تساقط الجزيئات
 */
function initParticlesFall() {
    const particlesWrapper = document.querySelector('.particles-wrapper');
    
    if (particlesWrapper) {
        // إنشاء 100 جزيء متساقط
        for (let i = 0; i < 100; i++) {
            createFallingParticle(particlesWrapper);
        }
    }
}

/**
 * إنشاء جزيء متساقط
 * @param {HTMLElement} container - حاوية الجزيئات
 */
function createFallingParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // تعيين خصائص عشوائية للجزيء
    const size = Math.random() * 6 + 2;
    const posX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;
    const opacity = Math.random() * 0.5 + 0.3;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = '-10px';
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
    
    // إعادة تدوير الجزيء بعد انتهاء التساقط
    setTimeout(() => {
        container.removeChild(particle);
        createFallingParticle(container);
    }, (delay + duration) * 1000);
}

/**
 * تهيئة النوافذ المنبثقة
 */
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    // فتح النافذة المنبثقة
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // إغلاق النافذة المنبثقة
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // إغلاق النافذة المنبثقة عند الضغط على زر Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

/**
 * فتح نافذة منبثقة
 * @param {string} modalId - معرف النافذة المنبثقة
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // إيقاف الفيديو عند إغلاق النافذة المنبثقة
        if (modalId === 'video-modal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                modal.querySelector('.modal-close').addEventListener('click', function() {
                    iframe.src = 'about:blank';
                });
                
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        iframe.src = 'about:blank';
                    }
                });
            }
        }
    }
}

/**
 * إغلاق نافذة منبثقة
 * @param {HTMLElement} modal - عنصر النافذة المنبثقة
 */
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // إيقاف الفيديو إذا كانت نافذة الفيديو
    if (modal.id === 'video-modal') {
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = 'about:blank';
        }
    }
}

// إضافة نمط CSS للتأثيرات الإضافية
(function addExtraStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* تأثيرات AOS البديلة */
        .aos-init {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .aos-init.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* تأثير التموج للأزرار */
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        /* تأثير توهج للعناصر */
        .hero-3d-objects::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(108, 92, 231, 0.4) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            z-index: -1;
            animation: pulse 4s infinite;
        }
        
        /* تأثير تحميل الصفحة */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--background-dark);
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
            pointer-events: none;
        }
        
        body.loaded::before {
            opacity: 0;
        }
        
        /* تأثير تساقط الجزيئات */
        @keyframes fall {
            to {
                transform: translateY(400px);
            }
        }
        
        /* تأثير الجزيئات البديل */
        .fallback-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
})();
