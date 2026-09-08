/* ===============================================================
   PLACES — Thessaloniki

   MOCKUP: two entries only, one desk and one field, so you can see
   the layers, the pin shapes and the evidence filter working.
   Add the rest by copying the template below.

   {
     name:     "Short name shown on the map",
     theme:    "legacy",               // an id from config.js
     coords:   [40.6335, 22.9440],     // [latitude, longitude]
     evidence: "field",                // "desk" | "field" | "both"
     note:     "2-4 sentences. What it is, why it matters to the
                theme, what you actually observed.",
     date:     "2026-09-14",           // when you visited
     by:       "Your name",
     photo:    "assets/photos/xyz.jpg",
     source:   "Author, year",
     url:      "https://..."
   }

   Every entry ends with `},` except the last one, which ends `}`.
   Round pins are field visits. Square pins are desk research.
   =============================================================== */

window.PLACES = [

  {
    name: "Warehouse B, Port - Cinema Museum and Museum of Photography",
    theme: "legacy",
    coords: [40.6386, 22.9333],
    evidence: "desk",
    note: "Both museums were established around the 1997 Capital of Culture and placed in converted port warehouses. This is the clearest surviving physical legacy of the programme. Still to check on site: whether opening hours are kept, visitor numbers, who funds them now, and whether the port company or the ministry controls the building.",
    by: "—",
    source: "To verify on site and with the museums directly"
  },

  {
    name: "Rotunda and the Arch of Galerius",
    theme: "layers",
    coords: [40.6335, 22.9528],
    evidence: "field",
    note: "Roman, then church, then mosque, then church again. The best single object lesson in how the city layers, and the surrounding square is a live student hangout, so the ancient and the everyday sit on top of each other. Photograph the junction between the monument and the cafe tables.",
    date: "2026-09-14",
    by: "—"
  }

];

/* ===============================================================
   WALKS - routes you actually walked.
   Drawing where you went makes field research far more convincing
   than saying you did it.
   =============================================================== */

window.WALKS = [
  {
    name: "Walk 1 - sea to upper town, across the burnt zone",
    date: "2026-09-14",
    by: "—",
    note: "The orientation walk. White Tower, up the Hebrard axis through Aristotelous, past the Rotunda, into Ano Poli. You cross the 1917 fire boundary twice and can read it in the street pattern. Replace these points with where you actually went.",
    path: [
      [40.6262, 22.9484],
      [40.6300, 22.9440],
      [40.6329, 22.9410],
      [40.6371, 22.9420],
      [40.6335, 22.9528],
      [40.6415, 22.9530],
      [40.6440, 22.9570]
    ]
  }
];
