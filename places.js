/* ===============================================================
   PLACES — the only file most of the group edits.
   Loaded after config.js, before map.js.


   HOW TO WRITE AN ENTRY
   ---------------------
   The `note` is the part people actually read. Four sentences,
   roughly one per prompt, is about right — around 80 words:

     1. What it is, plainly, as if to someone who has never been.
     2. Why it belongs to this theme. State the link, don't imply it.
     3. What you saw, and when. Observation, not adjectives.
        "Eleven tables occupied at 14:00" beats "lively".
     4. What you could not find out. Optional, but this is the line
        that turns a caption into research.

   `summary` is the one line shown in the list. If you leave it out,
   the first sentence of the note is used instead — so skipping it
   is fine.


   TEMPLATE — copy, paste at the bottom, fill in.

   {
     name:"Short name",
     el:"Greek name",                 // optional
     id:"short-url-name",             // optional — see note below
     mainTheme:"heritage",            // drives the pin colour
     alsoThemes:["architecture"],     // optional, any number
     ourArea:true,                    // in the Rotunda patch?
     coords:[40.6335,22.9528],        // [latitude, longitude]
     evidence:"field",                // "desk" | "field" | "both"
     summary:"One line for the list.",// optional
     note:"The full write-up. See the four prompts above.",
     photos:["rotunda-01.jpg"],       // optional, files sit alongside index.html
     visited:"2026-09-14",            // optional
     by:"Your name",
     source:"Author, year",           // optional
     url:"https://..."                // optional
   }

   Every entry ends with `},` except the last, which ends `}`.

   On the map: round pin = in our area, square pin = elsewhere.


   SHAREABLE LINKS
   ---------------
   Every place gets its own URL automatically, built from its name:
   "Rotunda and the Arch of Galerius" becomes
       index.html#place=rotunda-and-the-arch-of-galerius
   Opening that link opens the place and flies the map to it. Useful
   for sending a stakeholder straight to one entry, and for jumping
   to a place during a presentation.

   Renaming a place changes its URL, which breaks any link you have
   already sent. If that matters, add an `id` field and the URL will
   use that instead, whatever you do to the name afterwards.
   =============================================================== */

window.PLACES = [

  {
    name:"Rotunda and the Arch of Galerius",
    el:"Ροτόντα · Καμάρα",
    mainTheme:"heritage",
    alsoThemes:["architecture","events"],
    ourArea:true,
    coords:[40.6335, 22.9528],
    evidence:"field",
    summary:"Roman mausoleum, then church, then mosque, then church again.",
    note:"A 4th-century Roman rotunda that has been a church, a mosque and a church again, with the minaret still standing outside. It is the clearest single object lesson in how this city layers, which is why it anchors the heritage theme. On 14 September the square around it was in use as a student hangout from mid-afternoon, with the monument fenced but the surrounding paving open and busy. We could not find out who decides what gets programmed in the square itself.",
    photos:[],
    visited:"2026-09-14",
    by:"—"
  },

  {
    name:"Warehouse B, Port",
    el:"Αποθήκη Β',  Λιμάνι",
    mainTheme:"maritime",
    alsoThemes:["heritage","events"],
    ourArea:false,
    coords:[40.6386, 22.9333],
    evidence:"desk",
    summary:"Cinema Museum and Museum of Photography, in a converted port warehouse.",
    note:"Two museums set up around the 1997 Capital of Culture and placed in a converted warehouse on Pier 1, inside a working commercial port. It sits in maritime operations rather than culture because the building's use is decided by the port authority, not a cultural body. Desk research only so far. Still to establish on site: whether the posted opening hours are kept, current visitor numbers, and who actually controls the building.",
    photos:[],
    by:"—",
    source:"To verify on site and with the museums directly"
  }

];

/* ===============================================================
   WALKS — routes you actually walked. Drawing where you went makes
   field research far more convincing than saying you did it.
   =============================================================== */

window.WALKS = [
  {
    name:"Walk 1 — sea to upper town, across the burnt zone",
    visited:"2026-09-14",
    note:"Orientation walk. White Tower, up the Hébrard axis through Aristotelous, past the Rotunda, into Ano Poli. You cross the 1917 fire boundary twice and can read it in the street pattern.",
    path:[[40.6262,22.9484],[40.6300,22.9440],[40.6329,22.9410],
          [40.6371,22.9420],[40.6335,22.9528],[40.6415,22.9530],[40.6440,22.9570]]
  }
];
