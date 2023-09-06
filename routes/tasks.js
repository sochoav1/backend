const express = require('express');
const router = express.Router();
const db = require('../models/db');
////ENDPOINTS

//Get all taks
router.get('/', (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if(err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});
///Post a task
router.post('/', (req, res) => {
  const { name, description, dueDate } = req.body;
  const stmt = db.prepare("INSERT INTO tasks (name, description, dueDate) VALUES (?, ?, ?)");
  stmt.run(name, description, dueDate, (err) => {
      if(err) {
          return res.status(500).json(err);
      }
      res.json({ message: 'Task created successfully!' });
  });
});
///Get a task by id
router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
      if(err) {
          return res.status(500).json(err);
      }
      res.json(row);
  });
});

///Update a task by ID
router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const { name, description, dueDate } = req.body;
  const stmt = db.prepare("UPDATE tasks SET name = ?, description = ?, dueDate = ? WHERE id = ?");
  stmt.run(name, description, dueDate, taskId, (err) => {
      if(err) {
          return res.status(500).json(err);
      }
      res.json({ message: 'Task updated successfully!' });
  });
});

///Delete a task
router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
  stmt.run(taskId, (err) => {
      if(err) {
          return res.status(500).json(err);
      }
      res.json({ message: 'Task deleted successfully!' });
  });
});


module.exports = router;
