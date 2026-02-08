console.log("Cleaning site loaded successfully");

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       INIT MAP (Leaflet)
    ========================= */

    const map = L.map("map", {
        center: [49.8397, 24.0297], // Львів
        zoom: 8,
        zoomControl: true,
        attributionControl: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18
    }).addTo(map);

    fetch("geo/lviv-oblast.geojson")
    .then(res => res.json())
    .then(data => {
        const oblast = L.geoJSON(data, {
            style: {
                color: "#ff0033",      // неон червоний
                weight: 2,             // тонкий кордон
                opacity: 0.9,
                fillColor: "#ff0033",
                fillOpacity: 0.05
            }
        }).addTo(map);

        map.fitBounds(oblast.getBounds());
    });


    /* =========================
       LVIV OBLAST BORDER (POLYGON)
    ========================= */

    const lvivRegion = {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [23.35, 50.65],
                [24.25, 50.70],
                [25.10, 50.40],
                [25.15, 49.90],
                [24.70, 49.60],
                [23.90, 49.50],
                [23.20, 49.70],
                [22.90, 50.10],
                [23.35, 50.65]
            ]]
        }
    };

    L.geoJSON(lvivRegion, {
        style: {
            color: "#ff0033",          // неон-червоний
            weight: 2,                 // ТОНКИЙ кордон
            opacity: 0.9,
            fillColor: "#ff0033",
            fillOpacity: 0.05
        }
    }).addTo(map);

    /* =========================
       CITIES (ONLY LVIV OBLAST)
    ========================= */

    const cities = [
    { name: "Львів", coords: [49.8397, 24.0297] },
    { name: "Новий Розділ", coords: [49.4734, 24.1326] },
    { name: "Миколаїв", coords: [49.5237, 23.9851] },
    { name: "Пустомити", coords: [49.7153, 23.9135] }
];


    cities.forEach(city => {
        L.marker(city.coords, {
            icon: L.divIcon({
                className: "city-label",
                html: city.name
            })
        }).addTo(map);
    });

});
