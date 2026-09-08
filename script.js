const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const regionFilter = document.getElementById("regionFilter");
const clearButton = document.getElementById("clearButton");
const results = document.getElementById("results");

let locations = [];
let displayedLocations = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    locations = data;
    populateFilters();
    displayLocations();
  })
  .catch(error => {
    results.innerHTML = `<p>Could not load map data.</p>`;
    console.error(error);
  });

function populateFilters() {
  const types = [...new Set(locations.map(location => location.type))].sort();
  const regions = [...new Set(locations.map(location => location.region))].sort();

  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  });

  regions.forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
  });
}

function displayLocations() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedType = typeFilter.value;
  const selectedRegion = regionFilter.value;

  displayedLocations = locations.filter(location => {
    const searchableText = `
      ${location.name}
      ${location.type}
      ${location.region}
      ${location.period}
      ${location.description}
    `.toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesType = !selectedType || location.type === selectedType;
    const matchesRegion = !selectedRegion || location.region === selectedRegion;

    return matchesSearch && matchesType && matchesRegion;
  });

  markersLayer.clearLayers();
  results.innerHTML = "";

  displayedLocations.forEach(location => {
    const marker = L.marker([
      location.latitude,
      location.longitude
    ]).addTo(markersLayer);

    marker.bindPopup(`
      <h3>${escapeHtml(location.name)}</h3>
      <p><strong>Type:</strong> ${escapeHtml(location.type)}</p>
      <p><strong>Region:</strong> ${escapeHtml(location.region)}</p>
      <p><strong>Period:</strong> ${escapeHtml(location.period)}</p>
      <p>${escapeHtml(location.description)}</p>
      <p><small>Source: ${escapeHtml(location.source)}</small></p>
    `);

    const card = document.createElement("article");
    card.className = "result-card";

    card.innerHTML = `
      <h3>${escapeHtml(location.name)}</h3>
      <p><strong>${escapeHtml(location.type)}</strong></p>
      <p>${escapeHtml(location.region)} · ${escapeHtml(location.period)}</p>
      <p>${escapeHtml(location.description)}</p>
      <small>Source: ${escapeHtml(location.source)}</small>
      <br>
      <button>Show on map</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      map.setView([location.latitude, location.longitude], 14);
      marker.openPopup();
    });

    results.appendChild(card);
  });

  if (displayedLocations.length === 0) {
    results.innerHTML = "<p>No locations match the selected filters.</p>";
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

searchInput.addEventListener("input", displayLocations);
typeFilter.addEventListener("change", displayLocations);
regionFilter.addEventListener("change", displayLocations);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  typeFilter.value = "";
  regionFilter.value = "";
  displayLocations();
});
