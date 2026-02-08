// ================= MODAL LOGIC =================

const openButtons = document.querySelectorAll(".openModal");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

if (modal) {
    // відкрити модалку
    openButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    });

    // закрити по хрестику
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // закрити по кліку на фон
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // закриття по ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });
}

// ================= CABINET BUTTON =================

const cabinetBtn = document.getElementById("cabinetBtn");

if (cabinetBtn) {
    const user = localStorage.getItem("cleanpro_user");

    if (user) {
        cabinetBtn.textContent = "Кабінет";
        cabinetBtn.href = "cabinet/dashboard.html";
    } else {
        cabinetBtn.textContent = "Вхід";
        cabinetBtn.href = "cabinet/login.html";
    }
}

// ================= REFERRAL TRACKING =================

const urlParams = new URLSearchParams(window.location.search);
const refCode = urlParams.get("ref");

if (refCode) {
    localStorage.setItem("cleanpro_ref", refCode);
}

// ================= FORM SUBMIT (SAFE) =================

const forms = document.querySelectorAll("form");

forms.forEach(form => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const ref = localStorage.getItem("cleanpro_ref");

        if (ref) {
            alert("Заявка відправлена ✅\nРеферальний код: " + ref);
        } else {
            alert("Заявка відправлена ✅");
        }

        // закриваємо модалку якщо вона є
        if (modal) {
            modal.style.display = "none";
        }

        form.reset();
    });
});

const header = document.querySelector('.header');

header.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
});
і