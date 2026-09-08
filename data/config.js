/* ---------------------------------------------------------------
   CONFIG — Thessaloniki
   --------------------------------------------------------------- */

window.CONFIG = {
  city: "Thessaloniki",
  country: "Greece",
  group: "ULP Year 3 · Living in the City 26–27",

  centre: [40.6335, 22.9440],
  zoom: 13,

  standfirst:
    "A working map of Thessaloniki for the Social Intervention Project. " +
    "The city was European Capital of Culture in 1997 and spent the " +
    "following three decades arguing about what that left behind. We are " +
    "mapping what is still standing, what is still running, and what quietly " +
    "closed.",

  updated: "September 2026"
};

/* ---------------------------------------------------------------
   THEMES — tuned to this city.
   --------------------------------------------------------------- */

window.THEMES = [
  { id: "layers",  label: "Layers of the city",   colour: "#2F6E8F",
    hint: "Roman, Byzantine, Ottoman, the 1917 fire, the 1922 refugee districts" },

  { id: "legacy",  label: "Legacy of 1997",       colour: "#8A6D1F",
    hint: "What the Capital of Culture built, and whether it still operates" },

  { id: "culture", label: "Culture now",          colour: "#B0472B",
    hint: "Venues, festivals, independent spaces, who funds them" },

  { id: "metro",   label: "The metro",            colour: "#5C4B9E",
    hint: "Stations, the antiquities kept in them, what changed above ground" },

  { id: "everyday", label: "Everyday life",       colour: "#2C7A5B",
    hint: "Markets, the waterfront, Ano Poli, student districts" },

  { id: "friction", label: "Friction",            colour: "#A03A5E",
    hint: "Vacancy, the port edge, short-let pressure, contested space" }
];
