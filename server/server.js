const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connectie
const db = mysql.createConnection({
  host: "localhost", // Verander naar jouw serveradres indien nodig
  user: "root", // Verander naar jouw MySQL-gebruikersnaam
  password: "", // Verander naar jouw MySQL-wachtwoord
  database: "puff_tracker"
});

// Check databaseverbinding
db.connect((err) => {
  if (err) {
    console.error("Database connectiefout:", err);
    return;
  }
  console.log("✅ Verbonden met MySQL-database");
});

app.post("/puffs", (req, res) => {
    const { puffs } = req.body; // Zorg ervoor dat je het juiste veld ontvangt
    if (!puffs) return res.status(400).json({ error: "Aantal puffs is verplicht" });
  
    const query = "INSERT INTO puffs (amount, created_at) VALUES (?, NOW())";
    db.query(query, [puffs], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Puffs opgeslagen", id: result.insertId });
    });
  });
  

// Endpoint om de laatste puff-waarde op te halen
app.get("/puffs", (req, res) => {
  const query = "SELECT SUM(amount) AS total_puffs FROM puffs WHERE DATE(created_at) = CURDATE()";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ total_puffs: results[0].total_puffs || 0 });
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);
});
