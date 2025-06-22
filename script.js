document.addEventListener('DOMContentLoaded', function() {
    // Автоматическое определение режима разработки.
    // Если сайт открыт на 'localhost' или '127.0.0.1', isDevMode будет true.
    const isDevMode = ['localhost', '127.0.0.1'].includes(window.location.hostname);

    const telegramApp = document.getElementById('telegram-app');
    const browserFallback = document.getElementById('browser-fallback');

    /**
     * Инициализирует основное приложение.
     * @param {boolean} isDev - Флаг режима разработки.
     */
    function initializeApp(isDev = false) {
        const welcomeText = document.getElementById('welcome-text');
        const tabs = document.querySelectorAll('.tab-content');
        const navButtons = document.querySelectorAll('.nav-button');
        const userNameElement = document.getElementById('user-name');
        const userAvatarElement = document.getElementById('user-avatar');
        const telegramInfoContainer = document.getElementById('telegram-info');
        const userTelegramLink = document.getElementById('user-telegram-link');
        
        let user;
        if (isDev) {
            // Тестовые данные для режима разработки
            user = { first_name: 'Гость', username: 'your_username', photo_url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' };
        } else {
            user = window.Telegram.WebApp.initDataUnsafe.user;
        }

        if (user) {
            // Обновляем приветствие на главной
            if (welcomeText) {
                welcomeText.textContent = `Привет, ${user.first_name}!`;
            }

            // Обновляем имя в профиле
            if (userNameElement) {
                let fullName = user.first_name;
                if (user.last_name) {
                    fullName += ` ${user.last_name}`;
                }
                userNameElement.textContent = fullName;
            }

            // Обновляем информацию о Telegram
            if (telegramInfoContainer && userTelegramLink && user.username) {
                userTelegramLink.href = `https://t.me/${user.username}`;
                userTelegramLink.textContent = `@${user.username}`;
                telegramInfoContainer.style.display = 'block';
            } else if (telegramInfoContainer) {
                telegramInfoContainer.style.display = 'none';
            }
            
            // Обновляем аватар
            if (userAvatarElement) {
                userAvatarElement.src = user.photo_url || 'https://telega.in/channels/alter_universe/avatar?2s';
            }
        }

        function switchTab(tabId) {
            tabs.forEach(tab => tab.classList.add('hidden'));
            const activeTab = document.getElementById(tabId);
            if (activeTab) activeTab.classList.remove('hidden');
            navButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === tabId));
        }

        navButtons.forEach(button => {
            button.addEventListener('click', () => switchTab(button.dataset.tab));
        });

        switchTab('start');
    }


    if (isDevMode) {
        // --- РЕЖИM РАЗРАБОТКИ ---
        console.warn('Приложение работает в режиме разработки.');
        if (browserFallback) browserFallback.style.display = 'none';
        if (telegramApp) {
            telegramApp.classList.remove('hidden');
            document.body.style.padding = '0 0 70px 0';
        }
        initializeApp(true);
    } else {
        // --- БОЕВОЙ РЕЖИМ (PRODUCTION) ---
        try {
            const tg = window.Telegram.WebApp;
            tg.ready();

            if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
                if (browserFallback) browserFallback.style.display = 'none';
                if (telegramApp) {
                    telegramApp.classList.remove('hidden');
                    document.body.style.padding = '0 0 70px 0';
                }
                initializeApp(false);
            } else {
                 document.body.style.padding = '0'; // Показываем заглушку
            }
        } catch (e) {
            document.body.style.padding = '0'; // Показываем заглушку в случае ошибки
            console.error("Telegram WebApp API is not available, showing fallback.", e);
        }
    }
}); 