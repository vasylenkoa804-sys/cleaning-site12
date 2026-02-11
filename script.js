// ================= UNIVERSAL MODAL =================
const modal = document.getElementById("modal");
const openButtons = document.querySelectorAll(".openModal");
const closeBtn = modal ? modal.querySelector(".close") : null;

// Відкриття модалки
if (modal && openButtons.length) {
    openButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    });

    // Закриття по хрестику
    if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.style.display = "none");
    }

    // Закриття по кліку на фон
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Закриття по ESC
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") modal.style.display = "none";
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
if (refCode) localStorage.setItem("cleanpro_ref", refCode);

// ================= FORM SUBMIT (TELEGRAM) =================
const BOT_TOKEN = "8579321384:AAGW2SRdm9YeP6Elq_UWhaYk56X0TBBA9Dc";
const CHAT_ID = "8173442141";

// додаємо універсальну форму у модалку (тільки один раз)
if (modal) {
    const formExists = modal.querySelector("form#orderForm");
    if (!formExists) {
        const page = window.location.pathname.split("/").pop();

        function getServiceFieldHTML() {
            if (page.includes("apartments.html")) {
                return `
                <label>
                    Тип квартири:
                    <select name="apartmentType" required>
                        <option value="">Виберіть тип кімнати</option>
                        <option value="1 кімн">1 кімн</option>
                        <option value="2 кімн">2 кімн</option>
                        <option value="Студія">Студія</option>
                        <option value="Інше">Інше</option>
                    </select>
                </label>
                `;
            } else {
                return `
                <label>
                    Площа (м²):
                    <input type="text" name="area" placeholder="Вкажіть площу" required>
                </label>
                `;
            }
        }

        const formHTML = `
        <form id="orderForm">
            <label>
                Імʼя:
                <input type="text" name="name" placeholder="Імʼя" required>
            </label>
            <label>
                Телефон:
                <input type="tel" name="phone" placeholder="Телефон" required>
            </label>
            <label>
                Email:
                <input type="email" name="email" placeholder="example@mail.com" required>
            </label>
            <label>
                Місто:
                <input type="text" name="city" placeholder="Місто" required>
            </label>
            <label>
                Вулиця:
                <input type="text" name="street" placeholder="Вулиця" required>
            </label>
            <label>
                № будинку / квартири:
                <input type="text" name="houseNumber" placeholder="№ будинку / квартири" required>
            </label>
            ${getServiceFieldHTML()}
            <button type="submit" class="btn big">Відправити</button>
        </form>
        <p id="successMessage" style="display:none; color:green; margin-top:10px;">
            Дякуємо! Ваша заявка надіслана.
        </p>
        `;

        modal.querySelector(".modal-box").insertAdjacentHTML("beforeend", formHTML);
    }

    // Відправка форми
    const orderForm = modal.querySelector("#orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", async e => {
            e.preventDefault();
            const formData = new FormData(orderForm);
            let message = `📌 Нова заявка з сайту CLEANPRO\n`;
            formData.forEach((value, key) => {
                message += `*${key}:* ${value}\n`;
            });

            const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            await fetch(telegramUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" })
            });

            document.getElementById("successMessage").style.display = "block";
            orderForm.reset();
            setTimeout(() => {
                modal.style.display = "none";
                document.getElementById("successMessage").style.display = "none";
            }, 2000);
        });
    }
}

// ================= HEADER MOBILE TOGGLE =================
const header = document.querySelector('.header');
if (header) {
    header.addEventListener('click', () => {
        const nav = header.querySelector('.nav');
        if (nav) nav.classList.toggle('active');
    });
}

// ================= MAP ONLY FOR INDEX.HTML =================
if (window.location.pathname.includes("index.html")) {
    const map = L.map('map').setView([49.8397, 24.0297], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    fetch("lviv-regions.geojson")
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    fillColor: "#22c55e",
                    fillOpacity: 0.35,
                    color: "#16a34a",
                    weight: 2
                }
            }).addTo(map);
        });

    const cities = [
        { name: "Львів", lat: 49.8397, lng: 24.0297 },
        { name: "Городок", lat: 49.784, lng: 23.648 },
        { name: "Пустомити", lat: 49.715, lng: 23.912 },
        { name: "Самбір", lat: 49.52, lng: 23.2 },
        { name: "Дрогобич", lat: 49.35, lng: 23.51 },
        { name: "Стрий", lat: 49.26, lng: 23.85 },
        { name: "Трускавець", lat: 49.278, lng: 23.505 },
        { name: "Борислав", lat: 49.286, lng: 23.418 },
        { name: "Моршин", lat: 49.156, lng: 23.873 }
    ];

    cities.forEach(city => {
        L.marker([city.lat, city.lng], {
            icon: L.divIcon({
                className: "city-label",
                html: `<span>${city.name}</span>`
            })
        }).addTo(map);
    });
}
