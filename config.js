/* ===============================================================
   CONFIG — the map's starting view, the eras and the layers.
   Loaded before places.js and map.js.
   =============================================================== */

window.MAP_CENTRE = [40.6335, 22.9440];
window.MAP_ZOOM   = 13;

/* --- ERAS ------------------------------------------------------
   The slider steps through these in order. A linear year slider
   does not work for a 2,300-year-old city: everything modern ends
   up squashed into the last few pixels. Named periods fix that.
   `tick` is the short label under the slider; keep it to ~4 chars.
   --------------------------------------------------------------- */

window.ERAS = [
  { id:"all",     name:"All periods",         range:"315 BC – now",  tick:"All"  },
  { id:"ancient", name:"Roman & Byzantine",   range:"315 BC – 1430", tick:"Rom"  },
  { id:"ottoman", name:"Ottoman city",        range:"1430 – 1912",   tick:"Ott"  },
  { id:"fire",    name:"Fire and replan",     range:"1917 – 1930s",  tick:"1917" },
  { id:"refugee", name:"Refugee city",        range:"1922 – 1950s",  tick:"1922" },
  { id:"postwar", name:"Post-war growth",     range:"1950s – 1990s", tick:"P-W"  },
  { id:"ecoc",    name:"Capital of Culture",  range:"1997",          tick:"1997" },
  { id:"now",     name:"Metro era",           range:"2024 – now",    tick:"Now"  }
];

/* --- THEMES ----------------------------------------------------
   Map layers. `id` must match the `theme` on a place below.
   Colours are functional — keep them distinguishable.
   --------------------------------------------------------------- */

window.THEMES = [
  { id:"layers",   label:"Layers of the city",  colour:"#2F6E8F" },
  { id:"legacy",   label:"Legacy of 1997",      colour:"#8A6D1F" },
  { id:"culture",  label:"Culture now",         colour:"#B0472B" },
  { id:"metro",    label:"The metro",           colour:"#5C4B9E" },
  { id:"everyday", label:"Everyday life",       colour:"#2C7A5B" },
  { id:"friction", label:"Friction",            colour:"#A03A5E" }
];
