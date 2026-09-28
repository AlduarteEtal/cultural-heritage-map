# Mapping Thessaloniki

Static site for the Social Intervention Project. No build step, nothing to
install: HTML, CSS, one JavaScript file, and Leaflet from a CDN.

## Files

Seven files in one folder, no subdirectories. Keep them together.

| File | What it is |
| --- | --- |
| `places.js` | **The data. The file the group edits.** |
| `config.js` | The five layers and their colours |
| `index.html` | Page structure and the written sections |
| `styles.css` | All styling |
| `map.js` | The logic — no need to touch it to add data |
| `README.md` | This file |
| `SOURCES.md` | Research leads for Thessaloniki |

## Try it locally

Double-click `index.html`. A map with no red banner means everything loaded.
The page checks itself and names any file that failed to load.

## Publishing

Drag all seven files (not the folder) into the repo, then Settings → Pages →
*Deploy from a branch* → `main` / `/ (root)`.

## The layers

Four layers from slide 11, in the same colours, plus **Context**, which starts
switched off. Context points (airport, port, metro, suburbs) also don't count
toward the starting view, so the map opens on the city centre rather than the
whole metro area.

- **Numbered pins** are the transect stops, 1 to 4, and the list keeps them in order.
- **Hollow pins** are locations not yet checked on the ground. Solid means checked.
- **The dotted line** is Nea Paralia. Click it to open stop 3.
- Pins that sit almost on top of each other fan out slightly when zoomed out,
  and return to their true spot when you zoom in.

## Adding or fixing a place

The template is at the top of `places.js`. Two fields worth knowing:

- `coordStatus` — is the **pin** in the right place? `verified` or `approximate`.
- `factStatus` — are the **facts** backed by a source? `verified`, `unverified`,
  or `observed` for your own field notes.

They're separate on purpose. A pin can be exactly right while its facts still
need a source, and the other way round. Both show in the detail panel.

## Fixing pins with edit mode

Open the site with `?edit` on the end: `index.html?edit`.

Pins become draggable. Drag one onto the right building (zoom right in — the map
shows building outlines) and its new coordinates appear in a box at the bottom
of the map, already marked `coordStatus:"verified"`. Copy, paste over the old
line in `places.js`, done.

Nothing you drag is saved until you paste it into the file.

## Shareable links

Every place has its own link, built from its name:
`index.html#place=aristotelous-square`. Useful for jumping to a place during a
presentation. Renaming a place changes its link; add an `id` field to fix it.

## Photos

Resize to about 1600px wide before the **first** commit. Git keeps deleted files
in its history forever, so large originals bloat the repo permanently.

## Fonts and colour

No web fonts: Arial for the interface, Georgia for text. The slide 11 colours are
used exactly. Yellow and grey buttons get dark text automatically, since white
text on them isn't readable. Theme names are always written out in the list, so
colour never carries meaning on its own.

## Attribution

Keep the OpenStreetMap credit in the footer and map corner. The tiles need no key.
