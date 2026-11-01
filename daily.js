// Fresh clue sets written each day by the scheduled task.
// Keys are New York dates (YYYY-MM-DD). Each set has one clue per level.
// Markup: [d:...] definition, [i:...] indicator, [f:...] fodder / wordplay pieces.
// When a date has no set here, the app falls back to its built-in rotation.
window.TWISTY_DAILY = {
  "2026-11-02": {
    beginner: {c:"[d:Italian dish] [i:found in] [f:the spa starts]", a:"PASTA", t:"Hidden word", x:"“Found in” means the answer is hiding inside the next words: the s(PA STA)rts. Pasta is an Italian dish."},
    easy: {c:"[d:Pieces] [f:strap] [i:turned over]", a:"PARTS", t:"Reversal", x:"“Turned over” means read STRAP backwards. It gives PARTS, which means pieces."},
    medium: {c:"[d:Fruit]: [f:stare] [i:swallowing] [f:right]", a:"GRAPE", t:"Container", x:"Stare = GAPE. Right = R. GAPE “swallows” R: G(R)APE. A grape is a fruit."},
    hard: {c:"[d:Ship]: [f:small] [f:squad] [f:hospital department]", a:"STEAMER", t:"Charade", x:"Small = S, squad = TEAM, hospital department = ER. S + TEAM + ER = STEAMER, a ship."},
    impossible: {c:"[f:The margin] [i:warped] into a [d:bad dream]", a:"NIGHTMARE", t:"Anagram", x:"“Warped” tells you to rearrange THE MARGIN. Those nine letters make NIGHTMARE, a bad dream."},
  },
};
