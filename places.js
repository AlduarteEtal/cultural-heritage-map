/* ===============================================================
   PLACES AND WALKS — the only file most of the group edits.
   Loaded after config.js, before map.js.
   =============================================================== */

/* --- PLACES ----------------------------------------------------
   MOCKUP: two entries, one desk and one field, so you can see the
   layers, the pin shapes and the era slider working.

   Template — copy, paste at the bottom, fill in:

   {
     name:"Short name",
     el:"Greek name",              // optional, shows under the name
     theme:"legacy",               // an id from THEMES
     eras:["ecoc","now"],          // one or more ids from ERAS
     coords:[40.6335,22.9440],     // [latitude, longitude]
     evidence:"field",             // "desk" | "field" | "both"
     note:"2-4 sentences. What it is, why it matters, what you saw.",
     visited:"2026-09-14",         // optional
     by:"Your name",
     source:"Author, year",        // optional
     url:"https://..."             // optional
   }

   Every entry ends with `},` except the last, which ends `}`.
   Round pins = field. Square pins = desk.
   --------------------------------------------------------------- */

window.PLACES = [

  {
    name:"Warehouse B, Port — Cinema Museum & Museum of Photography",
    el:"Αποθήκη Β',  Λιμάνι",
    theme:"legacy",
    eras:["ecoc","now"],
    coords:[40.6386, 22.9333],
    evidence:"desk",
    note:"Both museums were established around the 1997 Capital of Culture and placed in converted port warehouses. This is the clearest surviving physical legacy of the programme. Still to check on site: whether opening hours are kept, visitor numbers, who funds them now, and whether the port company or the ministry controls the building.",
    by:"—",
    source:"To verify on site and with the museums directly"
  },

  {
    name:"Rotunda and the Arch of Galerius",
    el:"Ροτόντα · Καμάρα",
    theme:"layers",
    eras:["ancient","ottoman","now"],
    coords:[40.6335, 22.9528],
    evidence:"field",
    note:"Roman, then church, then mosque, then church again. The best single object lesson in how the city layers, and the surrounding square is a live student hangout, so the ancient and the everyday sit on top of each other. Photograph the junction between the monument and the cafe tables.",
    visited:"2026-09-14",
    by:"—"
  }

];

/* --- WALKS -----------------------------------------------------
   Routes you actually walked. Drawing where you went makes field
   research far more convincing than saying you did it.
   --------------------------------------------------------------- */

window.WALKS = [
  {
    name:"Walk 1 — sea to upper town, across the burnt zone",
    visited:"2026-09-14",
    note:"Orientation walk. White Tower, up the Hébrard axis through Aristotelous, past the Rotunda, into Ano Poli. You cross the 1917 fire boundary twice and can read it in the street pattern.",
    path:[[40.6262,22.9484],[40.6300,22.9440],[40.6329,22.9410],
          [40.6371,22.9420],[40.6335,22.9528],[40.6415,22.9530],[40.6440,22.9570]]
  }
];
