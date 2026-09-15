/* ===============================================================
   CONFIG — starting view and the six layers.
   Loaded before places.js and map.js.
   =============================================================== */

window.MAP_CENTRE = [40.6335, 22.9480];
window.MAP_ZOOM   = 14;

/* --- THEMES ----------------------------------------------------
   Six layers. `id` must match `mainTheme` / `alsoThemes` on a
   place. Order here is the order of the pills and of the groups
   in the list.

   The colours are checked rather than chosen by eye: they are
   separated in lightness as well as hue, so they survive
   greyscale, printing, and the three common forms of colour
   blindness. Six distinct hues on a pale basemap is about the
   practical limit — the theme names are always spelled out in the
   chips, so colour never carries meaning on its own.

   If you change them, check the result in Color Oracle or Coblis.
   --------------------------------------------------------------- */

window.THEMES = [
  { id:"heritage",     label:"Heritage",            colour:"#A84A00" },
  { id:"architecture", label:"Architecture",        colour:"#004E7A" },
  { id:"gastronomy",   label:"Gastronomy",          colour:"#CC79A7" },
  { id:"events",       label:"Cultural events",     colour:"#7B3F9D" },
  { id:"traffic",      label:"Traffic",             colour:"#009E73" },
  { id:"maritime",     label:"Maritime operations", colour:"#2E7D8F" }
];
