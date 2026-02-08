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

// ===== MAP INIT =====
const map = L.map('map').setView([49.8397, 24.0297], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// ===== REGIONS HIGHLIGHT =====
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
// ===== CITY LABELS =====
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
