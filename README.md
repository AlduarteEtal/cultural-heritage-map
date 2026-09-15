# Mapping Thessaloniki

Static site for the Social Intervention Project. No build step and nothing to
install — HTML, CSS, one JavaScript file, and Leaflet from a CDN.

Seeded with **two example places and one walk** so you can see it working.
Replace them with your own.

## Files

Seven files, all in one folder, no subdirectories. Keep them together.

| File | What it is |
| --- | --- |
| `places.js` | **The data. This is the file the group edits.** |
| `config.js` | Map centre and the six layers with their colours |
| `index.html` | Page structure and the written sections |
| `styles.css` | All styling |
| `map.js` | Map, pills, list and panel logic — no need to touch it to add data |
| `README.md` | This file |
| `SOURCES.md` | Research leads and open data for Thessaloniki |

Load order matters: `config.js`, then `places.js`, then `map.js`.

## Try it locally first

Double-click `index.html`. It works straight off your filesystem — no server
needed. A map and no red banner means everything loaded.

## Publishing

Drag all seven files (not the folder) into your repo, then Settings → Pages →
Source *Deploy from a branch* → `main` / `/ (root)`.

To test on a branch: use the branch dropdown on the repo, type a name, create
it, upload there, and point Pages at that branch. Switch Pages back afterwards.

## If it looks broken

The page checks itself. A missing file gives a dark red banner across the top
naming what failed, rather than silently rendering as unstyled text. Unstyled
text with *no* banner means `index.html` was opened alone, away from the others
— usually by clicking inside an archive manager instead of extracting first.

## Adding a place

Open `places.js`. The writing template is at the top of the file: copy it, paste
at the bottom, fill it in.

- `mainTheme` drives the pin colour. `alsoThemes` is optional and takes any number.
- `ourArea: true` for the Rotunda district — round pin. Everywhere else is square.
- `coords` is `[latitude, longitude]` — right-click in Google Maps, copy the pair.
- `evidence` is `"desk"`, `"field"` or `"both"`. It shows as a chip in the list.
- `summary` is optional. Leave it out and the first sentence of `note` is used.
- Every entry ends with `},` except the last, which ends `}`.

A mistyped theme id logs a warning in the browser console (F12) naming the place,
and that theme is dropped. If a place's *only* theme is mistyped it vanishes from
both the map and the list, so read the console if something goes missing.

## Shareable links

Every place has its own URL, generated from its name:
`index.html#place=rotunda-and-the-arch-of-galerius`. Opening that link opens the
place and flies the map to it — useful for sending a stakeholder straight to one
entry, or jumping to a place mid-presentation without hunting for it.

Renaming a place changes its URL and breaks any link you have already shared. If
that matters, give the place an `id` and the URL will use that instead, whatever
you do to the name afterwards.

## How the page works

**The pills are the legend.** Six coloured buttons above the map, each toggling a
layer independently. A place shows if *any* of its themes is switched on.

**Places group by theme in the list.** A place appears once, under its main theme,
with its other themes as chips. Switch its main theme off and it moves to the
first theme it has that is still on — and the pin recolours to match, so the pin
and the heading always agree.

**"Only our area"** narrows everything to the Rotunda district. It combines with
the theme pills rather than overriding them.

**Clicking a place opens the detail panel** over the map, with the full note and
any photos. Close it with the button or the Esc key. On a phone it fills the
screen instead.

**If the list is empty** the page tells you which of the three reasons applies:
no places entered yet, filters hiding everything (with a button to clear them),
or something wrong in the data — in which case check the browser console, since a
mistyped theme name drops a place from the list entirely.

## Fonts and colour

No web fonts. Arial for the interface, Georgia for prose — both already on every
machine, so the page loads faster, works offline, and makes no third-party
requests. If Greek text renders oddly on some machine, the fallback stack in
`styles.css` handles it.

The six theme colours are checked rather than picked by eye: separated in
lightness as well as hue, so they survive greyscale, printing, and the three
common forms of colour blindness. Six distinct hues on a pale basemap is about
the practical limit, which is why every chip also spells out its theme name —
colour never carries meaning on its own. If you change a colour, check it in
Color Oracle or Coblis.

## Photos

Resize to about 1600px wide and save as JPEG **before the first commit**. Git
keeps every version of every file forever, so committing 6 MB phone originals and
deleting them later does not shrink the repo — the history still carries them.
Put the files next to `index.html` and reference them by name: `photos:["x.jpg"]`.

## Working as a group

Three people editing one file will eventually collide. Two options:

**One editor.** Everyone logs finds in a shared spreadsheet, one person converts
to `places.js` entries once or twice a week. Zero conflicts.

**Split the file.** Give each person their own file (`places-anna.js`), each
starting with `window.PLACES = (window.PLACES || []).concat([ ... ]);` and add a
script tag for each in `index.html` after `config.js`.

## Attribution

The basemap needs the OpenStreetMap credit already in the footer and the map
corner. Leave both in place. Tiles come from OpenStreetMap's public servers,
which need no key. If you ever want a crisper, paler basemap, Stadia Maps'
`alidade_smooth` is a drop-in replacement for the tile URL in `map.js` — and you
would then delete the `.basemap` filter rule in `styles.css`.
