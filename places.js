/* ===============================================================
   PLACES — this is the only file most of the group needs to touch.

   Copy the template, paste it at the bottom of the list, fill it in.
   Mind the commas: every entry ends with `},` except the last one.

   {
     name:     "Short name shown on the map",
     theme:    "culture",              // must match an id in config.js
     coords:   [51.3397, 12.3731],     // [latitude, longitude]
     evidence: "field",                // "desk" | "field" | "both"
     note:     "2–4 sentences. What is it, why does it matter to
                the theme, what did you actually observe.",
     date:     "2026-09-14",           // when you visited (field only)
     by:       "Your name",            // who logged it
     photo:    "assets/photos/xyz.jpg",// optional, drop file in that folder
     source:   "Stadt Leipzig open data 2024",  // optional, for desk entries
     url:      "https://..."           // optional
   }

   `evidence` matters. The Part A rubric wants a visible mix of desk
   and field research, and the legend counts both for you.
   =============================================================== */

window.PLACES = [

  /* --- The five entries below are placeholders with real coordinates
         so the map renders. Delete them once you have your own. --- */

  {
    name: "Example — the central station",
    theme: "structure",
    coords: [51.3459, 12.3831],
    evidence: "both",
    note: "Placeholder. For a structure entry, describe what this element does to movement in the city: what it connects, what it cuts off, who is on either side of it.",
    by: "—",
    source: "Replace with your source"
  },

  {
    name: "Example — a main square",
    theme: "everyday",
    coords: [51.3396, 12.3752],
    evidence: "field",
    note: "Placeholder. For a field entry, write what you saw and when. Counts, uses, who was there, what was closed. Observation beats adjectives.",
    date: "2026-09-14",
    by: "—"
  },

  {
    name: "Example — a cultural venue",
    theme: "culture",
    coords: [51.3372, 12.3811],
    evidence: "desk",
    note: "Placeholder. For a culture entry, note what it programmes, who funds it, and roughly who it reaches.",
    by: "—",
    source: "Replace with your source"
  },

  {
    name: "Example — a site left by a past programme",
    theme: "legacy",
    coords: [51.3298, 12.3742],
    evidence: "both",
    note: "Placeholder. This is the layer that feeds the conference presentation. Name the programme, the year, and what physically remains — building, park, institution, event that still runs.",
    by: "—",
    source: "Replace with your source"
  },

  {
    name: "Example — a vacant or contested site",
    theme: "friction",
    coords: [51.3245, 12.3893],
    evidence: "field",
    note: "Placeholder. Vacancy, disputed use, a plan that stalled. Say who wants what, if you know.",
    date: "2026-09-16",
    by: "—"
  }

];

/* ===============================================================
   WALKS — the routes you actually walked.
   Field research is much more convincing when the assessor can see
   where you went. Coordinates are [lat, lng] in order.

   Easiest way to get a route: draw it in Google My Maps or record it
   on your phone, then read off the corner points. A dozen points is
   plenty — this is a diagram, not a GPS trace.
   =============================================================== */

window.WALKS = [
  {
    name: "Walk 1 — station to the southern edge",
    date: "2026-09-14",
    by: "—",
    note: "Placeholder route. Add one line per walk. Note what changed along the way rather than listing streets.",
    path: [
      [51.3459, 12.3831],
      [51.3412, 12.3798],
      [51.3396, 12.3752],
      [51.3341, 12.3735],
      [51.3298, 12.3742],
      [51.3245, 12.3893]
    ]
  }
];
