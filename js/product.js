// meodou 喵豆 - 产品详情页JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 全局变量
    let currentPrice = 2999;
    let selectedColor = '雪域白';
    let selectedQuantity = 1;
    const products = {
        1: {
            name: '喵豆智能盆',
            subtitle: '免猫砂智能猫厕所',
            price: '¥1,999',
            priceNum: 1999,
            originalPrice: '¥2,999',
            tag: '核心产品',
            image: 'images/product-main.png',
            thumbImage: 'images/product-demo.gif',
            features: [
                '零猫砂设计，告别粉尘异味',
                '自动清洁冲洗烘干',
                'APP远程控制监测',
                '健康数据实时追踪'
            ]
        },
        2: {
            name: '智享喂食器',
            subtitle: 'APP远程控制喂食',
            price: '¥899',
            priceNum: 899,
            originalPrice: '¥1,199',
            tag: '热销产品',
            image: 'images/product-feeder.png',
            thumbImage: 'images/product-feeder.png',
            features: [
                'APP远程定时定量喂食',
                '双重保鲜锁鲜设计',
                '断电续食安全保障',
                '多宠识别智能分配'
            ]
        },
        3: {
            name: '活泉饮水机',
            subtitle: '循环过滤活水系统',
            price: '¥599',
            priceNum: 599,
            originalPrice: '¥799',
            tag: '',
            image: 'images/product-water.png',
            thumbImage: 'images/product-water.png',
            features: [
                '四重深层过滤系统',
                '静音水泵无干扰',
                '智能缺水提醒',
                '易拆洗设计'
            ]
        },
        4: {
            name: '守护项圈',
            subtitle: 'GPS定位健康监测',
            price: '¥499',
            priceNum: 499,
            originalPrice: '¥699',
            tag: '',
            image: 'images/product-collar.png',
            thumbImage: 'images/product-collar.png',
            features: [
                'GPS+基站双重定位',
                '运动量健康监测',
                'LED夜间安全灯',
                '超长续航30天'
            ]
        },
        5: {
            name: '云端猫窝',
            subtitle: '恒温智能睡眠舱',
            price: '¥1,299',
            priceNum: 1299,
            originalPrice: '¥1,699',
            tag: '新品',
            image: 'images/product-bed.png',
            thumbImage: 'images/product-bed.png',
            features: [
                '智能恒温舒适睡眠',
                '空气质量实时监测',
                'APP远程控制温度',
                '易清洗可拆卸设计'
            ]
        },
        6: {
            name: 'meodou猫垫',
            subtitle: '智能恒温宠物垫',
            price: '¥399',
            priceNum: 399,
            originalPrice: '¥599',
            tag: '新品',
            image: 'images/cat-pad-product.png',
            thumbImage: 'images/cat-pad-structure-clean.png',
            features: [
                '智能恒温舒适睡眠',
                '防水透气材质',
                '多档温度调节',
                '安全低压供电'
            ],
            hasStructureImage: true
        }
    };

    // 获取URL参数
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // 加载产品数据
    function loadProductData() {
        const productId = getUrlParam('id') || '1';
        const product = products[productId];

        if (product) {
            // 更新页面标题
            document.title = `${product.name} - meodou 喵豆`;

            // 更新产品信息
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-subtitle').textContent = product.subtitle;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-original-price').textContent = product.originalPrice;
            document.getElementById('breadcrumb-name').textContent = product.name;

            // 更新弹窗中的产品信息
            const modalName = document.getElementById('modal-product-name');
            const modalSubtitle = document.getElementById('modal-product-subtitle');
            const modalPrice = document.getElementById('modal-product-price');
            if (modalName) modalName.textContent = product.name;
            if (modalSubtitle) modalSubtitle.textContent = product.subtitle;
            if (modalPrice) modalPrice.textContent = product.price;

            // 设置当前价格（用于计算总价），但如果是猫垫产品则由页面JS根据选择款式设置
            if (productId !== '6') {
                currentPrice = product.priceNum || 2999;
            }

            // 更新特点
            const featuresContainer = document.getElementById('product-features');
            featuresContainer.innerHTML = product.features.map(feature => `
                <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-sm text-gray-medium">${feature}</span>
                </div>
            `).join('');

            // 更新标签
            const tagElement = document.querySelector('.text-gold.text-xs.tracking-wider.uppercase');
            if (tagElement) {
                tagElement.textContent = product.tag || '智能产品';
            }

            // 根据产品类型设置图片
            const mainProductImg = document.getElementById('main-product-img');
            const thumb1Img = document.getElementById('thumb1-img');
            const thumb2Img = document.getElementById('thumb2-img');
            const thumb2Container = document.getElementById('thumb2-container');

            if (product.hasStructureImage) {
                // 猫垫产品 - 显示实物图
                mainProductImg.src = product.image;
                mainProductImg.alt = product.name;
                thumb1Img.src = product.image;
                thumb2Img.src = product.thumbImage;
                thumb2Container.setAttribute('data-src', product.thumbImage);

                // 隐藏演示GIF，显示结构示意图
                const demoGifSection = document.getElementById('demo-gif-section');
                const structureSection = document.getElementById('structure-section');
                if (demoGifSection) demoGifSection.classList.add('hidden');
                if (structureSection) structureSection.classList.remove('hidden');
            } else {
                // 其他产品 - 显示产品图
                mainProductImg.src = product.image;
                mainProductImg.alt = product.name;
                thumb1Img.src = product.image;
                thumb2Img.src = product.thumbImage;
                thumb2Container.setAttribute('data-src', product.thumbImage);

                // 显示演示GIF，隐藏结构示意图
                const demoGifSection = document.getElementById('demo-gif-section');
                const structureSection = document.getElementById('structure-section');
                if (demoGifSection) demoGifSection.classList.remove('hidden');
                if (structureSection) structureSection.classList.add('hidden');
            }
        }
    }

    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // 更新按钮状态
            tabBtns.forEach(b => {
                b.classList.remove('border-gold', 'text-gold');
                b.classList.add('border-transparent', 'text-gray-light');
            });
            this.classList.add('border-gold', 'text-gold');
            this.classList.remove('border-transparent', 'text-gray-light');

            // 更新内容显示
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(targetTab).classList.remove('hidden');
        });
    });

    // 缩略图点击切换
    const thumbnails = document.querySelectorAll('.grid-cols-4 > div');
    const mainImage = document.getElementById('main-image');

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // 更新边框样式
            thumbnails.forEach(t => {
                t.classList.remove('border-gold');
                t.classList.add('border-transparent');
            });
            this.classList.remove('border-transparent');
            this.classList.add('border-gold');

            // 更新主图（这里用emoji示意，实际应替换为图片）
            const emoji = this.querySelector('span').textContent;
            document.getElementById('product-emoji').textContent = emoji;
        });
    });

    // 数量选择器（如果需要）
    let quantity = 1;
    const quantityInput = document.getElementById('quantity');

    if (quantityInput) {
        document.getElementById('decreaseQty')?.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
            }
        });

        document.getElementById('increaseQty')?.addEventListener('click', function() {
            quantity++;
            quantityInput.value = quantity;
        });
    }

    // 加入购物车/立即购买按钮
    const buyButtons = document.querySelectorAll('a[href*="taobao"], a[href*="jd"], a[href*="官网"]');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 可以在这里添加统计或提示
            console.log('购买渠道点击:', this.textContent.trim());
        });
    });

    // 初始化
    loadProductData();

    console.log('产品详情页加载完成');
});

// 切换主图函数
function changeMainImage(container) {
    const mainImg = document.getElementById('main-product-img');
    const thumbImg = container.querySelector('img');

    if (mainImg && thumbImg) {
        mainImg.src = thumbImg.src;

        // 更新缩略图边框
        const thumbnails = document.querySelectorAll('#thumbnails > div');
        thumbnails.forEach(t => {
            t.classList.remove('border-gold');
            t.classList.add('border-transparent');
        });
        container.classList.remove('border-transparent');
        container.classList.add('border-gold');
    }
}
