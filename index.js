const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());

// CREATE
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, email });
  });
});

// READ all
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ single
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated" });
  });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
