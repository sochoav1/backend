const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./tasks.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, name TEXT, description TEXT, dueDate TEXT)");
});

module.exports = db;
