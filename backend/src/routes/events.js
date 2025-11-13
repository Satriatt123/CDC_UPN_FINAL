const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all events (untuk halaman Events.tsx)
router.get("/", async (req, res) => {
  try {
    const [events] = await db.query("SELECT * FROM Events ORDER BY event_id"); // Asumsi 'date'
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;