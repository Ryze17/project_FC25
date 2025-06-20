const validUser = {
    username: "123",
    password: "123"
};

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const errorMessage = document.getElementById('errorMessage');
    const logoutBtn = document.getElementById('logout');


    if (showRegister && showLogin) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        });

        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        });
    }


    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === validUser.username && password === validUser.password) {

                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', username);
                
                // Перенаправление на страницу календаря
                window.location.href = 'calendar.html';
            } else {
                errorMessage.textContent = 'Неверное имя пользователя или пароль';
                errorMessage.classList.remove('hidden');
                loginForm.classList.add('shake');
                

                setTimeout(() => {
                    loginForm.classList.remove('shake');
                }, 500);
            }
        });
    }


    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.classList.remove('hidden');
                return;
            }

            if (password.length < 6) {
                errorMessage.textContent = 'Пароль должен содержать минимум 6 символов';
                errorMessage.classList.remove('hidden');
                return;
            }


            errorMessage.textContent = 'Регистрация прошла успешно! Теперь вы можете войти.';
            errorMessage.style.backgroundColor = 'var(--success)';
            errorMessage.classList.remove('hidden');
            

            setTimeout(() => {
                registerForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                errorMessage.classList.add('hidden');
                errorMessage.style.backgroundColor = 'var(--error)';
            }, 3000);
        });
    }

    // Проверка аутентификации при загрузке календаря
    if (window.location.pathname.includes('calendar.html')) {
        const loggedIn = sessionStorage.getItem('loggedIn');
        if (loggedIn !== 'true') {
            window.location.href = 'login.html';
        } else {

            const usernameDisplay = document.getElementById('usernameDisplay');
            const username = sessionStorage.getItem('username') || 'Игрок';
            usernameDisplay.textContent = username;
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }
});