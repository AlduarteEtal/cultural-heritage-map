/* ===============================================================
   PLACES — the only file most of the group edits.
   Loaded after config.js, before map.js.


   TEMPLATE — copy, paste at the bottom of its layer, fill in.

   {
     name:"Short name",
     el:"",                          // Greek name, optional
     mainTheme:"ecoc1997",           // drives the pin colour
     alsoThemes:["hotspots"],        // optional, any number
     stop:1,                         // transect only: stop number
     coords:[40.6335, 22.9528],      // [latitude, longitude]
     coordStatus:"approximate",      // "verified" | "approximate"
     evidence:"desk",                // "desk" | "field" | "both"
     summary:"One or two lines. Shown in the list.",
     note:"",                        // optional longer write-up for the panel
     factStatus:"unverified",        // "verified" | "unverified" | "observed"
     source:"Name of the source",    // optional
     url:"https://...",              // optional
     photos:[]                       // optional, files next to index.html
   }

   Every entry ends with `},` except the last, which ends `}`.

   TWO KINDS OF CHECKING
   coordStatus  — is the pin on the right building?
                  approximate = hollow pin on the map
   factStatus   — are the facts in the summary backed by a source?
                  observed = our own field observation
   They are separate on purpose: a pin can be in exactly the right
   place while its facts still need a source, and the other way round.

   FIXING A PIN
   Open the site with ?edit on the end of the address
   (index.html?edit). Pins become draggable; drop one on the right
   building and its new coordinates appear at the bottom of the map,
   ready to paste in here. Then change coordStatus to "verified".

   SHAREABLE LINKS
   Every place gets a link from its name, e.g.
   index.html#place=aristotelous-square. Renaming a place changes
   its link; add an `id` field to keep it fixed.
   =============================================================== */

window.PLACES = [

  /* ---------- Layer 1 — Our transect ---------- */

  { name:"Ano Poli (Upper Town)", mainTheme:"transect", stop:1,
    coords:[40.6425, 22.9525], coordStatus:"approximate", evidence:"field",
    summary:"Start of the walk. Older buildings, narrow walkable streets; feels residential, few visitors outside two hotspots.",
    factStatus:"observed" },

  { name:"Aristotelous Square", mainTheme:"transect", alsoThemes:["hotspots"], stop:2,
    coords:[40.6325, 22.9410], coordStatus:"approximate", evidence:"field",
    summary:"The busiest stop. Heavily commercial, chains and street vendors; chain prices not higher than elsewhere.",
    factStatus:"observed" },

  { name:"Nea Paralia (waterfront promenade)", mainTheme:"transect", stop:3,
    coords:[40.6150, 22.9480], coordStatus:"approximate", evidence:"field",
    summary:"Midpoint of the promenade. Shared by residents and visitors, lively into the evening.",
    factStatus:"observed" },

  { name:"Pier 1 (Port of Thessaloniki)", mainTheme:"transect", stop:4,
    coords:[40.6348, 22.9348], coordStatus:"approximate", evidence:"field",
    summary:"End of the walk. Museums and a museum ship, but used mainly for bars and cafés. Key legacy question.",
    factStatus:"observed" },

  /* ---------- Layer 2 — 1997 sites ---------- */

  { name:"Museum of Byzantine Culture", mainTheme:"ecoc1997",
    coords:[40.6237, 22.9549], coordStatus:"approximate", evidence:"desk",
    summary:"Opened September 1994. Venue for Treasures of Mount Athos, 21 June – 31 December 1997.",
    factStatus:"unverified" },

  { name:"Thessaloniki Concert Hall", mainTheme:"ecoc1997",
    coords:[40.5983, 22.9483], coordStatus:"verified", evidence:"desk",
    summary:"Opened 2 January 2000, three years after the title year. Main hall 1,400 seats; M2 building (2010) by Arata Isozaki.",
    factStatus:"verified", source:"Thessaloniki Concert Hall (tch.gr)" },

  { name:"MOMus Photography Museum (Warehouse A, Pier 1)", mainTheme:"ecoc1997",
    coords:[40.6352, 22.9345], coordStatus:"approximate", evidence:"desk",
    summary:"Founded 1998; reportedly legally established in 1997. About 120,000 photographic items. In Warehouse A since 2001.",
    factStatus:"verified", source:"MOMus (momus.gr); Photobiennale (photobiennale-greece.gr)" },

  { name:"Cinema Museum (Warehouse 1, Pier 1)", mainTheme:"ecoc1997",
    coords:[40.6345, 22.9355], coordStatus:"approximate", evidence:"desk",
    summary:"Reportedly founded in 1995 by the Thessaloniki 1997 organisation.",
    factStatus:"unverified", source:"Wikipedia only" },

  { name:"MOMus Modern (Lazarist Monastery, Stavroupoli)", mainTheme:"ecoc1997",
    coords:[40.6581, 22.9310], coordStatus:"verified", evidence:"desk",
    summary:"Reportedly founded in 1997 for the title year. Outside the transect, west of the centre.",
    factStatus:"unverified", source:"Wikipedia only" },

  /* ---------- Layer 3 — UNESCO monuments ----------
     Serial World Heritage site, inscribed 1988, dossier 456.
     "verified" below means the description itself comes from
     UNESCO; the rest are on UNESCO's list, but the extra detail
     in their description still needs a source. */

  { name:"Rotunda", mainTheme:"unesco",
    coords:[40.6333, 22.9528], coordStatus:"approximate", evidence:"desk",
    summary:"Named by UNESCO for its early Christian mosaics.",
    factStatus:"verified", source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Hagios Demetrios", mainTheme:"unesco",
    coords:[40.6388, 22.9477], coordStatus:"approximate", evidence:"desk",
    summary:"Mosaics among the great masterpieces of early Christian art (UNESCO). Restored after the 1917 fire.",
    factStatus:"verified", source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Hagia Sophia", mainTheme:"unesco",
    coords:[40.6329, 22.9469], coordStatus:"approximate", evidence:"desk",
    summary:"Represents painting from the first period after iconoclasm (UNESCO).",
    factStatus:"verified", source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Hosios David (Latomou Monastery)", mainTheme:"unesco",
    coords:[40.6443, 22.9512], coordStatus:"approximate", evidence:"desk",
    summary:"In Ano Poli; mosaics named in UNESCO's criteria.",
    factStatus:"verified", source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"City walls — Trigonion Tower", mainTheme:"unesco",
    coords:[40.6425, 22.9594], coordStatus:"approximate", evidence:"desk",
    summary:"Part of the 4 km city walls; the tower is open to the public.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Heptapyrgion (Yedi Kule)", mainTheme:"unesco",
    coords:[40.6446, 22.9602], coordStatus:"approximate", evidence:"desk",
    summary:"Fortress on the walls; now houses the Ephorate of Antiquities and two exhibitions.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Vlatadon Monastery", mainTheme:"unesco",
    coords:[40.6448, 22.9538], coordStatus:"approximate", evidence:"desk",
    summary:"Late Byzantine, in Ano Poli.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Acheiropoietos", mainTheme:"unesco",
    coords:[40.6366, 22.9487], coordStatus:"approximate", evidence:"desk",
    summary:"Early Christian basilica.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Panagia Chalkeon", mainTheme:"unesco",
    coords:[40.6353, 22.9427], coordStatus:"approximate", evidence:"desk",
    summary:"Near Aristotelous; Middle Byzantine church.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Holy Apostles", mainTheme:"unesco",
    coords:[40.6409, 22.9356], coordStatus:"approximate", evidence:"desk",
    summary:"Late Byzantine (Palaeologan) church.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Saint Panteleimon", mainTheme:"unesco",
    coords:[40.6320, 22.9540], coordStatus:"approximate", evidence:"desk",
    summary:"Restoration won a Europa Nostra prize (UNESCO).",
    factStatus:"verified", source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Saint Nikolaos Orphanos", mainTheme:"unesco",
    coords:[40.6440, 22.9569], coordStatus:"approximate", evidence:"desk",
    summary:"Late Byzantine, in Ano Poli.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Saint Aikaterini", mainTheme:"unesco",
    coords:[40.6433, 22.9488], coordStatus:"approximate", evidence:"desk",
    summary:"Late Byzantine church.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Transfiguration of the Saviour", mainTheme:"unesco",
    coords:[40.6335, 22.9534], coordStatus:"approximate", evidence:"desk",
    summary:"Small late Byzantine church near the Rotunda.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Prophitis Ilias", mainTheme:"unesco",
    coords:[40.6410, 22.9500], coordStatus:"approximate", evidence:"desk",
    summary:"Late Byzantine church.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  { name:"Byzantine Bath", mainTheme:"unesco",
    coords:[40.6419, 22.9520], coordStatus:"approximate", evidence:"desk",
    summary:"In Ano Poli.",
    factStatus:"unverified", source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/" },

  /* ---------- Layer 4 — Tourist hotspots ----------
     Aristotelous is in the transect above, and also in this layer.
     The two Ano Poli hotspots go here once you have them. */

  { name:"White Tower", mainTheme:"hotspots",
    coords:[40.6264, 22.9484], coordStatus:"approximate", evidence:"desk",
    summary:"The city's best-known landmark, at the start of Nea Paralia.",
    factStatus:"unverified" },

  /* ---------- Context (off by default) ---------- */

  { name:"Thessaloniki International Fair (Helexpo)", mainTheme:"context",
    coords:[40.6278, 22.9554], coordStatus:"verified", evidence:"desk",
    summary:"First fair 1926; 89th edition drew 228,974 visitors (2025).",
    factStatus:"verified", source:"Thessaloniki International Fair (thessalonikifair.gr)" },

  { name:"Aristotle University (main campus)", mainTheme:"context",
    coords:[40.6305, 22.9575], coordStatus:"approximate", evidence:"desk",
    summary:"78,343 undergraduates (2023/24); Greece's second-largest university.",
    factStatus:"unverified" },

  { name:"Panepistimio metro station", mainTheme:"context",
    coords:[40.6261, 22.9600], coordStatus:"verified", evidence:"desk",
    summary:"University station, Line 1 (opened 30 Nov 2024).",
    factStatus:"verified", source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779" },

  { name:"Venizelou metro station", mainTheme:"context",
    coords:[40.6369, 22.9419], coordStatus:"verified", evidence:"desk",
    summary:"Roman and Byzantine archaeology on display in the station.",
    factStatus:"verified", source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779" },

  { name:"Agias Sofias metro station", mainTheme:"context",
    coords:[40.6344, 22.9464], coordStatus:"verified", evidence:"desk",
    summary:"Line 1, near Hagia Sophia.",
    factStatus:"verified", source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779" },

  { name:"25 Martiou metro station", mainTheme:"context",
    coords:[40.6006, 22.9583], coordStatus:"verified", evidence:"desk",
    summary:"Where the Kalamaria extension (27 Aug 2026) branches off.",
    factStatus:"verified", source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779" },

  { name:"Nea Elvetia metro station", mainTheme:"context",
    coords:[40.5931, 22.9686], coordStatus:"verified", evidence:"desk",
    summary:"Eastern end of Line 1.",
    factStatus:"verified", source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779" },

  { name:"Port container terminal (Pier 6)", mainTheme:"context",
    coords:[40.6385, 22.9120], coordStatus:"approximate", evidence:"desk",
    summary:"617,000 TEU in 2025, a record. Pier 6 expansion launched.",
    factStatus:"verified", source:"Thessaloniki Port Authority (thpa.gr)",
    url:"https://www.thpa.gr/new-historic-high-in-revenue-and-profitability-for-2025/" },

  { name:"Makedonia Airport", mainTheme:"context",
    coords:[40.5197, 22.9709], coordStatus:"verified", evidence:"desk",
    summary:"7,982,798 passengers in 2025; 13 km southeast of the city.",
    factStatus:"verified", source:"Fraport Greece",
    url:"https://www.fraport-greece.com/en/media-center/news1/2026/fraport-greece--passenger-traffic-growth-continues--supported-by.html" },

  { name:"Jewish Museum of Thessaloniki", mainTheme:"context",
    coords:[40.6355, 22.9397], coordStatus:"approximate", evidence:"desk",
    summary:"Opened 2001 in a building from 1904.",
    factStatus:"unverified" },

  { name:"Archaeological Museum", mainTheme:"context",
    coords:[40.6254, 22.9540], coordStatus:"approximate", evidence:"desk",
    summary:"Opened 1962; next to the Museum of Byzantine Culture.",
    factStatus:"unverified" },

  { name:"Kordelio-Evosmos (suburb)", mainTheme:"context",
    coords:[40.6660, 22.9110], coordStatus:"approximate", evidence:"desk",
    summary:"Grew from 46,216 (1991) to 105,354 (2021) while the centre shrank.",
    factStatus:"unverified" }

];

/* ===============================================================
   LINES — places that are a stretch, not a point.
   `opens` is the name of the place whose panel opens on click.
   Nea Paralia uses only three points for now (both ends and stop
   3), so it is drawn dotted as approximate. To trace it properly,
   draw it in geojson.io and paste the corner points in here.
   =============================================================== */

window.LINES = [
  { name:"Nea Paralia waterfront", theme:"transect", coordStatus:"approximate",
    opens:"Nea Paralia (waterfront promenade)",
    path:[[40.6264, 22.9484], [40.6150, 22.9480], [40.5983, 22.9483]] }
];
