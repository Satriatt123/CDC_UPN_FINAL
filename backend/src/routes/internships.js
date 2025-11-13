const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all internships (untuk halaman Internship.tsx)
// Ini mengambil data dari tabel 'Jobs' dimana tipenya 'internship'
router.get("/", async (req, res) => {
  try {
    const [internships] = await db.query(
      `SELECT 
        j.job_id as id, 
        c.name as company, 
        j.title as position, 
        j.location, 
        j.job_type,
        j.level as field, -- Menggunakan 'level' sebagai 'field' untuk sementara
        j.description as requirements, -- Menggunakan 'description' sebagai 'requirements'
        'Uang saku & Sertifikat' as benefits -- Contoh data statis
      FROM Jobs j
      JOIN Companies c ON j.company_id = c.company_id
      WHERE j.job_type = 'internship'
      ORDER BY j.created_at DESC`
    );

    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// INI BAGIAN YANG DIPERBAIKI:
module.exports = router;