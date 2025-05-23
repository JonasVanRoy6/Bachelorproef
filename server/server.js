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

// Endpoint om een vriend toe te voegen
app.post('/user/add-friend', (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ error: 'Gebruiker ID en vriend ID zijn verplicht.' });
  }

  const checkQuery = `
    SELECT * FROM friends WHERE user_id = ? AND friend_id = ?
  `;

  db.query(checkQuery, [userId, friendId], (err, results) => {
    if (err) {
      console.error('Fout bij het controleren van bestaande vriendschap:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het controleren van bestaande vriendschap.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Deze gebruiker is al een vriend.' });
    }

    const userExistsQuery = `
      SELECT id FROM users WHERE id = ?
    `;

    db.query(userExistsQuery, [friendId], (err, results) => {
      if (err) {
        console.error('Fout bij het controleren van gebruiker:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het controleren van de gebruiker.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'De opgegeven vriend bestaat niet.' });
      }

      // Voeg de vriend toe
      const insertQuery = `
        INSERT INTO friends (user_id, friend_id)
        VALUES (?, ?)
      `;

      db.query(insertQuery, [userId, friendId], (err, result) => {
        if (err) {
          console.error('Fout bij het toevoegen van de vriend:', err);
          return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van de vriend.' });
        }

        res.status(201).json({ message: 'Vriend succesvol toegevoegd.' });
      });
    });
  });
});

app.post('/add-friend', async (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ error: 'Gebruiker ID en vriend ID zijn verplicht.' });
  }

  const query = `
    INSERT INTO friends (user_id, friend_id)
    VALUES (?, ?)
  `;

  db.query(query, [userId, friendId], (err, results) => {
    if (err) {
      console.error('Fout bij het toevoegen van de vriend:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van de vriend.' });
    }

    res.status(201).json({ message: 'Vriend succesvol toegevoegd.' });
  });
});

// Endpoint om een vriend te verwijderen
app.delete('/user/remove-friend', (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ error: 'Gebruiker ID en vriend ID zijn verplicht.' });
  }

  const query = `
    DELETE FROM friends
    WHERE user_id = ? AND friend_id = ?
  `;

  db.query(query, [userId, friendId], (err, result) => {
    if (err) {
      console.error('Fout bij het verwijderen van de vriend:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van de vriend.' });
    }

    res.status(200).json({ message: 'Vriend succesvol verwijderd.' });
  });
});

// Endpoint om vrienden van een gebruiker op te halen
app.get('/user/friends', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT u.id, u.first_name AS name, u.last_name, u.email
    FROM friends f
    JOIN users u ON u.id = f.friend_id
    WHERE f.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van vrienden:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van vrienden.' });
    }

    res.status(200).json(results);
  });
});

// Endpoint om gebruikers te zoeken
app.get('/user/search', (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Zoekterm is verplicht.' });
  }

  const query = `
    SELECT id, first_name AS name, last_name, email
    FROM users
    WHERE email LIKE ? OR first_name LIKE ? OR last_name LIKE ?
  `;

  db.query(query, [`%${search}%`, `%${search}%`, `%${search}%`], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van gebruikers:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van gebruikers.' });
    }

    res.status(200).json(results);
  });
});

// Endpoint om een leaderboard aan te maken
app.post('/leaderboard/create', (req, res) => {

  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: 'Gebruiker ID en naam zijn verplicht.' });
  }

  const query = `INSERT INTO leaderboards (user_id, name) VALUES (?, ?)`;

  db.query(query, [userId, name], (err, result) => {


    if (err) {
      console.error('Fout bij het aanmaken van het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van het leaderboard.' });
    }

    const leaderboardId = result.insertId;

    res.status(201).json({
      message: 'Leaderboard succesvol aangemaakt.',
      leaderboardId,
      name, // Zorg ervoor dat de naam wordt teruggestuurd
    });

  });
});

app.post('/leaderboard/add-friend', (req, res) => {
  const { leaderboardId, friendId } = req.body;

  if (!leaderboardId || !friendId) {
    return res.status(400).json({ error: 'Leaderboard ID en vriend ID zijn verplicht.' });
  }

  const query = `
    INSERT INTO leaderboard_friends (leaderboard_id, friend_id)
    VALUES (?, ?)
  `;

  db.query(query, [leaderboardId, friendId], (err, result) => {
    if (err) {
      console.error('Fout bij het toevoegen van de vriend aan het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van de vriend aan het leaderboard.' });
    }

    res.status(201).json({ message: 'Vriend succesvol toegevoegd aan het leaderboard.' });
  });
});

app.post('/leaderboard/add-friends', (req, res) => {
  const { leaderboardId, friends } = req.body;

  if (!leaderboardId || !friends || !Array.isArray(friends)) {
    return res.status(400).json({ error: 'Leaderboard ID en vrienden zijn verplicht.' });
  }

  const friendValues = friends.map(friendId => [leaderboardId, friendId, new Date()]);
  const addFriendsQuery = `INSERT INTO leaderboard_friends (leaderboard_id, friend_id, added_at) VALUES ?`;

  db.query(addFriendsQuery, [friendValues], (err) => {
    if (err) {
      console.error('Fout bij het toevoegen van vrienden aan het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van vrienden aan het leaderboard.' });
    }

    res.status(201).json({ message: 'Vrienden succesvol toegevoegd aan het leaderboard.' });
  });
});

app.get('/leaderboard/friends', (req, res) => {
  const { leaderboardId } = req.query;

  if (!leaderboardId) {
    return res.status(400).json({ error: 'Leaderboard ID is verplicht.' });
  }

  const query = `
    SELECT u.id, u.first_name AS name, u.last_name, u.email
    FROM leaderboard_friends lf
    JOIN users u ON u.id = lf.friend_id
    WHERE lf.leaderboard_id = ?
  `;

  db.query(query, [leaderboardId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van vrienden van het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van vrienden van het leaderboard.' });
    }

    res.status(200).json(results);
  });
});

app.delete('/leaderboard/friends', (req, res) => {
  const { leaderboardId, friendId } = req.body;

  if (!leaderboardId || !friendId) {
    return res.status(400).json({ error: 'Leaderboard ID en vriend ID zijn verplicht.' });
  }

  const query = `DELETE FROM leaderboard_friends WHERE leaderboard_id = ? AND friend_id = ?`;

  db.query(query, [leaderboardId, friendId], (err, result) => {
    if (err) {
      console.error('Fout bij het verwijderen van de vriend:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van de vriend.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Vriend niet gevonden in het leaderboard.' });
    }

    res.status(200).json({ message: 'Vriend succesvol verwijderd.' });
  });
});

app.post('/leaderboard/update', (req, res) => {
  const { leaderboardId, name } = req.body;

  if (!leaderboardId || !name) {
    return res.status(400).json({ error: 'Leaderboard ID en naam zijn verplicht.' });
  }

  const query = `UPDATE leaderboards SET name = ? WHERE id = ?`;

  db.query(query, [name, leaderboardId], (err) => {
    if (err) {
      console.error('Fout bij het bijwerken van het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het bijwerken van het leaderboard.' });
    }

    res.status(200).json({ message: 'Leaderboard succesvol bijgewerkt.' });
  });
});

app.post('/leaderboard/create-with-friends', (req, res) => {
  console.log('Ontvangen verzoek:', req.body);

  const { userId, friends } = req.body;

  if (!userId || !friends || !Array.isArray(friends)) {
    console.error('Ongeldige invoer:', { userId, friends });
    return res.status(400).json({ error: 'Gebruiker ID en vrienden zijn verplicht.' });
  }

  // Stap 1: Maak het leaderboard aan
  const createLeaderboardQuery = `INSERT INTO leaderboards (user_id) VALUES (?)`;
  db.query(createLeaderboardQuery, [userId], (err, result) => {
    if (err) {
      console.error('Fout bij het aanmaken van het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van het leaderboard.' });
    }

    const leaderboardId = result.insertId;

    // Stap 2: Voeg vrienden toe aan het leaderboard
    const friendValues = friends.map(friendId => [leaderboardId, friendId, new Date()]);
    const addFriendsQuery = `INSERT INTO leaderboard_friends (leaderboard_id, friend_id, added_at) VALUES ?`;

    db.query(addFriendsQuery, [friendValues], (err) => {
      if (err) {
        console.error('Fout bij het toevoegen van vrienden aan het leaderboard:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van vrienden aan het leaderboard.' });
      }

      res.status(201).json({ message: 'Leaderboard en vrienden succesvol aangemaakt.', leaderboardId });
    });
  });
});


app.get('/leaderboards', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT 
      l.id AS leaderboard_id,
      l.name AS leaderboard_name,
      u.id AS user_id,
      u.first_name AS user_name,
      COALESCE(SUM(p.amount), 0) AS total_puffs,
      RANK() OVER (PARTITION BY l.id ORDER BY COALESCE(SUM(p.amount), 0) ASC) AS rank
    FROM leaderboards l
    JOIN leaderboard_friends lf ON l.id = lf.leaderboard_id
    JOIN users u ON u.id = lf.friend_id
    LEFT JOIN puffs p ON p.user_id = u.id
    WHERE l.user_id = ?
    GROUP BY l.id, l.name, u.id, u.first_name
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van leaderboards:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van leaderboards.' });
    }

    console.log('Serverresultaten:', results); // Controleer de resultaten
    res.status(200).json(results);
  });
});

app.get('/leaderboard/details', (req, res) => {
  const { leaderboardId } = req.query;

  if (!leaderboardId) {
    return res.status(400).json({ error: 'Leaderboard ID is verplicht.' });
  }

  const query = `
    SELECT 
      u.id AS user_id,
      u.first_name AS name,
      COALESCE(SUM(p.puffs_count), 0) AS total_puffs,
      RANK() OVER (ORDER BY COALESCE(SUM(p.puffs_count), 0) ASC) AS rank
    FROM leaderboard_friends lf
    JOIN users u ON u.id = lf.friend_id
    LEFT JOIN puffs p ON p.user_id = u.id
    WHERE lf.leaderboard_id = ?
    GROUP BY u.id, u.first_name
  `;

  db.query(query, [leaderboardId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van leaderboarddetails:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van leaderboarddetails.' });
    }

    res.status(200).json(results);
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

app.get('/leaderboard/details-with-rank', (req, res) => {
  const { leaderboardId, userId } = req.query;

  if (!leaderboardId || !userId) {
    return res.status(400).json({ error: 'Leaderboard ID en user ID zijn verplicht.' });
  }

  const query = `
    SELECT 
      u.id AS user_id,
      u.first_name AS name,
      COALESCE(SUM(p.amount), 0) AS total_puffs,
      RANK() OVER (ORDER BY COALESCE(SUM(p.amount), 0) ASC) AS rank
    FROM (
      SELECT friend_id AS user_id FROM leaderboard_friends WHERE leaderboard_id = ?
      UNION
      SELECT user_id FROM leaderboards WHERE id = ?
    ) AS all_users
    JOIN users u ON u.id = all_users.user_id
    LEFT JOIN puffs p ON p.user_id = u.id AND YEARWEEK(p.created_at, 1) = YEARWEEK(CURDATE(), 1)
    GROUP BY u.id, u.first_name
  `;

  db.query(query, [leaderboardId, leaderboardId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van leaderboarddetails:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van leaderboarddetails.' });
    }

    const user = results.find(r => r.user_id == userId);
    const userRank = user ? user.rank : null;

    res.status(200).json({ leaderboard: results, userRank });
  });
});

app.delete('/leaderboard/delete', (req, res) => {
  const { leaderboardId } = req.query;

  if (!leaderboardId) {
    return res.status(400).json({ error: 'Leaderboard ID is verplicht.' });
  }

  // Eerst: verwijder alle koppelingen (foreign key constraint veiligheid)
  const deleteFriends = `DELETE FROM leaderboard_friends WHERE leaderboard_id = ?`;
  const deleteLeaderboard = `DELETE FROM leaderboards WHERE id = ?`;

  db.query(deleteFriends, [leaderboardId], (err) => {
    if (err) {
      console.error('Fout bij verwijderen van leaderboard_friends:', err);
      return res.status(500).json({ error: 'Fout bij verwijderen van leden.' });
    }

    db.query(deleteLeaderboard, [leaderboardId], (err2) => {
      if (err2) {
        console.error('Fout bij verwijderen van leaderboard:', err2);
        return res.status(500).json({ error: 'Fout bij verwijderen van leaderboard.' });
      }

      res.status(200).json({ message: 'Leaderboard succesvol verwijderd.' });
    });
  });
});

app.post('/challenges/create', (req, res) => {
  const { userId, icon, title, budget } = req.body;

  if (!userId || !icon || !title || !budget) {
    return res.status(400).json({ error: 'Alle velden zijn verplicht.' });
  }

  const query = `
    INSERT INTO challenges (user_id, icon, title, budget)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [userId, icon, title, budget], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van de uitdaging:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het opslaan van de uitdaging.' });
    }

    res.status(201).json({ message: 'Uitdaging succesvol aangemaakt.' });
  });
});

app.get('/challenges', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT 
      c.id AS challenge_id,
      c.title AS titel,
      c.icon AS thema,
      c.budget AS bedrag,
      COALESCE(SUM(p.amount), 0) AS huidig,
      u.active_challenge_id
    FROM challenges c
    LEFT JOIN puffs p ON p.user_id = c.user_id
    LEFT JOIN users u ON u.id = c.user_id
    WHERE c.user_id = ?
    GROUP BY c.id, c.title, c.icon, c.budget, u.active_challenge_id
    ORDER BY c.id = u.active_challenge_id DESC, c.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van uitdagingen:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van uitdagingen.' });
    }

    res.status(200).json(results);
  });
});

app.post('/challenges/set-active', (req, res) => {
  const { userId, challengeId } = req.body;

  if (!userId || !challengeId) {
    return res.status(400).json({ error: 'Gebruiker ID en uitdaging ID zijn verplicht.' });
  }

  const query = `
    UPDATE users
    SET active_challenge_id = ?
    WHERE id = ?
  `;

  db.query(query, [challengeId, userId], (err, result) => {
    if (err) {
      console.error('Fout bij het instellen van de actieve uitdaging:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het instellen van de actieve uitdaging.' });
    }

    res.status(200).json({ message: 'Actieve uitdaging succesvol bijgewerkt.' });
  });
});

app.get('/user-data', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT 
      first_name AS firstName,
      last_name AS lastName,
      email,
      birth_date AS birthDate,
      password -- Voeg het wachtwoord toe
    FROM users
    WHERE id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van gebruikersgegevens:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van gebruikersgegevens.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
    }

    res.status(200).json(results[0]);
  });
});

app.post('/update-user-data', (req, res) => {
  const { userId, firstName, lastName, email, birthDate, newPassword } = req.body;

  if (!userId || !firstName || !lastName || !email || !birthDate) {
    return res.status(400).json({ error: 'Alle velden zijn verplicht.' });
  }

  const query = `
    UPDATE users
    SET first_name = ?, last_name = ?, email = ?, birth_date = ?
    ${newPassword ? ', password = ?' : ''} -- Voeg het wachtwoord toe als het is opgegeven
    WHERE id = ?
  `;

  const params = newPassword
    ? [firstName, lastName, email, birthDate, newPassword, userId]
    : [firstName, lastName, email, birthDate, userId];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Fout bij het bijwerken van gebruikersgegevens:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het bijwerken van gebruikersgegevens.' });
    }

    res.status(200).json({ message: 'Gebruikersgegevens succesvol bijgewerkt.' });
  });
});

app.post('/delete-account', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  // Queries om gerelateerde gegevens te verwijderen
  const deleteFriendsQuery = `DELETE FROM friends WHERE user_id = ? OR friend_id = ?;`;
  const deletePuffsQuery = `DELETE FROM puffs WHERE user_id = ?;`;
  const deleteGoalsQuery = `DELETE FROM user_goals WHERE user_id = ?;`;
  const deleteChallengesQuery = `DELETE FROM challenges WHERE user_id = ?;`;
  const deleteUserQuery = `DELETE FROM users WHERE id = ?;`;

  // Voer de queries uit in volgorde
  db.query(deleteFriendsQuery, [userId, userId], (err) => {
    if (err) {
      console.error('Fout bij het verwijderen van vrienden:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van vrienden.' });
    }

    db.query(deletePuffsQuery, [userId], (err) => {
      if (err) {
        console.error('Fout bij het verwijderen van puffs:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van puffs.' });
      }

      db.query(deleteGoalsQuery, [userId], (err) => {
        if (err) {
          console.error('Fout bij het verwijderen van doelen:', err);
          return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van doelen.' });
        }

        db.query(deleteChallengesQuery, [userId], (err) => {
          if (err) {
            console.error('Fout bij het verwijderen van uitdagingen:', err);
            return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van uitdagingen.' });
          }

          db.query(deleteUserQuery, [userId], (err) => {
            if (err) {
              console.error('Fout bij het verwijderen van de gebruiker:', err);
              return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van de gebruiker.' });
            }

            res.status(200).json({ message: 'Account en gerelateerde gegevens succesvol verwijderd.' });
          });
        });
      });
    });
  });
});

app.get('/calculate-savings', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  // Query om de huidige gebruiksdoelen op te halen
  const userGoalsQuery = `
    SELECT current_usage
    FROM user_goals
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  // Query om het totaal aantal ingevoerde puffs op te halen
  const totalPuffsQuery = `
    SELECT SUM(amount) AS total_puffs
    FROM puffs
    WHERE user_id = ?
  `;

  try {
    // Haal de huidige gebruiksdoelen op
    db.query(userGoalsQuery, [userId], (err, goalsResults) => {
      if (err) {
        console.error('Fout bij het ophalen van gebruikersdoelen:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van gebruikersdoelen.' });
      }

      if (goalsResults.length === 0) {
        return res.status(404).json({ error: 'Geen doelen gevonden voor deze gebruiker.' });
      }

      const { current_usage } = goalsResults[0];

      // Haal het totaal aantal ingevoerde puffs op
      db.query(totalPuffsQuery, [userId], (err, puffsResults) => {
        if (err) {
          console.error('Fout bij het ophalen van puffs:', err);
          return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van puffs.' });
        }

        const totalPuffs = puffsResults[0]?.total_puffs || 0;

        // Bereken het verschil tussen current_usage en ingevoerde puffs
        const puffsAvoided = Math.max(0, current_usage - totalPuffs);

        res.status(200).json({
          puffsAvoided,
          totalSavings: (puffsAvoided * 0.01).toFixed(2), // Bespaarde geldwaarde
        });
      });
    });
  } catch (error) {
    console.error('Fout bij het berekenen van besparingen:', error);
    res.status(500).json({ error: 'Er is een fout opgetreden bij het berekenen van besparingen.' });
  }
});

app.get('/user-goals', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT goal_usage
    FROM user_goals
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van gebruikersdoelen:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van gebruikersdoelen.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Geen doelen gevonden voor deze gebruiker.' });
    }

    res.status(200).json({ goal_usage: results[0].goal_usage });
  });
});

app.get('/suggested-friends', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT id, first_name AS name, email
    FROM users
    WHERE id != ? AND id NOT IN (
      SELECT friend_id FROM friends WHERE user_id = ?
    )
    ORDER BY RAND()
    LIMIT 5
  `;

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van voorgestelde vrienden:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van voorgestelde vrienden.' });
    }

    res.status(200).json(results);
  });
});

app.get('/stats', async (req, res) => {
  const { userId, period } = req.query;

  console.log('Ontvangen parameters:', { userId, period });

  if (!userId || !period) {
    console.error('Ontbrekende parameters:', { userId, period });
    return res.status(400).json({ error: 'Gebruiker ID en periode zijn verplicht.' });
  }

  let dateCondition = '';
  if (period === 'Dag') {
    dateCondition = 'DATE(created_at) = CURDATE()';
  } else if (period === 'Week') {
    dateCondition = 'YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)';
  } else if (period === 'Maand') {
    dateCondition = 'MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())';
  } else {
    console.error('Ongeldige period-waarde:', period);
    return res.status(400).json({ error: 'Ongeldige periode opgegeven.' });
  }

  console.log('Query wordt uitgevoerd met conditie:', dateCondition);

  const query = `
    SELECT 
      SUM(CASE WHEN time_of_day = 'Ochtend (6:00 - 12:00)' THEN amount ELSE 0 END) AS ochtend,
      SUM(CASE WHEN time_of_day = 'Middag (12:00 - 18:00)' THEN amount ELSE 0 END) AS middag,
      SUM(CASE WHEN time_of_day = 'Avond (18:00 - 00:00)' THEN amount ELSE 0 END) AS avond,
      SUM(CASE WHEN time_of_day = 'Nacht (00:00 - 6:00)' THEN amount ELSE 0 END) AS nacht
    FROM puffs
    WHERE user_id = ? AND ${dateCondition}
  `;

  console.log('Query:', query);

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het uitvoeren van de query:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van statistieken.' });
    }

    console.log('Queryresultaten:', results);

    const data = results[0] || { ochtend: 0, middag: 0, avond: 0, nacht: 0 };
    res.status(200).json(data);
  });
});

