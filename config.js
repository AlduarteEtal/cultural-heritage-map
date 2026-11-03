/* ===============================================================
   CONFIG — starting view, the layers and the legacy types.
   Loaded before places.js and map.js.
   =============================================================== */

/* Only used if no place has coordinates yet. */
window.MAP_CENTRE = [40.6330, 22.9450];
window.MAP_ZOOM   = 14;

/* --- LAYERS (slide 9) ------------------------------------------
   `id` must match `layer` on a place. Order here is the order of
   the buttons and of the groups in the list.

   COLOURS ARE STAND-INS until the slide 9 colours are in: the five
   slide 11 colours, re-assigned by role and checked together for
   colour blindness. Replace the hex codes here and nothing else
   needs to change. Yellow is on "unfinished" on purpose:
   construction yellow.
   --------------------------------------------------------------- */

window.THEMES = [
  { id:"pier1",       label:"Pier 1 — deep dive",                   colour:"#B5472F" },
  { id:"comparators", label:"Comparators",                          colour:"#123A5A" },
  { id:"context",     label:"Context",                              colour:"#7A8B99" },
  { id:"restored",    label:"Buildings restored or reused around 1997", colour:"#2F6F6A" },
  { id:"unfinished",  label:"Planned for 1997, still unfinished",   colour:"#D9A441" }
];

/* --- LEGACY TYPES ----------------------------------------------
   The second row of filter buttons. `id` must match the values in
   a place's `legacy` list. These deliberately have no colour —
   colour belongs to the layers — so they show as neutral outlines.
   --------------------------------------------------------------- */

window.LEGACY = [
  { id:"physical",       label:"Physical" },
  { id:"eventfulness",   label:"Eventfulness" },
  { id:"sustainability", label:"Sustainability" }
];
