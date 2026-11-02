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
  "2026-11-03": {
    beginner: {c:"[d:Noah's boat] [i:hidden in] [f:the park]", a:"ARK", t:"Hidden word", x:"“Hidden in” means the answer is tucked inside the next words: the p(ARK). The ark was Noah's boat."},
    easy: {c:"[d:Where you live], [i:initially] [f:having only modest expenses]", a:"HOME", t:"First letters", x:"“Initially” means take the first letters: Having Only Modest Expenses gives H, O, M, E. Home is where you live."},
    medium: {c:"[d:Flower] [f:rows], [i:it's said]", a:"ROSE", t:"Homophone", x:"“It's said” means it sounds like another word. ROSE sounds like ROWS, and a rose is a flower."},
    hard: {c:"[d:Doctor's case]: [f:tap] [i:back], [f:one] [f:ear specialist]", a:"PATIENT", t:"Charade", x:"TAP read back is PAT, one = I, ear specialist = ENT. PAT + I + ENT = PATIENT, a doctor's case."},
    impossible: {c:"[f:Smart] [i:leader axed] with a [d:pry bar]", a:"LEVER", t:"Deletion", x:"Smart = CLEVER. Axe its leader, the C, and LEVER is left, a bar you pry with. The surface makes you picture a fight, not a word."},
  },
};
