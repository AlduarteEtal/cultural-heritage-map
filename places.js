/* ===============================================================
   PLACES — the only file most of the group edits.
   Loaded after config.js, before map.js.

   TEMPLATE — copy, paste into its layer below, fill in.

   {
     name:"Short name",
     mainTheme:"unesco",             // drives the pin colour
     alsoThemes:["hotspots"],        // optional, any number
     stop:1,                         // transect only
     coords:[40.6335, 22.9528],      // [latitude, longitude]
     coordStatus:"verified",         // "verified" | "approximate"
     evidence:"desk",                // "desk" | "field" | "both"
     summary:"One line. Shown in the list.",
     note:"The full description. Shown when the place is opened.",
     factStatus:"unverified",        // "verified" | "unverified" | "observed"
     source:"Name of the source",    // optional
     url:"https://...",              // optional
     photos:[]                       // optional, files next to index.html
   }

   Every entry ends with `},` except the last in the file.

   summary vs note: the list shows `summary`, the panel shows `note`.
   Keep the summary to one sentence so the list stays readable.

   A pin you are unsure of: set coordStatus:"approximate" and it
   shows hollow. Open index.html?edit to drag it into place.
   =============================================================== */

window.PLACES = [

  /* ---------- Layer 1 — Our transect ---------- */

  {
    name:"Ano Poli (Upper Town)",
    mainTheme:"transect",
    stop:1,
    coords:[40.6425, 22.9525],
    coordStatus:"verified",
    evidence:"field",
    summary:"The walk begins in Ano Poli, the older upper section of Thessaloniki.",
    note:"The walk begins in Ano Poli, the older upper section of Thessaloniki. The area has narrow, often steep streets, older houses and a more residential atmosphere than the centre below. It feels quieter and less commercial in most places, although visitor activity increases around the main viewpoints, churches and fortifications.",
    factStatus:"observed"
  },

  {
    name:"Aristotelous Square",
    mainTheme:"transect",
    alsoThemes:["hotspots"],
    stop:2,
    coords:[40.6325, 22.941],
    coordStatus:"verified",
    evidence:"field",
    summary:"Aristotelous Square is one of the main public and commercial spaces in central Thessaloniki.",
    note:"Aristotelous Square is one of the main public and commercial spaces in central Thessaloniki. The square is surrounded by cafés, restaurants, shops, hotels and continuous pedestrian activity, making it noticeably busier than the opening point in Ano Poli. It is also a useful place to observe how everyday city life and tourism overlap in the centre.",
    factStatus:"observed"
  },

  {
    name:"Nea Paralia (waterfront promenade)",
    mainTheme:"transect",
    stop:3,
    coords:[40.615, 22.948],
    coordStatus:"verified",
    evidence:"field",
    summary:"Nea Paralia is a long public waterfront promenade stretching along the eastern side of the city centre.",
    note:"Nea Paralia is a long public waterfront promenade stretching along the eastern side of the city centre. It is used by local residents, visitors, joggers, cyclists, families and people meeting informally beside the sea. The promenade becomes particularly active in the late afternoon and evening, when it functions as both a recreational space and a social gathering place.",
    factStatus:"observed"
  },

  {
    name:"Pier 1 (Port of Thessaloniki)",
    mainTheme:"transect",
    stop:4,
    coords:[40.6348, 22.9348],
    coordStatus:"verified",
    evidence:"field",
    summary:"Pier 1 marks the end of the transect and provides a different kind of waterfront environment from Nea Paralia.",
    note:"Pier 1 marks the end of the transect and provides a different kind of waterfront environment from Nea Paralia. The former port buildings now contain museums, cultural spaces, bars, restaurants and cafés, so the area combines industrial heritage with leisure and nightlife. This makes it a useful location for considering whether cultural regeneration has created a lasting public legacy or mainly produced a visitor-oriented entertainment district.",
    factStatus:"observed"
  },

  /* ---------- Layer 2 — 1997 sites ---------- */

  {
    name:"Museum of Byzantine Culture",
    mainTheme:"ecoc1997",
    coords:[40.6237, 22.9549],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Museum of Byzantine Culture opened before Thessaloniki’s year as European Capital of Culture, but it became closely connected with the 1997 programme through major exhibitions and cultural events.",
    note:"The Museum of Byzantine Culture opened before Thessaloniki’s year as European Capital of Culture, but it became closely connected with the 1997 programme through major exhibitions and cultural events. The Treasures of Mount Athos exhibition was one of the most important examples, bringing religious objects, manuscripts and artworks from Mount Athos to a wider public. The museum therefore represents both the city’s pre-existing cultural infrastructure and the international visibility created around 1997.",
    factStatus:"observed"
  },

  {
    name:"Thessaloniki Concert Hall",
    mainTheme:"ecoc1997",
    coords:[40.5983, 22.9483],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Thessaloniki Concert Hall is an important cultural building on the eastern waterfront, but it opened in 2000 rather than during the 1997 title year.",
    note:"The Thessaloniki Concert Hall is an important cultural building on the eastern waterfront, but it opened in 2000 rather than during the 1997 title year. It is therefore better understood as part of the longer-term cultural development of Thessaloniki rather than as a direct 1997 venue. Its inclusion can still be useful for comparing the short-term European Capital of Culture programme with later investment in large-scale cultural infrastructure.",
    factStatus:"verified",
    source:"Thessaloniki Concert Hall (tch.gr)"
  },

  {
    name:"MOMus Photography Museum (Warehouse A, Pier 1)",
    mainTheme:"ecoc1997",
    coords:[40.6352, 22.9345],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The photography museum occupies a converted port warehouse at Pier 1, linking the city’s cultural activity with its industrial waterfront.",
    note:"The photography museum occupies a converted port warehouse at Pier 1, linking the city’s cultural activity with its industrial waterfront. Its exhibitions focus on Greek and international photography and form part of the wider museum landscape that developed around the port. It is not straightforwardly a 1997 institution, but its location illustrates how former port buildings were gradually adapted for cultural and visitor uses.",
    factStatus:"verified",
    source:"MOMus (momus.gr); Photobiennale (photobiennale-greece.gr)"
  },

  {
    name:"Cinema Museum (Warehouse 1, Pier 1)",
    mainTheme:"ecoc1997",
    coords:[40.6345, 22.9355],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Cinema Museum is located in one of the former port warehouses at Pier 1 and presents material connected with the history of Greek cinema and filmmaking.",
    note:"The Cinema Museum is located in one of the former port warehouses at Pier 1 and presents material connected with the history of Greek cinema and filmmaking. Its setting is significant because the museum is part of a wider conversion of the old port into a cultural and leisure district. Its exact connection to the 1997 European Capital of Culture programme is still to be confirmed.",
    factStatus:"unverified",
    source:"Wikipedia only"
  },

  {
    name:"MOMus Modern (Lazarist Monastery, Stavroupoli)",
    mainTheme:"ecoc1997",
    coords:[40.6581, 22.931],
    coordStatus:"verified",
    evidence:"desk",
    summary:"MOMus Modern is housed in the Lazarist Monastery complex in Stavroupoli, west of the central city.",
    note:"MOMus Modern is housed in the Lazarist Monastery complex in Stavroupoli, west of the central city. The building gives the museum a distinctive setting and connects contemporary art with the reuse of a historic religious complex. It is outside the main transect, but it is useful as an example of how cultural institutions have been distributed beyond the central waterfront and historic core.",
    factStatus:"unverified",
    source:"Wikipedia only"
  },

  /* ---------- Layer 3 — UNESCO monuments ---------- */

  {
    name:"Rotunda",
    mainTheme:"unesco",
    coords:[40.6333, 22.9528],
    coordStatus:"verified",
    evidence:"both",
    summary:"The Rotunda is one of Thessaloniki’s most prominent surviving Roman buildings and was later adapted for Christian and Islamic religious use.",
    note:"The Rotunda is one of Thessaloniki’s most prominent surviving Roman buildings and was later adapted for Christian and Islamic religious use. Its interior is particularly important for its early Christian mosaics, which are among the features recognised by UNESCO. The building also demonstrates how a single monument can accumulate several layers of religious, political and architectural history.",
    factStatus:"verified",
    source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Hagios Demetrios",
    mainTheme:"unesco",
    coords:[40.6388, 22.9477],
    coordStatus:"verified",
    evidence:"both",
    summary:"The Church of Saint Demetrios is dedicated to Thessaloniki’s patron saint and is one of the city’s most important religious monuments.",
    note:"The Church of Saint Demetrios is dedicated to Thessaloniki’s patron saint and is one of the city’s most important religious monuments. It is known especially for its early Christian mosaics and its connection with the historical cult of Saint Demetrios. The church was seriously affected by the 1917 fire and subsequently restored, making it relevant both as a heritage site and as an example of reconstruction after urban disaster.",
    factStatus:"verified",
    source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Hagia Sophia",
    mainTheme:"unesco",
    coords:[40.6329, 22.9469],
    coordStatus:"verified",
    evidence:"both",
    summary:"Hagia Sophia is one of Thessaloniki’s major Byzantine churches and should not be confused with the better-known building of the same name in Istanbul.",
    note:"Hagia Sophia is one of Thessaloniki’s major Byzantine churches and should not be confused with the better-known building of the same name in Istanbul. Its architecture and decoration reflect the development of Byzantine religious art after the period of iconoclasm. The church remains an important landmark in the central city and forms part of the wider group of monuments that led to Thessaloniki’s UNESCO inscription.",
    factStatus:"verified",
    source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Hosios David (Latomou Monastery)",
    mainTheme:"unesco",
    coords:[40.6443, 22.9512],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Hosios David is a small but highly significant Byzantine church in Ano Poli.",
    note:"Hosios David is a small but highly significant Byzantine church in Ano Poli. It is particularly noted for its early Christian mosaic, which is one of the major artistic features associated with the monument. Its position in the upper town also makes it useful for connecting the UNESCO heritage landscape with the older residential and religious character of Ano Poli.",
    factStatus:"verified",
    source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"City walls — Trigonion Tower",
    mainTheme:"unesco",
    coords:[40.6425, 22.9594],
    coordStatus:"verified",
    evidence:"field",
    summary:"The city walls formed a major defensive system around historic Thessaloniki, especially on the northern and eastern sides of the upper town.",
    note:"The city walls formed a major defensive system around historic Thessaloniki, especially on the northern and eastern sides of the upper town. Trigonion Tower is one of the most recognisable surviving sections and is also a popular viewpoint over the city and the Thermaic Gulf. The walls are valuable not only as military architecture but also as a clear physical reminder of the historic limits of the city.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Heptapyrgion (Yedi Kule)",
    mainTheme:"unesco",
    coords:[40.6446, 22.9602],
    coordStatus:"verified",
    evidence:"field",
    summary:"Heptapyrgion is the large fortress complex at the highest part of the old city walls.",
    note:"Heptapyrgion is the large fortress complex at the highest part of the old city walls. Although its name refers to seven towers, the complex developed over several historical periods and was later used as a prison. Today it is associated with archaeological management, heritage interpretation and exhibitions, while its elevated position gives it a strong visual presence over Thessaloniki.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Vlatadon Monastery",
    mainTheme:"unesco",
    coords:[40.6448, 22.9538],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Vlatadon Monastery is a Byzantine monastery situated in the upper town, close to the city walls.",
    note:"Vlatadon Monastery is a Byzantine monastery situated in the upper town, close to the city walls. Its location provides views across Thessaloniki and reflects the concentration of important religious institutions in Ano Poli. The monastery is significant both for its late Byzantine history and for the way it remains part of the city’s living religious landscape rather than functioning only as a museum monument.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Acheiropoietos",
    mainTheme:"unesco",
    coords:[40.6366, 22.9487],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Acheiropoietos is one of Thessaloniki’s earliest surviving Christian basilicas.",
    note:"Acheiropoietos is one of Thessaloniki’s earliest surviving Christian basilicas. Its long basilica form and early architectural features make it important for understanding the development of Christian church design in the city. Its location in the central urban area also shows how early Christian monuments remain embedded within the modern commercial and residential city.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Panagia Chalkeon",
    mainTheme:"unesco",
    coords:[40.6353, 22.9427],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Panagia Chalkeon is a Middle Byzantine church located near the traditional commercial centre of Thessaloniki.",
    note:"Panagia Chalkeon is a Middle Byzantine church located near the traditional commercial centre of Thessaloniki. It is built in the cross-in-square style associated with Byzantine church architecture and is often described as the ‘Red Church’ because of its brick exterior. The monument stands close to busy streets and markets, creating a noticeable contrast between a quiet historic church and the surrounding urban activity.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Holy Apostles",
    mainTheme:"unesco",
    coords:[40.6409, 22.9356],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Church of the Holy Apostles is a late Byzantine church associated with the Palaeologan period.",
    note:"The Church of the Holy Apostles is a late Byzantine church associated with the Palaeologan period. Its architecture and decoration reflect the artistic and religious traditions of the final centuries of Byzantine Thessaloniki. The church is located in the western part of the historic centre, where it forms part of a less concentrated but still important network of religious monuments.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Saint Panteleimon",
    mainTheme:"unesco",
    coords:[40.632, 22.954],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Church of Saint Panteleimon is a small Byzantine monument located near the Rotunda and other major historic sites.",
    note:"The Church of Saint Panteleimon is a small Byzantine monument located near the Rotunda and other major historic sites. Its position makes it possible to see several different periods of Thessaloniki’s history within a relatively short walk. The church has also been associated with restoration work that helped protect and present the monument to visitors.",
    factStatus:"verified",
    source:"UNESCO World Heritage Centre, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Saint Nikolaos Orphanos",
    mainTheme:"unesco",
    coords:[40.644, 22.9569],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Saint Nikolaos Orphanos is a late Byzantine church in Ano Poli.",
    note:"Saint Nikolaos Orphanos is a late Byzantine church in Ano Poli. It is particularly important for its surviving wall paintings and for the way it preserves the atmosphere of a smaller neighbourhood religious foundation. Compared with the larger churches in the centre, it offers a more intimate example of Byzantine heritage within the upper town.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Saint Aikaterini",
    mainTheme:"unesco",
    coords:[40.6433, 22.9488],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Church of Saint Catherine is a late Byzantine monument located in the upper town.",
    note:"The Church of Saint Catherine is a late Byzantine monument located in the upper town. Its position among the older streets of Ano Poli helps show how religious buildings were integrated into the everyday structure of the historic city rather than separated into a formal museum quarter. The church is also part of the wider group of Byzantine monuments that gives Thessaloniki its UNESCO status.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Transfiguration of the Saviour",
    mainTheme:"unesco",
    coords:[40.6335, 22.9534],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Church of the Transfiguration of the Saviour is a small late Byzantine church close to the Rotunda.",
    note:"The Church of the Transfiguration of the Saviour is a small late Byzantine church close to the Rotunda. Its modest scale contrasts with the much larger Roman and Byzantine monuments nearby, but this is precisely what makes it useful for understanding the variety of religious buildings that survived in the city. It forms part of the dense historic landscape around the Rotunda and upper city.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Prophitis Ilias",
    mainTheme:"unesco",
    coords:[40.641, 22.95],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Church of Prophet Elijah is a late Byzantine church associated with the upper part of Thessaloniki.",
    note:"The Church of Prophet Elijah is a late Byzantine church associated with the upper part of Thessaloniki. Its architectural form and location reflect the continued importance of religious foundations in the later Byzantine city. The monument is less prominent in the visitor landscape than the Rotunda or Saint Demetrios, but it contributes to the larger network of sites supporting the city’s UNESCO designation.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  {
    name:"Byzantine Bath",
    mainTheme:"unesco",
    coords:[40.6419, 22.952],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Byzantine Bath is a rare surviving example of a public bathing building from the Byzantine period.",
    note:"The Byzantine Bath is a rare surviving example of a public bathing building from the Byzantine period. Unlike the city’s churches and fortifications, it provides evidence of ordinary urban life and communal infrastructure. Its presence in Ano Poli broadens the heritage story beyond religious monuments and helps show how the historic city functioned as a lived urban environment.",
    factStatus:"unverified",
    source:"Listed by UNESCO, dossier 456",
    url:"https://whc.unesco.org/en/list/456/"
  },

  /* ---------- Layer 4 — Tourist hotspots ---------- */

  {
    name:"White Tower",
    mainTheme:"hotspots",
    coords:[40.6264, 22.9484],
    coordStatus:"verified",
    evidence:"field",
    summary:"The White Tower is Thessaloniki’s most recognisable landmark and one of the main symbols used to represent the city.",
    note:"The White Tower is Thessaloniki’s most recognisable landmark and one of the main symbols used to represent the city. It stands beside the waterfront and now functions as a museum and viewing point. Because it is easy to reach and highly visible from the promenade, it attracts a concentrated flow of visitors and acts as a gateway between the central city and Nea Paralia.",
    factStatus:"verified"
  },

  /* ---------- Context (off by default) ---------- */

  {
    name:"Thessaloniki International Fair (Helexpo)",
    mainTheme:"context",
    coords:[40.6278, 22.9554],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Thessaloniki International Fair is one of the city’s major annual events and has operated since 1926.",
    note:"The Thessaloniki International Fair is one of the city’s major annual events and has operated since 1926. The fairground occupies a large central site close to the university and the museums, making it an important part of the city’s event and exhibition infrastructure. Its continuing popularity shows that Thessaloniki’s identity is shaped not only by heritage tourism but also by trade, business, technology and large public events.",
    factStatus:"verified",
    source:"Thessaloniki International Fair (thessalonikifair.gr)"
  },

  {
    name:"Aristotle University (main campus)",
    mainTheme:"context",
    coords:[40.6305, 22.9575],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Aristotle University occupies a substantial central campus between the historic centre and the eastern side of the city.",
    note:"Aristotle University occupies a substantial central campus between the historic centre and the eastern side of the city. Its location brings a large student population into an area that also contains museums, the International Fair and several metro stations. The university is therefore an important part of the city’s everyday population and economy, even though it is not normally treated as a tourist attraction.",
    factStatus:"unverified"
  },

  {
    name:"Panepistimio metro station",
    mainTheme:"context",
    coords:[40.6261, 22.96],
    coordStatus:"verified",
    evidence:"both",
    summary:"Panepistimio station serves the university district and provides access to the central campus, the International Fair and nearby cultural institutions.",
    note:"Panepistimio station serves the university district and provides access to the central campus, the International Fair and nearby cultural institutions. It is part of Thessaloniki’s first metro line, which began public service in 2024. The station is useful as a transport reference point because it connects the historic centre and waterfront area with the city’s main academic zone.",
    factStatus:"verified",
    source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779"
  },

  {
    name:"Venizelou metro station",
    mainTheme:"context",
    coords:[40.6369, 22.9419],
    coordStatus:"verified",
    evidence:"both",
    summary:"Venizelou station is located in the historic centre and is notable for the archaeological remains displayed within the station environment.",
    note:"Venizelou station is located in the historic centre and is notable for the archaeological remains displayed within the station environment. The site brings Roman and Byzantine urban archaeology into an everyday transport setting rather than isolating it inside a conventional museum. It is therefore an important example of how infrastructure, archaeology and public access have been combined in central Thessaloniki.",
    factStatus:"verified",
    source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779"
  },

  {
    name:"Agias Sofias metro station",
    mainTheme:"context",
    coords:[40.6344, 22.9464],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Agias Sofias station serves the central area around the Church of Hagia Sophia and several important historic streets.",
    note:"Agias Sofias station serves the central area around the Church of Hagia Sophia and several important historic streets. Its location places a modern transport facility close to major Byzantine monuments, shops, offices and pedestrian routes. The station helps connect the historic centre with the wider metro network and may also influence how visitors move between individual heritage sites.",
    factStatus:"both",
    source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779"
  },

  {
    name:"25 Martiou metro station",
    mainTheme:"context",
    coords:[40.6006, 22.9583],
    coordStatus:"verified",
    evidence:"desk",
    summary:"25 Martiou is a metro station in the eastern part of Thessaloniki and forms part of the city’s expanding rapid-transit network.",
    note:"25 Martiou is a metro station in the eastern part of Thessaloniki and forms part of the city’s expanding rapid-transit network. It is useful as a context point for examining how new transport links connect the centre with eastern neighbourhoods.",
    factStatus:"verified",
    source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779"
  },

  {
    name:"Nea Elvetia metro station",
    mainTheme:"context",
    coords:[40.5931, 22.9686],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Nea Elvetia is the eastern terminus of the original Line 1 metro service.",
    note:"Nea Elvetia is the eastern terminus of the original Line 1 metro service. The station provides access to the eastern edge of the initial metro network and is associated with wider plans to extend public transport beyond the central city. Its position makes it useful for showing the relationship between the historic core and Thessaloniki’s expanding urban area.",
    factStatus:"verified",
    source:"Elliniko Metro (emetro.gr)",
    url:"https://www.emetro.gr/?lang=en&p=32779"
  },

  {
    name:"Port container terminal (Pier 6)",
    mainTheme:"context",
    coords:[40.6385, 22.912],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Pier 6 is the main container-handling area of the Port of Thessaloniki and is physically separate from the publicly accessible cultural uses around Pier 1.",
    note:"Pier 6 is the main container-handling area of the Port of Thessaloniki and is physically separate from the publicly accessible cultural uses around Pier 1. It represents the port’s continuing industrial and commercial role, including the movement of containers and links with regional trade. Including it alongside Pier 1 helps distinguish the port’s cultural waterfront from its active logistics and freight functions.",
    factStatus:"verified",
    source:"Thessaloniki Port Authority (thpa.gr)",
    url:"https://www.thpa.gr/new-historic-high-in-revenue-and-profitability-for-2025/"
  },

  {
    name:"Makedonia Airport",
    mainTheme:"context",
    coords:[40.5197, 22.9709],
    coordStatus:"verified",
    evidence:"field",
    summary:"Makedonia Airport is Thessaloniki’s main international gateway and is located southeast of the city centre.",
    note:"Makedonia Airport is Thessaloniki’s main international gateway and is located southeast of the city centre. Passenger arrivals make the airport an important part of the region’s tourism economy and its connection to international visitors. It also provides useful context for understanding how the city’s cultural attractions are linked to wider flows of travel, business and migration.",
    factStatus:"verified",
    source:"Fraport Greece",
    url:"https://www.fraport-greece.com/en/media-center/news1/2026/fraport-greece--passenger-traffic-growth-continues--supported-by.html"
  },

  {
    name:"Jewish Museum of Thessaloniki",
    mainTheme:"context",
    coords:[40.6355, 22.9397],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Jewish Museum of Thessaloniki documents the history, culture and destruction of the city’s Jewish community.",
    note:"The Jewish Museum of Thessaloniki documents the history, culture and destruction of the city’s Jewish community. It is located in the historic centre, close to areas that were once part of the city’s Jewish quarter and commercial life. The museum adds an important social and historical dimension to the heritage map, particularly because the city’s public history has often focused more heavily on Roman, Byzantine and Ottoman remains.",
    factStatus:"unverified"
  },

  {
    name:"Archaeological Museum",
    mainTheme:"context",
    coords:[40.6254, 22.954],
    coordStatus:"verified",
    evidence:"desk",
    summary:"The Archaeological Museum presents material from Thessaloniki and the wider region of Macedonia, covering periods from prehistory through late antiquity.",
    note:"The Archaeological Museum presents material from Thessaloniki and the wider region of Macedonia, covering periods from prehistory through late antiquity. Its location near the Museum of Byzantine Culture creates a concentration of major cultural institutions on the eastern side of the centre. Together, these museums offer a chronological counterpoint to the churches and fortifications found in the historic core and Ano Poli.",
    factStatus:"unverified"
  },

  {
    name:"Kordelio-Evosmos (suburb)",
    mainTheme:"context",
    coords:[40.666, 22.911],
    coordStatus:"verified",
    evidence:"desk",
    summary:"Kordelio-Evosmos is a densely populated municipality in the western part of the Thessaloniki urban area.",
    note:"Kordelio-Evosmos is a densely populated municipality in the western part of the Thessaloniki urban area. Its growth contrasts with the population decline and changing role of parts of the historic centre, making it useful for examining suburban expansion and metropolitan change. It is not a conventional visitor attraction, but it provides important context for understanding where residents live beyond the central tourist and heritage zones.",
    factStatus:"unverified"
  }

];

/* ===============================================================
   LINES — places that are a stretch, not a point.
   =============================================================== */

window.LINES = [];
