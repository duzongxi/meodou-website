// meodou 喵豆 - 在线客服JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const faqBtns = document.querySelectorAll('.faq-btn');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // 预设回复
    const responses = {
        '产品如何保修？': '您好！喵豆所有产品均享受一年免费保修服务。保修期内，如产品出现非人为损坏的质量问题，您可以享受免费维修或更换服务。您可以通过官网订单页面申请售后服务，或拨打客服热线 400-888-6666 进行咨询。',
        '如何下载APP？': '喵豆APP支持iOS和Android系统：\n\n📱 iOS用户：在App Store搜索"喵豆"即可下载\n📱 Android用户：可在各大应用商店搜索下载，或扫描产品说明书上的二维码直接下载\n\n下载后使用手机号注册登录，按照提示绑定设备即可使用。',
        '支持哪些支付方式？': '我们支持多种支付方式：\n\n✅ 支付宝\n✅ 微信支付\n✅ 银联卡支付\n✅ 信用卡支付\n\n官网直购还支持分期付款服务（需满足一定金额），具体可在结算页面查看。',
        '退换货政策是怎样的？': '喵豆承诺7天无理由退换货：\n\n📦 退货条件：\n• 商品完好，包装齐全\n• 配件完整，不影响二次销售\n• 需在签收后7天内申请\n\n🔄 换货条件：\n• 同等价位商品可互换\n• 如有差价需补足或退还\n\n您可以在"我的订单"中申请退换货，或联系客服协助处理。',
        '如何联系售后？': '您可以通过以下方式联系我们的售后团队：\n\n📞 客服热线：400-888-6666\n⏰ 服务时间：9:00 - 21:00（全年无休）\n\n📧 邮箱：service@meodou.com\n\n💬 在线客服：通过本页面与我们实时沟通\n\n我们将在第一时间为您解决问题！',
        '产品咨询': '感谢您对喵豆产品的关注！我们的产品线包括：\n\n🐱 无砂自净 - 免猫砂智能猫厕所\n🍽️ 智享喂食器 - APP远程控制喂食\n💧 活泉饮水机 - 循环过滤活水系统\n📍 守护项圈 - GPS定位健康监测\n🏠 云端猫窝 - 恒温智能睡眠舱\n🎮 趣玩伴侣 - 智能互动玩具球\n\n请问您想了解哪款产品的详细信息？',
        '售后服务': '您好！喵豆为您提供完善的售后服务：\n\n✅ 7天无理由退换货\n✅ 1年免费保修\n✅ 终身维修服务\n✅ 专业技术支持\n\n请问您遇到了什么问题？我可以帮您解答或转接专业售后人员。',
        '物流查询': '您好！您可以通过以下方式查询物流：\n\n1. 登录官网"我的订单"页面查看\n2. 在订单确认短信中点击查询链接\n3. 联系在线客服帮您查询\n\n请提供您的订单号，我来帮您查询物流状态。',
        '退换货': '喵豆承诺7天无理由退换货：\n\n📦 退货条件：\n• 商品完好，包装齐全\n• 配件完整，不影响二次销售\n• 需在签收后7天内申请\n\n请问您是想退货还是换货？我可以帮您处理。',
        'default': '感谢您的咨询！我已收到您的问题，正在为您查询相关信息...\n\n如果问题比较紧急，您也可以拨打我们的客服热线：400-888-6666（9:00-21:00）'
    };

    // 添加消息到聊天窗口
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`;

        if (isUser) {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-gray-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-sm">我</span>
                </div>
                <div class="bg-gold text-white rounded-lg px-4 py-3 max-w-md shadow-sm">
                    <p class="text-sm">${content}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-sm">🐱</span>
                </div>
                <div class="bg-white rounded-lg px-4 py-3 max-w-md shadow-sm">
                    <p class="text-gray-dark text-sm whitespace-pre-line">${content}</p>
                </div>
            `;
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 显示正在输入状态
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex items-start space-x-3 typing-indicator';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm">🐱</span>
            </div>
            <div class="bg-white rounded-lg px-4 py-3 shadow-sm">
                <div class="flex space-x-1">
                    <span class="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                    <span class="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style="animation-delay: 0.1s;"></span>
                    <span class="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style="animation-delay: 0.2s;"></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 移除正在输入状态
    function hideTyping() {
        const typing = chatMessages.querySelector('.typing-indicator');
        if (typing) {
            typing.remove();
        }
    }

    // 发送消息
    function sendMessage(message) {
        if (!message.trim()) return;

        // 显示用户消息
        addMessage(message, true);

        // 显示正在输入
        showTyping();

        // 模拟回复延迟
        setTimeout(() => {
            hideTyping();

            // 获取回复
            let response = responses[message] || responses['default'];

            // 添加客服回复
            addMessage(response);
        }, 1000 + Math.random() * 500);

        // 清空输入框
        messageInput.value = '';
    }

    // 发送按钮点击事件
    sendBtn.addEventListener('click', function() {
        sendMessage(messageInput.value);
    });

    // 输入框回车事件
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage(this.value);
        }
    });

    // FAQ按钮点击事件
    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.dataset.question;
            sendMessage(question);
        });
    });

    // 快捷按钮点击事件
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const topic = this.textContent.trim();
            sendMessage(topic);
        });
    });

    // 输入框聚焦效果
    messageInput.addEventListener('focus', function() {
        this.parentElement.classList.add('ring-2', 'ring-gold/30');
    });

    messageInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('ring-2', 'ring-gold/30');
    });

    console.log('客服聊天系统加载完成');
});
