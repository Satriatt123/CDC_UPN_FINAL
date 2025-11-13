const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all jobs (untuk halaman JobListings.tsx)
router.get("/", async (req, res) => {
  try {
    const [jobs] = await db.query(
      `SELECT 
        j.job_id as id, 
        j.title, 
        c.name as company, 
        j.location, 
        j.job_type as type, 
        j.level, 
        j.salary_range as salary, 
        j.description,
        j.created_at as posted_at
      FROM Jobs j
      JOIN Companies c ON j.company_id = c.company_id
      ORDER BY j.created_at DESC`
    );

    // Ubah data 'posted_at' menjadi format "X hari yang lalu" (opsional tapi bagus)
    const jobsWithPostedTime = jobs.map(job => {
        const postedDate = new Date(job.posted_at);
        const diffTime = Math.abs(new Date() - postedDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return {
            ...job,
            posted: `${diffDays} hari yang lalu`
        };
    });

    res.json(jobsWithPostedTime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;