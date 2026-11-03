# Mapping Thessaloniki — the 1997 legacy

Static site for the Social Intervention Project. HTML, CSS, one JavaScript file,
Leaflet from a CDN. No build step.

## Files

Seven files in one folder. Keep them together.

| File | What it is |
| --- | --- |
| `places.js` | **The data — the file the group edits** |
| `config.js` | The five layers, their colours, and the three legacy types |
| `index.html` | Page structure and the written sections |
| `styles.css` | Styling |
| `map.js` | The logic — no need to touch it to add data |
| `README.md` | This file |
| `SOURCES.md` | Research leads |

## Looking at it

**On GitHub Pages:** just open the URL.

**Locally:** OpenStreetMap blocks map tiles for pages opened by double-click, so
the map stays blank. Run a tiny server instead, from inside the folder:

    python3 -m http.server

then open `http://localhost:8000`. Everything else (list, buttons, panel) works
either way. A red banner at the top means a file failed to load, and names it.

## How it's organised

**Five layers**, matching slide 9: Pier 1 (the deep dive), comparators, context,
buildings restored or reused around 1997, and sites planned for 1997 but still
unfinished.

**Three legacy types** — physical, eventfulness, sustainability — as a second row
of buttons. A place shows if it's in a layer that's on *and* carries a legacy
type that's on. Switch on only "Eventfulness" and the map shows where eventful
legacy sits.

**Every place has an ID** matching its entry in the evidence file. The ID is also
its link: `#place=mon-06`. Renaming a place never breaks a link.

**Places without coordinates** stay in the list, greyed and marked "not yet
placed", but off the map. Nothing on the map is a guess.

## Placing a site

Right-click the building in Google Maps, click the coordinates at the top of the
menu to copy them, and paste into the place's entry in `places.js`:

    coords:[40.63612, 22.94803],

To move a pin that's already on the map, open the site with `?edit` on the end,
drag the pin, and copy the line that appears.

## Interim coordinates

Entries marked `own check` in `places.js` use coordinates we verified earlier.
Marco's workbook coordinates replace them. If his differ by more than about
30 m, check which is right before replacing.

## Colours

The layer colours in `config.js` are stand-ins until the slide 9 colours are in.
Change the hex codes there and nothing else needs touching. Buttons on light
colours get dark text automatically.

## Photos

Resize to about 1600px wide before the **first** commit. Git keeps deleted files
in its history forever.

## Attribution

Keep the OpenStreetMap credit in the footer and map corner.
