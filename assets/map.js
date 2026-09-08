/* ---------------------------------------------------------------
   map.js — builds the map from config.js and places.js.
   You should not need to edit this file to add data.
   --------------------------------------------------------------- */

(function () {
  "use strict";

  var CONFIG = window.CONFIG;
  var THEMES = window.THEMES;
  var PLACES = window.PLACES || [];
  var WALKS  = window.WALKS  || [];

  var themeById = {};
  THEMES.forEach(function (t) { themeById[t.id] = t; });

  /* --- Masthead ------------------------------------------------ */

  document.title = CONFIG.city + " — mapping the city";
  document.getElementById("city").textContent = CONFIG.city;
  document.getElementById("country").textContent = CONFIG.country;
  document.getElementById("group").textContent = CONFIG.group;
  document.getElementById("standfirst").textContent = CONFIG.standfirst;
  document.getElementById("updated").textContent = CONFIG.updated;

  /* --- Map ----------------------------------------------------- */

  var map = L.map("map", {
    center: CONFIG.centre,
    zoom: CONFIG.zoom,
    scrollWheelZoom: false,   // stops the page hijacking scroll
    zoomControl: true
  });

  // Pale basemap so our own data is the loudest thing on screen.
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
      '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(map);

  // Click the map to re-enable the wheel, as people expect.
  map.on("click", function () { map.scrollWheelZoom.enable(); });
  map.on("mouseout", function () { map.scrollWheelZoom.disable(); });

  /* --- Helpers ------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function evidenceLabel(e) {
    if (e === "field") return "Field research";
    if (e === "desk")  return "Desk research";
    return "Desk and field";
  }

  function popupHTML(p) {
    var t = themeById[p.theme] || { label: p.theme, colour: "#55625F" };
    var bits = ['<div class="pop">'];

    bits.push("<h3>" + esc(p.name) + "</h3>");

    bits.push('<p class="meta">');
    bits.push('<span class="tag" style="border-color:' + t.colour + ';color:' + t.colour + '">' + esc(t.label) + "</span>");
    bits.push('<span class="tag">' + evidenceLabel(p.evidence) + "</span>");
    if (p.date) bits.push("<span>" + esc(p.date) + "</span>");
    if (p.by && p.by !== "—") bits.push("<span>" + esc(p.by) + "</span>");
    bits.push("</p>");

    if (p.note) bits.push("<p>" + esc(p.note) + "</p>");

    if (p.photo) {
      bits.push('<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + '" loading="lazy">');
    }

    if (p.source || p.url) {
      bits.push('<p class="src">');
      bits.push(p.url
        ? 'Source: <a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.source || p.url) + "</a>"
        : "Source: " + esc(p.source));
      bits.push("</p>");
    }

    bits.push("</div>");
    return bits.join("");
  }

  function marker(p) {
    var t = themeById[p.theme] || { colour: "#55625F" };
    var shape = p.evidence === "desk" ? " desk" : "";

    return L.marker(p.coords, {
      title: p.name,
      keyboard: true,
      icon: L.divIcon({
        className: "",
        html: '<span class="pin' + shape + '" style="background:' + t.colour + '"></span>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -8]
      })
    }).bindPopup(popupHTML(p));
  }

  /* --- Layer groups, one per theme ----------------------------- */

  var groups = {};   // theme id -> L.layerGroup
  var pins = [];     // { marker, theme, evidence }

  THEMES.forEach(function (t) {
    groups[t.id] = L.layerGroup().addTo(map);
  });

  PLACES.forEach(function (p) {
    if (!groups[p.theme]) {
      console.warn('Unknown theme "' + p.theme + '" on place "' + p.name + '" — check config.js');
      return;
    }
    var m = marker(p);
    pins.push({ marker: m, theme: p.theme, evidence: p.evidence || "desk" });
    m.addTo(groups[p.theme]);
  });

  /* --- Walk routes --------------------------------------------- */

  var walkLayer = L.layerGroup().addTo(map);

  WALKS.forEach(function (w) {
    L.polyline(w.path, {
      color: "#1B2A2E",
      weight: 2,
      opacity: 0.75,
      dashArray: "1 6",
      lineCap: "round"
    })
      .bindPopup(
        '<div class="pop"><h3>' + esc(w.name) + "</h3>" +
        '<p class="meta">' +
          '<span class="tag">Walked</span>' +
          (w.date ? "<span>" + esc(w.date) + "</span>" : "") +
          (w.by && w.by !== "—" ? "<span>" + esc(w.by) + "</span>" : "") +
        "</p>" +
        (w.note ? "<p>" + esc(w.note) + "</p>" : "") +
        "</div>"
      )
      .addTo(walkLayer);
  });

  /* --- Legend -------------------------------------------------- */

  var evidenceFilter = "all";
  var visibleThemes = {};
  THEMES.forEach(function (t) { visibleThemes[t.id] = true; });

  var list = document.getElementById("layers");

  THEMES.forEach(function (t) {
    var n = PLACES.filter(function (p) { return p.theme === t.id; }).length;

    var li = document.createElement("li");
    li.innerHTML =
      "<label>" +
        '<input type="checkbox" checked data-theme="' + t.id + '">' +
        '<span class="swatch" style="--dot:' + t.colour + '">' + esc(t.label) + "</span>" +
        '<span class="count">' + n + "</span>" +
        '<span class="hint">' + esc(t.hint) + "</span>" +
      "</label>";
    list.appendChild(li);
  });

  list.addEventListener("change", function (e) {
    var id = e.target.getAttribute("data-theme");
    if (!id) return;
    visibleThemes[id] = e.target.checked;
    redraw();
  });

  // Evidence filter — the thing an assessor will look for.
  var seg = document.getElementById("evidence-filter");
  seg.addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    evidenceFilter = btn.getAttribute("data-evidence");
    seg.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b === btn));
    });
    redraw();
  });

  function matches(pin) {
    if (!visibleThemes[pin.theme]) return false;
    if (evidenceFilter === "all") return true;
    return pin.evidence === evidenceFilter || pin.evidence === "both";
  }

  function redraw() {
    pins.forEach(function (pin) {
      var on = matches(pin);
      var group = groups[pin.theme];
      if (on && !group.hasLayer(pin.marker)) pin.marker.addTo(group);
      if (!on && group.hasLayer(pin.marker)) group.removeLayer(pin.marker);
    });

    THEMES.forEach(function (t) {
      if (visibleThemes[t.id]) { if (!map.hasLayer(groups[t.id])) groups[t.id].addTo(map); }
      else if (map.hasLayer(groups[t.id])) map.removeLayer(groups[t.id]);
    });
  }

  // Tallies
  function tally(kind) {
    return PLACES.filter(function (p) {
      return p.evidence === kind || p.evidence === "both";
    }).length;
  }

  document.getElementById("n-desk").textContent = tally("desk");
  document.getElementById("n-field").textContent = tally("field");
  document.getElementById("n-total").textContent = PLACES.length;

  // Walks toggle
  var walkBox = document.getElementById("show-walks");
  walkBox.addEventListener("change", function () {
    if (walkBox.checked) walkLayer.addTo(map); else map.removeLayer(walkLayer);
  });
  document.getElementById("n-walks").textContent = WALKS.length;

  /* --- Fit to data on load ------------------------------------- */

  if (PLACES.length) {
    var bounds = L.latLngBounds(PLACES.map(function (p) { return p.coords; }));
    WALKS.forEach(function (w) { w.path.forEach(function (c) { bounds.extend(c); }); });
    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 14 });
  }
})();
