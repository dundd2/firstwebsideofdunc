(function() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    const darkModeToggleBtn = document.getElementById('darkModeToggleBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    darkModeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    const memeCards = document.querySelectorAll('.meme-card');
    memeCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'rotate(3deg)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'rotate(0deg)';
        });
    });

    // 載入動畫
    window.addEventListener('load', () => {
        // Make sure we have the loading overlay
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 100);
        }
        
        // Fix potential image loading issues
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.src = img.src;
            }
        });
    });

    // 改進卡片動畫
    document.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (yPercent - 0.5) * 10;
            const rotateY = (xPercent - 0.5) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // 深色模式切換動畫
    darkModeToggleBtn.addEventListener('click', () => {
        darkModeToggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            darkModeToggleBtn.style.transform = 'none';
        }, 500);
        document.body.classList.toggle('dark-mode');
    });

    // 簡化深色模式切換功能
    darkModeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // 更新按鈕圖示
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggleBtn.innerHTML = '☀️';
        } else {
            darkModeToggleBtn.innerHTML = '🌙';
        }

        // 添加旋轉動畫
        darkModeToggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            darkModeToggleBtn.style.transform = 'none';
        }, 500);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - 80; // 考慮導航欄高度
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll progress indicator
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + '%';
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Search functionality
    function showSearch() {
        document.getElementById('searchModal').style.display = 'flex';
        document.getElementById('searchInput').focus();
    }

    function hideSearch() {
        document.getElementById('searchModal').style.display = 'none';
    }

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';

        if (searchTerm.length < 2) return;

        // Define searchable content
        const searchableContent = [
            { title: 'Home', link: '#section1', description: 'Main page content and updates' },
            { title: 'Legacy Versions', link: '#section2', description: 'Access to previous versions of the website' },
            { title: 'About', link: '#section3', description: 'Information about DunDD' },
            { title: 'Testimonials', link: '#section4', description: 'User feedback and testimonials' },
            { title: 'Update Log', link: 'Pages/log.html', description: 'Website update history' },
            { title: 'Compare AI upscaling', link: 'Pages/Compare AI upscaling.html', description: 'AI upscaling comparison' },
            { title: 'Henshin', link: 'Pages/henshin.html', description: 'Henshin page' }
        ];

        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm)
        );

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-muted">No results found</p>';
            return;
        }

        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'p-3 border-bottom hover-bg';
            resultElement.innerHTML = `
                <a href="${result.link}" class="text-decoration-none" onclick="hideSearch()">
                    <h5 class="mb-1">${result.title}</h5>
                    <p class="mb-0 text-muted">${result.description}</p>
                </a>
            `;
            resultsContainer.appendChild(resultElement);
        });
    });

    // Close search modal when clicking outside
    document.getElementById('searchModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideSearch();
        }
    });

    // Close search modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideSearch();
        }
    });

    // Share functionality
    async function shareContent() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'DunDD\'s Website',
                    text: 'Check out DunDD\'s personal website!',
                    url: window.location.href
                });
            } catch (err) {
                showNotification('Error sharing content');
            }
        } else {
            showNotification('Share not supported on this browser');
        }
    }

    // Cookie consent
    function showCookieConsent() {
        if (!localStorage.getItem('cookieAccepted')) {
            document.getElementById('cookieConsent').classList.add('show');
        }
    }

    function acceptCookies() {
        localStorage.setItem('cookieAccepted', 'true');
        const cookieConsent = document.getElementById('cookieConsent');
        cookieConsent.style.bottom = '-100%';
        setTimeout(() => {
            cookieConsent.remove();
        }, 300);
    }

    function declineCookies() {
        localStorage.setItem('cookieAccepted', 'false');
        const cookieConsent = document.getElementById('cookieConsent');
        cookieConsent.style.bottom = '-100%';
        setTimeout(() => {
            cookieConsent.remove();
        }, 300);
    }

    // Image lazy loading
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    });

    // Show cookie consent on load
    window.addEventListener('load', showCookieConsent);

    // Add these functions to the existing script
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.getElementById('toastContainer').appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add loading skeletons
    function addSkeletonLoading() {
        document.querySelectorAll('.content-card').forEach(card => {
            if (!card.innerHTML.trim()) {
                card.classList.add('skeleton');
                card.style.height = '200px';
            }
        });
    }

    // Improve image loading
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    });

    window.addEventListener('load', () => {
        showToast('Welcome to Dunc\'s Website! 👋');
    });

    // Add Bing Chiling form handling
    document.getElementById('bingchilingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const selected = document.querySelector('input[name="bingchilling"]:checked');
        if (!selected) {
            showNotification('Please select an option first!', 'warning');
            return;
        }

        const resultDiv = document.getElementById('bingchilingResult');
        const image = document.querySelector('.bingchiling-image');
        
        let message = '';
        let creditChange = 0;
        let className = '';
        
        switch(selected.value) {
            case 'YES':
                message = '🌟 You truly appreciate the glory of Bing Chiling! Your social credit score has increased. John Xina would be proud! 🍦';
                creditChange = 100;
                className = 'result-positive';
                image.style.animation = 'bounce 1s ease infinite';
                createConfetti(e.target.getBoundingClientRect().left + e.target.getBoundingClientRect().width / 2, e.target.getBoundingClientRect().top);
                break;
            case 'NO':
                message = '❌ Your lack of appreciation for Bing Chiling has been recorded. Your social credit score has decreased. Consider reviewing your life choices. 😢';
                creditChange = -50;
                className = 'result-negative';
                image.style.animation = 'shake 0.5s ease';
                break;
            case 'EM.....':
                message = '🤔 Your indecision about Bing Chiling has been noted... The authorities are watching. 📝';
                creditChange = 0;
                className = 'result-neutral';
                image.style.animation = 'wobble 1s ease';
                break;
        }
        
        // Update the social credit meter
        updateSocialCredit(creditChange);
        
        // Show floating social credit score animation
        const creditDiv = document.createElement('div');
        creditDiv.className = 'social-credit-animation';
        creditDiv.textContent = creditChange > 0 ? `+${creditChange}` : creditChange;
        creditDiv.style.color = creditChange > 0 ? '#4CAF50' : 
                               creditChange < 0 ? '#f44336' : '#ff9800';
        
        // Position the animation near the clicked option
        const rect = selected.parentElement.getBoundingClientRect();
        creditDiv.style.left = `${rect.left + rect.width / 2}px`;
        creditDiv.style.top = `${rect.top}px`;
        
        document.body.appendChild(creditDiv);
        setTimeout(() => creditDiv.remove(), 1500);

        // Display result
        resultDiv.textContent = message;
        resultDiv.className = `bingchiling-result mt-4 p-4 rounded-3 text-center ${className} show`;
        
        // Clear animation after some time
        setTimeout(() => {
            image.style.animation = '';
        }, 3000);
    });
    
    // Add click handler for vote option cards
    document.querySelectorAll('.vote-option-card').forEach(card => {
        card.addEventListener('click', function() {
            const input = this.querySelector('input[type="radio"]');
            input.checked = true;
            
            // Visual feedback
            document.querySelectorAll('.vote-option-card').forEach(c => {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    // Social credit system
    let socialCredit = 0;
    
    function updateSocialCredit(change) {
        socialCredit += change;
        
        // Update the display
        const creditScore = document.getElementById('creditScore');
        const creditBar = document.getElementById('creditBar');
        
        creditScore.textContent = socialCredit;
        
        // Calculate percentage (range from -100 to +500)
        const percentage = Math.min(100, Math.max(0, (socialCredit + 100) / 600 * 100));
        creditBar.style.width = `${percentage}%`;
        
        // Update color
        if (socialCredit > 200) {
            creditBar.style.backgroundColor = '#4CAF50';
        } else if (socialCredit > 0) {
            creditBar.style.backgroundColor = '#2196F3';
        } else if (socialCredit > -50) {
            creditBar.style.backgroundColor = '#FF9800';
        } else {
            creditBar.style.backgroundColor = '#F44336';
        }
        
        creditBar.setAttribute('aria-valuenow', percentage);
    }
    
    // Initialize the social credit display
    document.addEventListener('DOMContentLoaded', () => {
        updateSocialCredit(0);
    });

    // Add confetti effect
    function createConfetti(x, y) {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // Add this CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes wobble {
             0%, 100% { transform: rotate(0); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }
        
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            top: -10px;
            animation: fall 3s linear forwards;
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Add active state to navigation links
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        
        // Function to update active state
        function updateActiveLink() {
            const scrollPosition = window.scrollY;
            
            document.querySelectorAll('section[id]').forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.id;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        // Update active state on scroll
        window.addEventListener('scroll', updateActiveLink);
        
        // Update active state on click
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Initial check for active link
        updateActiveLink();
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.container > div').forEach(section => {
        section.classList.add('section-animate');
        observer.observe(section);
    });

    // 修復右側設定按鈕沒有反應的問題
    function showSettings() {
        // Initialize Bootstrap modal
        const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
        
        // Load saved settings
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedFontSize = localStorage.getItem('fontSize') || '16';
        
        const themeSelect = document.getElementById('themeSelect');
        const fontSizeRange = document.getElementById('fontSizeRange');
        const fontSizeValue = document.getElementById('fontSizeValue');
        
        // Set initial values
        themeSelect.value = savedTheme;
        fontSizeRange.value = savedFontSize;
        fontSizeValue.textContent = `${savedFontSize}px`;
        
        // Theme change handler
        themeSelect.addEventListener('change', function(e) {
            const selectedTheme = e.target.value;
            localStorage.setItem('theme', selectedTheme);
            
            // Remove all theme classes
            document.body.classList.remove('theme-synthwave', 'theme-cyberpunk', 'theme-retro', 
                'theme-nature', 'theme-pastel', 'theme-terminal', 'theme-neon', 'theme-space', 'dark-mode');
            
            // Apply selected theme
            if (selectedTheme === 'dark') {
                document.body.classList.add('dark-mode');
            } else if (selectedTheme !== 'light') {
                document.body.classList.add(`theme-${selectedTheme}`);
            }
            
            showToast(`Theme changed to ${selectedTheme}`);
        });
        
        // Font size change handler
        fontSizeRange.addEventListener('input', function(e) {
            const size = e.target.value;
            localStorage.setItem('fontSize', size);
            document.documentElement.style.fontSize = `${size}px`;
            fontSizeValue.textContent = `${size}px`;
        });
        
        // Show the modal
        settingsModal.show();
    }

    // 修復 Cookie Consent
    function acceptCookies() {
        localStorage.setItem('cookieAccepted', 'true');
        const cookieConsent = document.getElementById('cookieConsent');
        cookieConsent.style.bottom = '-100%';
        setTimeout(() => {
            cookieConsent.remove();
        }, 300);
    }

    function declineCookies() {
        localStorage.setItem('cookieAccepted', 'false');
        const cookieConsent = document.getElementById('cookieConsent');
        cookieConsent.style.bottom = '-100%';
        setTimeout(() => {
            cookieConsent.remove();
        }, 300);
    }

    // 新增 Bing Chiling 特效
    function addBingChilingEffect() {
        // Disable the 3D effect completely to make the button more stable
        // This function is intentionally left empty to disable the effect
        
        // The original code has been commented out:
        /*
        const bingchilingCard = document.querySelector('#bingchilingCard');
        
        // 添加懸浮特效
        bingchilingCard.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = bingchilingCard.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            bingchilingCard.style.transform = `
                perspective(1000px)
                rotateY(${x * 20 - 10}deg)
                rotateX(${y * 20 - 10}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
        });
        
        bingchilingCard.addEventListener('mouseleave', () => {
            bingchilingCard.style.transform = 'none';
        });
        */
    }

    // 初始化特效
    document.addEventListener('DOMContentLoaded', () => {
        addBingChilingEffect();
    });

    // 改進的搜尋功能
    function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    const activeFilter = document.querySelector('.search-filters .active').dataset.filter;
    
    // 清空之前的搜尋結果
    resultsContainer.innerHTML = '';

    // 搜尋條件檢查
    if (searchTerm.length < 2) {
    resultsContainer.innerHTML = '<p class="text-muted">Please enter at least 2 characters</p>';
    return;
    }

    // 擴充搜尋內容並加入快取
    const searchableContent = [
    { 
        title: 'Home', 
        link: '#section1', 
        description: 'Main page content and updates', 
        type: 'pages',
        keywords: ['home', 'main', 'update']
    },
    { 
        title: 'Legacy Versions', 
        link: '#legacyVersions', 
        description: 'Browse old website versions', 
        type: 'pages',
        keywords: ['legacy', 'old', 'versions', 'history'] 
    },
    {
        title: 'About', 
        link: '#section3', 
        description: 'Information about dunc', 
        type: 'content',
        keywords: ['about', 'introduction', 'info']
    },
    {
        title: 'Update Log',
        link: 'Pages/log.html',
        description: 'Website update history',
        type: 'pages',
        keywords: ['log', 'update', 'history']
    }
    ];

    // 搜尋邏輯
    let results = searchableContent.filter(item => {
    if (activeFilter !== 'all' && item.type !== activeFilter) return false;
    
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const descMatch = item.description.toLowerCase().includes(searchTerm);
    const keywordMatch = item.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
    );
    
    return titleMatch || descMatch || keywordMatch;
    });

    // 顯示搜尋結果
    if (results.length === 0) {
    resultsContainer.innerHTML = `
        <div class="no-results text-center p-4">
            <i class="fas fa-search fa-3x mb-3 text-muted"></i>
            <p class="text-muted">No results found for "${searchTerm}"</p>
        </div>
    `;
    return;
    }

    // 建立搜尋結果元素
    results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.className = 'search-result-item p-3 border-bottom hover-bg';
    resultElement.innerHTML = `
        <a href="${result.link}" class="text-decoration-none d-block" onclick="handleSearchResult('${result.title}')">
            <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                    <h5 class="mb-1">${highlightMatch(result.title, searchTerm)}</h5>
                    <p class="mb-0 text-muted small">${highlightMatch(result.description, searchTerm)}</p>
                </div>
                <i class="fas fa-chevron-right text-muted"></i>
            </div>
        </a>
    `;
    resultsContainer.appendChild(resultElement);
    });
}

// 移除之前的搜尋輸入監聽器，改用以下方式
const searchInput = document.getElementById('searchInput');
let searchDebounceTimeout;

searchInput.addEventListener('input', function() {
    clearTimeout(searchDebounceTimeout);
    searchDebounceTimeout = setTimeout(() => {
    performSearch();
    }, 300);
});

// 防止搜尋結果消失
searchInput.addEventListener('focus', () => {
    if (searchInput.value.length >= 2) {
    performSearch();
    }
});

    // 反白關鍵字
    function highlightMatch(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // 處理搜尋結果點擊
    function handleSearchResult(title) {
        hideSearch();
        showToast(`Navigating to: ${title}`);
    }

    // 搜尋過濾器功能
    document.querySelectorAll('.search-filters .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.search-filters .btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            performSearch();
        });
    });

    // 搜尋輸入防抖
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });

    // 需要高亮顯示的國家數據
    const highlightedCountries = {
        'CHN': {
    name: 'China',
    color: '#4b9dff',
    details: 'Home of Bing Chiling! Social Credit Score: +100',
    continent: 'Asia'
    },
    'HKG': {
    name: 'Hong Kong',
    color: '#4b9dff',
    details: '2005-2022',
    type: 'special',
    continent: 'Asia'
    },
    'ESP': {
    name: 'Spain',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'MAC': {
    name: 'Macau',
    color: '#4b9dff',
    details: '200x',
    type: 'special',
    continent: 'Asia'
    },
    'TWN': {
    name: 'Taiwan',
    color: '#4b9dff',
    details: '2018',
    continent: 'Asia'
    },
    'SGP': {
    name: 'Singapore',
    color: '#4b9dff',
    details: '2012',
    continent: 'Asia'
    },
    'MYS': {
    name: 'Malaysia',
    color: '#4b9dff',
    details: '2019',
    continent: 'Asia'
    },
    'MLT': {
    name: 'Malta',
    color: '#4b9dff',
    details: '2025 (Planned)',
    type: 'special', // Ensure Malta is treated as a special region
    continent: 'Europe'
    },
    'BRN': {
    name: 'Brunei',
    color: '#4b9dff',
    details: '2019',
    continent: 'Asia'
    },
    'IDN': {
    name: 'Indonesia',
    color: '#4b9dff',
    details: '2019',
    continent: 'Asia'
    },
    'JPN': {
    name: 'Japan',
    color: '#4b9dff',
    details: '2017',
    continent: 'Asia'
    },
    'KOR': {
    name: 'South Korea',
    color: '#4b9dff',
    details: '2011',
    continent: 'Asia'
    },
    'MDV': {
    name: 'Maldives',
    color: '#4b9dff',
    details: '2019',
    continent: 'Asia'
    },
    'QAT': {
    name: 'Qatar',
    color: '#4b9dff',
    details: '2019',
    continent: 'Asia'
    },
    'ARE': {
    name: 'United Arab Emirates',
    color: '#4b9dff',
    details: '2018',
    continent: 'Asia'
    },
    'RUS': {
    name: 'Russia',
    color: '#4b9dff',
    details: '2018',
    continent: 'Europe'
    },
    'CHE': {
    name: 'Switzerland',
    color: '#4b9dff',
    details: '2018',
    continent: 'Europe'
    },
    'LIE': {
    name: 'Liechtenstein',
    color: '#4b9dff',
    details: '2018',
    continent: 'Europe'
    },
    'AUT': {
    name: 'Austria',
    color: '#4b9dff',
    details: '2017',
    continent: 'Europe'
    },
    'DEU': {
    name: 'Germany',
    color: '#4b9dff',
    details: '2017',
    continent: 'Europe'
    },
    'SVN': {
    name: 'Slovenia',
    color: '#4b9dff',
    details: '2017',
    continent: 'Europe'
    },
    'CZE': {
    name: 'Czech Republic',
    color: '#4b9dff',
    details: '2017',
    continent: 'Europe'
    },
    'HUN': {
    name: 'Hungary',
    color: '#4b9dff',
    details: '2017',
    continent: 'Europe'
    },
    'SVK': {
    name: 'Slovakia',
    color: '#4b9dff',
    details: '2017',
    continent: 'Europe'
    },
    'HRV': {
    name: 'Croatia',
    color: '#4b9dff',
    details: '2017',
    continent: 'Europe'
    },
    'POL': {
    name: 'Poland',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'SWE': {
    name: 'Sweden',
    color: '#4b9dff',
    details: '2016',
    continent: 'Europe'
    },
    'FIN': {
    name: 'Finland',
    color: '#4b9dff',
    details: '2016',
    continent: 'Europe'
    },
    'DNK': {
    name: 'Denmark',
    color: '#4b9dff',
    details: '2016',
    continent: 'Europe'
    },
    'NOR': {
    name: 'Norway',
    color: '#4b9dff',
    details: '2016',
    continent: 'Europe'
    },
    'LTU': {
    name: 'Lithuania',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'LVA': {
    name: 'Latvia',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'EST': {
    name: 'Estonia',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'GRC': {
    name: 'Greece',
    color: '#4b9dff',
    details: '2019',
    continent: 'Europe'
    },
    'ENG': {
    name: 'England',
    color: '#4b9dff',
    details: '2022',
    continent: 'Europe'
    },
    'WLS': {
    name: 'Wales',
    color: '#4b9dff',
    details: '2023',
    continent: 'Europe'
    },
    'SCT': {
    name: 'Scotland',
    color: '#4b9dff',
    details: '2023',
    continent: 'Europe'
    },
    'IRL': {
    name: 'Ireland',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'BEL': {
    name: 'Belgium',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'FRA': {
    name: 'France',
    color: '#4b9dff',
    details: '2024',
    continent: 'Europe'
    },
    'JEY': {
    name: 'Jersey',
    color: '#4b9dff',
    details: '2024',
    type: 'special',
    continent: 'Europe'
    },
    'GIB': {
    name: 'Gibraltar',
    color: '#4b9dff',
    details: '2024',
    type: 'special',
    continent: 'Europe'
    },
    'CAN': {
    name: 'Canada',
    color: '#4b9dff',
    details: '2019',
    continent: 'North America'
    },
    'GBR': {
    name: 'United Kingdom',
    color: '#4b9dff',
    details: '2022',
    continent: 'Europe'
    }
};

    // 當文檔加載完成後載入地圖
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            // 載入世界地圖 SVG 數據 (使用簡化的世界地圖 GeoJSON)
            const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
            const data = await response.json();
            
            // 使用 D3.js 繪製地圖
            const svg = d3.select('#worldMapSVG');
            const projection = d3.geoMercator()
                .scale(140)
                .translate([500, 300]);
            const path = d3.geoPath().projection(projection);

            // 繪製國家
            svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('class', 'country')
                .attr('id', d => `country-${d.id}`)
                .style('fill', d => highlightedCountries[d.id]?.color || '#e0e0e0')
                .on('mouseover', function(event, d) {
                    if (highlightedCountries[d.id]) {
                        d3.select(this)
                            .style('filter', 'brightness(1.2)')
                            .style('stroke-width', '1.5px');
                            
                        // Show enhanced tooltip
                        showEnhancedTooltip(event, d);
                    }
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .style('filter', 'none')
                        .style('stroke-width', '0.5px');
                        
                    // Remove tooltip on mouseout
                    const tooltip = document.querySelector('.country-tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                })
                .on('click', function(event, d) {
                    showCountryInfo(d.id);
                });

            // 添加特殊行政區（使用圓點標記）
            const specialRegions = Object.entries(highlightedCountries)
                .filter(([_, info]) => info.type === 'special')
                .map(([id, info]) => ({
                    id: id,
                    ...info,
                    coordinates: getSpecialRegionCoordinates(id)
                }));

            svg.selectAll('circle.special-region')
                .data(specialRegions)
                .enter()
                .append('circle')
                .attr('class', 'special-region')
                .attr('r', 5) // Increased radius for better visibility
                .attr('cx', d => projection(d.coordinates)[0])
                .attr('cy', d => projection(d.coordinates)[1])
                .style('fill', d => d.color)
                .style('stroke', '#fff')
                .style('stroke-width', 1)
                .on('mouseover', function(event, d) {
                    // Show enhanced tooltip for special regions
                    const tooltip = document.createElement('div');
                    tooltip.className = 'country-tooltip';
                    
                    // Create tooltip content
                    let tooltipContent = `<div class="tooltip-title">${d.name}</div>`;
                    
                    // Add special region type
                    tooltipContent += `<div class="tooltip-detail"><i class="fas fa-map-marker-alt text-primary"></i> Special Region</div>`;
                    
                    // Add details if available
                    if (d.details) {
                        tooltipContent += `<div class="tooltip-detail"><i class="fas fa-calendar-check"></i> ${d.details}</div>`;
                    }
                    
                    tooltip.innerHTML = tooltipContent;
                    
                    // Position the tooltip near the mouse cursor
                    const mapContainer = document.querySelector('.map-container');
                    const rect = mapContainer.getBoundingClientRect();
                    const mouseX = event.clientX - rect.left;
                    const mouseY = event.clientY - rect.top;
                    
                    tooltip.style.left = `${mouseX}px`;
                    tooltip.style.top = `${mouseY - 10}px`; // Position above cursor
                    
                    // Remove any existing tooltips
                    const existingTooltip = document.querySelector('.country-tooltip');
                    if (existingTooltip) {
                        existingTooltip.remove();
                    }
                    
                    // Add the tooltip to the map container
                    mapContainer.appendChild(tooltip);
                    
                    // Adjust position if tooltip goes off the container
                    const tooltipRect = tooltip.getBoundingClientRect();
                    const containerRect = mapContainer.getBoundingClientRect();
                    
                    if (tooltipRect.right > containerRect.right) {
                        tooltip.style.left = `${mouseX - (tooltipRect.right - containerRect.right) - 10}px`;
                    }
                    
                    if (tooltipRect.left < containerRect.left) {
                        tooltip.style.left = `${containerRect.left + 10}px`;
                    }
                    
                    if (tooltipRect.top < containerRect.top) {
                        tooltip.style.top = `${mouseY + 20}px`; // Position below cursor if not enough space above
                        tooltip.style.transformOrigin = 'top center';
                    }
                })
                .on('mouseout', function() {
                    // Remove tooltip on mouseout
                    const tooltip = document.querySelector('.country-tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                })
                .on('click', function(event, d) { // Added click listener for special regions
                    showCountryInfo(d.id);
                });

        } catch (error) {
            console.error('Error loading map:', error);
        }
    });

    // 特殊行政區座標
    function getSpecialRegionCoordinates(id) {
        const coordinates = {
            'HKG': [114.1694, 22.3193],
            'MAC': [113.5439, 22.1987],
            'JEY': [-2.1328, 49.2144],
            'GIB': [-5.3536, 36.1408],
            'MLT': [14.5000, 35.9000] // Added Malta coordinates
        };
        return coordinates[id] || [0, 0];
    }

    // 特殊行政區信息顯示
    function showSpecialRegionInfo(event, d) {
        const popup = document.getElementById('countryInfo');
        const rect = event.target.getBoundingClientRect();
        const mapContainer = document.querySelector('.map-container');
        const containerRect = mapContainer.getBoundingClientRect();

        popup.style.display = 'block';
        popup.style.left = `${rect.left - containerRect.left}px`;
        popup.style.top = `${rect.top - containerRect.top - popup.offsetHeight - 5}px`;

        document.getElementById('countryName').textContent = d.name;
        document.getElementById('countryDetails').textContent = d.details;
    }

    // 隱藏國家信息
    function hideCountryInfo() {
        document.getElementById('countryInfo').style.display = 'none';
    }

    // Get UI elements with null checks
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const themeSelect = document.getElementById('themeSelect');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const zoomControl = document.getElementById('zoomControl');
    const fontSizeControl = document.getElementById('fontSizeControl');

    // Only add event listeners if elements exist
    if (settingsToggle && settingsPanel) {
        settingsToggle.addEventListener('click', () => {
            if (settingsPanel.classList.contains('show')) {
                settingsPanel.classList.remove('show');
                settingsPanel.classList.add('hide');
                setTimeout(() => settingsPanel.style.display = 'none', 300);
            } else {
                settingsPanel.style.display = 'flex';
                settingsPanel.classList.remove('hide');
                settingsPanel.classList.add('show');
            }
        });
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const theme = e.target.value;
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }

    if (zoomControl) {
        zoomControl.addEventListener('input', (e) => {
            document.body.style.zoom = e.target.value + '%';
        });
    }

    if (fontSizeControl) {
        fontSizeControl.addEventListener('input', (e) => {
            document.documentElement.style.fontSize = e.target.value + 'px';
        });
    }

    // Load saved settings
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        themeSelect.value = savedTheme;
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        const savedZoom = localStorage.getItem('zoom') || '100';
        zoomControl.value = savedZoom;
        document.body.style.zoom = savedZoom + '%';

        const savedFontSize = localStorage.getItem('fontSize') || '16';
        fontSizeControl.value = savedFontSize;
        document.documentElement.style.fontSize = savedFontSize + 'px';
    });

    // Update the showCountryInfo function
    function showCountryInfo(event, d) {
        const countryData = highlightedCountries[d.id];
        if (!countryData) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'country-tooltip';
        
        // Get the appropriate flag emoji based on country code
        let flagEmoji = getFlagEmoji(d.id);
        
        // Create tooltip content with flag emoji
        tooltip.innerHTML = `
            <div style="font-weight: bold">${flagEmoji} ${countryData.name}</div>
            <div class="visited-year">✈️ First visited: ${countryData.details}</div>
        `;

        // Position the tooltip near the mouse cursor
        const mapContainer = document.querySelector('.map-container');
        const rect = mapContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        tooltip.style.left = `${mouseX}px`;
        tooltip.style.top = `${mouseY - 60}px`; // Offset above the cursor

        // Remove any existing tooltips
        const existingTooltip = document.querySelector('.country-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Add the tooltip to the map container
        mapContainer.appendChild(tooltip);

        // Add hover effect to the country
        d3.select(`#country-${d.id}`).classed('active', true);
    }

    // Helper function to get flag emoji from country code
    function getFlagEmoji(countryCode) {
        // Special cases for regions that don't have standard flag emoji
        const specialFlags = {
            'HKG': '🇭🇰',
            'MAC': '🇲🇴',
            'TWN': '🇹🇼',
            'GBR': '🇬🇧',
            'USA': '🇺🇸',
            'CHN': '🇨🇳',
            'JPN': '🇯🇵',
            'KOR': '🇰🇷',
            'ESP': '🇪🇸',
            // Add more special cases as needed
        };

        // Return special flag if it exists, otherwise generate flag emoji from country code
        return specialFlags[countryCode] || countryCode
            .toUpperCase()
            .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
    }

    // Add this to the existing document.addEventListener('DOMContentLoaded', ...)
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        themeSelect.value = savedTheme;
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        const savedZoom = localStorage.getItem('zoom') || '100';
        zoomControl.value = savedZoom;
        document.body.style.zoom = savedZoom + '%';

        const savedFontSize = localStorage.getItem('fontSize') || '16';
        fontSizeControl.value = savedFontSize;
        document.documentElement.style.fontSize = savedFontSize + 'px';

        // Add click handler for map tooltips to make them sticky
        document.querySelector('.map-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('country')) {
                const tooltip = document.querySelector('.country-tooltip');
                if (tooltip) {
                    tooltip.classList.toggle('sticky');
                }
            }
        });
    });

    // Add these new functions to your existing script
    function zoomMap(scale) {
        const svg = document.getElementById('worldMapSVG');
        const currentScale = svg.style.transform ? 
            parseFloat(svg.style.transform.replace('scale(', '').replace(')', '')) : 1;
        const newScale = currentScale * scale;
        if (newScale >= 0.5 && newScale <= 3) {
            svg.style.transform = `scale(${newScale})`;
        }
    }

    // Using the previously defined observerOptions for section transitions
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Update stats counter
    function updateStats() {
        const visitedCountries = Object.keys(highlightedCountries).length;
        const continents = new Set(Object.values(highlightedCountries).map(country => country.continent)).size;
        
        document.getElementById('countriesCount').textContent = visitedCountries;
        document.getElementById('continentsCount').textContent = continents;
    }

    // Enhanced confetti effect
    function createConfetti(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // Initialize everything
    document.addEventListener('DOMContentLoaded', () => {
        // Add transition class to all sections
        document.querySelectorAll('.container > div').forEach(section => {
            section.classList.add('section-transition', 'hidden');
            sectionObserver.observe(section);
        });

        // Initialize stats
        updateStats();

        // Add confetti to Bing Chiling votes
        const bingchilingForm = document.getElementById('bingchilingForm');
        bingchilingForm.addEventListener('submit', (e) => {
            const rect = bingchilingForm.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top);
        });
    });

    // Initialize the world map with enhanced features
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            // Load world map data
            const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
            const data = await response.json();
            
            // Set up the map
            const svg = d3.select('#worldMapSVG');
            const projection = d3.geoMercator()
                .scale(140)
                .translate([500, 300]);
            const path = d3.geoPath().projection(projection);

            // Draw countries
            svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('class', 'country')
                .attr('id', d => `country-${d.id}`)
                .style('fill', d => highlightedCountries[d.id]?.color || '#e0e0e0')
                .on('click', function(event, d) {
                    showCountryInfo(d.id);
                })
                .on('mouseover', function(event, d) {
                    if (highlightedCountries[d.id]) {
                        d3.select(this)
                            .style('filter', 'brightness(1.2)')
                            .style('stroke-width', '1.5px');
                            
                        // Show enhanced tooltip
                        showEnhancedTooltip(event, d);
                    }
                })
                .on('mouseout', function() {
                    d3.select(this)
                        .style('filter', 'none')
                        .style('stroke-width', '0.5px');
                        
                    // Remove tooltip on mouseout
                    const tooltip = document.querySelector('.country-tooltip');
                    if (tooltip) {
                        tooltip.remove();
                    }
                });

            // Make the map draggable
            let isDragging = false;
            let dragStart = { x: 0, y: 0 };
            let currentTranslate = { x: 0, y: 0 };

            svg.on('mousedown', function(event) {
                isDragging = true;
                dragStart = { x: event.clientX, y: event.clientY };
                svg.style('cursor', 'grabbing');
            });

            d3.select('body').on('mousemove', function(event) {
                if (isDragging) {
                    const dx = event.clientX - dragStart.x;
                    const dy = event.clientY - dragStart.y;
                    
                    const newTranslate = {
                        x: currentTranslate.x + dx,
                        y: currentTranslate.y + dy
                    };
                    
                    svg.style('transform', `translate(${newTranslate.x}px, ${newTranslate.y}px)`);
                }
            });

            d3.select('body').on('mouseup', function() {
                if (isDragging) {
                    isDragging = false;
                    const transform = svg.style('transform');
                    const matches = transform.match(/translate\((.+?)px, (.+?)px\)/);
                    
                    if (matches) {
                        currentTranslate = {
                            x: parseFloat(matches[1]),
                            y: parseFloat(matches[2])
                        };
                    }
                    
                    svg.style('cursor', 'grab');
                }
            });

            // Initialize country search
            const countrySearch = document.getElementById('countrySearch');
            const searchResults = document.getElementById('searchResults');
            const clearSearch = document.getElementById('clearSearch');
            
            // Show/hide clear button based on input content
            countrySearch.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                clearSearch.style.display = query.length > 0 ? 'block' : 'none';
                
                if (query.length < 2) {
                    searchResults.style.display = 'none';
                    return;
                }
                
                const filteredCountries = Object.entries(highlightedCountries)
                    .filter(([_, info]) => info.name.toLowerCase().includes(query))
                    .map(([id, info]) => ({ id, name: info.name }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                
                if (filteredCountries.length === 0) {
                    searchResults.innerHTML = '<div class="search-result-item">No countries found</div>';
                    searchResults.style.display = 'block';
                    return;
                }
                
                searchResults.innerHTML = '';
                filteredCountries.forEach(country => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.textContent = country.name;
                    item.addEventListener('click', () => {
                        showCountryInfo(country.id);
                        searchResults.style.display = 'none';
                        countrySearch.value = '';
                    });
                    searchResults.appendChild(item);
                });
                
                searchResults.style.display = 'block';
            });
            
            // Add keyboard navigation for search results
            countrySearch.addEventListener('keydown', function(e) {
                if (searchResults.style.display !== 'block') return;
                
                const items = searchResults.querySelectorAll('.search-result-item');
                if (items.length === 0) return;
                
                const current = searchResults.querySelector('.search-result-item.active');
                let index = -1;
                
                if (current) {
                    index = Array.from(items).indexOf(current);
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (index < items.length - 1) {
                        if (current) current.classList.remove('active');
                        items[index + 1].classList.add('active');
                        items[index + 1].scrollIntoView({ block: 'nearest' });
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (index > 0) {
                        if (current) current.classList.remove('active');
                        items[index - 1].classList.add('active');
                        items[index - 1].scrollIntoView({ block: 'nearest' });
                    }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (current && current.textContent !== 'No countries found') {
                        current.click();
                    } else if (items.length === 1 && items[0].textContent !== 'No countries found') {
                        items[0].click();
                    }
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    searchResults.style.display = 'none';
                }
            });
            
            // Close search results when clicking elsewhere
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.map-search')) {
                    searchResults.style.display = 'none';
                }
            });

            // Update statistics
            updateMapStats();
        } catch (error) {
            console.error('Error loading map:', error);
            document.getElementById('mapError').classList.remove('d-none');
        }
    });

    // Show country information panel
    function showCountryInfo(countryId) {
        const country = highlightedCountries[countryId];
        if (!country) return;
        
        const infoPanel = document.getElementById('countryInfo');
        const countryNameElement = document.getElementById('selectedCountry');
        const countryDetailsElement = document.getElementById('countryDetails');
        const visitDateElement = document.getElementById('visitDate');
        
        // Set country information
        countryNameElement.textContent = country.name;
        
        // Set details
        let detailsHTML = '';
        
        if (country.type === 'visited') {
            detailsHTML += `<p><i class="fas fa-check-circle text-success"></i> Visited</p>`;
        } else if (country.type === 'planned') {
            detailsHTML += `<p><i class="fas fa-calendar text-warning"></i> Planned visit</p>`;
        }
        
        if (country.continent) {
            detailsHTML += `<p><i class="fas fa-globe"></i> Continent: ${country.continent}</p>`;
        }
        
        countryDetailsElement.innerHTML = detailsHTML;
        
        // Set visit date
        if (country.details) {
            visitDateElement.innerHTML = `<i class="fas fa-calendar-check"></i> ${country.details}`;
            visitDateElement.style.display = 'block';
        } else {
            visitDateElement.style.display = 'none';
        }
        
        // Show panel
        infoPanel.classList.add('show');
        
        // Highlight country on map
        d3.selectAll('.country').style('filter', 'brightness(0.8)');
        const countryElement = d3.select(`#country-${countryId}`);
        countryElement.style('filter', 'brightness(1.3)');
        
        // Scroll to the country on the map if it's not visible
        const countryNode = countryElement.node();
        if (countryNode) {
            countryNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Close info panel
    function closeInfoPanel() {
        const infoPanel = document.getElementById('countryInfo');
        infoPanel.classList.remove('show');
        
        // Reset country highlighting
        d3.selectAll('.country').style('filter', 'none');
    }

    // Reset map view
    function resetMapView() {
        const svg = document.getElementById('worldMapSVG');
        svg.style.transform = 'translate(0, 0) scale(1)';
        currentTranslate = { x: 0, y: 0 };
        closeInfoPanel();
    }

    // Enhanced zoom map function
    function zoomMap(scale) {
        const svg = document.getElementById('worldMapSVG');
        const currentTransform = svg.style.transform || '';
        
        // Extract current scale
        let currentScale = 1;
        const scaleMatch = currentTransform.match(/scale\((.+?)\)/);
        if (scaleMatch) {
            currentScale = parseFloat(scaleMatch[1]);
        }
        
        // Calculate new scale
        const newScale = Math.min(3, Math.max(0.5, currentScale * scale));
        
        // Extract current translate
        let translateX = 0, translateY = 0;
        const translateMatch = currentTransform.match(/translate\((.+?)px, (.+?)px\)/);
        if (translateMatch) {
            translateX = parseFloat(translateMatch[1]);
            translateY = parseFloat(translateMatch[2]);
        }
        
        // Apply new transform
        svg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${newScale})`;
    }

    // Update map statistics
    function updateMapStats() {
        // Count visited countries (all countries except those marked as special)
        const visitedCountries = Object.values(highlightedCountries)
            .filter(country => country.type !== 'special').length;
        document.getElementById('countriesCount').textContent = visitedCountries;
        
        // Count continents
        const visitedContinents = new Set();
        Object.values(highlightedCountries)
            .filter(country => country.type !== 'special')
            .forEach(country => {
                if (country.continent) visitedContinents.add(country.continent);
            });
        document.getElementById('continentsCount').textContent = visitedContinents.size;
        
        // Set flights count (placeholder - you can update this with actual data)
        document.getElementById('flightsCount').textContent = '59';
    }

    // Add Dark Mode Toggle
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update map colors if map is loaded
        if (typeof d3 !== 'undefined') {
            d3.selectAll('.country').style('stroke', isDarkMode ? '#2c2c2c' : 'white');
        }
        
        // Show toast notification
        showToast(`${isDarkMode ? 'Dark' : 'Light'} mode enabled`, 'info');
    }
    
    // Check for saved theme preference or respect OS preference
    document.addEventListener('DOMContentLoaded', () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        
        if (savedDarkMode !== null) {
            // If we have a saved preference, use it
            if (savedDarkMode === 'true') {
                document.body.classList.add('dark-mode');
            }
        } else {
            // If no saved preference, check OS preference
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDarkScheme.matches) {
                document.body.classList.add('dark-mode');
            }
        }
    });

    // Show loading overlay until page is fully loaded
    window.addEventListener('load', function() {
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    });

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Show scroll progress
    window.addEventListener('scroll', function() {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Show cookie consent
    function showCookieConsent() {
        const cookieConsent = document.querySelector('.cookie-consent');
        if (cookieConsent && !localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.add('show');
            }, 2000);
        }
    }

    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'true');
        document.querySelector('.cookie-consent').classList.remove('show');
        showToast('Cookies accepted. Thank you!', 'success');
    }

    // Toast notification system
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Function to show enhanced tooltip with country details
    function showEnhancedTooltip(event, d) {
        const countryData = highlightedCountries[d.id];
        if (!countryData) return;
        
        // Remove any existing tooltips
        const existingTooltip = document.querySelector('.country-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'country-tooltip';
        
        // Get the appropriate flag emoji based on country code
        let flagEmoji = getFlagEmoji(d.id);
        
        // Create tooltip content with detailed information
        let tooltipContent = `<div class="tooltip-title">${flagEmoji} ${countryData.name}</div>`;
        
        // Add visit status
        if (countryData.type === 'visited') {
            tooltipContent += `<div class="tooltip-detail"><i class="fas fa-check-circle text-success"></i> Visited</div>`;
        } else if (countryData.type === 'planned') {
            tooltipContent += `<div class="tooltip-detail"><i class="fas fa-calendar text-warning"></i> Planned visit</div>`;
        }
        
        // Add continent if available
        if (countryData.continent) {
            tooltipContent += `<div class="tooltip-detail"><i class="fas fa-globe"></i> Continent: ${countryData.continent}</div>`;
        }
        
        // Add visit date/details
        if (countryData.details) {
            tooltipContent += `<div class="tooltip-detail"><i class="fas fa-calendar-check"></i> ${countryData.details}</div>`;
        }
        
        tooltip.innerHTML = tooltipContent;
        
        // Position the tooltip near the mouse cursor
        const mapContainer = document.querySelector('.map-container');
        const rect = mapContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        tooltip.style.left = `${mouseX}px`;
        tooltip.style.top = `${mouseY - 10}px`; // Position above cursor
        
        // Add the tooltip to the map container
        mapContainer.appendChild(tooltip);
        
        // Adjust position if tooltip goes off the container
        const tooltipRect = tooltip.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();
        
        if (tooltipRect.right > containerRect.right) {
            tooltip.style.left = `${mouseX - (tooltipRect.right - containerRect.right) - 10}px`;
        }
        
        if (tooltipRect.left < containerRect.left) {
            tooltip.style.left = `${containerRect.left + 10}px`;
        }
        
        if (tooltipRect.top < containerRect.top) {
            tooltip.style.top = `${mouseY + 20}px`; // Position below cursor if not enough space above
            tooltip.style.transformOrigin = 'top center';
        }
    }
    
    const skillJourneyData = [
        { month: '2024-08', projects: 1, articles: 1, experiments: 2 },
        { month: '2024-09', projects: 2, articles: 0, experiments: 3 },
        { month: '2024-10', projects: 2, articles: 1, experiments: 2 },
        { month: '2024-11', projects: 3, articles: 1, experiments: 3 },
        { month: '2024-12', projects: 2, articles: 2, experiments: 3 },
        { month: '2025-01', projects: 3, articles: 2, experiments: 4 },
        { month: '2025-02', projects: 2, articles: 1, experiments: 5 },
        { month: '2025-03', projects: 4, articles: 2, experiments: 4 }
    ];

    const skillJourneyMetrics = [
        { key: 'projects', label: 'Projects shipped' },
        { key: 'articles', label: 'Articles published' },
        { key: 'experiments', label: 'Experiments & prototypes' }
    ];

    let skillParsedData = [];
    let skillColorScale;
    let parseSkillMonth;
    let formatSkillMonthLong;
    let formatSkillMonthTick;
    let skillResizeTimeout;

    function initSkillDashboard() {
        if (typeof d3 === 'undefined') return;
        const chartContainer = document.getElementById('skillChart');
        if (!chartContainer) return;

        parseSkillMonth = d3.timeParse('%Y-%m');
        formatSkillMonthLong = d3.timeFormat('%B %Y');
        formatSkillMonthTick = d3.timeFormat('%b');

        skillParsedData = skillJourneyData
            .map(entry => ({
                ...entry,
                date: parseSkillMonth(entry.month)
            }))
            .filter(entry => entry.date);

        skillParsedData.sort((a, b) => a.date - b.date);

        if (!skillParsedData.length) return;

        skillColorScale = d3.scaleOrdinal()
            .domain(skillJourneyMetrics.map(metric => metric.key))
            .range(['#4B9DFF', '#FF6B6B', '#6BCB77']);

        buildSkillLegend();
        updateSkillSummary();
        renderSkillJourney();

        window.addEventListener('resize', handleSkillResize);
    }

    function handleSkillResize() {
        if (!skillParsedData.length) return;
        clearTimeout(skillResizeTimeout);
        skillResizeTimeout = setTimeout(renderSkillJourney, 200);
    }

    function buildSkillLegend() {
        const legend = document.getElementById('skillLegend');
        if (!legend || !skillColorScale) return;
        legend.innerHTML = '';

        skillJourneyMetrics.forEach(metric => {
            const item = document.createElement('div');
            item.className = 'skill-legend-item';
            item.innerHTML = `
                <span class="skill-legend-swatch" style="background:${skillColorScale(metric.key)}"></span>
                <span>${metric.label}</span>
            `;
            legend.appendChild(item);
        });
    }

    function updateSkillSummary() {
        if (!skillParsedData.length) return;

        const latest = skillParsedData[skillParsedData.length - 1];
        const previous = skillParsedData.length > 1 ? skillParsedData[skillParsedData.length - 2] : null;

        const latestTotals = skillJourneyMetrics.map(metric => latest[metric.key] || 0);
        const latestTotal = latestTotals.reduce((sum, value) => sum + value, 0);

        const totalSessions = skillParsedData.reduce((sum, entry) => {
            return sum + skillJourneyMetrics.reduce((innerSum, metric) => innerSum + (entry[metric.key] || 0), 0);
        }, 0);

        const averagePerMonth = Math.round(totalSessions / skillParsedData.length);

        const highlightMetric = skillJourneyMetrics.reduce((best, metric) => {
            return (latest[metric.key] || 0) > (latest[best.key] || 0) ? metric : best;
        }, skillJourneyMetrics[0]);

        const summaryMonthEl = document.getElementById('skillSummaryMonth');
        const summaryTotalEl = document.getElementById('skillSummaryTotal');
        const trendTextEl = document.getElementById('skillTrendText');
        const highlightValueEl = document.getElementById('skillHighlightValue');
        const highlightLabelEl = document.getElementById('skillHighlight');
        const averageValueEl = document.getElementById('skillAverageValue');
        const monthsCountEl = document.getElementById('skillMonthsCount');

        if (summaryMonthEl) summaryMonthEl.textContent = formatSkillMonthLong(latest.date);
        if (summaryTotalEl) summaryTotalEl.textContent = latestTotal;
        if (highlightValueEl) highlightValueEl.textContent = latest[highlightMetric.key] || 0;
        if (highlightLabelEl) highlightLabelEl.textContent = highlightMetric.label;
        if (averageValueEl) averageValueEl.textContent = averagePerMonth;
        if (monthsCountEl) monthsCountEl.textContent = skillParsedData.length;

        if (trendTextEl) {
            trendTextEl.className = 'skill-stat-trend mb-0';

            if (previous) {
                const previousTotal = skillJourneyMetrics.reduce((sum, metric) => sum + (previous[metric.key] || 0), 0);
                const diff = latestTotal - previousTotal;
                const diffClass = diff >= 0 ? 'text-success' : 'text-danger';
                const diffIcon = diff >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
                trendTextEl.innerHTML = `<span class="${diffClass}"><i class="fas ${diffIcon} me-1"></i>${diff >= 0 ? '+' : ''}${diff} vs previous month</span>`;
            } else {
                trendTextEl.textContent = 'Tracking started this month.';
            }
        }
    }

    function renderSkillJourney() {
        if (!skillParsedData.length) return;

        const container = d3.select('#skillChart');
        if (container.empty()) return;

        const bounds = container.node().getBoundingClientRect();
        const width = bounds.width || 600;
        const height = bounds.height || 320;

        container.selectAll('*').remove();

        const margin = { top: 24, right: 28, bottom: 48, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        if (innerWidth <= 0 || innerHeight <= 0) return;

        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            .domain(d3.extent(skillParsedData, d => d.date))
            .range([0, innerWidth]);

        const maxValue = d3.max(skillParsedData, d => d3.max(skillJourneyMetrics, metric => d[metric.key] || 0)) || 1;
        const yMax = maxValue < 5 ? maxValue + 1 : maxValue * 1.15;

        const y = d3.scaleLinear()
            .domain([0, yMax])
            .nice()
            .range([innerHeight, 0]);

        const xAxis = g => g
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x).ticks(Math.min(skillParsedData.length, 8)).tickFormat(formatSkillMonthTick))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('line').attr('stroke-opacity', 0.1));

        const yAxis = g => g
            .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line').attr('stroke', 'rgba(0,0,0,0.08)').attr('stroke-dasharray', '4,4'))
            .call(g => g.selectAll('.tick text').attr('x', -10));

        chart.append('g').attr('class', 'x-axis').call(xAxis);
        chart.append('g').attr('class', 'y-axis').call(yAxis);

        const lineGenerator = d3.line()
            .curve(d3.curveMonotoneX)
            .x(d => x(d.date))
            .y(d => y(d.value));

        skillJourneyMetrics.forEach(metric => {
            const metricData = skillParsedData.map(entry => ({
                date: entry.date,
                value: entry[metric.key] || 0
            }));

            chart.append('path')
                .datum(metricData)
                .attr('fill', 'none')
                .attr('stroke', skillColorScale(metric.key))
                .attr('stroke-width', 3)
                .attr('d', lineGenerator);

            chart.selectAll(`.skill-dot-${metric.key}`)
                .data(metricData)
                .enter()
                .append('circle')
                .attr('class', `skill-focus-dot skill-dot-${metric.key}`)
                .attr('cx', d => x(d.date))
                .attr('cy', d => y(d.value))
                .attr('r', 4)
                .attr('fill', '#ffffff')
                .attr('stroke', skillColorScale(metric.key))
                .attr('stroke-width', 2)
                .attr('opacity', 0.95);
        });

        const focusLine = chart.append('line')
            .attr('class', 'skill-focus-line')
            .attr('y1', 0)
            .attr('y2', innerHeight)
            .style('opacity', 0);

        const focusDots = skillJourneyMetrics.map(metric =>
            chart.append('circle')
                .attr('class', 'skill-focus-dot')
                .attr('r', 6)
                .attr('fill', skillColorScale(metric.key))
                .style('opacity', 0)
        );

        container.selectAll('.skill-tooltip').remove();
        const tooltip = container.append('div')
            .attr('class', 'skill-tooltip')
            .style('opacity', 0);

        const overlay = chart.append('rect')
            .attr('class', 'skill-overlay')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('fill', 'transparent')
            .attr('pointer-events', 'all')
            .on('mousemove', (event) => handlePointerMove(event))
            .on('mouseleave', handlePointerLeave);

        const bisectDate = d3.bisector(d => d.date).left;

        function handlePointerMove(event) {
            const [mx] = d3.pointer(event);
            const date = x.invert(mx);
            let index = bisectDate(skillParsedData, date, 1);

            if (index >= skillParsedData.length) {
                index = skillParsedData.length - 1;
            }

            const d0 = skillParsedData[index - 1] || skillParsedData[index];
            const d1 = skillParsedData[index];
            const datum = d1 && (date - d0.date > d1.date - date) ? d1 : d0;

            const xPosition = x(datum.date);

            focusLine
                .attr('x1', xPosition)
                .attr('x2', xPosition)
                .style('opacity', 1);

            focusDots.forEach((dot, idx) => {
                const metric = skillJourneyMetrics[idx];
                dot
                    .attr('cx', xPosition)
                    .attr('cy', y(datum[metric.key] || 0))
                    .style('opacity', 1);
            });

            tooltip.html(`
                <div class="skill-tooltip-title">${formatSkillMonthLong(datum.date)}</div>
                ${skillJourneyMetrics.map(metric => `
                    <div class="skill-tooltip-row">
                        <span class="skill-tooltip-dot" style="background:${skillColorScale(metric.key)}"></span>
                        <span>${metric.label}</span>
                        <span class="ms-auto fw-semibold">${datum[metric.key] || 0}</span>
                    </div>
                `).join('')}
            `);

            tooltip.style('opacity', 1);

            const tooltipNode = tooltip.node();
            const tooltipWidth = tooltipNode.offsetWidth;
            const tooltipHeight = tooltipNode.offsetHeight;

            let tooltipX = margin.left + xPosition + 16;
            if (tooltipX + tooltipWidth > width) {
                tooltipX = margin.left + xPosition - tooltipWidth - 16;
            }
            tooltipX = Math.max(0, Math.min(tooltipX, width - tooltipWidth));

            let tooltipY = margin.top + 10;
            if (tooltipY + tooltipHeight > height) {
                tooltipY = height - tooltipHeight - 10;
            }

            tooltip
                .style('left', `${tooltipX}px`)
                .style('top', `${tooltipY}px`)
                .style('transform', 'translateY(0)');
        }

        function handlePointerLeave() {
            focusLine.style('opacity', 0);
            focusDots.forEach(dot => dot.style('opacity', 0));
            tooltip.style('opacity', 0);
        }
    }

    function initCreativeQuestboard() {
        const questCards = Array.from(document.querySelectorAll('.quest-card[data-quest-id]'));
        const progressFill = document.getElementById('questProgressFill');
        const progressPercent = document.getElementById('questProgressPercent');
        const progressMeta = document.getElementById('questProgressMeta');
        const progressMood = document.getElementById('questProgressMood');
        const focusButton = document.getElementById('questShuffleBtn');
        const promptButton = document.getElementById('questSpotlightBtn');
        const spotlightText = document.getElementById('questSpotlightText');

        if (!questCards.length || !progressFill || !progressPercent || !progressMeta) {
            return;
        }

        const progressBar = progressFill.parentElement;
        const storageKey = 'creativeQuestState';
        const totalQuests = questCards.length;
        let questState = {};

        try {
            const storedState = localStorage.getItem(storageKey);
            if (storedState) {
                questState = JSON.parse(storedState) || {};
            }
        } catch (error) {
            questState = {};
        }

        const prompts = [
            'Design a two-sentence pitch for a project you have not started yet.',
            'List three micro-interactions that would delight someone visiting your next build.',
            'Sketch an onboarding journey in five bullet points.',
            'Document a win from this week and how you can replicate it.',
            'Identify a friction point in your workflow and imagine an automation to remove it.',
            'Record a 30-second voice note summarising a lesson you just learned.',
            'Pair two unrelated ideas and outline what a mash-up experiment could look like.',
            'Define a "done is better" version of a project you have been postponing.',
            'Capture three questions you want to explore next month.',
            'Describe the vibe you want your next release to give in three adjectives.'
        ];

        let lastPrompt = '';

        function getQuestTitle(card) {
            const titleElement = card.querySelector('.quest-title');
            return titleElement ? titleElement.textContent.trim() : 'quest';
        }

        function persistState() {
            try {
                localStorage.setItem(storageKey, JSON.stringify(questState));
            } catch (error) {
                console.warn('Unable to store quest state. Quest progress will not be saved between sessions.', error);
            }
        }

        function updateMood(completed) {
            if (!progressMood) return;
            let message = 'Choose a quest to kickstart your flow.';

            if (completed === 0) {
                message = 'Choose a quest to kickstart your flow.';
            } else if (completed === totalQuests) {
                message = 'Questboard clear! Celebrate and plan your next adventure.';
            } else if (completed >= Math.ceil(totalQuests / 2)) {
                message = 'Momentum is surging—stack another win while the energy is high.';
            } else {
                message = 'Nice! Lock in another quick win to build your streak.';
            }

            progressMood.textContent = message;
        }

        function updateProgress() {
            const completed = questCards.filter(card => card.classList.contains('is-complete')).length;
            const percent = totalQuests ? Math.round((completed / totalQuests) * 100) : 0;

            progressFill.style.width = `${percent}%`;
            progressPercent.textContent = `${percent}%`;
            progressMeta.textContent = `${completed} of ${totalQuests} ${completed === 1 ? 'quest' : 'quests'} complete`;

            if (progressBar) {
                progressBar.setAttribute('aria-valuenow', String(percent));
                progressBar.setAttribute('aria-valuetext', `${percent}% complete`);
            }

            updateMood(completed);
        }

        function applyQuestState(card, isComplete) {
            const button = card.querySelector('.quest-toggle-btn');
            const status = card.querySelector('.quest-status');
            const questId = card.dataset.questId;

            card.classList.toggle('is-complete', isComplete);
            if (isComplete) {
                card.classList.remove('is-focus');
            }

            if (button) {
                const questTitle = getQuestTitle(card);
                button.classList.toggle('btn-outline-primary', !isComplete);
                button.classList.toggle('btn-success', isComplete);
                button.innerHTML = isComplete
                    ? '<i class="fas fa-check me-2"></i>Completed'
                    : '<i class="fas fa-play me-2"></i>Start';
                button.setAttribute('aria-pressed', isComplete ? 'true' : 'false');
                button.setAttribute('title', isComplete ? 'Click to reopen this quest' : 'Click to mark this quest complete');
                button.setAttribute('aria-label', `${isComplete ? 'Reopen' : 'Complete'} ${questTitle}`);
            }

            if (status) {
                status.textContent = isComplete ? 'Momentum locked in' : 'Ready to launch';
                status.classList.toggle('text-success', isComplete);
                status.classList.toggle('text-primary', !isComplete);
            }

            if (questId) {
                questState[questId] = isComplete;
            }
        }

        function focusQuestCard(card) {
            questCards.forEach(item => item.classList.remove('is-focus'));
            card.classList.add('is-focus');
            try {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            } catch (error) {
                card.scrollIntoView();
            }

            const title = getQuestTitle(card);
            if (typeof showToast === 'function') {
                showToast(`Spotlight locked on "${title}".`, 'info');
            }
        }

        function chooseFocusCard() {
            if (!questCards.length) return;
            const incomplete = questCards.filter(card => !card.classList.contains('is-complete'));
            const pool = incomplete.length ? incomplete : questCards;
            const chosen = pool[Math.floor(Math.random() * pool.length)];
            if (chosen) {
                focusQuestCard(chosen);
            }
        }

        function refreshSpotlight() {
            if (!spotlightText || !prompts.length) return;
            const availablePrompts = prompts.filter(prompt => prompt !== lastPrompt);
            const nextPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)] || prompts[0];
            spotlightText.textContent = nextPrompt;
            lastPrompt = nextPrompt;
        }

        questCards.forEach(card => {
            const questId = card.dataset.questId;
            const savedState = questState[questId];
            const isComplete = typeof savedState === 'boolean' ? savedState : Boolean(savedState);
            applyQuestState(card, isComplete);

            const button = card.querySelector('.quest-toggle-btn');
            if (button) {
                button.addEventListener('click', () => {
                    const nextState = !card.classList.contains('is-complete');
                    applyQuestState(card, nextState);
                    persistState();
                    updateProgress();
                });
            }
        });

        updateProgress();
        refreshSpotlight();

        if (focusButton) {
            focusButton.addEventListener('click', () => {
                chooseFocusCard();
            });
        }

        if (promptButton) {
            promptButton.addEventListener('click', () => {
                refreshSpotlight();
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        initSkillDashboard();
        initCreativeQuestboard();
    });

    // Fix map position when scrolling
    window.addEventListener('load', function() {
        const mapContainer = document.querySelector('.map-container');
        const mapWrapper = document.querySelector('.map-wrapper');
        
        if (!mapContainer || !mapWrapper) return;
        
        // Store original position
        const originalRect = mapContainer.getBoundingClientRect();
        const originalTop = originalRect.top + window.scrollY;
        
        window.addEventListener('scroll', function() {
            // Check if map is in viewport
            const containerRect = mapContainer.getBoundingClientRect();
            const isVisible = 
                containerRect.top < window.innerHeight && 
                containerRect.bottom > 0;
            
            if (isVisible) {
                // Calculate how much of the map is visible
                const visibleHeight = Math.min(containerRect.bottom, window.innerHeight) - 
                                     Math.max(containerRect.top, 0);
                
                // Only fix position if most of the map is visible
                if (visibleHeight > containerRect.height * 0.5) {
                    mapWrapper.classList.add('map-fixed');
                } else {
                    mapWrapper.classList.remove('map-fixed');
                }
            } else {
                mapWrapper.classList.remove('map-fixed');
            }
        });
    });

    function showSettings() {
    // Get the modal element
    const modal = document.getElementById('settingsModal');
    
    // Create Bootstrap modal instance if it doesn't exist
    let settingsModal = bootstrap.Modal.getInstance(modal);
    if (!settingsModal) {
        settingsModal = new bootstrap.Modal(modal, {
            keyboard: true,
            backdrop: true
        });
    }
    
    // Load saved settings
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || '16';
    
    const themeSelect = document.getElementById('themeSelect');
    const fontSizeRange = document.getElementById('fontSizeRange');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    // Set initial values
    themeSelect.value = savedTheme;
    fontSizeRange.value = savedFontSize;
    fontSizeValue.textContent = `${savedFontSize}px`;
    
    // Remove old event listeners
    themeSelect.removeEventListener('change', handleThemeChange);
    fontSizeRange.removeEventListener('input', handleFontSizeChange);
    
    // Add event listeners
    themeSelect.addEventListener('change', handleThemeChange);
    fontSizeRange.addEventListener('input', handleFontSizeChange);
    
    // Show the modal
    settingsModal.show();
    }

    // Helper functions for settings
    function handleThemeChange(e) {
    const selectedTheme = e.target.value;
    localStorage.setItem('theme', selectedTheme);
    
    // Remove all theme classes
    document.body.classList.remove('theme-synthwave', 'theme-cyberpunk', 'theme-retro', 
        'theme-nature', 'theme-pastel', 'theme-terminal', 'theme-neon', 'theme-space', 'dark-mode');
    
    // Apply selected theme
    if (selectedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (selectedTheme !== 'light') {
        document.body.classList.add(`theme-${selectedTheme}`);
    }
    
    showToast(`Theme changed to ${selectedTheme}`);
    }

    function handleFontSizeChange(e) {
    const size = e.target.value;
    localStorage.setItem('fontSize', size);
    document.documentElement.style.fontSize = `${size}px`;
    document.getElementById('fontSizeValue').textContent = `${size}px`;
    }

    Object.assign(window, {
        showSettings,
        handleThemeChange,
        handleFontSizeChange,
        showSearch,
        hideSearch,
        shareContent,
        acceptCookies,
        declineCookies,
        performSearch,
        handleSearchResult,
        resetMapView,
        zoomMap,
        closeInfoPanel
    });

})();
