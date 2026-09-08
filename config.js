/* ---------------------------------------------------------------
   CONFIG — edit this first.
   Everything here controls the masthead and the starting map view.
   --------------------------------------------------------------- */

window.CONFIG = {
  city: "Leipzig",          // <- your city
  country: "Germany",
  group: "ULP Year 3 · Living in the City",

  // Starting map view. Get coordinates by right-clicking in Google Maps.
  centre: [51.3397, 12.3731],
  zoom: 12,

  // One or two sentences under the title. Keep it factual, not promotional.
  standfirst:
    "A working map of the city built for the Social Intervention Project: " +
    "what we found at the desk, what we found on foot, and where the two disagree.",

  // Shown in the footer.
  updated: "September 2026"
};

/* ---------------------------------------------------------------
   THEMES — the map layers.
   Add, remove or rename freely. The `id` must match the `theme`
   value used in places.js. Colours are functional: keep them
   distinguishable rather than pretty.
   --------------------------------------------------------------- */

window.THEMES = [
  { id: "structure", label: "Structure and edges",  colour: "#2F6E8F",
    hint: "Water, rail, motorways, the seams that divide the city" },

  { id: "culture",   label: "Culture and events",   colour: "#B0472B",
    hint: "Venues, festivals, institutions, programming" },

  { id: "legacy",    label: "Legacy of programmes", colour: "#8A6D1F",
    hint: "What a past programme physically left behind" },

  { id: "everyday",  label: "Everyday life",        colour: "#2C7A5B",
    hint: "Markets, transport, where people actually are" },

  { id: "friction",  label: "Friction",             colour: "#7B3F9D",
    hint: "Vacancy, contested space, things that are not working" }
];
