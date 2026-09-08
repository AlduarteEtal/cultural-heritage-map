# Mapping Thessaloniki

Static site for the Social Intervention Project, Part A. No build step and
nothing to install — HTML, CSS, one JavaScript file, and Leaflet from a CDN.

Currently seeded with **two example places and one walk** so you can see it
working. Replace them with your own.

## Publishing

Unzip, then either:

**Drag and drop.** On a new empty repo, click *uploading an existing file*,
drag in everything from this folder (the files, not the folder itself), commit.

**Or from the terminal.**

```
cd thessaloniki-map
git init
git add .
git commit -m "Add city map"
git branch -M main
git remote add origin git@github.com:YOURNAME/YOURREPO.git
git push -u origin main
```

Then: repo → **Settings** → **Pages** → Source *Deploy from a branch* →
`main` / `/ (root)` → Save. The URL appears at the top of that page after a
minute or two.

To check it before pushing, just double-click `index.html`. It works from the
local filesystem — no server needed.

If the site is at `username.github.io/repo-name/`, everything still works — all
paths here are relative.

## Files

| File | What it is |
| --- | --- |
| `data/config.js` | City name, map centre, the themes and their colours |
| `data/places.js` | **The data. This is the file the group edits.** |
| `index.html` | The page and the written sections |
| `assets/styles.css` | All styling |
| `assets/map.js` | Map logic — no need to touch it to add data |
| `assets/photos/` | Drop field photos here |

## Adding a place

Open `data/places.js`, copy the template at the top of the file, paste it at the
bottom of the list, fill it in. The only rules:

- `theme` must match an `id` in `config.js`
- `coords` is `[latitude, longitude]` — right-click in Google Maps, copy the pair
- `evidence` is `"desk"`, `"field"` or `"both"`
- every entry ends with `},` except the last one, which ends `}`

If a pin doesn't appear, open the browser console (F12). A mistyped theme name
logs a warning there.

## Photos

Resize to about 1600px wide and save as JPEG before committing. Phone originals
are 4–8 MB each and GitHub Pages will get slow. On macOS: select in Finder →
right-click → Quick Actions → Convert Image. Reference them as
`assets/photos/name.jpg`.

## Working as a group

Five people committing to one file will produce conflicts. Pick one:

**Option A — one editor.** Everyone logs finds in a shared spreadsheet with the
columns `name, theme, lat, lng, evidence, note, date, by, photo, source`. One
person converts to `places.js` entries once or twice a week. Slowest to update,
zero conflicts, recommended unless the group is comfortable with git.

**Option B — split the file.** Give each person their own file
(`data/places-anna.js` etc.), each starting with
`window.PLACES = (window.PLACES || []).concat([ ... ]);`, and add a `<script>`
tag for each in `index.html`. Everyone edits only their own file, so conflicts
are almost impossible.

Either way: commit small and often, and write commit messages that say what was
added, not "update".

## Attribution

The basemap requires the OpenStreetMap and CARTO credit that is already in the
footer and the map corner. Leave both in place.
