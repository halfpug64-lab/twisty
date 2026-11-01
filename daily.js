// Fresh clue sets written each day by the scheduled task.
// Keys are New York dates (YYYY-MM-DD). Each set has one clue per level.
// Markup: [d:...] definition, [i:...] indicator, [f:...] fodder / wordplay pieces.
// When a date has no set here, the app falls back to its built-in rotation.
window.TWISTY_DAILY = {
  "2026-11-01": {
    beginner: {c:"[d:Insect] [i:in] [f:the beer]", a:"BEE", t:"Hidden word", x:"“In” means the answer is hiding inside the next words: th(E BEE)r holds B-E-E. A bee is an insect."},
    easy: {c:"[f:Pan] [i:flipped] for a [d:snooze]", a:"NAP", t:"Reversal", x:"Flip PAN around and it reads NAP, a snooze."},
    medium: {c:"[d:Small house]: [f:taxi] [f:at home]", a:"CABIN", t:"Charade", x:"Taxi = CAB, at home = IN. CAB + IN = CABIN, a small house."},
    hard: {c:"[f:Deviates] [i:wildly] for a [d:calming drug]", a:"SEDATIVE", t:"Anagram", x:"“Wildly” tells you to rearrange DEVIATES. The letters make SEDATIVE, a calming drug."},
    impossible: {c:"[f:Exist] at [f:speed]? [d:Tell off]!", a:"BERATE", t:"Charade", x:"Exist = BE, speed = RATE. BE + RATE = BERATE, which means tell off. The trick is spotting the split in the middle of the word."},
  },
  "2026-11-02": {
    beginner: {c:"[d:Italian dish] [i:found in] [f:the spa starts]", a:"PASTA", t:"Hidden word", x:"“Found in” means the answer is hiding inside the next words: the s(PA STA)rts. Pasta is an Italian dish."},
    easy: {c:"[d:Pieces] [f:strap] [i:turned over]", a:"PARTS", t:"Reversal", x:"“Turned over” means read STRAP backwards. It gives PARTS, which means pieces."},
    medium: {c:"[d:Fruit]: [f:stare] [i:swallowing] [f:right]", a:"GRAPE", t:"Container", x:"Stare = GAPE. Right = R. GAPE “swallows” R: G(R)APE. A grape is a fruit."},
    hard: {c:"[d:Ship]: [f:small] [f:squad] [f:hospital department]", a:"STEAMER", t:"Charade", x:"Small = S, squad = TEAM, hospital department = ER. S + TEAM + ER = STEAMER, a ship."},
    impossible: {c:"[f:The margin] [i:warped] into a [d:bad dream]", a:"NIGHTMARE", t:"Anagram", x:"“Warped” tells you to rearrange THE MARGIN. Those nine letters make NIGHTMARE, a bad dream."},
  },
};
