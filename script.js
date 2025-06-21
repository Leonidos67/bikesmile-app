document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    if (window.Telegram && window.Telegram.WebApp && Telegram.WebApp.initDataUnsafe && Telegram.WebApp.initDataUnsafe.user) {
        const user = Telegram.WebApp.initDataUnsafe.user;
        app.innerHTML = `
            <h1>Привет, ${user.first_name || 'пользователь'}!</h1>
            <p>Добро пожаловать в сервис проката велосипедов.</p>
            <button id="start-rent">Начать аренду</button>
        `;
        // Здесь можно добавить обработчик для кнопки "Начать аренду"
    } else {
        app.innerHTML = `
            <h2>Пожалуйста, откройте этот сайт через Telegram.</h2>
            <p>Авторизация доступна только в мини-приложении Telegram.</p>
        `;
    }
}); 