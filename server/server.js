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

app.post('/puffs', (req, res) => {
  const { userId, puffs, timeOfDay } = req.body;

  if (!userId || !puffs || !timeOfDay) {
    return res.status(400).json({ error: 'Gebruiker ID, aantal puffs en tijd van de dag zijn verplicht.' });
  }

  const query = `
    INSERT INTO puffs (user_id, amount, time_of_day, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(query, [userId, puffs, timeOfDay], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van de gegevens:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het opslaan van de gegevens.' });
    }

    res.status(201).json({ message: 'Gegevens succesvol opgeslagen.', id: result.insertId });
  });
});

// Endpoint om de laatste puff-waarde op te halen
app.get('/puffs', (req, res) => {
  const { userId } = req.query; // Ontvang de user_id uit de queryparameters

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT amount, time_of_day, created_at
    FROM puffs
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 10
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van de gegevens:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van de gegevens.' });
    }

    res.status(200).json(results);
  });
});

// Endpoint om het totaal aantal puffs van vandaag op te halen
app.get("/puffs/today", (req, res) => {
  const { userId } = req.query; // Ontvang de userId uit de queryparameters

  if (!userId) {
    return res.status(400).json({ error: "Gebruiker ID is verplicht." });
  }

  const query = `
    SELECT SUM(amount) AS total_puffs
    FROM puffs
    WHERE user_id = ? AND DATE(created_at) = CURDATE()
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Fout bij het ophalen van het totaal aantal puffs van vandaag:", err);
      return res.status(500).json({ error: "Er is een fout opgetreden bij het ophalen van de gegevens." });
    }

    res.status(200).json({ total_puffs: results[0].total_puffs || 0 });
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

// Endpoint om het actieve plan van een gebruiker op te halen
app.get('/user/active-plan', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT plan
    FROM user_goals
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van het actieve plan:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van het plan.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Geen actief plan gevonden voor deze gebruiker.' });
    }

    res.status(200).json({ plan: results[0].plan });
  });
});

// Endpoint om het plan van een gebruiker bij te werken
app.post('/user/update-plan', (req, res) => {
  const { userId, plan } = req.body;

  if (!userId || !plan) {
    return res.status(400).json({ error: 'Gebruiker ID en plan zijn verplicht.' });
  }

  const query = `
    UPDATE user_goals
    SET plan = ?
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(query, [plan, userId], (err, result) => {
    if (err) {
      console.error('Fout bij het bijwerken van het plan:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het bijwerken van het plan.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Geen records bijgewerkt. Controleer of de gebruiker bestaat.' });
    }

    res.status(200).json({ message: 'Plan succesvol bijgewerkt.' });
  });
});

// Endpoint om het doel van een gebruiker bij te werken
app.post('/user/update-goals', (req, res) => {
  const { userId, goal } = req.body;

  if (!userId || !goal) {
    return res.status(400).json({ error: 'Gebruiker ID en doel zijn verplicht.' });
  }

  const query = `
    INSERT INTO user_goals (user_id, goal)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE goal = VALUES(goal)
  `;

  db.query(query, [userId, goal], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van het doel:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het opslaan van het doel.' });
    }

    res.status(200).json({ message: 'Doel succesvol opgeslagen.' });
  });
});

// Endpoint om de reden van een gebruiker bij te werken
app.post('/user/update-reason', (req, res) => {
  const { userId, reason } = req.body;

  if (!userId || !reason) {
    return res.status(400).json({ error: 'Gebruiker ID en reden zijn verplicht.' });
  }

  const query = `
    INSERT INTO user_goals (user_id, reason)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE reason = VALUES(reason)
  `;

  db.query(query, [userId, reason], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van de reden:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het opslaan van de reden.' });
    }

    res.status(200).json({ message: 'Reden succesvol opgeslagen.' });
  });
});

// Endpoint om het gebruik van een gebruiker bij te werken
app.post('/user/update-puffs', (req, res) => {
  const { userId, currentUsage, goalsUsage } = req.body;

  if (!userId || !currentUsage || !goalsUsage) {
    return res.status(400).json({ error: 'Gebruiker ID, huidige gebruik en doelgebruik zijn verplicht.' });
  }

  const query = `
    INSERT INTO user_goals (user_id, current_usage, goal_usage)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE current_usage = VALUES(current_usage), goal_usage = VALUES(goal_usage)
  `;

  db.query(query, [userId, currentUsage, goalsUsage], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van het gebruik:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het opslaan van het gebruik.' });
    }

    res.status(200).json({ message: 'Gebruik succesvol opgeslagen.' });
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
