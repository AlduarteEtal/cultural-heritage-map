/* ===============================================================
   PLACES — the only file most of the group edits.
   Loaded after config.js, before map.js.

   Every place has an ID that matches its entry in the evidence
   file. The ID is also its link: index.html#place=mon-06


   TEMPLATE — copy, paste into its layer below, fill in.

   {
     id:"MON-10",
     name:"Site name",
     layer:"restored",                      // an id from THEMES in config.js
     legacy:["physical","eventfulness"],    // one or more ids from LEGACY
     coords:[40.6335, 22.9528],             // leave out until you've placed it
     summary:"Why it's on the map, in one or two lines.",
     note:"",                               // optional longer text for the panel
     source:"Author (year); interview (mm:ss)",
     confidence:"verified",                 // optional: "verified" | "partly verified" | "lead"
     photos:[]                              // optional, files next to index.html
   }

   Every entry ends with `},` except the last in the file.


   NOT YET PLACED
   A place without `coords` is listed but kept off the map. To place
   it: right-click the building in Google Maps, click the numbers at
   the top of the menu to copy them, and paste between the brackets:
       coords:[40.63612, 22.94803],


   INTERIM COORDINATES
   Entries marked "own check" use coordinates we verified earlier.
   Marco's workbook coordinates replace them when they arrive; if
   his differ by more than about 30 m, check which is right first.
   =============================================================== */

window.PLACES = [

  /* ---------- Layer 1 — Pier 1, the deep dive ---------- */

  { id:"PIER-01", name:"Cinema Museum", layer:"pier1",
    legacy:["physical"],
    coords:[40.6345, 22.9355],              /* own check — Marco's replaces */
    summary:"Founded by the 1997 organisation.",
    /* founding year still to confirm (fix list item 2) */
    source:"Film Festival site; Wikipedia",
    confidence:"partly verified" },

  { id:"PIER-02", name:"Museum of Photography (Warehouse A)", layer:"pier1",
    legacy:["physical"],
    coords:[40.6352, 22.9345],              /* own check — Marco's replaces */
    summary:"Established 1997; in Warehouse A since 2001.",
    source:"MOMus" },

  { id:"PIER-03", name:"MOMus Experimental Center", layer:"pier1",
    legacy:["sustainability"],
    summary:"Later reuse of the pier (2006).",
    source:"Site workbook" },

  { id:"PIER-04", name:"Film Festival halls, Warehouse 1", layer:"pier1",
    legacy:["eventfulness"],
    summary:"Festival spaces still in use.",
    source:"Site workbook; Thetis" },

  { id:"PIER-05", name:"The warehouse that's now a private bar", layer:"pier1",
    legacy:["sustainability"],
    summary:"A former municipal space now in private use.",
    source:"Thetis (25:27)" },

  /* ---------- Layer 2 — Comparators ---------- */

  { id:"LAZ-01", name:"Moni Lazariston (MOMus Modern, Karantinos Stage, Lazariston Festival)",
    layer:"comparators",
    legacy:["physical","eventfulness","sustainability"],
    coords:[40.6581, 22.9310],              /* own check — Marco's replaces */
    summary:"Restored for culture; raised the area's profile but didn't regenerate it.",
    source:"Kertemelidou (2019)" },

  { id:"CMP-01", name:"Museum of Byzantine Culture", layer:"comparators",
    legacy:["physical","eventfulness"],
    coords:[40.6237, 22.9549],              /* own check — Marco's replaces */
    summary:"Venue of Treasures of Mount Athos in 1997.",
    source:"Museum; UNESCO" },

  { id:"CMP-02", name:"Concert Hall (M1 and M2)", layer:"comparators",
    legacy:["physical"],
    coords:[40.5983, 22.9483],              /* own check — Marco's replaces */
    summary:"Opened 2000; M2 by Isozaki in 2010.",
    source:"tch.gr" },

  /* ---------- Layer 3 — Context ---------- */

  { id:"T3-01", name:"MOMus Contemporary at Helexpo", layer:"context",
    legacy:["physical"],
    summary:"Context.",
    source:"Site workbook" },

  { id:"T3-02", name:"Aristotelous Square", layer:"context",
    legacy:["physical"],
    coords:[40.6325, 22.9410],              /* own check — Marco's replaces */
    summary:"A transect stop; the 1997 organisers opened the redevelopment debate.",
    source:"Site workbook" },

  /* ---------- Layer 4 — Buildings restored or reused around 1997 ---------- */

  { id:"MON-01", name:"Roman Forum", layer:"restored",
    legacy:["physical","eventfulness"],
    summary:"Restored; free full-moon events today.",
    source:"Hastaoglou-Martinidis & Christodoulou; Ruth" },

  { id:"MON-02", name:"Rotunda (Galerius complex)", layer:"restored",
    legacy:["physical","eventfulness"],
    coords:[40.6333, 22.9528],              /* own check */
    summary:"Restored; concerts today, still contested.",
    source:"Hastaoglou-Martinidis & Christodoulou; Ruth" },

  { id:"MON-03", name:"Heptapyrgion", layer:"restored",
    legacy:["physical"],
    coords:[40.6446, 22.9602],              /* own check */
    summary:"Restored fortress.",
    source:"Hastaoglou-Martinidis & Christodoulou" },

  { id:"MON-04", name:"Vlatadon Monastery", layer:"restored",
    legacy:["physical"],
    coords:[40.6448, 22.9538],              /* own check */
    summary:"Restored.",
    source:"Hastaoglou-Martinidis & Christodoulou" },

  { id:"MON-05", name:"Yeni Cami", layer:"restored",
    legacy:["physical","eventfulness"],
    summary:"Restored; later used for exhibitions.",
    source:"Neumeier (2013)" },

  { id:"MON-06", name:"Bey Hamam", layer:"restored",
    legacy:["physical"],
    summary:"Restored; reopened 2026. Not a new 1997 use: in cultural use since 1972.",
    source:"Days of Art (2026)" },

  { id:"MON-07", name:"Olympion", layer:"restored",
    legacy:["physical","eventfulness"],
    summary:"Renovated; the Film Festival's venue and offices.",
    source:"Thetis (25:27)" },

  { id:"MON-08", name:"Royal Theatre", layer:"restored",
    legacy:["physical"],
    summary:"Unavailable in 1997, reopened years later.",
    source:"Thetis (14:31)" },

  { id:"MON-09", name:"Garden Theatre (Theatro Kipou)", layer:"restored",
    legacy:["eventfulness"],
    summary:"Hosted international dancers in 1997; still running.",
    source:"Thetis (20:21)" },

  /* ---------- Layer 5 — Planned for 1997, still unfinished ---------- */

  { id:"UNF-01", name:"FIX (former brewery)", layer:"unfinished",
    legacy:["physical","sustainability"],
    summary:"Meant to become a cultural space in 1997; still being renovated.",
    source:"Thetis (18:02); site workbook" },

  { id:"UNF-02", name:"Allatini Mills", layer:"unfinished",
    legacy:["physical","sustainability"],
    summary:"Planned for 1997, still in progress.",
    source:"Thetis (19:12)" }

];

/* ===============================================================
   LINES — places that are a stretch, not a point. None for now.
   =============================================================== */

window.LINES = [];
