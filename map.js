/* ===============================================================
   map.js — builds the map, buttons, list and detail panel from
   config.js and places.js. No need to edit this to add data.
   =============================================================== */

(function(){
  "use strict";

  var MAP_CENTRE = window.MAP_CENTRE,
      MAP_ZOOM   = window.MAP_ZOOM,
      THEMES     = window.THEMES || [],
      PLACES     = window.PLACES || [],
      LINES      = window.LINES  || [];

  /* ?edit in the address turns on draggable pins */
  var EDIT = /(?:^|[?&])edit(?:[=&]|$)/.test(window.location.search);

  var NUDGE_MAX_ZOOM = 15;   /* at or below this zoom, pins that sit
                                almost on top of each other are fanned
                                out a few pixels so both stay clickable */
  var NUDGE_METRES   = 90;
  var NUDGE_PX       = 11;

  var themeById = {};
  THEMES.forEach(function(t){ themeById[t.id] = t; });

  var active = {};
  function resetActive(){
    THEMES.forEach(function(t){ active[t.id] = t.defaultOn !== false; });
  }
  resetActive();

  var openIdx = null;

  /* ---------- small helpers ---------- */

  function esc(s){
    return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];
    });
  }

  function evLabel(e){
    return e === "field" ? "Field" : e === "both" ? "Desk + field" : "Desk";
  }

  /* white or dark text, whichever reads better on a given colour */
  function textOn(hex){
    function lin(c){ return c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
    var r = lin(parseInt(hex.slice(1,3),16)/255),
        g = lin(parseInt(hex.slice(3,5),16)/255),
        b = lin(parseInt(hex.slice(5,7),16)/255);
    var L = 0.2126*r + 0.7152*g + 0.0722*b;
    return (1.05/(L+0.05)) >= 4.5 ? "#FFFFFF" : "#1B2A2E";
  }

  function slugify(name, i){
    var t = String(name || "");
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

  /* every layer a place belongs to, main first, unknown ids dropped
     with one warning each */
  var warned = {};
  function themesOf(p){
    var out = [], seen = {};
    [p.mainTheme].concat(p.alsoThemes || []).forEach(function(id){
      if(!id || seen[id]) return;
      if(!themeById[id]){
        var key = p.name + "|" + id;
        if(!warned[key]){
          warned[key] = true;
          console.warn('Unknown layer "' + id + '" on "' + p.name + '" — check THEMES in config.js');
        }
        return;
      }
      seen[id] = true; out.push(id);
    });
    return out;
  }

  /* colour and list group: main layer if it's on, else the first
     layer that is on — so pin and heading always agree */
  function shownTheme(p){
    var ids = themesOf(p);
    for(var i = 0; i < ids.length; i++){ if(active[ids[i]]) return ids[i]; }
    return ids[0] || null;
  }

  function visible(p){
    var ids = themesOf(p);
    for(var i = 0; i < ids.length; i++){ if(active[ids[i]]) return true; }
    return false;
  }

  function isApprox(p){ return p.coordStatus !== "verified"; }
  function isStop(p){ return typeof p.stop === "number"; }

  function metres(a, b){
    var R = 6371000, toR = Math.PI/180;
    var dLat = (b[0]-a[0])*toR, dLon = (b[1]-a[1])*toR;
    var h = Math.sin(dLat/2)*Math.sin(dLat/2) +
            Math.cos(a[0]*toR)*Math.cos(b[0]*toR)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return 2*R*Math.asin(Math.sqrt(h));
  }

  /* ---------- which pins sit almost on top of each other ---------- */

  var clusterPos = {};   /* index -> {k, n}: k-th of n in its group */
  (function(){
    var parent = PLACES.map(function(_, i){ return i; });
    function find(i){ while(parent[i] !== i){ parent[i] = parent[parent[i]]; i = parent[i]; } return i; }
    for(var i = 0; i < PLACES.length; i++){
      for(var j = i+1; j < PLACES.length; j++){
        if(metres(PLACES[i].coords, PLACES[j].coords) < NUDGE_METRES){
          parent[find(i)] = find(j);
        }
      }
    }
    var groups = {};
    PLACES.forEach(function(_, i){ var r = find(i); (groups[r] = groups[r] || []).push(i); });
    Object.keys(groups).forEach(function(r){
      var g = groups[r];
      if(g.length < 2) return;
      g.forEach(function(idx, k){ clusterPos[idx] = { k:k, n:g.length }; });
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
    var t = themeById[p.mainTheme];
    return (isStop(p) ? "Stop " + p.stop + ", " : "") + p.name +
           " — " + (t ? t.label : "unclassified") +
           (isApprox(p) ? ", location approximate" : "");
  }

  function makeIcon(i){
    var p = PLACES[i];
    var t = themeById[shownTheme(p)] || { colour:"#55625F" };
    var size = isStop(p) ? 28 : 20;
    var dx = 0, dy = 0, c = clusterPos[i];
    if(c && nudging()){
      var a = 2*Math.PI*c.k/c.n - Math.PI/2;
      dx = Math.round(NUDGE_PX*Math.cos(a));
      dy = Math.round(NUDGE_PX*Math.sin(a));
    }
    var cls = "pin" + (isApprox(p) ? " approx" : "") + (isStop(p) ? " stop" : "");
    var html = '<span class="' + cls + '" style="--c:' + t.colour + ';--t:' + textOn(t.colour) +
               '" role="img" aria-label="' + esc(markerLabel(p)) + '">' +
               (isStop(p) ? p.stop : "") + "</span>";
    return L.divIcon({
      className:"", html:html,
      iconSize:[size, size], iconAnchor:[size/2 - dx, size/2 - dy]
    });
  }

  var markers = PLACES.map(function(p, i){
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
    var el = markers[i].getElement();
    return el ? el.querySelector(".pin") : null;
  }

  function refreshMarkers(){
    PLACES.forEach(function(p, i){
      var on = visible(p);
      markers[i].setIcon(makeIcon(i));
      markers[i].setOpacity(on ? 1 : 0);
      var el = markers[i].getElement();
      if(el) el.style.pointerEvents = on ? "" : "none";
    });
  }

  /* re-fan the pins only when crossing the nudge threshold */
  var lastNudge = nudging();
  map.on("zoomend", function(){
    var now = nudging();
    if(now !== lastNudge){ lastNudge = now; refreshMarkers(); }
  });

  /* ---------- lines ---------- */

  var lines = LINES.map(function(ln){
    var t = themeById[ln.theme] || { colour:"#55625F" };
    var layer = L.polyline(ln.path, {
      color:t.colour, weight:7, opacity:.5, lineCap:"round",
      dashArray: ln.coordStatus === "verified" ? null : "1 11"
    });
    layer.on("click", function(){
      for(var i = 0; i < PLACES.length; i++){
        if(PLACES[i].name === ln.opens){ if(!EDIT) openDetail(i, true); return; }
      }
    });
    return { def:ln, layer:layer };
  });

  function refreshLines(){
    lines.forEach(function(l){
      var on = !!active[l.def.theme];
      if(on && !map.hasLayer(l.layer)) l.layer.addTo(map);
      if(!on && map.hasLayer(l.layer)) map.removeLayer(l.layer);
    });
  }

  /* ---------- layer buttons ---------- */

  var bar = document.getElementById("pills");

  THEMES.forEach(function(t){
    var n = PLACES.filter(function(p){ return themesOf(p).indexOf(t.id) !== -1; }).length;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pill";
    b.dataset.theme = t.id;
    b.style.setProperty("--dot", t.colour);
    b.style.setProperty("--t", textOn(t.colour));
    b.innerHTML = esc(t.label) + '<span class="n">' + n + "</span>";
    b.addEventListener("click", function(){ active[t.id] = !active[t.id]; apply(); });
    bar.appendChild(b);
  });

  var resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", function(){ resetActive(); apply(); });

  function atDefaults(){
    return THEMES.every(function(t){ return active[t.id] === (t.defaultOn !== false); });
  }

  /* ---------- list ---------- */

  var listEl = document.getElementById("list");

  function chipsHTML(p){
    var h = '<div class="chips">';
    themesOf(p).forEach(function(id){
      var t = themeById[id];
      h += '<span class="chip theme" style="--dot:' + t.colour + '">' + esc(t.label) + "</span>";
    });
    h += '<span class="chip">' + evLabel(p.evidence) + "</span>";
    if(isApprox(p)) h += '<span class="chip approx">Location approximate</span>';
    return h + "</div>";
  }

  function allOn(){ THEMES.forEach(function(t){ active[t.id] = true; }); apply(); }

  function buildList(){
    listEl.innerHTML = "";
    var shown = 0;

    THEMES.forEach(function(t){
      if(!active[t.id]) return;
      var idxs = [];
      PLACES.forEach(function(p, i){
        if(visible(p) && shownTheme(p) === t.id) idxs.push(i);
      });
      idxs.sort(function(a, b){
        var sa = isStop(PLACES[a]) ? PLACES[a].stop : 1e9,
            sb = isStop(PLACES[b]) ? PLACES[b].stop : 1e9;
        if(sa !== sb) return sa - sb;
        return PLACES[a].name.localeCompare(PLACES[b].name);
      });

      var g = document.createElement("div");
      g.className = "layer";
      g.dataset.theme = t.id;
      var h = document.createElement("h3");
      h.style.setProperty("--dot", t.colour);
      h.innerHTML = esc(t.label) + '<span class="n">' + idxs.length + "</span>";
      g.appendChild(h);

      if(!idxs.length){
        var none = document.createElement("p");
        none.className = "empty";
        none.textContent = "Nothing mapped here yet.";
        g.appendChild(none);
      }

      idxs.forEach(function(i){
        var p = PLACES[i];
        var e = document.createElement("div");
        e.className = "entry";
        e.dataset.idx = i;
        e.setAttribute("role", "button");
        e.setAttribute("tabindex", "0");
        e.innerHTML =
          "<h4>" + (isStop(p) ? '<span class="num" style="--c:' + t.colour + ';--t:' +
                     textOn(t.colour) + '">' + p.stop + "</span>" : "") +
          '<span class="nm">' + esc(p.name) + "</span>" +
          (p.el ? '<span class="el">' + esc(p.el) + "</span>" : "") + "</h4>" +
          '<p class="sum">' + esc(p.summary || "") + "</p>" + chipsHTML(p);
        e.addEventListener("click", function(){ openDetail(i, true); });
        e.addEventListener("keydown", function(ev){
          if(ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); openDetail(i, true); }
        });
        e.addEventListener("mouseenter", function(){ lightPin(i, true);  });
        e.addEventListener("mouseleave", function(){ lightPin(i, false); });
        g.appendChild(e);
        shown++;
      });

      listEl.appendChild(g);
    });

    if(shown === 0){
      var anyOn = THEMES.some(function(t){ return active[t.id]; });
      var anyValid = PLACES.some(function(p){ return themesOf(p).length > 0; });
      var text, btn = null;
      if(!PLACES.length){
        text = "No places yet. Add some in <code>places.js</code>.";
      } else if(!anyValid){
        text = "Nothing can be shown: every place has a layer name that isn't in " +
               "<code>config.js</code>. Check the browser console (F12).";
      } else if(!anyOn){
        text = "No layers switched on."; btn = "Switch all layers on";
      } else {
        text = "No places match these layers."; btn = "Show all layers";
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
      shown + (shown === 1 ? " place" : " places");
  }

  function lightPin(i, on){ var el = pinEl(i); if(el) el.classList.toggle("lit", on); }
  function lightEntry(i, on){
    var e = listEl.querySelector('.entry[data-idx="' + i + '"]');
    if(e) e.classList.toggle("lit", on);
  }

  /* ---------- detail panel + shareable links ---------- */

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
    return m ? decodeURIComponent(m[1]) : null;
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

  function flyZoom(i){ return clusterPos[i] ? 17 : 16; }

  function factLine(p){
    if(p.factStatus === "observed")  return "Our own field observation";
    if(p.factStatus === "verified")  return "Facts verified";
    return "Facts not yet verified";
  }

  function openDetail(i, fly, fromHash){
    var p = PLACES[i];

    /* in edit mode the panel would cover the pins, so just fly there */
    if(EDIT){ map.flyTo(p.coords, 18, { duration:.6 }); lightPin(i, true); return; }

    openIdx = i;
    var body = "<h2>" + (isStop(p) ? "Stop " + p.stop + " · " : "") + esc(p.name) + "</h2>";
    if(p.el) body += '<p class="el">' + esc(p.el) + "</p>";
    body += chipsHTML(p);
    var text = p.note || p.summary;
    if(text) body += '<p class="body">' + esc(text) + "</p>";

    if(p.photos && p.photos.length){
      body += '<div class="shots">';
      p.photos.forEach(function(f){
        body += '<img src="' + esc(f) + '" alt="' + esc(p.name) + '" loading="lazy">';
      });
      body += "</div>";
    }

    var prov = [];
    prov.push(isApprox(p) ? "Location approximate — not yet checked on the ground"
                          : "Location checked");
    prov.push(factLine(p));
    if(p.source || p.url){
      prov.push(p.url
        ? 'Source: <a href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
          esc(p.source || p.url) + "</a>"
        : "Source: " + esc(p.source));
    }
    body += '<ul class="prov">' + prov.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>";

    detailIn.innerHTML = body;
    detail.classList.add("open");
    detail.setAttribute("aria-hidden", "false");
    detail.scrollTop = 0;

    if(fly) map.flyTo(p.coords, Math.max(map.getZoom(), flyZoom(i)), { duration:.6 });
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
      return "// " + PLACES[k].name + "\ncoords:[" + edits[k][0] + ", " + edits[k][1] +
             '], coordStatus:"verified",';
    }).join("\n\n");
  }

  if(EDIT){
    document.body.classList.add("editing");
    var box = document.createElement("div");
    box.className = "editbar";
    box.innerHTML =
      "<p><b>Edit mode.</b> Drag a pin onto the right building. Its new coordinates " +
      "appear here — paste them into <code>places.js</code>.</p>" +
      '<textarea id="edit-out" readonly rows="4" ' +
      'placeholder="Nothing moved yet."></textarea>' +
      '<button type="button" id="edit-copy">Copy</button>';
    document.querySelector(".mapcol").appendChild(box);
    editOut = document.getElementById("edit-out");
    document.getElementById("edit-copy").addEventListener("click", function(){
      editOut.focus(); editOut.select();
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(editOut.value).catch(function(){
          try { document.execCommand("copy"); } catch(e){}
        });
      } else {
        try { document.execCommand("copy"); } catch(e){}
      }
    });
  }

  /* ---------- one function decides what shows ---------- */

  function apply(){
    refreshMarkers();
    refreshLines();
    if(openIdx !== null && !visible(PLACES[openIdx])) closeDetail();
    bar.querySelectorAll(".pill").forEach(function(b){
      b.setAttribute("aria-pressed", String(!!active[b.dataset.theme]));
    });
    resetBtn.hidden = atDefaults();
    buildList();
  }

  /* ---------- go ---------- */

  apply();

  /* starting view: only layers with setsView !== false count */
  var viewPts = [];
  PLACES.forEach(function(p){
    var t = themeById[p.mainTheme];
    if(t && t.setsView !== false) viewPts.push(p.coords);
  });
  LINES.forEach(function(ln){
    var t = themeById[ln.theme];
    if(t && t.setsView !== false) ln.path.forEach(function(c){ viewPts.push(c); });
  });
  if(viewPts.length) map.fitBounds(L.latLngBounds(viewPts), { padding:[50,50], maxZoom:15 });

  applyHash();
})();
