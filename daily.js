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
    beginner: {c:"[d:Big bird] [i:spotted in] [f:the museum]", a:"EMU", t:"Hidden word", x:"“Spotted in” means the answer is hiding inside the next words: th(E MU)seum. An emu is a big bird, not the yellow one from Sesame Street."},
    easy: {c:"[f:Snoops] [i:back] away from the [d:cutlery]", a:"SPOONS", t:"Reversal", x:"“Back” means read SNOOPS backwards. It gives SPOONS, which is cutlery."},
    medium: {c:"[i:Say] you [f:need] to [d:work the dough]", a:"KNEAD", t:"Homophone", x:"“Say” means it sounds like another word. KNEAD sounds like NEED, and to knead is to work the dough."},
    hard: {c:"[f:Toddler]'s [f:sidekick]? [d:Absolutely]!", a:"TOTALLY", t:"Charade", x:"Toddler = TOT, sidekick = ALLY. TOT + ALLY = TOTALLY, which means absolutely."},
    impossible: {c:"Her [f:smile] [i:faded at first] after [d:a long run]", a:"MILE", t:"Deletion", x:"“Faded at first” means the first letter of SMILE disappears, leaving MILE. A mile is a long run. The surface makes you picture a tired runner, not a missing S."},
  },
  "2026-11-04": {
    beginner: {c:"[i:Inside] [f:a shell, oyster] says [d:hi]", a:"HELLO", t:"Hidden word", x:"“Inside” means the answer is hiding in the next words: a s(HELL O)yster. Hello means hi, so the oyster really is saying hi from inside its shell."},
    easy: {c:"[d:Bambi] [i:backing up] into a [f:reed]", a:"DEER", t:"Reversal", x:"“Backing up” means read REED backwards. It gives DEER, and Bambi is a deer."},
    medium: {c:"[d:Lemonade holder] [d:on the mound]", a:"PITCHER", t:"Double definition", x:"Two meanings, one word. A pitcher holds lemonade, and the pitcher is the player on the mound in baseball."},
    hard: {c:"[f:Toilet paper] [i:wrapped around] [f:Rhode Island]? Some [d:vacation]!", a:"TRIP", t:"Container", x:"Toilet paper = TP. Rhode Island = RI. TP gets wrapped around RI: T(RI)P. A trip is a vacation."},
    impossible: {c:"[f:Peace treaty] signed, then [f:I] go [f:on] the [d:squeeze box]", a:"ACCORDION", t:"Charade", x:"Peace treaty = ACCORD. Then I, then ON. ACCORD + I + ON = ACCORDION, a squeeze box. It reads like a signing ceremony with music, so the wordplay hides in the story."},
  },
};
