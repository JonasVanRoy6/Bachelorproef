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
  host: "localhost", // Externe databasehost
  user: "root", // Databasegebruikersnaam
  password: "", // Databasewachtwoord
  database: "puff_tracker", // Databasenaam
  port: 3306
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

// Endpoint om gebruikersgegevens op te slaan
app.post("/register", (req, res) => {
  const { firstName, lastName, email, birthDate } = req.body;

  if (!firstName || !lastName || !email || !birthDate) {
    return res.status(400).json({ error: "Alle velden zijn verplicht" });
  }

  const query = "INSERT INTO users (first_name, last_name, email, birth_date) VALUES (?, ?, ?, ?)";
  db.query(query, [firstName, lastName, email, birthDate], (err, result) => {
    if (err) {
      console.error("Fout bij het opslaan van gebruiker:", err);
      return res.status(500).json({ error: "Er is een fout opgetreden bij het opslaan van de gebruiker" });
    }

    res.status(201).json({ message: "Gebruiker succesvol geregistreerd", userId: result.insertId });
  });
});

app.post('/register-password', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Wachtwoord is verplicht.' });
  }

  // Simuleer het opslaan van het wachtwoord in de database
  const query = "UPDATE users SET password = ? WHERE id = LAST_INSERT_ID()";
  db.query(query, [password], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van wachtwoord:', err);
      return res.status(500).json({ message: 'Er is een fout opgetreden bij het opslaan van het wachtwoord.' });
    }
    res.status(200).json({ message: 'Wachtwoord succesvol opgeslagen.' });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-mailadres en wachtwoord zijn verplicht." });
  }

  const query = "SELECT id, first_name FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Fout bij het ophalen van gebruiker:", err);
      return res.status(500).json({ error: "Er is een fout opgetreden bij het inloggen." });
    }

    if (results.length > 0) {
      res.json({ userId: results[0].id, firstName: results[0].first_name });
    } else {
      res.status(401).json({ error: "Ongeldig e-mailadres of wachtwoord." });
    }
  });
});

// Endpoint om doelen op te slaan
app.post("/saveGoal", (req, res) => {
  const { userId, goal, reason, currentUsage, goalUsage, plan } = req.body;

  console.log("Ontvangen gegevens:", { userId, goal, reason, currentUsage, goalUsage, plan }); // Debugging

  if (!userId) {
    console.error("Ontbrekende gegevens:", { userId, goal, reason, currentUsage, goalUsage, plan }); // Debugging
    return res.status(400).json({ error: "Gebruiker ID is verplicht." });
  }

  const query = `
    INSERT INTO user_goals (user_id, goal, reason, current_usage, goal_usage, plan, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
    goal = IF(VALUES(goal) IS NOT NULL, VALUES(goal), goal),
    reason = IF(VALUES(reason) IS NOT NULL, VALUES(reason), reason),
    current_usage = IF(VALUES(current_usage) IS NOT NULL, VALUES(current_usage), current_usage),
    goal_usage = IF(VALUES(goal_usage) IS NOT NULL, VALUES(goal_usage), goal_usage),
    plan = IF(VALUES(plan) IS NOT NULL, VALUES(plan), plan)
  `;

  db.query(query, [userId, goal, reason, currentUsage, goalUsage, plan], (err, result) => {
    if (err) {
      console.error("Fout bij het opslaan van de gegevens:", err); // Debugging
      return res.status(500).json({ error: "Er is een fout opgetreden bij het opslaan van de gegevens." });
    }

    console.log("Gegevens succesvol opgeslagen:", result); // Debugging
    res.status(201).json({ message: "Gegevens succesvol opgeslagen." });
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.send("Server werkt!");
});

// Server starten
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server draait op http://192.168.0.130:${PORT}`);
});
