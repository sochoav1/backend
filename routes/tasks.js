const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if(err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

// Añadirá otros endpoints más adelante...

module.exports = router;
