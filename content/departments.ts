/**
 * Demo departments for the homepage's rotating examples (hero map, ticker,
 * five-second question, how-it-works phone, live floor). One standard per
 * department, the same Standard → Timed task → Evidence → Record loop for all.
 * Everything here is Aurora Grand Colombo demo data. Client-safe.
 */
export type Department = {
  id: string;
  /** Short tab label. */
  label: string;
  /** Map zone this department lights on the hero property map. */
  zone: string;
  standardId: string;
  standardName: string;
  task: string;
  where: string;
  targetMin: number;
  /** Human target, e.g. "6-min target" or "every 4h". */
  target: string;
  photoGate: string;
  steps: string[];
  /** Indexes into `steps` that are photo-gated. */
  photoSteps: number[];
  question: string;
  filter: string;
  completed: string;
  signOff: string;
  /** Service-record rows shown on the phone's record screen (newest first). */
  recordRows: string[];
  /** This-shift task counts for the live floor (demo data). */
  shift: { closed: number; progress: number; blocked: number; queued: number };
  readiness: number;
  /** The staff app's Today screen for this department (illustrative, demo data). */
  today: { person: string; initials: string; role: string; shift: string; noun: string; next: string; remaining: string; area: string };
};

export const departments: Department[] = [
  {
    id: "front-office",
    label: "Front office",
    zone: "Lobby · front desk",
    standardId: "FO-204",
    standardName: "Arrival to key",
    task: "VIP arrival",
    where: "Front desk",
    targetMin: 6,
    target: "6-min target",
    photoGate: "ID + room-ready confirmation",
    steps: ["Greet by name", "Verify ID and booking", "ID capture photo", "Confirm room ready", "Explain stay highlights", "Key and escort", "Log arrival"],
    photoSteps: [2, 3],
    question: "Was the VIP in 1204 roomed within six minutes, and can you prove it?",
    filter: "std:FO-204 · today · VIP",
    completed: "08:02 · 5 of 6 min",
    signOff: "J. Lee · 08:05",
    recordRows: ["07:48 · Front desk · FO-204 closed · 5 of 6 min", "07:31 · Front desk · Room-ready confirmed", "07:12 · Handover · acknowledged"],
    shift: { closed: 46, progress: 9, blocked: 1, queued: 8 },
    readiness: 86,
    today: { person: "Arjun", initials: "AR", role: "Front desk agent", shift: "Sunday · Morning shift · 07:00–15:30", noun: "arrival", next: "The VIP in 1204 lands at 08:00. Your timed task, live standard and five-star welcome are ready before the car arrives.", remaining: "6 min target", area: "Front desk" },
  },
  {
    id: "housekeeping",
    label: "Housekeeping",
    zone: "Guest rooms",
    standardId: "HSK-101",
    standardName: "Guest room reset",
    task: "Room 208 reset",
    where: "Room 208",
    targetMin: 26,
    target: "26-min target",
    photoGate: "Bathroom finish",
    steps: ["Strip bed, remove linen", "Clean and sanitise bathroom", "Bathroom finish photo", "Make bed to standard", "Restock amenities to par", "Guest-eye scan", "Release room"],
    photoSteps: [2],
    question: "Was room 208 reset to standard this morning, and can you prove it?",
    filter: "room:208 · today",
    completed: "08:39 · 24 of 26 min",
    signOff: "E. Rossi · 08:42",
    recordRows: ["08:21 · Room 206 · Released · E. Rossi", "08:04 · Room 204 · Sign-off · 23 of 26 min", "07:48 · Room 202 · Photo evidence"],
    shift: { closed: 52, progress: 11, blocked: 2, queued: 9 },
    readiness: 91,
    today: { person: "Maya", initials: "MF", role: "Room attendant", shift: "Sunday · Morning shift · 07:00–15:30", noun: "room", next: "Room 208 is next. Your timed task, live standard and five-star finish are ready before you open the door.", remaining: "26 min target", area: "Floor 2" },
  },
  {
    id: "food-and-beverage",
    label: "F&B service",
    zone: "Restaurant",
    standardId: "FB-310",
    standardName: "Restaurant reset",
    task: "Breakfast close",
    where: "Restaurant",
    targetMin: 18,
    target: "18-min target",
    photoGate: "Table setup",
    steps: ["Clear and wipe tables", "Reset cutlery and linen", "Table setup photo", "Restock buffet station", "Check chairs and floor", "Lunch setup ready"],
    photoSteps: [2],
    question: "Was the restaurant reset after breakfast before lunch opened, and can you prove it?",
    filter: "std:FB-310 · today",
    completed: "10:41 · 16 of 18 min",
    signOff: "R. Perera · 10:44",
    recordRows: ["10:41 · Restaurant · FB-310 closed · 16 of 18 min", "10:12 · Restaurant · Buffet restocked", "07:00 · Restaurant · Opening check held"],
    shift: { closed: 31, progress: 6, blocked: 1, queued: 5 },
    readiness: 88,
    today: { person: "Ravi", initials: "RP", role: "Restaurant server", shift: "Sunday · Breakfast · 06:30–11:00", noun: "reset", next: "Breakfast closes at 10:30. The restaurant reset, table standard and photo check are ready for lunch.", remaining: "18 min target", area: "Restaurant" },
  },
  {
    id: "kitchen",
    label: "Kitchen",
    zone: "Kitchen",
    standardId: "KIT-115",
    standardName: "Cold-chain check",
    task: "Walk-in temperature log",
    where: "Kitchen",
    targetMin: 5,
    target: "every 4h",
    photoGate: "Thermometer reading",
    steps: ["Open walk-in log task", "Read walk-in temperature", "Thermometer reading photo", "Check door seal and shelving", "Record corrective action if out of range", "Close log"],
    photoSteps: [2],
    question: "Was the walk-in logged at 06:00, and can you prove it?",
    filter: "std:KIT-115 · 06:00",
    completed: "06:02 · 3.1 °C · in range",
    signOff: "S. Fernando · 06:10",
    recordRows: ["06:02 · Kitchen · KIT-115 temp log · evidence held", "02:00 · Kitchen · KIT-115 temp log · in range", "22:00 · Kitchen · Closing hygiene round"],
    shift: { closed: 18, progress: 2, blocked: 0, queued: 4 },
    readiness: 94,
    today: { person: "Sunil", initials: "SF", role: "Commis chef", shift: "Sunday · Early kitchen · 05:00–13:00", noun: "check", next: "The walk-in log is due at 06:00. Range, steps and the thermometer photo are ready on screen.", remaining: "Every 4h", area: "Main kitchen" },
  },
  {
    id: "engineering",
    label: "Engineering",
    zone: "Plant room",
    standardId: "ENG-402",
    standardName: "Fault first response",
    task: "AC complaint, room 512",
    where: "Room 512",
    targetMin: 15,
    target: "15-min target",
    photoGate: "Fixed + tested",
    steps: ["Acknowledge complaint", "Attend and isolate", "Diagnose fault", "Fix and test", "Fixed and tested photo", "Update front desk"],
    photoSteps: [4],
    question: "Was the AC in 512 fixed and tested within fifteen minutes, and can you prove it?",
    filter: "std:ENG-402 · room:512",
    completed: "09:27 · 13 of 15 min",
    signOff: "M. Silva · 09:30",
    recordRows: ["09:27 · Room 512 · ENG-402 fixed + tested", "08:15 · Plant room · Generator test held", "07:40 · Pool · Water test held"],
    shift: { closed: 14, progress: 3, blocked: 1, queued: 3 },
    readiness: 82,
    today: { person: "Nimal", initials: "NP", role: "Duty technician", shift: "Sunday · Day shift · 08:00–16:00", noun: "fix", next: "Room 512 reports the AC is not cooling. Response steps and the fixed-and-tested check are ready.", remaining: "15 min target", area: "Room 512" },
  },
  {
    id: "security-and-safety",
    label: "Security",
    zone: "Fire exits",
    standardId: "SEC-020",
    standardName: "Fire-exit round",
    task: "Night round, floors 1–14",
    where: "Floors 1–14",
    targetMin: 40,
    target: "40-min round",
    photoGate: "Each exit clear",
    steps: ["Start round at 02:00", "Floors 1–4 exits", "Exit clear photo (each)", "Floors 5–14 exits", "Report any blocked exit", "Close round"],
    photoSteps: [2],
    question: "Was the fire-exit round done last night, and can you prove it?",
    filter: "std:SEC-020 · last night",
    completed: "02:38 · 28 of 28 exits",
    signOff: "K. Bandara · 07:05",
    recordRows: ["02:38 · Floors 1–14 · SEC-020 closed · 28 exits", "23:30 · Perimeter · Round held", "21:00 · Key cabinet · Count held"],
    shift: { closed: 9, progress: 1, blocked: 0, queued: 2 },
    readiness: 97,
    today: { person: "Kasun", initials: "KB", role: "Security officer", shift: "Saturday · Night shift · 22:00–06:00", noun: "round", next: "The 02:00 fire-exit round covers floors 1–14. Every exit needs a photo before the round closes.", remaining: "40 min round", area: "Floors 1–14" },
  },
  {
    id: "spa-and-wellness",
    label: "Spa",
    zone: "Spa",
    standardId: "SPA-210",
    standardName: "Treatment room turnover",
    task: "Treatment room 3",
    where: "Spa room 3",
    targetMin: 12,
    target: "12-min target",
    photoGate: "Room reset",
    steps: ["Change linen", "Sanitise bed and surfaces", "Reset products", "Set temperature and lighting", "Room reset photo", "Ready for next guest"],
    photoSteps: [4],
    question: "Was treatment room 3 reset before the 11:00 guest, and can you prove it?",
    filter: "std:SPA-210 · room:3",
    completed: "10:52 · 11 of 12 min",
    signOff: "A. Rahman · 10:55",
    recordRows: ["10:52 · Spa room 3 · SPA-210 closed · 11 of 12 min", "09:40 · Spa room 1 · Turnover held", "08:30 · Spa · Opening check held"],
    shift: { closed: 12, progress: 2, blocked: 0, queued: 3 },
    readiness: 89,
    today: { person: "Amaya", initials: "AR", role: "Spa therapist", shift: "Sunday · Spa · 09:00–18:00", noun: "turnover", next: "Treatment room 3 hosts the 11:00 guest. The reset, rituals and room photo are ready.", remaining: "12 min target", area: "Spa room 3" },
  },
];

/** Interleaved service-record ticker: one line per department, then a second pass. */
export const departmentTicker = [
  { time: "08:02", where: "Front desk", what: "FO-204 arrival closed · 5 of 6 min", tone: "green" },
  { time: "08:11", where: "Kitchen", what: "KIT-115 temp log · evidence held", tone: "green" },
  { time: "08:39", where: "Room 208", what: "HSK-101 photo evidence · step 3", tone: "cyan" },
  { time: "09:27", where: "Room 512", what: "ENG-402 fixed + tested · 13 of 15 min", tone: "green" },
  { time: "10:41", where: "Restaurant", what: "FB-310 breakfast close · signed off", tone: "gold" },
  { time: "10:52", where: "Spa room 3", what: "SPA-210 turnover · room reset photo", tone: "green" },
  { time: "02:38", where: "Floors 1–14", what: "SEC-020 fire-exit round · 28 exits", tone: "gold" },
  { time: "11:05", where: "Room 305", what: "Blocked · engineering flag raised", tone: "coral" },
] as const;
