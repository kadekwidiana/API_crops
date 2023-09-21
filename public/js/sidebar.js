// Mendapatkan lebar layar
const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// Menentukan lebar sidebar berdasarkan lebar layar
let sidebarWidthLeft = 450;
let sidebarWidthRight = 250;

if (screenWidth <= 480) {
    sidebarWidthLeft = 250;
    sidebarWidthRight = 200;
}

// START JS SIDEBAR RIGHT
// Menyeseuaikan posisi control sidebar
function adjustPositionControlSidebarRight(sidebarClass) {
    const sidebarWidth = document.querySelector(sidebarClass + '.active') ? sidebarWidthRight : 0; // Adjust the width based on sidebar visibility

    // Atur posisi control leaflet
    const controlContainersLeaflet = document.querySelectorAll('.leaflet-control-zoom, .leaflet-control-attribution');
    controlContainersLeaflet.forEach(function (controlContainerLeaflet) {
        controlContainerLeaflet.style.right = sidebarWidth + 'px';
    });

    // Atur posisi control basemap, layer, dan legend
    const controlContainers = document.querySelectorAll('.container-control-basemap, .container-control-layer, .container-control-layer2, .container-control-legend,.container-control-street-view, .control-legend-gee');
    controlContainers.forEach(function (controlContainer) {
        controlContainer.style.right = sidebarWidth + 'px';
    });
}

function closeBasemapSidebar() {
    const basemapSidebar = document.getElementById("sidebar-basemap");
    if (basemapSidebar.classList.contains("active")) {
        basemapSidebar.classList.remove("active");
        adjustPositionControlSidebarRight('.sidebar-basemap'); // Call the function to adjust control positions
        const basemapButton = document.querySelector('.container-control-basemap button');
        basemapButton.classList.remove("active"); // Remove active class from the button
    }
}

// Function to close layer sidebar and adjust icons
function closeLayerSidebar() {
    const layerSidebar = document.getElementById("sidebar-layer");
    if (layerSidebar.classList.contains("active")) {
        layerSidebar.classList.remove("active");
        adjustPositionControlSidebarRight('.sidebar-layer'); // Call the function to adjust control positions
        const layerButton = document.querySelector('.container-control-layer button');
        layerButton.classList.remove("active"); // Remove active class from the button
    }
}

// Function to close layer sidebar and adjust icons
function closeLayer2Sidebar() {
    const layerSidebar = document.getElementById("sidebar-layer2");
    if (layerSidebar.classList.contains("active")) {
        layerSidebar.classList.remove("active");
        adjustPositionControlSidebarRight('.sidebar-layer2'); // Call the function to adjust control positions
        const layerButton = document.querySelector('.container-control-layer2 button');
        layerButton.classList.remove("active"); // Remove active class from the button
    }
}

// Function to close legend sidebar and adjust icons
function closeLegendSidebar() {
    const layerSidebar = document.getElementById("sidebar-legend");
    if (layerSidebar.classList.contains("active")) {
        layerSidebar.classList.remove("active");
        adjustPositionControlSidebarRight('.sidebar-legend'); // Call the function to adjust control positions
        const layerButton = document.querySelector('.container-control-legend button');
        layerButton.classList.remove("active"); // Remove active class from the button
    }
}

// Control button basemaps
const customControlBasemap = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-basemap');
        const button = L.DomUtil.create('button', 'button-control-basemap', container);
        const image = document.createElement('img');
        image.src = 'assets/icons/icon-control/icon-basemap.png'; // Ganti dengan path gambar Anda
        image.className = 'custom-image'; // Optional: Atur kelas untuk gambar jika diperlukan

        button.appendChild(image);

        container.addEventListener("click", function () {
            closeLayerSidebar(); // Close layer sidebar if open
            closeLayer2Sidebar(); // Close layer sidebar if open
            closeLegendSidebar(); // Close layer sidebar if open
            if (screenWidth <= 480) {
                closeAnalisisSidebar();
            }
            document.getElementById("sidebar-basemap").classList.toggle("active");
            adjustPositionControlSidebarRight('.sidebar-basemap'); // Call the function to adjust control positions
            const basemapButton = document.querySelector('.container-control-basemap button');
            basemapButton.classList.toggle("active"); // Toggle active class on the button
        });

        return container;
    }
});
// Add the custom button to the map
map.addControl(new customControlBasemap());

// Control button layer
const customControlLayer = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-layer');
        const button = L.DomUtil.create('button', 'button-control-layer', container);
        const image = document.createElement('img');
        image.src = 'assets/icons/icon-control/icon-layer.png'; // Ganti dengan path gambar Anda
        image.className = 'custom-image'; // Optional: Atur kelas untuk gambar jika diperlukan

        button.appendChild(image);


        container.addEventListener("click", function () {
            closeBasemapSidebar(); // Close basemap sidebar if open
            closeLayer2Sidebar(); // Close basemap sidebar if open
            closeLegendSidebar(); // Close basemap sidebar if open
            if (screenWidth <= 480) {
                closeAnalisisSidebar();
            }
            document.getElementById("sidebar-layer").classList.toggle("active");
            adjustPositionControlSidebarRight('.sidebar-layer'); // Call the function to adjust control positions
            const layerButton = document.querySelector('.container-control-layer button');
            layerButton.classList.toggle("active"); // Toggle active class on the button
        });

        return container;
    }
});
// Add the custom button to the map
map.addControl(new customControlLayer());

// Control button layer //hiden
const customControlLayer2 = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-layer2 d-none');
        const button = L.DomUtil.create('button', 'button-control-layer2', container);
        const icon = L.DomUtil.create('i', 'fa-solid fa-layer-group fa-xl');
        button.appendChild(icon);

        container.addEventListener("click", function () {
            closeBasemapSidebar(); // Close basemap sidebar if open
            closeLayerSidebar(); // Close basemap sidebar if open
            closeLegendSidebar(); // Close basemap sidebar if open
            if (screenWidth <= 480) {
                closeAnalisisSidebar();
            }
            document.getElementById("sidebar-layer2").classList.toggle("active");
            adjustPositionControlSidebarRight('.sidebar-layer2'); // Call the function to adjust control positions
            const layerButton = document.querySelector('.container-control-layer2 button');
            layerButton.classList.toggle("active"); // Toggle active class on the button
        });

        return container;
    }
});
// Add the custom button to the map
map.addControl(new customControlLayer2());

// Control button legend
const customControlLegend = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-legend');
        const button = L.DomUtil.create('button', 'button-control-legend', container);
        const icon = L.DomUtil.create('i', 'fa-solid fa-list fa-xl');
        button.appendChild(icon);

        container.addEventListener("click", function () {
            closeBasemapSidebar(); // Close basemap sidebar if open
            closeLayerSidebar(); // Close basemap sidebar if open
            if (screenWidth <= 480) {
                closeAnalisisSidebar();
            }
            document.getElementById("sidebar-legend").classList.toggle("active");
            adjustPositionControlSidebarRight('.sidebar-legend'); // Call the function to adjust control positions
            const layerButton = document.querySelector('.container-control-legend button');
            layerButton.classList.toggle("active"); // Toggle active class on the button
        });

        return container;
    }
});
// Add the custom button to the map
map.addControl(new customControlLegend());

// Control button legend
const controlStreetView = L.Control.extend({
    options: {
        position: 'bottomright'
    },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-street-view d-none');
        const button = L.DomUtil.create('button', 'button-control-street-view', container);
        const icon = L.DomUtil.create('i', 'fa-solid fa-person fa-lg');
        button.appendChild(icon);

        button.addEventListener("click", function () {
            // Add a click event listener to the map only after the button is clicked
            map.on('click', function (e) {
                let lat = e.latlng.lat.toPrecision(8);
                let lon = e.latlng.lng.toPrecision(8);
                const point = L.marker([lat, lon]).addTo(map)
                    .bindPopup('<a href="http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lon + '&cbp=11,0,0,0" target="_blank"><b>View</b></a>').openPopup();
            });
        });

        return container;
    }
});

// Add the custom button to the map
map.addControl(new controlStreetView());

// Control button legend
const controlLegendGEE = L.Control.extend({
    options: {
        position: 'bottomright'
    },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'bg-light container-control-street-view d-none');
        container.setAttribute('id', 'c-gee');
        const button = L.DomUtil.create('button', 'button-control-legend-gee', container);
        const image = document.createElement('img');
        image.src = 'assets/icons/icon-legend/legend-water.jpeg'; // Ganti dengan path gambar Anda
        image.className = 'custom-image-gee'; // Optional: Atur kelas untuk gambar jika diperlukan

        button.appendChild(image);

        return container;
    }
});

// Add the custom button to the map
map.addControl(new controlLegendGEE());
// END SIDEBAR RIGTH

// START SIDEBAR LEFT
// Menyeseuaikan posisi control sidebar basemap

function adjustPositionControlSidebarLeft(sidebarClass) {
    const sidebarWidth = document.querySelector(sidebarClass + '.active') ? sidebarWidthLeft : 0; // Adjust the width based on sidebar visibility

    // Atur posisi control leaflet
    const controlContainersLeaflet = document.querySelectorAll('.leaflet-control-scale, .leaflet-control-geocoder, .leaflet-control-navbar, .leaflet-draw ');
    controlContainersLeaflet.forEach(function (controlContainerLeaflet) {
        controlContainerLeaflet.style.left = sidebarWidth + 'px';
    });

    // Atur posisi control basemap, layer, dan legend
    const controlContainers = document.querySelectorAll('.container-control-analisis, .container-control-analisis-point');
    controlContainers.forEach(function (controlContainer) {
        controlContainer.style.left = sidebarWidth + 'px';
    });
}

// Function to close basemap sidebar and adjust icons
function closeAnalisisSidebar() {
    const basemapSidebar = document.getElementById("sidebar-analisis-point");
    if (basemapSidebar.classList.contains("active")) {
        basemapSidebar.classList.remove("active");
        adjustPositionControlSidebarLeft('.sidebar-analisis-point.active'); // Call the function to adjust control positions
        const basemapButton = document.querySelector('.container-control-analisis-point button');
        basemapButton.classList.remove("active"); // Remove active class from the button
    }
}


// Control button analisis
const customControlAnalisis = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function () {
        const container = L.DomUtil.create('div', 'btn btn-light btn-outline-secondary container-control-analisis-point');
        const button = L.DomUtil.create('button', 'button-control-analisis-point', container);
        const icon = L.DomUtil.create('i', 'fa-solid fa-magnifying-glass-chart');
        button.appendChild(icon);

        container.addEventListener("click", function () {
            if (screenWidth <= 480) {
                closeBasemapSidebar();
                closeLayerSidebar();
                closeLegendSidebar();
            }
            document.getElementById("sidebar-analisis-point").classList.toggle("active");
            adjustPositionControlSidebarLeft('.sidebar-analisis-point.active'); // Call the function to adjust control positions
            const layerButton = document.querySelector('.container-control-analisis-point button');
            layerButton.classList.toggle("active"); // Toggle active class on the button
        });

        return container;
    }
});
// Add the custom button to the map
map.addControl(new customControlAnalisis());

// navigasi bar
L.control.navbar().addTo(map);

// hash
const hash = new L.Hash(map);

// skala
L.control.scale().addTo(map);