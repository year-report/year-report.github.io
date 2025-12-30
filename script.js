// 注释数据
const annotationsData = {
    1: {
        id: 1,
        text: "AI即人工智能（Artificial Intelligence），是指由人制造出来的机器所表现出来的智能。2025年，生成式AI如ChatGPT、Claude等工具的普及，使得AI在日常生活中的应用越来越广泛。",
        reference: "1. 中国人工智能学会. (2025). 人工智能发展报告."
    },
    2: {
        id: 2,
        text: "躺赢式努力是一种看似努力但缺乏实际效果的状态，常用来形容那些形式大于内容的努力方式。",
        reference: "2. 网络流行文化研究中心. (2025). 年度网络热词报告."
    },
    3: {
        id: 3,
        text: "电子榨菜是指人们在吃饭时观看的短视频、直播或剧集，如同榨菜一样成为吃饭的必备伴侣。",
        reference: "3. 中国互联网信息中心. (2025). 网络视听发展报告."
    },
    4: {
        id: 4,
        text: "情绪稳定大师指在各种情况下都能保持冷静、情绪稳定的人，是现代社会中备受推崇的性格特质。",
        reference: "4. 心理学研究. (2025). 情绪管理与心理健康."
    },
    5: {
        id: 5,
        text: "反向种草是一种反向营销现象，原本想推荐产品，结果反而让消费者失去购买欲望。",
        reference: "5. 营销学刊. (2025). 社交媒体营销新趋势."
    },
    6: {
        id: 6,
        text: "数字游民是指利用互联网远程工作的人，可以在世界各地旅行的同时工作，不受地理位置限制。",
        reference: "6. 全球职业发展报告. (2025). 远程工作与数字游民."
    },
    7: {
        id: 7,
        text: "显眼包是东北方言，指爱出风头、引人注目的人，带有调侃意味。",
        reference: "7. 中国语言资源保护工程. (2025). 东北方言词汇集."
    },
    8: {
        id: 8,
        text: "搭子文化是一种轻量化的社交关系，基于共同兴趣或需求形成的临时伙伴关系，如饭搭子、健身搭子等。",
        reference: "8. 社会学研究. (2025). 当代青年社交模式变迁."
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 加载保存的背景颜色
        const savedBgColor = localStorage.getItem('backgroundColor');
        if (savedBgColor) {
            document.body.style.background = savedBgColor;
        }
    } catch (e) {
        // 忽略localStorage错误，继续执行其他代码
        console.log('localStorage不可用，跳过背景颜色加载');
    }
    
    // 绑定注释标记事件
    bindAnnotationEvents();
    
    // 绑定导航按钮事件
    bindNavigationEvents();
    
    // 绑定键盘导航
    bindKeyboardNavigation();
    
    // 初始化滚动监听
    initScrollListener();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 绑定设置面板事件
    bindSettingsEvents();
    
    // 检查URL哈希值，跳转到对应页面
    checkUrlHash();
    
    // 显示页面内容
    document.body.style.opacity = '1';
});

// 检查URL哈希值并跳转到对应页面
function checkUrlHash() {
    const hash = window.location.hash;
    if (hash) {
        // 移除#符号
        const pageId = hash.substring(1);
        // 找到对应的页面元素
        const pageElement = document.getElementById(pageId);
        if (pageElement) {
            // 滚动到指定页面
            scrollToPage(pageElement);
        } else {
            // 尝试解析为数字，如#meme-1 -> 1
            const memeNumber = parseInt(pageId.replace('meme-', ''));
            if (!isNaN(memeNumber)) {
                const pages = document.querySelectorAll('.meme-page');
                if (pages[memeNumber - 1]) {
                    scrollToPage(pages[memeNumber - 1]);
                }
            }
        }
    }
}

// 绑定设置面板事件
function bindSettingsEvents() {
    const settingsBtn = document.getElementById('nav-settings');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsClose = document.getElementById('settings-close');
    const colorOptions = document.querySelectorAll('.color-option');
    
    // 设置按钮点击事件
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsPanel.classList.add('active');
        });
    }
    
    // 关闭按钮点击事件
    if (settingsClose) {
        settingsClose.addEventListener('click', () => {
            settingsPanel.classList.remove('active');
        });
    }
    
    // 点击面板外部关闭面板
    settingsPanel.addEventListener('click', (e) => {
        if (e.target === settingsPanel) {
            settingsPanel.classList.remove('active');
        }
    });
    
    // 颜色选项点击事件
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const bg = option.getAttribute('data-bg');
            document.body.style.background = bg;
            // 保存背景颜色到localStorage
            localStorage.setItem('backgroundColor', bg);
            settingsPanel.classList.remove('active');
        });
    });
}

// 添加滚动动画效果 - 限制翻动速度
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素进入视口时显示动画
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            } else {
                // 元素离开视口时播放消失动画
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px) scale(0.95)';
            }
        });
    }, observerOptions);
    
    // 为所有需要动画的元素添加初始样式和监听
    const animatedElements = document.querySelectorAll('.meme-emoji, .meme-title, .meme-description, .meme-example');
    animatedElements.forEach((element, index) => {
        // 设置初始状态
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.95)';
        // 设置统一的慢动画过渡，限制翻动速度
        element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        // 监听元素
        observer.observe(element);
    });
    
    // 为导航按钮添加淡入动画
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        // 使用统一的慢动画过渡
        button.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s`;
        
        // 页面加载后显示导航按钮
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, (300 + index * 100));
    });
}



// 绑定注释标记事件
function bindAnnotationEvents() {
    const markers = document.querySelectorAll('.annotation-marker');
    const popup = document.getElementById('annotation-popup');
    const closeBtn = document.getElementById('annotation-close');
    
    let activeMarker = null;
    
    markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            const annotationId = parseInt(marker.getAttribute('data-annotation') || '0');
            
            // 如果点击的是当前活跃的标记，关闭注释
            if (activeMarker === marker) {
                hideAnnotation();
                activeMarker = null;
            } else {
                // 否则显示新的注释
                showAnnotation(annotationId, marker);
                activeMarker = marker;
            }
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideAnnotation();
            activeMarker = null;
        });
    }
    
    // 点击页面其他地方关闭注释
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.annotation-marker') && !e.target.closest('.annotation-popup')) {
            hideAnnotation();
            activeMarker = null;
        }
    });
    
    // ESC键关闭注释
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAnnotation();
            activeMarker = null;
        }
    });
}

// 显示注释
function showAnnotation(annotationId, markerElement) {
    const annotation = annotationsData[annotationId];
    const popup = document.getElementById('annotation-popup');
    const body = document.getElementById('annotation-body');
    
    if (annotation && popup && body && markerElement) {
        // 设置注释内容
        body.innerHTML = `<p>${annotation.text}</p><p class="text-sm text-gray-500">${annotation.reference}</p>`;
        
        // 计算浮窗位置
        const rect = markerElement.getBoundingClientRect();
        
        // 定位浮窗在标记下方
        popup.style.left = `${rect.left + window.scrollX}px`;
        popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
        
        // 确保浮窗在视口内
        const popupRect = popup.getBoundingClientRect();
        if (popupRect.right > window.innerWidth) {
            popup.style.left = `${window.innerWidth - popupRect.width - 20 + window.scrollX}px`;
        }
        
        popup.classList.add('active');
    }
}

// 隐藏注释
function hideAnnotation() {
    const popup = document.getElementById('annotation-popup');
    if (popup) {
        popup.classList.remove('active');
        
        // 清除活跃注释项
        updateActiveAnnotationItem(null);
    }
}

// 更新活跃注释项
function updateActiveAnnotationItem(annotationId) {
    const items = document.querySelectorAll('.annotation-item');
    items.forEach(item => {
        const id = parseInt(item.getAttribute('data-annotation-id') || '0');
        if (id === annotationId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 绑定导航按钮事件
function bindNavigationEvents() {
    const prevBtn = document.getElementById('nav-prev');
    const nextBtn = document.getElementById('nav-next');
    const backBtn = document.getElementById('nav-back');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPreviousPage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextPage);
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', () => window.history.back());
    }
}

// 绑定键盘导航
function bindKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPreviousPage();
        } else if (e.key === 'ArrowRight') {
            goToNextPage();
        }
    });
}

// 初始化滚动监听
function initScrollListener() {
    let currentPage = 1;
    
    function updateCurrentPage() {
        const pages = document.querySelectorAll('.meme-page');
        const totalPages = pages.length;
        let newPage = 1;
        
        pages.forEach((page, index) => {
            const rect = page.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                newPage = index + 1;
            }
        });
        
        if (newPage !== currentPage) {
            currentPage = newPage;
            updatePageIndicator(currentPage, totalPages);
            updateNavigationButtons(currentPage, totalPages);
        }
    }
    
    window.addEventListener('scroll', updateCurrentPage);
    window.addEventListener('resize', updateCurrentPage);
    
    // 初始更新
    updateCurrentPage();
}

// 更新页面指示器
function updatePageIndicator(currentPage, totalPages) {
    const indicator = document.getElementById('current-meme');
    if (indicator) {
        indicator.textContent = `梗 ${currentPage} / ${totalPages}`;
    }
    // 即使没有指示器，也确保按钮状态正确更新
}

// 更新导航按钮状态
function updateNavigationButtons(currentPage, totalPages) {
    const prevBtn = document.getElementById('nav-prev');
    const nextBtn = document.getElementById('nav-next');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// 上一页
function goToPreviousPage() {
    const pages = document.querySelectorAll('.meme-page');
    const currentPage = getCurrentPage();
    
    if (currentPage > 1) {
        const targetPage = pages[currentPage - 2];
        scrollToPage(targetPage);
    }
}

// 下一页
function goToNextPage() {
    const pages = document.querySelectorAll('.meme-page');
    const currentPage = getCurrentPage();
    
    if (currentPage < pages.length) {
        const targetPage = pages[currentPage];
        scrollToPage(targetPage);
    }
}

// 获取当前页面
function getCurrentPage() {
    const pages = document.querySelectorAll('.meme-page');
    let currentPage = 1;
    
    pages.forEach((page, index) => {
        const rect = page.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentPage = index + 1;
        }
    });
    
    return currentPage;
}

// 滚动到指定页面 - 限制滚动速度
function scrollToPage(pageElement) {
    if (pageElement) {
        // 使用自定义平滑滚动，限制滚动速度
        const targetPosition = pageElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 600; // 滚动持续时间0.6秒，加快滚动速度
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // 缓动函数，使滚动更自然
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}

// 滚动进度指示器
const progressIndicator = document.createElement('div');
progressIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--color-accent);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease-out;
`;
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressIndicator.style.width = `${scrolled}%`;
});

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .text-sm { font-size: 13px; }
    .text-gray-500 { color: var(--color-light-text); }
    .mt-4 { margin-top: 16px; }
`;
document.head.appendChild(style);
