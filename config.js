/* ===============================================================
   CONFIG — starting view and the layers.
   Loaded before places.js and map.js.
   =============================================================== */

/* Only used if there are no places to fit the view to. */
window.MAP_CENTRE = [40.6330, 22.9450];
window.MAP_ZOOM   = 14;

/* --- LAYERS ----------------------------------------------------
   Colours match slide 11 exactly. `id` must match `mainTheme` /
   `alsoThemes` on a place. Order here is the order of the buttons
   and of the groups in the list.

   defaultOn:false  -> layer starts switched off
   setsView:false   -> layer is ignored when choosing the starting
                       view (so the airport can't zoom the map out
                       to the whole metro area)
   --------------------------------------------------------------- */

window.THEMES = [
  { id:"transect", label:"Our transect",     colour:"#B5472F" },
  { id:"ecoc1997", label:"1997 sites",       colour:"#123A5A" },
  { id:"unesco",   label:"UNESCO monuments", colour:"#7A8B99" },
  { id:"hotspots", label:"Tourist hotspots", colour:"#D9A441" },
  { id:"context",  label:"Context",          colour:"#2F6F6A",
    defaultOn:false, setsView:false }
];
