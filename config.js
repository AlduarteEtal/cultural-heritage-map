/* ===============================================================
   CONFIG — starting view and the six layers.
   Loaded before places.js and map.js.
   =============================================================== */

window.MAP_CENTRE = [40.6335, 22.9480];
window.MAP_ZOOM   = 14;

/* --- THEMES ----------------------------------------------------
   Six layers. `id` must match `mainTheme` / `alsoThemes` on a
   place. Colours are functional — keep them distinguishable
   rather than pretty. Order here is the order of the pills and
   the order of the groups in the list.
   --------------------------------------------------------------- */

window.THEMES = [
  { id:"heritage",     label:"Heritage",           colour:"#8A6D1F" },
  { id:"architecture", label:"Architecture",       colour:"#5C4B9E" },
  { id:"gastronomy",   label:"Gastronomy",         colour:"#B0472B" },
  { id:"events",       label:"Cultural events",    colour:"#A03A5E" },
  { id:"traffic",      label:"Traffic",            colour:"#2F6E8F" },
  { id:"maritime",     label:"Maritime operations",colour:"#2C7A5B" }
];
