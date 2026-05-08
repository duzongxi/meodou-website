// meodou 喵豆 - 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 导航栏滚动效果
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.classList.add('shadow-sm');
        } else {
            nav.classList.remove('shadow-sm');
        }

        lastScrollY = currentScrollY;
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 关闭移动端菜单
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 初始化Swiper产品滑动
    if (typeof Swiper !== 'undefined' && document.querySelector('.productSwiper')) {
        new Swiper('.productSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
            },
        });
    }

    // 滚动动画观察器
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('section > div').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // 数字增长动画
    function animateNumber(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function update() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        update();
    }

    // 统计数字动画
    const stats = document.querySelectorAll('.text-4xl.font-light.text-gold');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const match = text.match(/[\d.]+/);
                if (match) {
                    const number = parseFloat(match[0]);
                    const suffix = text.replace(match[0], '');
                    entry.target.textContent = '0' + suffix;

                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        entry.target.textContent = (number >= 100 ? Math.floor(current) : current.toFixed(0)) + suffix;
                    }, 30);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // 产品图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
    `;
    backToTop.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gold text-white rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-gold-dark z-40 flex items-center justify-center';
    backToTop.id = 'backToTop';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.remove('opacity-0', 'invisible');
            backToTop.classList.add('opacity-100', 'visible');
        } else {
            backToTop.classList.add('opacity-0', 'invisible');
            backToTop.classList.remove('opacity-100', 'visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('meodou 喵豆 - 网站加载完成');
});
