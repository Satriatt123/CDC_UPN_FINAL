const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Import Rute
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const eventRoutes = require("./routes/events");
const internshipRoutes = require("./routes/internships"); 

// Gunakan Rute
app.use("/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/internships", internshipRoutes); // <-- PERBAIKAN: Tambahkan 's'

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

app.listen(5000, () => {
  console.log("Server ON di 5000");
});