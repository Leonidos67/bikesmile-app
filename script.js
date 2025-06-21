document.addEventListener('DOMContentLoaded', function() {
    const welcomeText = document.getElementById('welcome-text');
    const tabs = document.querySelectorAll('.tab-content');
    const navButtons = document.querySelectorAll('.nav-button');
    const userNameElement = document.getElementById('user-name');
    const userAvatarElement = document.getElementById('user-avatar');
    let userName = 'Гость';

    // Пытаемся инициализировать Telegram Web App
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            Telegram.WebApp.ready();
            const user = Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                userName = user.first_name || 'Гость';
                userNameElement.textContent = user.username ? `@${user.username}` : user.first_name;

                // Загружаем аватар пользователя
                if (user.photo_url) {
                    userAvatarElement.src = user.photo_url;
                } else {
                    // Можно установить заглушку, если аватара нет
                    userAvatarElement.src = 'https://telega.in/channels/alter_universe/avatar?2s'; 
                }
            }
        }
    } catch (e) {
        console.error("Telegram WebApp is not available.", e);
    }

    // Устанавливаем текст приветствия
    if (welcomeText) {
        welcomeText.textContent = `Привет, ${userName}!`;
    }

    // Функция для переключения вкладок
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

    // Навешиваем обработчики на кнопки навигации
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });

    // Показываем начальную вкладку
    switchTab('home');
}); 