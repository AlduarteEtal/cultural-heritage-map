/* ===============================================================
   map.js — builds the map, the two rows of buttons, the list and
   the detail panel from config.js and places.js.
   No need to edit this to add data.
   =============================================================== */

(function(){
  "use strict";

  var MAP_CENTRE = window.MAP_CENTRE,
      MAP_ZOOM   = window.MAP_ZOOM,
      THEMES     = window.THEMES || [],
      LEGACY     = window.LEGACY || [],
      PLACES     = window.PLACES || [],
      LINES      = window.LINES  || [];

  /* ?edit in the address makes pins draggable */
  var EDIT = /(?:^|[?&])edit(?:[=&]|$)/.test(window.location.search);

  /* Pins closer than NUDGE_METRES fan out around their true spot
     when zoomed out, so all stay clickable. 150 m is roughly where
     20px pins start to overlap at the starting zoom. The fan grows
     with the number of pins, so the five Pier 1 sites still separate. */
  var NUDGE_MAX_ZOOM = 15, NUDGE_METRES = 150, NUDGE_PX = 11;

  var themeById = {};  THEMES.forEach(function(t){ themeById[t.id] = t; });
  var legacyById = {}; LEGACY.forEach(function(l){ legacyById[l.id] = l; });

  var activeLayer = {}, activeLegacy = {};
  function resetFilters(){
    THEMES.forEach(function(t){ activeLayer[t.id] = t.defaultOn !== false; });
    LEGACY.forEach(function(l){ activeLegacy[l.id] = true; });
  }
  resetFilters();

  var openIdx = null;

  /* ---------- helpers ---------- */

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];
    });
  }

  /* white or dark text, whichever reads better on a colour */
  function textOn(hex){
    function lin(c){ return c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
    var L = 0.2126*lin(parseInt(hex.slice(1,3),16)/255) +
            0.7152*lin(parseInt(hex.slice(3,5),16)/255) +
            0.0722*lin(parseInt(hex.slice(5,7),16)/255);
    return (1.05/(L+0.05)) >= 4.5 ? "#FFFFFF" : "#1B2A2E";
  }

  function slugify(s, i){
    var t = String(s || "");
    if(t.normalize) t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    t = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
         .slice(0, 50).replace(/-+$/, "");
    return t || ("place-" + (i + 1));
  }

  var slugToIdx = {};
  PLACES.forEach(function(p, i){
    var base = slugify(p.id || p.name, i), slug = base, n = 2;
    while(slugToIdx[slug] !== undefined){ slug = base + "-" + n; n++; }
    p._slug = slug;
    slugToIdx[slug] = i;
  });

  var warned = {};
  function warnOnce(key, msg){ if(!warned[key]){ warned[key] = true; console.warn(msg); } }

  /* layers a place belongs to: its `layer`, plus any `alsoLayers` */
  function layersOf(p){
    var out = [], seen = {};
    [p.layer].concat(p.alsoLayers || []).forEach(function(id){
      if(!id || seen[id]) return;
      if(!themeById[id]){
        warnOnce(p.name + "|" + id, 'Unknown layer "' + id + '" on "' + p.name + '" — check THEMES in config.js');
        return;
      }
      seen[id] = true; out.push(id);
    });
    return out;
  }

  function legacyOf(p){
    return (p.legacy || []).filter(function(id){
      if(legacyById[id]) return true;
      warnOnce(p.name + "|L|" + id, 'Unknown legacy type "' + id + '" on "' + p.name + '" — check LEGACY in config.js');
      return false;
    });
  }

  /* colour and list group: first layer that is switched on */
  function shownLayer(p){
    var ids = layersOf(p);
    for(var i = 0; i < ids.length; i++){ if(activeLayer[ids[i]]) return ids[i]; }
    return ids[0] || null;
  }

  function visible(p){
    var inLayer = layersOf(p).some(function(id){ return activeLayer[id]; });
    if(!inLayer) return false;
    var tags = legacyOf(p);
    if(!tags.length) return true;          /* untagged places don't vanish */
    return tags.some(function(id){ return activeLegacy[id]; });
  }

  function placed(p){
    return Array.isArray(p.coords) && p.coords.length === 2 &&
           isFinite(p.coords[0]) && isFinite(p.coords[1]);
  }

  function metres(a, b){
    var R = 6371000, r = Math.PI/180;
    var dLat = (b[0]-a[0])*r, dLon = (b[1]-a[1])*r;
    var h = Math.sin(dLat/2)*Math.sin(dLat/2) +
            Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return 2*R*Math.asin(Math.sqrt(h));
  }

  /* ---------- pins that sit almost on top of each other ---------- */

  var clusterPos = {};
  (function(){
    var idx = [];
    PLACES.forEach(function(p, i){ if(placed(p)) idx.push(i); });
    var parent = {};
    idx.forEach(function(i){ parent[i] = i; });
    function find(i){ while(parent[i] !== i){ parent[i] = parent[parent[i]]; i = parent[i]; } return i; }
    for(var a = 0; a < idx.length; a++){
      for(var b = a+1; b < idx.length; b++){
        if(metres(PLACES[idx[a]].coords, PLACES[idx[b]].coords) < NUDGE_METRES){
          parent[find(idx[a])] = find(idx[b]);
        }
      }
    }
    var groups = {};
    idx.forEach(function(i){ var r = find(i); (groups[r] = groups[r] || []).push(i); });
    Object.keys(groups).forEach(function(r){
      var g = groups[r];
      if(g.length > 1) g.forEach(function(i, k){ clusterPos[i] = { k:k, n:g.length }; });
    });
  })();

  /* ---------- map ---------- */

  var map = L.map("map", {
    center:MAP_CENTRE, zoom:MAP_ZOOM, scrollWheelZoom:false, zoomControl:true
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    className:"basemap", maxZoom:19
  }).addTo(map);

  map.on("click",    function(){ map.scrollWheelZoom.enable();  });
  map.on("mouseout", function(){ map.scrollWheelZoom.disable(); });

  function nudging(){ return !EDIT && map.getZoom() <= NUDGE_MAX_ZOOM; }

  function markerLabel(p){
    var t = themeById[p.layer];
    return (p.id ? p.id + ", " : "") + p.name + " — " + (t ? t.label : "unclassified");
  }

  function makeIcon(i){
    var p = PLACES[i];
    var t = themeById[shownLayer(p)] || { colour:"#55625F" };
    var dx = 0, dy = 0, c = clusterPos[i];
    if(c && nudging()){
      var a = 2*Math.PI*c.k/c.n - Math.PI/2;
      var r = Math.max(NUDGE_PX, 25*c.n/(2*Math.PI));   /* ~23px between neighbours */
      dx = Math.round(r*Math.cos(a));
      dy = Math.round(r*Math.sin(a));
    }
    return L.divIcon({
      className:"",
      html:'<span class="pin" style="--c:' + t.colour + '" role="img" aria-label="' +
           esc(markerLabel(p)) + '"></span>',
      iconSize:[20, 20], iconAnchor:[10 - dx, 10 - dy]
    });
  }

  /* markers[i] is null for places that aren't placed yet */
  var markers = PLACES.map(function(p, i){
    if(!placed(p)) return null;
    var m = L.marker(p.coords, {
      title:markerLabel(p), alt:markerLabel(p), keyboard:true, riseOnHover:true,
      draggable:EDIT, icon:makeIcon(i)
    }).addTo(map);
    m.on("mouseover", function(){ lightEntry(i, true);  });
    m.on("mouseout",  function(){ lightEntry(i, false); });
    m.on("click",     function(){ if(!EDIT) openDetail(i); });
    if(EDIT) m.on("dragend", function(){ recordDrag(i); });
    return m;
  });

  function pinEl(i){
    var m = markers[i]; if(!m) return null;
    var el = m.getElement();
    return el ? el.querySelector(".pin") : null;
  }

  function refreshMarkers(){
    PLACES.forEach(function(p, i){
      var m = markers[i]; if(!m) return;
      var on = visible(p);
      m.setIcon(makeIcon(i));
      m.setOpacity(on ? 1 : 0);
      var el = m.getElement();
      if(el) el.style.pointerEvents = on ? "" : "none";
    });
  }

  var lastNudge = nudging();
  map.on("zoomend", function(){
    var now = nudging();
    if(now !== lastNudge){ lastNudge = now; refreshMarkers(); }
  });

  /* ---------- lines (none at the moment) ---------- */

  var lines = LINES.map(function(ln){
    var t = themeById[ln.layer] || { colour:"#55625F" };
    return { def:ln, layer:L.polyline(ln.path, { color:t.colour, weight:6, opacity:.55 }) };
  });
  function refreshLines(){
    lines.forEach(function(l){
      var on = !!activeLayer[l.def.layer];
      if(on && !map.hasLayer(l.layer)) l.layer.addTo(map);
      if(!on && map.hasLayer(l.layer)) map.removeLayer(l.layer);
    });
  }

  /* ---------- the two rows of buttons ---------- */

  var layerBar  = document.getElementById("pills");
  var legacyBar = document.getElementById("legacy-pills");

  THEMES.forEach(function(t){
    var n = PLACES.filter(function(p){ return layersOf(p).indexOf(t.id) !== -1; }).length;
    var b = document.createElement("button");
    b.type = "button"; b.className = "pill"; b.dataset.theme = t.id;
    b.style.setProperty("--dot", t.colour);
    b.style.setProperty("--t", textOn(t.colour));
    b.innerHTML = esc(t.label) + '<span class="n">' + n + "</span>";
    b.addEventListener("click", function(){ activeLayer[t.id] = !activeLayer[t.id]; apply(); });
    layerBar.appendChild(b);
  });

  LEGACY.forEach(function(l){
    var n = PLACES.filter(function(p){ return legacyOf(p).indexOf(l.id) !== -1; }).length;
    var b = document.createElement("button");
    b.type = "button"; b.className = "pill legacy"; b.dataset.legacy = l.id;
    b.innerHTML = esc(l.label) + '<span class="n">' + n + "</span>";
    b.addEventListener("click", function(){ activeLegacy[l.id] = !activeLegacy[l.id]; apply(); });
    legacyBar.appendChild(b);
  });

  var resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", function(){ resetFilters(); apply(); });

  function atDefaults(){
    return THEMES.every(function(t){ return activeLayer[t.id] === (t.defaultOn !== false); }) &&
           LEGACY.every(function(l){ return activeLegacy[l.id]; });
  }

  /* ---------- list ---------- */

  var listEl = document.getElementById("list");

  function chipsHTML(p){
    var h = '<div class="chips">';
    layersOf(p).slice(1).forEach(function(id){        /* extra layers only */
      var t = themeById[id];
      h += '<span class="chip theme" style="--dot:' + t.colour + '">' + esc(t.label) + "</span>";
    });
    legacyOf(p).forEach(function(id){
      h += '<span class="chip legacy">' + esc(legacyById[id].label) + "</span>";
    });
    if(p.confidence === "lead")            h += '<span class="chip flag">Lead to test</span>';
    if(p.confidence === "partly verified") h += '<span class="chip flag">Partly verified</span>';
    if(!placed(p))                         h += '<span class="chip flag">Not yet placed</span>';
    return h + "</div>";
  }

  function allOn(){
    THEMES.forEach(function(t){ activeLayer[t.id] = true; });
    LEGACY.forEach(function(l){ activeLegacy[l.id] = true; });
    apply();
  }

  function buildList(){
    listEl.innerHTML = "";
    var shown = 0, unplaced = 0;

    THEMES.forEach(function(t){
      if(!activeLayer[t.id]) return;
      var idxs = [];
      PLACES.forEach(function(p, i){
        if(visible(p) && shownLayer(p) === t.id) idxs.push(i);
      });
      /* placed first, then by ID */
      idxs.sort(function(a, b){
        var pa = placed(PLACES[a]) ? 0 : 1, pb = placed(PLACES[b]) ? 0 : 1;
        if(pa !== pb) return pa - pb;
        return String(PLACES[a].id || PLACES[a].name).localeCompare(String(PLACES[b].id || PLACES[b].name));
      });

      var g = document.createElement("div");
      g.className = "layer"; g.dataset.theme = t.id;
      var h = document.createElement("h3");
      h.style.setProperty("--dot", t.colour);
      h.innerHTML = esc(t.label) + '<span class="n">' + idxs.length + "</span>";
      g.appendChild(h);

      if(!idxs.length){
        var none = document.createElement("p");
        none.className = "empty";
        none.textContent = "Nothing here with these filters.";
        g.appendChild(none);
      }

      idxs.forEach(function(i){
        var p = PLACES[i];
        var e = document.createElement("div");
        e.className = "entry" + (placed(p) ? "" : " unplaced");
        e.dataset.idx = i;
        e.setAttribute("role", "button");
        e.setAttribute("tabindex", "0");
        e.innerHTML =
          "<h4>" + (p.id ? '<span class="id">' + esc(p.id) + "</span>" : "") +
          '<span class="nm">' + esc(p.name) + "</span></h4>" +
          '<p class="sum">' + esc(p.summary || "") + "</p>" + chipsHTML(p);
        e.addEventListener("click", function(){ openDetail(i, true); });
        e.addEventListener("keydown", function(ev){
          if(ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); openDetail(i, true); }
        });
        e.addEventListener("mouseenter", function(){ lightPin(i, true);  });
        e.addEventListener("mouseleave", function(){ lightPin(i, false); });
        g.appendChild(e);
        shown++;
        if(!placed(p)) unplaced++;
      });

      listEl.appendChild(g);
    });

    if(shown === 0){
      var anyLayer  = THEMES.some(function(t){ return activeLayer[t.id]; });
      var anyLegacy = LEGACY.some(function(l){ return activeLegacy[l.id]; });
      var anyValid  = PLACES.some(function(p){ return layersOf(p).length > 0; });
      var text, btn = null;
      if(!PLACES.length){
        text = "No places yet. Add some in <code>places.js</code>.";
      } else if(!anyValid){
        text = "Nothing can be shown: every place has a layer name that isn't in " +
               "<code>config.js</code>. Check the browser console (F12).";
      } else if(!anyLayer || !anyLegacy){
        text = !anyLayer ? "No layers switched on." : "No legacy types switched on.";
        btn = "Switch everything on";
      } else {
        text = "No places match these filters."; btn = "Show everything";
      }
      var msg = document.createElement("div");
      msg.className = "nothing";
      msg.innerHTML = "<p style='margin:0'>" + text + "</p>";
      if(btn){
        var bb = document.createElement("button");
        bb.type = "button"; bb.textContent = btn;
        bb.addEventListener("click", allOn);
        msg.appendChild(bb);
      }
      listEl.innerHTML = "";
      listEl.appendChild(msg);
    }

    document.getElementById("shown").textContent =
      shown + (shown === 1 ? " place" : " places") +
      (unplaced ? " · " + unplaced + " not yet placed" : "");
  }

  function lightPin(i, on){ var el = pinEl(i); if(el) el.classList.toggle("lit", on); }
  function lightEntry(i, on){
    var e = listEl.querySelector('.entry[data-idx="' + i + '"]');
    if(e) e.classList.toggle("lit", on);
  }

  /* ---------- detail panel + links ---------- */

  var detail   = document.getElementById("detail");
  var detailIn = document.getElementById("detail-body");
  var suppressHash = false;

  function writeHash(slug){
    if(suppressHash) return;
    if(slug){
      if(window.location.hash !== "#place=" + slug) window.location.hash = "place=" + slug;
    } else if(window.location.hash){
      if(window.history && window.history.replaceState){
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      } else { window.location.hash = ""; }
    }
  }

  function slugFromHash(){
    var m = /(?:^|[#&])place=([^&]+)/.exec(window.location.hash || "");
    return m ? decodeURIComponent(m[1]).toLowerCase() : null;
  }

  function applyHash(){
    var slug = slugFromHash();
    if(slug === null){ if(openIdx !== null) closeDetail(true); return; }
    var i = slugToIdx[slug];
    if(i === undefined) return;
    if(i !== openIdx) openDetail(i, true, true);
  }

  window.addEventListener("hashchange", function(){
    suppressHash = true; applyHash(); suppressHash = false;
  });

  function confidenceLine(p){
    if(p.confidence === "verified")        return "Verified";
    if(p.confidence === "partly verified") return "Partly verified";
    if(p.confidence === "lead")            return "Lead — still to test";
    return null;
  }

  function openDetail(i, fly, fromHash){
    var p = PLACES[i];

    if(EDIT){
      if(placed(p)){ map.flyTo(p.coords, 18, { duration:.6 }); lightPin(i, true); }
      return;
    }

    openIdx = i;
    var t = themeById[p.layer];
    var body = "";
    if(p.id) body += '<p class="pid">' + esc(p.id) + "</p>";
    body += "<h2>" + esc(p.name) + "</h2>";
    if(t) body += '<div class="chips"><span class="chip theme" style="--dot:' + t.colour + '">' +
                  esc(t.label) + "</span></div>";
    body += chipsHTML(p);
    if(p.summary) body += '<p class="body">' + esc(p.summary) + "</p>";
    if(p.note)    body += '<p class="body">' + esc(p.note) + "</p>";

    if(p.photos && p.photos.length){
      body += '<div class="shots">';
      p.photos.forEach(function(f){
        body += '<img src="' + esc(f) + '" alt="' + esc(p.name) + '" loading="lazy">';
      });
      body += "</div>";
    }

    var prov = [];
    if(p.source) prov.push("Source: " + esc(p.source));
    var c = confidenceLine(p); if(c) prov.push("Confidence: " + c);
    if(!placed(p)) prov.push("Not yet placed on the map");
    if(prov.length) body += '<ul class="prov">' + prov.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>";

    detailIn.innerHTML = body;
    detail.classList.add("open");
    detail.setAttribute("aria-hidden", "false");
    detail.scrollTop = 0;

    if(fly && placed(p)){
      map.flyTo(p.coords, Math.max(map.getZoom(), clusterPos[i] ? 17 : 16), { duration:.6 });
    }
    if(!fromHash) writeHash(p._slug);
  }

  function closeDetail(fromHash){
    openIdx = null;
    detail.classList.remove("open");
    detail.setAttribute("aria-hidden", "true");
    if(!fromHash) writeHash(null);
  }

  document.getElementById("detail-close").addEventListener("click", function(){ closeDetail(); });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && openIdx !== null) closeDetail();
  });

  /* ---------- edit mode ---------- */

  var editOut = null, edits = {};

  function recordDrag(i){
    var ll = markers[i].getLatLng();
    var c = [Math.round(ll.lat*1e5)/1e5, Math.round(ll.lng*1e5)/1e5];
    PLACES[i].coords = c;
    edits[i] = c;
    editOut.value = Object.keys(edits).map(function(k){
      var p = PLACES[k];
      return "// " + (p.id ? p.id + " " : "") + p.name + "\ncoords:[" + edits[k][0] + ", " + edits[k][1] + "],";
    }).join("\n\n");
  }

  if(EDIT){
    document.body.classList.add("editing");
    var box = document.createElement("div");
    box.className = "editbar";
    box.innerHTML =
      "<p><b>Edit mode.</b> Drag a pin onto the right building. Its new coordinates " +
      "appear here — paste them into <code>places.js</code>.</p>" +
      '<textarea id="edit-out" readonly rows="4" placeholder="Nothing moved yet."></textarea>' +
      '<button type="button" id="edit-copy">Copy</button>';
    document.querySelector(".mapcol").appendChild(box);
    editOut = document.getElementById("edit-out");
    document.getElementById("edit-copy").addEventListener("click", function(){
      editOut.focus(); editOut.select();
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(editOut.value).catch(function(){
          try { document.execCommand("copy"); } catch(e){}
        });
      } else { try { document.execCommand("copy"); } catch(e){} }
    });
  }

  /* ---------- one function decides what shows ---------- */

  function apply(){
    refreshMarkers();
    refreshLines();
    if(openIdx !== null && !visible(PLACES[openIdx])) closeDetail();
    layerBar.querySelectorAll(".pill").forEach(function(b){
      b.setAttribute("aria-pressed", String(!!activeLayer[b.dataset.theme]));
    });
    legacyBar.querySelectorAll(".pill").forEach(function(b){
      b.setAttribute("aria-pressed", String(!!activeLegacy[b.dataset.legacy]));
    });
    resetBtn.hidden = atDefaults();
    buildList();
  }

  /* ---------- go ---------- */

  apply();

  var viewPts = [];
  PLACES.forEach(function(p){
    var t = themeById[p.layer];
    if(placed(p) && t && t.setsView !== false) viewPts.push(p.coords);
  });
  if(viewPts.length) map.fitBounds(L.latLngBounds(viewPts), { padding:[50,50], maxZoom:15 });

  applyHash();
})();
