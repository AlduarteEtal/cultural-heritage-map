/* ===============================================================
   map.js — builds the split view from config.js and places.js.
   You should not need to edit this file to add data.
   =============================================================== */

(function(){
  "use strict";

  var MAP_CENTRE = window.MAP_CENTRE,
      MAP_ZOOM   = window.MAP_ZOOM,
      ERAS       = window.ERAS,
      THEMES     = window.THEMES,
      PLACES     = window.PLACES || [],
      WALKS      = window.WALKS  || [];

  var themeById = {}; THEMES.forEach(function(t){ themeById[t.id] = t; });
  var eraIndex  = {}; ERAS.forEach(function(e,i){ eraIndex[e.id] = i; });

  var state = { era:0, isolated:null, openIdx:null };

  function esc(s){
    return String(s==null?"":s).replace(/[&<>"]/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];
    });
  }
  function evLabel(e){
    return e==="field" ? "Field" : e==="desk" ? "Desk" : "Desk + field";
  }

  /* ---------- map ---------- */

  var map = L.map("map",{
    center:MAP_CENTRE, zoom:MAP_ZOOM, scrollWheelZoom:false, zoomControl:true
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    className:"basemap", maxZoom:19
  }).addTo(map);

  map.on("click",  function(){ map.scrollWheelZoom.enable();  });
  map.on("mouseout",function(){ map.scrollWheelZoom.disable(); });

  /* ---------- markers ---------- */

  var markers = PLACES.map(function(p,i){
    var t = themeById[p.theme] || { colour:"#55625F" };
    if(!themeById[p.theme]){
      console.warn('Unknown theme "'+p.theme+'" on "'+p.name+'" — check THEMES');
    }
    var m = L.marker(p.coords,{
      title:p.name, keyboard:true, riseOnHover:true,
      icon:L.divIcon({
        className:"",
        html:'<span class="pin'+(p.evidence==="desk"?" desk":"")+
             '" style="background:'+t.colour+'"></span>',
        iconSize:[20,20], iconAnchor:[10,10]
      })
    }).addTo(map);

    m.on("mouseover",function(){ lightEntry(i,true);  });
    m.on("mouseout", function(){ lightEntry(i,false); });
    m.on("click",    function(){ openEntry(i,false);  });
    return m;
  });

  function pinEl(i){
    var el = markers[i].getElement();
    return el ? el.querySelector(".pin") : null;
  }

  /* ---------- walks ---------- */

  var walkLayer = L.layerGroup().addTo(map);
  var walkLines = WALKS.map(function(w){
    var line = L.polyline(w.path,{
      color:"#1B2A2E", weight:2.5, opacity:.75, dashArray:"1 7", lineCap:"round"
    }).addTo(walkLayer);
    return line;
  });

  /* ---------- list, which is also the legend ---------- */

  var listEl = document.getElementById("list");

  function buildList(){
    listEl.innerHTML = "";

    THEMES.forEach(function(t){
      var idxs = [];
      PLACES.forEach(function(p,i){ if(p.theme===t.id) idxs.push(i); });

      var g = document.createElement("div");
      g.className = "layer";
      g.dataset.theme = t.id;

      var h = document.createElement("h3");
      var b = document.createElement("button");
      b.type = "button";
      b.style.setProperty("--dot", t.colour);
      b.innerHTML = esc(t.label) + '<span class="n">' + idxs.length + "</span>";
      b.setAttribute("aria-pressed","false");
      b.addEventListener("click", function(){ toggleIsolate(t.id); });
      h.appendChild(b); g.appendChild(h);

      idxs.forEach(function(i){
        var p = PLACES[i];
        var e = document.createElement("div");
        e.className = "entry";
        e.dataset.idx = i;
        e.setAttribute("role","button");
        e.setAttribute("tabindex","0");

        var tags = '<span class="tag">'+evLabel(p.evidence)+"</span>";
        (p.eras||[]).forEach(function(id){
          if(eraIndex[id]) tags += '<span class="tag">'+esc(ERAS[eraIndex[id]].tick)+"</span>";
        });
        if(p.visited) tags += '<span class="tag">'+esc(p.visited)+"</span>";

        var src = "";
        if(p.source || p.url){
          src = '<p class="src">' + (p.url
            ? 'Source: <a href="'+esc(p.url)+'" target="_blank" rel="noopener">'+esc(p.source||p.url)+"</a>"
            : "Source: "+esc(p.source)) + "</p>";
        }

        e.innerHTML =
          "<h4>"+esc(p.name)+(p.el?'<span class="el">'+esc(p.el)+"</span>":"")+"</h4>"+
          '<div class="tags">'+tags+"</div>"+
          '<p class="note">'+esc(p.note||"")+"</p>"+ src;

        e.addEventListener("click", function(){ openEntry(i,true); });
        e.addEventListener("keydown", function(ev){
          if(ev.key==="Enter"||ev.key===" "){ ev.preventDefault(); openEntry(i,true); }
        });
        e.addEventListener("mouseenter", function(){ lightPin(i,true);  });
        e.addEventListener("mouseleave", function(){ lightPin(i,false); });

        g.appendChild(e);
      });

      if(!idxs.length){
        var none = document.createElement("div");
        none.className = "empty";
        none.textContent = "Nothing mapped here yet.";
        g.appendChild(none);
      }

      listEl.appendChild(g);
    });
  }

  /* ---------- walk list ---------- */

  var walkListEl = document.getElementById("walklist");
  WALKS.forEach(function(w,i){
    var r = document.createElement("div");
    r.className = "r";
    r.setAttribute("role","button");
    r.setAttribute("tabindex","0");
    r.textContent = w.name;
    function go(){ map.fitBounds(walkLines[i].getBounds(),{padding:[50,50]}); }
    r.addEventListener("click", go);
    r.addEventListener("keydown", function(ev){
      if(ev.key==="Enter"||ev.key===" "){ ev.preventDefault(); go(); }
    });
    walkListEl.appendChild(r);
  });

  document.getElementById("show-walks").addEventListener("change", function(){
    if(this.checked) walkLayer.addTo(map); else map.removeLayer(walkLayer);
  });

  /* ---------- linking list and map ---------- */

  function lightPin(i,on){
    var el = pinEl(i);
    if(el) el.classList.toggle("lit", on);
  }
  function lightEntry(i,on){
    var e = listEl.querySelector('.entry[data-idx="'+i+'"]');
    if(e) e.classList.toggle("lit", on);
  }
  function openEntry(i,fly){
    var was = state.openIdx === i;
    state.openIdx = was ? null : i;

    listEl.querySelectorAll(".entry").forEach(function(e){
      e.classList.toggle("open", Number(e.dataset.idx) === state.openIdx);
    });

    if(!was){
      var e = listEl.querySelector('.entry[data-idx="'+i+'"]');
      if(e && !fly && e.scrollIntoView) e.scrollIntoView({block:"nearest", behavior:"smooth"});
      if(fly) map.flyTo(PLACES[i].coords, Math.max(map.getZoom(), 15), {duration:.6});
    }
  }

  /* ---------- isolate a layer ---------- */

  var resetBtn = document.getElementById("reset");

  function toggleIsolate(id){
    state.isolated = state.isolated === id ? null : id;
    resetBtn.hidden = !state.isolated;
    apply();
  }
  resetBtn.addEventListener("click", function(){
    state.isolated = null; resetBtn.hidden = true; apply();
  });

  /* ---------- era slider ---------- */

  var slider = document.getElementById("era");
  slider.max = ERAS.length - 1;

  var ticksEl = document.getElementById("ticks");
  ERAS.forEach(function(e){
    var s = document.createElement("b");
    s.textContent = e.tick;
    ticksEl.appendChild(s);
  });

  slider.addEventListener("input", function(){
    state.era = Number(this.value);
    apply();
  });

  /* ---------- the one function that decides what shows ---------- */

  function inEra(p){
    if(state.era === 0) return true;                  // "All periods"
    var id = ERAS[state.era].id;
    return (p.eras || []).indexOf(id) !== -1;
  }
  function inLayer(p){
    return !state.isolated || p.theme === state.isolated;
  }

  function apply(){
    var era = ERAS[state.era];
    document.getElementById("era-name").textContent  = era.name;
    document.getElementById("era-range").textContent = era.range;

    PLACES.forEach(function(p,i){
      var show = inEra(p) && inLayer(p);
      markers[i].setOpacity(show ? 1 : 0.16);
      var el = markers[i].getElement();
      if(el) el.style.pointerEvents = show ? "" : "none";

      var e = listEl.querySelector('.entry[data-idx="'+i+'"]');
      if(e) e.classList.toggle("dim", !show);
    });

    listEl.querySelectorAll(".layer").forEach(function(g){
      var t = g.dataset.theme;
      g.classList.toggle("isolated", state.isolated === t);
      g.classList.toggle("muted", !!state.isolated && state.isolated !== t);
      var btn = g.querySelector("h3 button");
      if(btn) btn.setAttribute("aria-pressed", String(state.isolated === t));
    });
  }

  /* ---------- go ---------- */

  buildList();
  apply();

  if(PLACES.length){
    var b = L.latLngBounds(PLACES.map(function(p){ return p.coords; }));
    WALKS.forEach(function(w){ w.path.forEach(function(c){ b.extend(c); }); });
    map.fitBounds(b, { padding:[70,70], maxZoom:14 });
  }
})();
