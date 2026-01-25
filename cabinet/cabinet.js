// ===== LOGIN LOGIC =====

// отримуємо форму
const loginForm = document.getElementById("loginForm");

// якщо форма є (щоб файл не падав на інших сторінках)
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();

        // прості перевірки
        if (phone === "" || password === "") {
            alert("Заповніть всі поля");
            return;
        }

        // ⚠️ тимчасова логіка (імітація сервера)
        // зберігаємо "користувача" в localStorage
        const user = {
            phone: phone,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem("cleanpro_user", JSON.stringify(user));

        // редірект у кабінет
        window.location.href = "dashboard.html";
    });
}

// ===== AUTH CHECK (для інших сторінок кабінету) =====
function checkAuth() {
    const user = localStorage.getItem("cleanpro_user");

    if (!user) {
        window.location.href = "login.html";
    }
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("cleanpro_user");
    window.location.href = "login.html";
}
