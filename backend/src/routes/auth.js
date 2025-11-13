const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

// ==================== REGISTER MAHASISWA ====================
router.post("/register/mahasiswa", async (req, res) => {
  try {
    const { name, nim, study_program, batch, email, phone, password } = req.body;

    // --- PERBAIKAN VALIDASI EMAIL ---
    // Sekarang akan menerima @student.upnyk.ac.id ATAU @upn.ac.id
    if (!email.endsWith("@student.upnyk.ac.id") && !email.endsWith("@upn.ac.id")) {
      return res.status(400).json({ error: "Email harus menggunakan domain @student.upnyk.ac.id atau @upn.ac.id" });
    }
    // ---------------------------------

    if (!/^08\d{8,11}$/.test(phone)) {
      return res.status(400).json({ error: "Nomor WA tidak valid (Contoh: 081234567890)" });
    }

    if (batch < 2000 || batch > new Date().getFullYear() + 1) { // +1 untuk maba
      return res.status(400).json({ error: "Angkatan tidak valid" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO students (name, nim, study_program, batch, email, phone, password)
      VALUES (?,?,?,?,?,?,?)`,
      [name, nim, study_program, batch, email, phone, hashed]
    );

    res.status(201).json({ message: "Registrasi mahasiswa berhasil ✅" }); // Ganti ke 201 (Created)

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "NIM atau Email sudah terdaftar" });
    }
    console.error(err); // Tampilkan error di console backend
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// ==================== REGISTER ALUMNI ====================
router.post("/register/alumni", async (req, res) => {
  try {
    const { name, nim, study_program, graduation_year, email, phone, current_job, password } = req.body;

    if (graduation_year < 2000 || graduation_year > new Date().getFullYear()) {
      return res.status(400).json({ error: "Tahun lulus tidak valid" });
    }

    if (!/^08\d{8,11}$/.test(phone)) {
      return res.status(400).json({ error: "Nomor telepon tidak valid" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO alumni (name, nim, study_program, graduation_year, email, phone, current_job, password)
      VALUES (?,?,?,?,?,?,?,?)`,
      [name, nim, study_program, graduation_year, email, phone, current_job || null, hashed] // Izinkan current_job kosong
    );

    res.status(201).json({ message: "Registrasi alumni berhasil ✅" });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "NIM atau Email sudah terdaftar" });
    }
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// ==================== REGISTER UMUM ====================
router.post("/register/umum", async (req, res) => {
  try {
    const { name, type_account, email, phone, address, password } = req.body;

    if (!/^08\d{8,11}$/.test(phone)) {
      return res.status(400).json({ error: "Nomor telepon tidak valid" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users_umum (name, type_account, email, phone, address, password)
       VALUES (?,?,?,?,?,?)`,
      [name, type_account, email, phone, address, hashed]
    );

    res.status(201).json({ message: "Registrasi anda berhasil ✅" });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// ==================== LOGIN (HYBRID: NIM/EMAIL) ✅ ====================
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    let user;

    const isEmail = identifier.includes("@");

    if (isEmail) {
      // Cek di tabel UMUM
      let [result] = await db.query(
        "SELECT *, 'umum' as role FROM users_umum WHERE email = ?",
        [identifier]
      );
      user = result[0];

      // Jika tidak ada, cek di tabel ALUMNI
      if (!user) {
        [result] = await db.query(
          "SELECT *, 'alumni' as role FROM alumni WHERE email = ?",
          [identifier]
        );
        user = result[0];
      }
      
      // Jika tidak ada, cek di tabel STUDENTS
      if (!user) {
        [result] = await db.query(
          "SELECT *, 'mahasiswa' as role FROM students WHERE email = ?",
          [identifier]
        );
        user = result[0];
      }
      
      if (!user) return res.status(404).json({ error: "Email tidak terdaftar" });

    } else { // Jika BUKAN email (berarti NIM)
      // Cek di tabel STUDENTS
      let [result] = await db.query(
        "SELECT *, 'mahasiswa' as role FROM students WHERE nim = ?",
        [identifier]
      );
      user = result[0];

      // Jika tidak ada, cek di tabel ALUMNI
      if (!user) {
        [result] = await db.query(
          "SELECT *, 'alumni' as role FROM alumni WHERE nim = ?",
          [identifier]
        );
        user = result[0];
      }

      if (!user) return res.status(404).json({ error: "NIM tidak terdaftar" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Password salah" });
    }

    // Ambil ID yang benar (karena nama kolomnya 'id' di semua tabel)
    const userId = user.id;

    const token = jwt.sign(
      { id: userId, identifier, role: user.role }, // Gunakan userId
      process.env.JWT_SECRET || "SECRETKEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil ✅",
      token,
      user: {
        id: userId, // Kirim juga ID
        identifier,
        role: user.role,
        name: user.name // Kirim nama
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;