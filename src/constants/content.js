export const INITIAL_ITEMS = [
  { id: 1, text: "Dashboard", color: "#6366f1" },
  { id: 2, text: "Analytics", color: "#f43f5e" },
  { id: 3, text: "Team Members", color: "#06b6d4" },
  { id: 4, text: "Projects", color: "#f59e0b" },
  { id: 5, text: "Settings", color: "#10b981" },
];

export const COST_CARDS = [
  { label: "Numeric Ranking", color: "#e11d48", costKey: "numCost" },
  { label: "LexoRank", color: "#059669", costKey: "lexCost" },
];

export const EXPLAIN_SECTIONS = [
  {
    title: "Problem: Numeric ranking cascades",
    color: "#FF6584",
    content: [
      {
        label: "List of 5 items:",
        code: "id=1 rank=1\nid=2 rank=2\nid=3 rank=3\nid=4 rank=4\nid=5 rank=5",
      },
      {
        label: "Move item #5 to position 1:",
        code: "UPDATE items SET rank=2 WHERE id=1  -- cascade\nUPDATE items SET rank=3 WHERE id=2  -- cascade\nUPDATE items SET rank=4 WHERE id=3  -- cascade\nUPDATE items SET rank=5 WHERE id=4  -- cascade\nUPDATE items SET rank=1 WHERE id=5  -- actual move",
      },
      {
        label: "At 10,000 rows:",
        code: "10,000 UPDATE queries for one drag",
      },
    ],
  },
  {
    title: "Solution: LexoRank with one write",
    color: "#26de81",
    content: [
      {
        label: "Same list with string ranks:",
        code: 'id=1 rank="G"\nid=2 rank="N"\nid=3 rank="T"\nid=4 rank="a"\nid=5 rank="g"',
      },
      {
        label: "Move item #5 between #1 and #2:",
        code: 'midpoint("G", "N") = "K"\nUPDATE items SET rank="K" WHERE id=5  -- only 1 write',
      },
      {
        label: "Result — sorted alphabetically:",
        code: '"G" < "K" < "N" < "T" < "a"\n  #1    #5    #2    #3    #4  ✅',
      },
    ],
  },
  {
    title: "Numeric vs Alphabetic: Why strings win",
    color: "#F7B731",
    content: [
      {
        label: "Numeric: gaps help temporarily",
        code: "rank = 10, 20, 30, 40, 50\nInsert between 10 and 20: rank=15 (1 write)\nInsert between 10 and 15: rank=12 (1 write)\nInsert between 10 and 12: rank=11 (1 write)\nInsert between 10 and 11: no space left\nMust renumber everything and cascade again",
      },
      {
        label: "Strings: infinite midpoints, never run out",
        code: '"G" and "N" gives midpoint "K"\n"G" and "K" gives midpoint "H"\n"G" and "H" gives midpoint "GN" (adds a char)\n"G" and "GN" gives midpoint "GF"\nYou can always find a midpoint by increasing string length',
      },
    ],
  },
];

export const CODE_SECTIONS = [
  {
    title: "lexMid(): Computing midpoint strings",
    code: `function lexMid(a, b) {
  // e.g. lexMid("G", "N") -> "K"
  // e.g. lexMid("G", "H") -> "GN"  (adds a character)
  const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
               + "abcdefghijklmnopqrstuvwxyz";

  let result = "";
  for (let i = 0; i < Math.max(a.length, b.length) + 5; i++) {
    const ac = i < a.length ? a[i] : "0";
    const bc = i < b.length ? b[i] : "z";

    if (ac === bc) { result += ac; continue; }

    const aiIdx = CHARS.indexOf(ac);
    const biIdx = CHARS.indexOf(bc);
    const midIdx = Math.floor((aiIdx + biIdx) / 2);

    if (midIdx !== aiIdx && midIdx !== biIdx) {
      return result + CHARS[midIdx]; // found a midpoint char
    }
    // chars are adjacent - go deeper
    result += ac;
  }
  return result + "N"; // fallback
}`,
  },
  {
    title: "Reorder handler",
    code: `function onDrop(items, fromIdx, toIdx) {
  const prevRank = toIdx > 0
    ? items[toIdx - 1].rank : "0";          // item above
  const nextRank = toIdx < items.length - 1
    ? items[toIdx + 1].rank : "z";          // item below

  const newRank = lexMid(prevRank, nextRank);

  // Only ONE database write, no matter the list size
  await db.query(
    "UPDATE items SET rank = $1 WHERE id = $2",
    [newRank, items[toIdx].id]
  );
}`,
  },
  {
    title: "Database schema",
    code: `-- PostgreSQL
CREATE TABLE items (
  id     SERIAL PRIMARY KEY,
  text   TEXT NOT NULL,
  rank   TEXT NOT NULL        -- string, not integer!
);

-- Index for fast ORDER BY
CREATE INDEX idx_items_rank ON items (rank);

-- Fetch in correct order
SELECT * FROM items
ORDER BY rank ASC;           -- alphabetical sort = correct order`,
  },
  {
    title: "Rebalancing long rank strings",
    code: `-- After many insertions, you might see:
-- rank = "GNMNmnGNMN"  (10 chars, ugly)

-- Background job rebalances every few hours:
async function rebalance() {
  const items = await db.query(
    "SELECT id FROM items ORDER BY rank ASC"
  );
  const SPREAD = ["G", "N", "T", "a", "g", ...];
  // Distribute evenly across the alphabet

  for (let i = 0; i < items.length; i++) {
    await db.query(
      "UPDATE items SET rank = $1 WHERE id = $2",
      [SPREAD[i], items[i].id]
    );
  }
}
// Run via cron: every 6 hours
// Cost: acceptable - it's async, not user-facing`,
  },
];
