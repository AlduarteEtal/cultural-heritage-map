/* ===============================================================
   map.js — builds the map, the pills, the list and the detail
   panel from config.js and places.js.
   You should not need to edit this file to add data.
   =============================================================== */

(function(){
  "use strict";

  var MAP_CENTRE = window.MAP_CENTRE,
      MAP_ZOOM   = window.MAP_ZOOM,
      THEMES     = window.THEMES || [],
      PLACES     = window.PLACES || [],
      WALKS      = window.WALKS  || [];

  var themeById = {};
  THEMES.forEach(function(t){ themeById[t.id] = t; });

  /* state: every theme on, the our-area restriction off */
  var active = {};
  THEMES.forEach(function(t){ active[t.id] = true; });
  var onlyOurArea = false;
  var openIdx = null;

  /* ---------- helpers ---------- */

  /* --- slugs for shareable URLs -------------------------------
     "Rotunda and the Arch of Galerius" -> "rotunda-and-the-arch-of-galerius"
     Accents and Greek are stripped to ASCII where possible; if a
     name reduces to nothing, we fall back to "place-N". A place can
     override its slug with an explicit `id` field, which is worth
     doing once you have shared a link with someone, because renaming
     the place would otherwise change its URL. */
  function slugify(name, fallbackIndex){
    var t = String(name || "");
    if(t.normalize) t = t.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    t = t.toLowerCase()
         .replace(/[^a-z0-9]+/g,"-")
         .replace(/^-+|-+$/g,"")
         .slice(0,50)
         .replace(/-+$/,"");
    return t || ("place-" + (fallbackIndex + 1));
  }

  /* assign a unique slug to every place, honouring explicit ids */
  var slugToIdx = {};
  PLACES.forEach(function(p,i){
    var base = p.id ? slugify(p.id,i) : slugify(p.name,i);
    var slug = base, n = 2;
    while(slugToIdx[slug] !== undefined){ slug = base + "-" + n; n++; }
    p._slug = slug;
    slugToIdx[slug] = i;
  });

  function esc(s){
    return String(s==null?"":s).replace(/[&<>"]/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];
    });
  }

  function evLabel(e){
    return e==="field" ? "Field" : e==="desk" ? "Desk" : "Desk + field";
  }

  /* every theme a place belongs to, main first, de-duplicated,
     unknown ids dropped with a warning (once each, not on every redraw) */
  var warned = {};
  function themesOf(p){
    var out = [], seen = {};
    var all = [p.mainTheme].concat(p.alsoThemes || []);
    all.forEach(function(id){
      if(!id || seen[id]) return;
      if(!themeById[id]){
        var key = p.name + "|" + id;
        if(!warned[key]){
          warned[key] = true;
          console.warn('Unknown theme "'+id+'" on "'+p.name+'" — check THEMES in config.js');
        }
        return;
      }
      seen[id] = true; out.push(id);
    });
    return out;
  }

  /* the theme that decides colour and grouping: the main one if it
     is switched on, otherwise the first switched-on theme. Falls
     back to the main theme so a hidden place still has a colour. */
  function shownTheme(p){
    var ids = themesOf(p);
    for(var i=0;i<ids.length;i++){ if(active[ids[i]]) return ids[i]; }
    return ids[0] || null;
  }

  function visible(p){
    if(onlyOurArea && !p.ourArea) return false;
    var ids = themesOf(p);
    for(var i=0;i<ids.length;i++){ if(active[ids[i]]) return true; }
    return false;
  }

  /* summary falls back to the first sentence of the note */
  function summaryOf(p){
    if(p.summary) return p.summary;
    var n = (p.note || "").trim();
    if(!n) return "";
    var m = n.match(/^[\s\S]*?[.!?](?=\s|$)/);
    return m ? m[0] : (n.length > 140 ? n.slice(0,140) + "…" : n);
  }

  function chipsHTML(p){
    var h = '<div class="chips">';
    themesOf(p).forEach(function(id){
      var t = themeById[id];
      h += '<span class="chip theme" style="--dot:'+t.colour+'">'+esc(t.label)+"</span>";
    });
    h += '<span class="chip">'+evLabel(p.evidence)+"</span>";
    if(p.ourArea) h += '<span class="chip">Our area</span>';
    return h + "</div>";
  }

  /* ---------- map ---------- */

  var map = L.map("map",{
    center:MAP_CENTRE, zoom:MAP_ZOOM, scrollWheelZoom:false, zoomControl:true
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    className:"basemap", maxZoom:19
  }).addTo(map);

  map.on("click",   function(){ map.scrollWheelZoom.enable();  });
  map.on("mouseout",function(){ map.scrollWheelZoom.disable(); });

  var markers = PLACES.map(function(p,i){
    /* a descriptive label so a screen reader announces something
       useful instead of an unlabelled dot */
    var mainLabel = themeById[p.mainTheme] ? themeById[p.mainTheme].label : "unclassified";
    var label = p.name + " — " + mainLabel +
                (p.ourArea ? ", in our area" : "");

    var m = L.marker(p.coords,{
      title:label, alt:label, keyboard:true, riseOnHover:true,
      icon:L.divIcon({
        className:"",
        html:'<span class="pin'+(p.ourArea?" ours":"")+
             '" role="img" aria-label="'+esc(label)+'"></span>',
        iconSize:[20,20], iconAnchor:[10,10]
      })
    }).addTo(map);
    m.on("mouseover",function(){ lightEntry(i,true);  });
    m.on("mouseout", function(){ lightEntry(i,false); });
    m.on("click",    function(){ openDetail(i);       });
    return m;
  });

  function pinEl(i){
    var el = markers[i].getElement();
    return el ? el.querySelector(".pin") : null;
  }

  /* ---------- walks ---------- */

  var walkLayer = L.layerGroup().addTo(map);
  var walkLines = WALKS.map(function(w){
    return L.polyline(w.path,{
      color:"#1B2A2E", weight:2.5, opacity:.75, dashArray:"1 7", lineCap:"round"
    }).addTo(walkLayer);
  });

  /* ---------- pills ---------- */

  var bar = document.getElementById("pills");

  THEMES.forEach(function(t){
    var n = PLACES.filter(function(p){ return themesOf(p).indexOf(t.id) !== -1; }).length;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "pill";
    b.dataset.theme = t.id;
    b.style.setProperty("--dot", t.colour);
    b.setAttribute("aria-pressed","true");
    b.innerHTML = esc(t.label) + '<span class="n">' + n + "</span>";
    b.addEventListener("click", function(){
      active[t.id] = !active[t.id];
      apply();
    });
    bar.appendChild(b);
  });

  var areaBtn = document.getElementById("area");
  areaBtn.addEventListener("click", function(){
    onlyOurArea = !onlyOurArea;
    apply();
  });
  document.getElementById("n-area").textContent =
    PLACES.filter(function(p){ return p.ourArea; }).length;

  var resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", function(){
    THEMES.forEach(function(t){ active[t.id] = true; });
    onlyOurArea = false;
    apply();
  });

  /* ---------- list ---------- */

  var listEl = document.getElementById("list");

  function buildList(){
    listEl.innerHTML = "";
    var shown = 0;

    THEMES.forEach(function(t){
      if(!active[t.id]) return;              // switched-off layers drop out

      var idxs = [];
      PLACES.forEach(function(p,i){
        if(visible(p) && shownTheme(p) === t.id) idxs.push(i);
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
        e.setAttribute("role","button");
        e.setAttribute("tabindex","0");
        e.innerHTML =
          "<h4>"+esc(p.name)+(p.el?'<span class="el">'+esc(p.el)+"</span>":"")+"</h4>"+
          '<p class="sum">'+esc(summaryOf(p))+"</p>"+
          chipsHTML(p);
        e.addEventListener("click",      function(){ openDetail(i,true); });
        e.addEventListener("keydown",    function(ev){
          if(ev.key==="Enter"||ev.key===" "){ ev.preventDefault(); openDetail(i,true); }
        });
        e.addEventListener("mouseenter", function(){ lightPin(i,true);  });
        e.addEventListener("mouseleave", function(){ lightPin(i,false); });
        g.appendChild(e);
        shown++;
      });

      listEl.appendChild(g);
    });

    if(!listEl.children.length || shown === 0){
      var anyLayer   = THEMES.some(function(t){ return active[t.id]; });
      var filtering  = !anyLayer || onlyOurArea ||
                       THEMES.some(function(t){ return !active[t.id]; });

      var text, btn = null;
      if(!PLACES.length){
        /* nothing entered yet */
        text = "No places yet. Add some in <code>places.js</code>.";
      } else if(filtering){
        /* the filters are hiding everything */
        text = anyLayer ? "No places match these filters."
                        : "No layers switched on.";
        btn  = anyLayer ? "Clear filters" : "Switch all layers on";
      } else {
        /* filters are wide open but nothing shows: almost always a
           mistyped theme id, which drops the place from the list */
        text = "Nothing is showing, but no filters are on. " +
               "Check the browser console (F12) — a mistyped theme name " +
               "in <code>places.js</code> will do this.";
      }

      var msg = document.createElement("div");
      msg.className = "nothing";
      msg.innerHTML = "<p style='margin:0'>" + text + "</p>";

      if(btn){
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = btn;
        b.addEventListener("click", function(){
          THEMES.forEach(function(t){ active[t.id] = true; });
          onlyOurArea = false;
          apply();
        });
        msg.appendChild(b);
      }

      listEl.innerHTML = "";
      listEl.appendChild(msg);
    }

    document.getElementById("shown").textContent =
      shown + (shown === 1 ? " place" : " places");
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

  /* ---------- linking ---------- */

  function lightPin(i,on){
    var el = pinEl(i);
    if(el) el.classList.toggle("lit", on);
  }
  function lightEntry(i,on){
    var e = listEl.querySelector('.entry[data-idx="'+i+'"]');
    if(e) e.classList.toggle("lit", on);
  }

  /* ---------- detail panel ---------- */

  var detail   = document.getElementById("detail");
  var detailIn = document.getElementById("detail-body");

  /* --- hash routing ------------------------------------------- */

  var suppressHash = false;   /* set while we are reacting to a hash change */

  function writeHash(slug){
    if(suppressHash) return;
    var target = slug ? "#place=" + slug : "";
    if(target){
      if(window.location.hash !== target) window.location.hash = target;
    } else if(window.location.hash){
      /* clear without adding a history entry we cannot escape */
      if(window.history && window.history.replaceState){
        window.history.replaceState(null,"",
          window.location.pathname + window.location.search);
      } else {
        window.location.hash = "";
      }
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
    if(i === undefined) return;            /* unknown slug: ignore quietly */
    if(i !== openIdx) openDetail(i,true,true);
  }

  window.addEventListener("hashchange", function(){
    suppressHash = true;
    applyHash();
    suppressHash = false;
  });

  function openDetail(i,fly,fromHash){
    var p = PLACES[i];
    openIdx = i;

    var body = "";
    body += "<h2>"+esc(p.name)+"</h2>";
    if(p.el) body += '<p class="el">'+esc(p.el)+"</p>";
    body += chipsHTML(p);
    if(p.note) body += '<p class="body">'+esc(p.note)+"</p>";

    if(p.photos && p.photos.length){
      body += '<div class="shots">';
      p.photos.forEach(function(f){
        body += '<img src="'+esc(f)+'" alt="'+esc(p.name)+'" loading="lazy">';
      });
      body += "</div>";
    }

    var prov = [];
    if(p.visited) prov.push("Visited "+esc(p.visited));
    if(p.by && p.by !== "—") prov.push("Logged by "+esc(p.by));
    if(p.source || p.url){
      prov.push(p.url
        ? 'Source: <a href="'+esc(p.url)+'" target="_blank" rel="noopener">'+
          esc(p.source||p.url)+"</a>"
        : "Source: "+esc(p.source));
    }
    if(prov.length) body += '<p class="prov">'+prov.join(" · ")+"</p>";

    detailIn.innerHTML = body;
    detail.classList.add("open");
    detail.setAttribute("aria-hidden","false");
    detail.scrollTop = 0;

    if(fly) map.flyTo(p.coords, Math.max(map.getZoom(), 15), {duration:.6});
    if(!fromHash) writeHash(p._slug);
  }

  function closeDetail(fromHash){
    openIdx = null;
    detail.classList.remove("open");
    detail.setAttribute("aria-hidden","true");
    if(!fromHash) writeHash(null);
  }

  /* wrapped, not passed directly: addEventListener would hand the
     click event in as `fromHash`, and an Event is truthy */
  document.getElementById("detail-close").addEventListener("click", function(){
    closeDetail();
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && openIdx !== null) closeDetail();
  });

  /* ---------- the one function that decides what shows ---------- */

  function apply(){
    PLACES.forEach(function(p,i){
      var on = visible(p);
      markers[i].setOpacity(on ? 1 : 0);
      var el = markers[i].getElement();
      if(el) el.style.pointerEvents = on ? "" : "none";

      var id = shownTheme(p);
      var pin = pinEl(i);
      if(pin && id) pin.style.background = themeById[id].colour;
    });

    /* a place hidden by the filters should not stay open behind it */
    if(openIdx !== null && !visible(PLACES[openIdx])) closeDetail();

    bar.querySelectorAll(".pill").forEach(function(b){
      b.setAttribute("aria-pressed", String(!!active[b.dataset.theme]));
    });
    areaBtn.setAttribute("aria-pressed", String(onlyOurArea));

    var allOn = THEMES.every(function(t){ return active[t.id]; });
    resetBtn.hidden = allOn && !onlyOurArea;

    buildList();
  }

  /* ---------- go ---------- */

  apply();
  applyHash();          /* open a place if the URL names one */

  if(PLACES.length){
    var b = L.latLngBounds(PLACES.map(function(p){ return p.coords; }));
    WALKS.forEach(function(w){ w.path.forEach(function(c){ b.extend(c); }); });
    map.fitBounds(b, { padding:[70,70], maxZoom:15 });
  }
})();
