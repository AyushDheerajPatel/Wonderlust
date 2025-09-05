const mapContainer = document.getElementById('map');

// Default coordinates (India)
let coords = [78.9629, 20.5937];

if (window.mapData.coordinates[0] && window.mapData.coordinates[1]) {
  // If longitude & latitude are available, use them
  coords = window.mapData.coordinates;
} else if (window.mapData.location) {
  // If no coordinates, use location to geocode
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(window.mapData.location)}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        coords = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
        initializeMap(coords);
      } else {
        console.warn('Location not found, using fallback.');
        initializeMap(coords);
      }
    })
    .catch(() => initializeMap(coords));
} else {
  initializeMap(coords);
}

function initializeMap(center) {
  const map = new maplibregl.Map({
    container: mapContainer,
    style: 'https://demotiles.maplibre.org/style.json',
    center: center, // [lng, lat]
    zoom: 2
  });

  map.addControl(new maplibregl.NavigationControl());

  new maplibregl.Marker({ color: 'red' })
    .setLngLat(center)
    .setPopup(new maplibregl.Popup().setHTML(`<h5>${window.mapData.title}</h5><p>${window.mapData.location}</p>`))
    .addTo(map);
}
