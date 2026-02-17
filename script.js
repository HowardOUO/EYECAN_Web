/* ============================================
   EYECAN 眼肿瘤科普 - 主JavaScript文件
   功能：数据加载、卡片生成、交互处理
   ============================================ */

// 全局配置
const CONFIG = {
    dataBasePath: 'assets/Link',
    categories: {
        'feature-articles': 'Feature Articles',
        'pop-sci-articles': 'Pop Sci Articles',
        'pop-sci-videos': 'Pop Sci Videos',
        'practical-dynamics': 'Pratical Dynamics',
        'recent-research': 'Recent Research'
    },
    icons: {
        'feature-articles': 'fas fa-newspaper',
        'pop-sci-articles': 'fas fa-book-open',
        'pop-sci-videos': 'fas fa-video',
        'practical-dynamics': 'fas fa-chart-line',
        'recent-research': 'fas fa-file-alt'
    },
    maxCardsPerCategory: 9,
    loadingDelay: 300 // 模拟加载延迟（毫秒）
};

// 应用状态
const AppState = {
    isLoading: false,
    loadedData: {},
    activeNavLink: 'home'
};

// DOM元素缓存
const DOM = {
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('nav-menu'),
    navToggle: document.getElementById('nav-toggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    cardContainers: {}
};

// 初始化函数
async function init() {
    console.log('EYECAN 眼肿瘤科普 - 初始化中...');

    // 缓存卡片容器
    Object.keys(CONFIG.categories).forEach(category => {
        DOM.cardContainers[category] = document.getElementById(`${category}-cards`);
    });

    // 设置事件监听器
    setupEventListeners();

    // 加载所有数据
    await loadAllData();

    // 初始化导航
    initNavigation();

    console.log('初始化完成！');

    // 绑定静态卡片的点击链接
    bindCardLinks();
}

// 设置事件监听器
function setupEventListeners() {
    // 滚动时导航栏效果
    window.addEventListener('scroll', handleScroll);

    // 移动端菜单切换
    if (DOM.navToggle) {
        DOM.navToggle.addEventListener('click', toggleMobileMenu);
    }

    // 导航链接点击
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // 窗口大小改变时重新调整
    window.addEventListener('resize', handleResize);
}

// 加载所有数据
async function loadAllData() {
    AppState.isLoading = true;
    showLoadingStates();

    try {
        // 并行加载所有类别的数据
        const loadPromises = Object.keys(CONFIG.categories).map(category =>
            loadCategoryData(category)
        );

        await Promise.all(loadPromises);

        // 延迟显示以提供更好的用户体验
        await new Promise(resolve => setTimeout(resolve, CONFIG.loadingDelay));

    } catch (error) {
        console.error('数据加载失败:', error);
        showErrorStates();
    } finally {
        AppState.isLoading = false;
        hideLoadingStates();
    }
}

// 加载单个类别的数据
async function loadCategoryData(category) {
    const categoryName = CONFIG.categories[category];
    console.log(`加载类别: ${categoryName}`);

    try {
        // 对于Recent Research，检查是否为空
        if (category === 'recent-research') {
            const isEmpty = await checkRecentResearchEmpty();
            if (isEmpty) {
                AppState.loadedData[category] = [];
                showEmptyState(category);
                return;
            }
        }

        // 在实际应用中，这里会从服务器获取数据
        // 由于我们只有本地文件，我们将模拟数据加载
        const mockData = await loadMockData(category);
        AppState.loadedData[category] = mockData;

        // 生成卡片
        renderCards(category, mockData);

    } catch (error) {
        console.error(`加载 ${categoryName} 数据失败:`, error);
        AppState.loadedData[category] = [];
        showErrorState(category, error);
    }
}

// 检查Recent Research是否为空
async function checkRecentResearchEmpty() {
    // 在实际应用中，这里会检查文件是否为空
    // 由于我们只有本地文件，我们检查文件大小
    try {
        // 模拟检查 - 现在文件有内容了
        return false; // 文件现在有内容
    } catch (error) {
        console.error('检查Recent Research失败:', error);
        return false; // 出错时也假设有内容
    }
}

// 加载模拟数据（从本地文件结构模拟）
async function loadMockData(category) {
    const categoryName = CONFIG.categories[category];

    // 模拟数据 - 在实际应用中，这里会从.txt文件读取
    const mockData = {
        'feature-articles': [
            {
                title: '不痛不痒≠没事：最会伪装的眼肿瘤——睑板腺癌！',
                url: 'https://mp.weixin.qq.com/s/ukbyY4iq-qZmZHJPWlJaow',
                date: '2026年1月24日',
                topic: '专题文章'
            }
        ],
        'pop-sci-articles': [
            {
                title: '眼睛里的"黑点"真的没事吗？',
                url: 'https://mp.weixin.qq.com/s/gIwauuwcKYin8J93gpGS_g',
                date: '2026年1月26日',
                topic: '科普文章'
            },
            {
                title: '眼睑皮脂腺癌：隐秘的"伪装者"',
                url: 'https://mp.weixin.qq.com/s/IrzhXzb48yn4moOWP5rNrA',
                date: '2026年1月31日',
                topic: '科普文章'
            }
        ],
        'pop-sci-videos': [
            {
                title: '眼皮上的"疑案"如何破？《眼皮侦探事务所》来帮你！',
                url: 'https://mp.weixin.qq.com/s/ncooVGRPJaleiFmFLRAyKg',
                date: '2026年1月28日',
                topic: '科普视频'
            },
            {
                title: '包大人',
                url: 'https://example.com/baodaren',
                date: '2026年1月25日',
                topic: '科普视频'
            },
            {
                title: '曙光',
                url: 'https://example.com/shuguang',
                date: '2026年1月27日',
                topic: '科普视频'
            },
            {
                title: '眼睛的秘密警报',
                url: 'https://example.com/yanjingjingbao',
                date: '2026年1月29日',
                topic: '科普视频'
            },
            {
                title: '黑色素瘤通缉令',
                url: 'https://example.com/heisesuliu',
                date: '2026年1月30日',
                topic: '科普视频'
            }
        ],
        'practical-dynamics': [
            {
                title: '上海交通大学"守护\'视\'界之光：眼肿瘤的早期信号与全面眼健康管理"实践团赴圣公会陈融中学圣智堂开展科普讲座',
                url: 'https://mp.weixin.qq.com/s/7zua6CQKBLp4X-OPvEEfRw',
                date: '2025年8月31日',
                topic: '实践动态'
            }
        ],
        'recent-research': [
            {
                title: '眼睑皮脂腺癌区域淋巴结转移的触诊与超声诊断价值：十年队列研究',
                url: 'https://example.com/research1',
                date: '2025年12月15日',
                topic: '文献阅读'
            }
        ]
    };

    // 返回对应类别的数据，限制最大数量
    return (mockData[category] || []).slice(0, CONFIG.maxCardsPerCategory);
}

// 渲染卡片
function renderCards(category, data) {
    const container = DOM.cardContainers[category];
    if (!container) return;

    // 清空容器（移除加载状态）
    container.innerHTML = '';

    if (!data || data.length === 0) {
        showEmptyState(category);
        return;
    }

    // 创建卡片元素
    data.forEach(item => {
        const card = createCardElement(item, category);
        container.appendChild(card);
    });
}

// 创建卡片元素
function createCardElement(item, category) {
    const card = document.createElement('div');
    card.className = 'card';

    const icon = CONFIG.icons[category] || 'fas fa-file-alt';

    card.innerHTML = `
        <div class="card-header">
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <div class="card-date">
                <i class="far fa-calendar"></i>
                <span>${item.date}</span>
            </div>
        </div>
        <div class="card-body">
            <div class="card-topic">
                <i class="${icon}"></i>
                <span>${item.topic}</span>
            </div>
        </div>
        <div class="card-footer">
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card-link">
                <span>阅读全文</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    return card;
}

// 显示加载状态
function showLoadingStates() {
    Object.keys(DOM.cardContainers).forEach(category => {
        const container = DOM.cardContainers[category];
        if (container) {
            // 容器已经有加载状态的骨架屏
            // 可以在这里添加额外的加载指示器
        }
    });
}

// 隐藏加载状态
function hideLoadingStates() {
    // 加载状态会随着数据渲染自动被替换
}

// 显示空状态
function showEmptyState(category) {
    const container = DOM.cardContainers[category];
    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 创建空状态元素
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';

    let message = '暂无内容';
    let description = '当前没有可显示的内容。';

    if (category === 'recent-research') {
        message = '暂无最新文献';
        description = '当前暂无最新研究文献，我们正在积极收集和整理中。如果您有相关文献推荐，请联系我们。';
    }

    emptyState.innerHTML = `
        <i class="fas fa-search fa-3x empty-icon"></i>
        <h3 class="empty-title">${message}</h3>
        <p class="empty-description">${description}</p>
        ${category === 'recent-research' ?
            '<a href="mailto:contact@eyecan.org" class="btn btn-outline">' +
            '<i class="fas fa-envelope"></i>推荐文献</a>' : ''}
    `;

    container.appendChild(emptyState);
}

// 显示错误状态
function showErrorState(category, error) {
    const container = DOM.cardContainers[category];
    if (!container) return;

    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-exclamation-triangle fa-3x empty-icon"></i>
            <h3 class="empty-title">加载失败</h3>
            <p class="empty-description">
                无法加载内容，请刷新页面重试。
            </p>
            <button class="btn btn-outline retry-btn">
                <i class="fas fa-redo"></i>
                重试加载
            </button>
        </div>
    `;

    // 添加重试按钮事件
    const retryBtn = container.querySelector('.retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => loadCategoryData(category));
    }
}

// 显示所有错误状态
function showErrorStates() {
    Object.keys(DOM.cardContainers).forEach(category => {
        showErrorState(category, new Error('加载失败'));
    });
}

// 滚动处理
function handleScroll() {
    // 导航栏滚动效果
    if (window.scrollY > 50) {
        DOM.navbar.classList.add('scrolled');
    } else {
        DOM.navbar.classList.remove('scrolled');
    }

    // 更新活动导航链接
    updateActiveNavLink();
}

// 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.module-section');
    const scrollPosition = window.scrollY + 100; // 偏移量

    let currentSection = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    // 更新导航链接状态
    if (currentSection !== AppState.activeNavLink) {
        AppState.activeNavLink = currentSection;

        DOM.navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// 导航链接点击处理
function handleNavClick(e) {
    const link = e.currentTarget;
    const targetId = link.getAttribute('href');

    // 如果是内部链接
    if (targetId.startsWith('#')) {
        e.preventDefault();

        // 更新活动状态
        DOM.navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // 平滑滚动到目标
        scrollToSection(targetId);

        // 更新URL
        updateUrlHash(targetId);

        // 在移动端关闭菜单
        if (window.innerWidth <= 767) {
            closeMobileMenu();
        }
    }
}

// 平滑滚动到区域
function scrollToSection(sectionId) {
    const targetElement = document.querySelector(sectionId);
    if (!targetElement) return;

    const navbarHeight = DOM.navbar.clientHeight;
    const targetPosition = targetElement.offsetTop - navbarHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// 更新URL哈希
function updateUrlHash(hash) {
    if (history.pushState) {
        history.pushState(null, null, hash);
    } else {
        window.location.hash = hash;
    }
}

// 初始化导航
function initNavigation() {
    // 设置初始活动链接
    updateActiveNavLink();

    // 监听URL哈希变化
    window.addEventListener('hashchange', handleHashChange);

    // 初始处理哈希
    handleHashChange();
}

// 处理哈希变化
function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            // 更新活动导航链接
            DOM.navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === hash) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // 滚动到目标（如果不在视图中）
            setTimeout(() => {
                const navbarHeight = DOM.navbar.clientHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                if (Math.abs(window.scrollY - targetPosition) > 100) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }
}

// 移动端菜单切换
function toggleMobileMenu() {
    DOM.navMenu.classList.toggle('active');
    DOM.navToggle.classList.toggle('active');

    // 阻止背景滚动
    document.body.style.overflow = DOM.navMenu.classList.contains('active') ? 'hidden' : '';
}

// 关闭移动端菜单
function closeMobileMenu() {
    DOM.navMenu.classList.remove('active');
    DOM.navToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// 窗口大小改变处理
function handleResize() {
    // 如果窗口变大且移动菜单是打开的，关闭它
    if (window.innerWidth > 767 && DOM.navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 为卡片绑定点击链接
function bindCardLinks() {
    console.log('绑定卡片链接...');

    // 选择所有有data-url属性的卡片
    const cards = document.querySelectorAll(`
        .video-card[data-url],
        .topic-card[data-url],
        .research-card[data-url],
        .article-card[data-url]
    `);

    cards.forEach(card => {
        // 添加可点击样式
        card.style.cursor = 'pointer';

        // 添加点击事件
        card.addEventListener('click', function(event) {
            // 防止在内部链接上点击时触发
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }

            const url = this.dataset.url;
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });

        // 添加键盘支持
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        // 添加可访问性标签
        const title = card.dataset.title || card.querySelector('h3, h4')?.textContent || '相关内容';
        card.setAttribute('aria-label', `跳转到: ${title}`);

        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const url = this.dataset.url;
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            }
        });
    });

    console.log(`已绑定 ${cards.length} 个卡片链接`);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 暴露一些函数给全局作用域（用于调试）
window.EYECAN = {
    reloadData: () => loadAllData(),
    getAppState: () => AppState,
    scrollToSection,
    toggleMobileMenu
};

console.log('EYECAN script loaded');