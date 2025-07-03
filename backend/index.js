const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
// import { logger } from "./logger.js"; // Importing the logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const TEMP_DB_STRING = "postgres://appuser:s3cr3t@localhost:5432/appdb";
// PostgreSQL connection pool using env vars (injected via Kubernetes secrets or local .env)
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  // connectionString: TEMP_DB_STRING,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD, // 👈 Password injected via Kubernetes Secret
  database: process.env.DB_NAME || "appdb",
  ssl: false,
});

// Health check
app.get("/", (req, res) => {
  res.send("Express.js backend is running 🚀");
});

// Get all contacts
app.get("/api/users", async (req, res) => {
  console.log("info", "Received request to fetch contacts");
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new contact
app.post("/api/users", async (req, res) => {
  const { email, password } = req.body;
  console.log("info", "Received request to add contact:", req.body);
  if (!password || !email) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      password,
    ]);
    res.status(201).json({ message: "Contact created" });
  } catch (err) {
    console.error("Error inserting contact:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Express.js API is running on port ${PORT}`);
});
