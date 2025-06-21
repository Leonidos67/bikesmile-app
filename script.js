document.addEventListener('DOMContentLoaded', function() {
    const telegramApp = document.getElementById('telegram-app');
    const browserFallback = document.getElementById('browser-fallback');

    function initializeApp() {
        const welcomeText = document.getElementById('welcome-text');
        const tabs = document.querySelectorAll('.tab-content');
        const navButtons = document.querySelectorAll('.nav-button');
        const userNameElement = document.getElementById('user-name');
        const userAvatarElement = document.getElementById('user-avatar');
        
        // Используем тестовые данные для браузера
        const user = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe.user)
            ? window.Telegram.WebApp.initDataUnsafe.user
            : { first_name: 'Тестовый', username: 'test_user', photo_url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' };

        if (welcomeText && user) {
            welcomeText.textContent = `Привет, ${user.first_name}!`;
        }

        if (userNameElement && user) {
            userNameElement.textContent = user.username ? `@${user.username}` : user.first_name;
        }

        if (userAvatarElement && user) {
            if (user.photo_url) {
                userAvatarElement.src = user.photo_url;
            } else {
                userAvatarElement.src = 'https://telega.in/channels/alter_universe/avatar?2s';
            }
        }

        function switchTab(tabId) {
            tabs.forEach(tab => {
                tab.classList.add('hidden');
            });
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.remove('hidden');
            }
            navButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.tab === tabId);
            });
        }

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                switchTab(tabId);
            });
        });

        switchTab('home');
    }

    // --- ВРЕМЕННОЕ ИЗМЕНЕНИЕ ДЛЯ ПРОСМОТРА В БРАУЗЕРЕ ---
    if (browserFallback) browserFallback.style.display = 'none';
    if (telegramApp) {
        telegramApp.classList.remove('hidden');
        document.body.style.padding = '0 0 70px 0'; // Возвращаем padding для body
    }
    initializeApp();
    
    /*
    // --- ОРИГИНАЛЬНЫЙ КОД ДЛЯ TELEGRAM ---
    try {
        const tg = window.Telegram.WebApp;
        tg.ready();

        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            if (browserFallback) browserFallback.style.display = 'none';
            if (telegramApp) {
                telegramApp.classList.remove('hidden');
                document.body.style.padding = '0 0 70px 0'; // Возвращаем padding для body
            }
            initializeApp();
        } else {
             document.body.style.padding = '0';
        }
    } catch (e) {
        document.body.style.padding = '0';
        console.error("Telegram WebApp API is not available, showing fallback.", e);
    }
    */
}); 