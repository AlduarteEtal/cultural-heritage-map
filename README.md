# Mapping Thessaloniki

Static site for the Social Intervention Project. No build step and nothing to
install — HTML, CSS, one JavaScript file, and Leaflet from a CDN.

Seeded with **two example places and one walk** so you can see it working.
Replace them with your own.

## Files

Seven files, all in one folder, no subdirectories. Keep them together — the
page loads them by name from alongside itself.

| File | What it is |
| --- | --- |
| `places.js` | **The data. This is the file the group edits.** |
| `config.js` | Map centre, the eras, the layers and their colours |
| `index.html` | Page structure and the written sections |
| `styles.css` | All styling |
| `map.js` | Map and list logic — no need to touch it to add data |
| `README.md` | This file |
| `SOURCES.md` | Research leads and open data for Thessaloniki |

Load order matters: `config.js`, then `places.js`, then `map.js`. If you add a
script tag, keep it after those three.

## If it looks broken

The page checks itself. If a file is missing it shows a dark red banner across
the top naming what failed, rather than silently rendering as unstyled text.

Unstyled text with no banner at all means `index.html` was opened on its own,
away from the other six files — most often by double-clicking inside an archive
manager instead of extracting first.

## Publishing

Drag all seven files (not the folder) into your repo, then Settings → Pages →
Source *Deploy from a branch* → `main` / `/ (root)`.

To try it on a branch first: use the branch dropdown on the repo, type a name,
create it, upload there, and point Pages at that branch. Switch Pages back when
you're done.

To check it before pushing, double-click `index.html`. It works straight off
your filesystem — no server needed.

## Adding a place

Open `data/places.js`, copy the template at the top, paste it at the bottom of
the list, fill it in.

- `theme` must match an `id` in `config.js`
- `eras` is one or more ids from the `ERAS` list — a place can be in several
- `coords` is `[latitude, longitude]` — right-click in Google Maps, copy the pair
- `evidence` is `"desk"`, `"field"` or `"both"`
- every entry ends with `},` except the last, which ends `}`

If a place doesn't show up in the list, open the browser console (F12). A
mistyped theme name logs a warning there. Note that a typo'd theme still drops
a pin on the map but gives it no list entry, so the warning is worth reading.

## How the page works

**The list is the legend.** There's no separate panel. Click a theme heading to
show only that layer; click it again, or use "Show all layers", to bring the
rest back.

**Hovering links the two halves.** Hover a list entry and its pin swells; hover
a pin and its entry highlights. Click either to open the note.

**The era slider steps through named periods, not years.** A linear year slider
doesn't work for a city founded in 315 BC — everything after 1900 ends up in the
last few pixels. Places outside the selected era dim to 16% rather than
disappearing, so the city stays readable. Edit the `ERAS` array in `config.js`
to change the periods; keep `tick` to about four characters so the labels under
the slider don't collide.

The era and layer filters combine, so isolating "Legacy of 1997" while the
slider sits on "Ottoman city" will correctly show nothing.

## Photos

Resize to about 1600px wide and save as JPEG before committing. Phone originals
are 4–8 MB each and will make the site slow.

## Working as a group

Three people editing one file will eventually collide. Two options:

**One editor.** Everyone logs finds in a shared spreadsheet, one person converts
to `places.js` entries once or twice a week. Zero conflicts.

**Split the file.** Give each person their own file (`places-anna.js`), each
starting with `window.PLACES = (window.PLACES || []).concat([ ... ]);` and add a
script tag for each in `index.html` after `config.js`. Everyone edits only their
own file, so conflicts are almost impossible.

## Attribution

The basemap needs the OpenStreetMap credit that's already in the footer and the
map corner. Leave both in place.

Tiles come from OpenStreetMap's public servers, which need no key but ask that
you don't hammer them. Fine for a project this size. If you ever want a crisper,
paler basemap, Stadia Maps' `alidade_smooth` is a drop-in replacement for the
tile URL in `map.js` — free tier, quick sign-up — and you'd then delete the
`.basemap` filter rule in `styles.css`.
