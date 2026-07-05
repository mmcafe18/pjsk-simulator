const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/characters.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      level INTEGER,
      power INTEGER
    )
  `);
});

module.exports = db;