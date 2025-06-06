const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;
const bcrypt = require('bcrypt');
// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, '..', 'assets', 'images')));


// Database connectie
const db = mysql.createPool({
  host: "sql.freedb.tech", // Externe databasehost
  user: "freedb_breezd", // Databasegebruikersnaam
  password: "at$SDdMvU%QW7VW", // Databasewachtwoord
  database: "freedb_puff_tracker", // Databasenaam
  port: 3306
});

// Check databaseverbinding
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database pool:', err);
  } else {
    console.log('Connected to the database pool');
    connection.release(); // belangrijk!
  }
});

const API_BASE_URL = 'https://bachelorproef-breezd.onrender.com'; // Vervang dit door je eigen IP-adres of domein
// Kies een willekeurige profielfoto
const profilePictures = [
  `${API_BASE_URL}/images/profile-1.png`,
  `${API_BASE_URL}/images/profile-2.png`,
  `${API_BASE_URL}/images/profile-3.png`,
  `${API_BASE_URL}/images/profile-4.png`,
  `${API_BASE_URL}/images/profile-5.png`,
];

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

  // Kies een willekeurige profielfoto (alleen de bestandsnaam)
  const profilePictures = ['profile-1.png', 'profile-2.png', 'profile-3.png', 'profile-4.png', 'profile-5.png'];
  const randomProfilePicture = profilePictures[Math.floor(Math.random() * profilePictures.length)];

  const dummyPassword = 'temp'; // Tijdelijk wachtwoord

  const insertUserQuery = `
  INSERT INTO users (first_name, last_name, email, birth_date, profile_picture, password)
  VALUES (?, ?, ?, ?, ?, NULL)
`;

  db.query(
    insertUserQuery,
    [firstName, lastName, email, birthDate, randomProfilePicture, dummyPassword],
    (err, result) => {
      if (err) {
        console.error("Fout bij het opslaan van gebruiker:", err);
        return res.status(500).json({ error: "Er is een fout opgetreden bij het opslaan van de gebruiker" });
      }

      const userId = result.insertId; // Haal de ID van de nieuw aangemaakte gebruiker op

      // Voeg een nieuwe rij toe aan de `user_progress`-tabel
      const insertProgressQuery = `
        INSERT INTO user_progress (
          user_id, appOpened, accountCreated, firstDayUnderGoal, daysUnderGoal,
          consecutiveDaysUnderGoal, noDaysOverGoal, sustainableGoals, healthGoals,
          mentalGoals, challengeStarted, goalAmountReached, moneyGoals, moneySaved,
          firstPlace, leaderboardDays, invitedFriends
        ) VALUES (?, TRUE, TRUE, FALSE, 0, 0, FALSE, 0, 0, 0, FALSE, FALSE, 0, 0.00, FALSE, 0, 0)
      `;

      db.query(insertProgressQuery, [userId], (err) => {
        if (err) {
          console.error("Fout bij het aanmaken van de gebruikersvoortgang:", err);
          return res.status(500).json({ error: "Er is een fout opgetreden bij het aanmaken van de gebruikersvoortgang." });
        }

        res.status(201).json({ message: "Gebruiker succesvol geregistreerd", userId });
      });
    }
  );
});

const saltRounds = 10;

app.post('/register-password', (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'Gebruiker-ID en wachtwoord zijn verplicht.' });
  }

  // Controleer wachtwoordlengte en of er minstens één cijfer in zit
  const hasMinimumLength = password.length >= 5;
  const hasNumber = /\d/.test(password); // RegEx om te checken of er minstens één cijfer is

  if (!hasMinimumLength || !hasNumber) {
    return res.status(400).json({
      message: 'Je wachtwoord moet minstens 5 karakters bevatten waarvan minstens 1 getal.',
    });
  }

  // Wachtwoord hashen
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Fout bij het hashen van wachtwoord:', err);
      return res.status(500).json({ message: 'Fout bij het beveiligen van het wachtwoord.' });
    }

    // Update de gebruiker met het gehashte wachtwoord
    const query = "UPDATE users SET password = ? WHERE id = ?";
    db.query(query, [hashedPassword, userId], (err, result) => {
      if (err) {
        console.error('Fout bij het opslaan van wachtwoord:', err);
        return res.status(500).json({ message: 'Er is een fout opgetreden bij het opslaan van het wachtwoord.' });
      }

      res.status(200).json({ message: 'Wachtwoord succesvol opgeslagen.' });
    });
  });
});







app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt met:', { email, password }); // Check wat binnenkomt

  if (!email || !password) {
    console.log('Email of password niet ingevuld');
    return res.status(400).json({ error: "E-mailadres en wachtwoord zijn verplicht." });
  }

  const query = "SELECT id, first_name, password FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Fout bij het ophalen van gebruiker:", err);
      return res.status(500).json({ error: "Er is een fout opgetreden bij het inloggen." });
    }

    if (results.length === 0) {
      console.log('Geen gebruiker gevonden met email:', email);
      return res.status(401).json({ error: "Ongeldig e-mailadres of wachtwoord." });
    }

    const user = results[0];
    console.log('Gevonden gebruiker:', user);

    try {
      const match = await bcrypt.compare(password.trim(), user.password);
      console.log('Wachtwoord match:', match);

      if (!match) {
        console.log('Wachtwoord klopt niet voor gebruiker:', email);
        return res.status(401).json({ error: "Ongeldig e-mailadres of wachtwoord." });
      }

      console.log('Login succesvol voor gebruiker:', email);
      res.json({ userId: user.id, firstName: user.first_name });
    } catch (error) {
      console.error("Fout bij wachtwoordcontrole:", error);
      res.status(500).json({ error: "Interne serverfout bij het inloggen." });
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

        // Update het aantal vrienden in de `user_progress`-tabel
        const updateProgressQuery = `
          UPDATE user_progress
          SET invitedFriends = invitedFriends + 1
          WHERE user_id = ?
        `;

        db.query(updateProgressQuery, [userId], (err) => {
          if (err) {
            console.error('Fout bij het bijwerken van de gebruikersvoortgang:', err);
            return res.status(500).json({ error: 'Er is een fout opgetreden bij het bijwerken van de gebruikersvoortgang.' });
          }

          res.status(201).json({ message: 'Vriend succesvol toegevoegd en voortgang bijgewerkt.' });
        });
      });
    });
  });
});

app.post('/add-friend', (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ error: 'Gebruiker ID en vriend ID zijn verplicht.' });
  }

  // Voeg de vriend toe
  const addFriendQuery = `
    INSERT INTO friends (user_id, friend_id)
    VALUES (?, ?)
  `;

  db.query(addFriendQuery, [userId, friendId], (err) => {
    if (err) {
      console.error('Fout bij het toevoegen van de vriend:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van de vriend.' });
    }

    // Controleer het aantal vrienden van de gebruiker
    const countFriendsQuery = `
      SELECT COUNT(*) AS friendCount
      FROM friends
      WHERE user_id = ?
    `;

    db.query(countFriendsQuery, [userId], (err, results) => {
      if (err) {
        console.error('Fout bij het tellen van vrienden:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het tellen van vrienden.' });
      }

      const friendCount = results[0].friendCount;

      // Controleer of de gebruiker de badge "Vrienden Strijder" heeft verdiend
      if (friendCount >= 2) {
        const earnBadgeQuery = `
          INSERT INTO user_badges (user_id, badge_name, earned_date)
          VALUES (?, 'Vrienden Strijder', NOW())
          ON DUPLICATE KEY UPDATE earned_date = earned_date
        `;

        db.query(earnBadgeQuery, [userId], (err) => {
          if (err) {
            console.error('Fout bij het toekennen van de badge:', err);
            return res.status(500).json({ error: 'Er is een fout opgetreden bij het toekennen van de badge.' });
          }

          return res.status(201).json({ message: 'Vriend toegevoegd en badge verdiend!', newBadge: 'Vrienden Strijder' });
        });
      } else {
        return res.status(201).json({ message: 'Vriend succesvol toegevoegd.' });
      }
    });
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
    SELECT u.id, u.first_name AS name, u.last_name, u.email,IFNULL(CONCAT('${API_BASE_URL}/images/', u.profile_picture), '${API_BASE_URL}/images/default.png') AS profilePicture
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

app.get('/user/friends-with-photos', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT 
      u.id AS friendId,
      u.first_name AS firstName,
      u.last_name AS lastName,
      CONCAT('${API_BASE_URL}/images/', u.profile_picture) AS profilePicture
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

  if (!search || search.trim() === '') {
    return res.status(200).json([]); // Geen resultaten teruggeven als zoekterm leeg is
  }
  

  const query = `
    SELECT 
      id,
      first_name AS name,
      last_name,
      email,
      CONCAT('${API_BASE_URL}/images/', profile_picture) AS profilePicture
    FROM users
    WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?
  `;

  const searchTerm = `%${search}%`;

  db.query(query, [searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Fout bij het zoeken naar gebruikers:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het zoeken naar gebruikers.' });
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

  // Controleer of er al een leaderboard met dezelfde naam bestaat voor deze gebruiker
  const checkQuery = `
    SELECT id FROM leaderboards WHERE user_id = ? AND name = ?
  `;

  db.query(checkQuery, [userId, name], (err, results) => {
    if (err) {
      console.error('Fout bij het controleren van bestaande leaderboards:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het controleren van bestaande leaderboards.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Er bestaat al een leaderboard met deze naam.' });
    }

    // Maak het leaderboard aan
    const createQuery = `
      INSERT INTO leaderboards (user_id, name)
      VALUES (?, ?)
    `;

    db.query(createQuery, [userId, name], (err, result) => {
      if (err) {
        console.error('Fout bij het aanmaken van het leaderboard:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van het leaderboard.' });
      }

      const leaderboardId = result.insertId;

      res.status(201).json({
        message: 'Leaderboard succesvol aangemaakt.',
        leaderboardId,
        name,
      });
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
  const { userId, friends } = req.body;

  if (!userId || !friends || !Array.isArray(friends) || friends.length === 0) {
    return res.status(400).json({ error: 'Ongeldige invoer. Zorg ervoor dat er vrienden zijn geselecteerd.' });
  }

  // Controleer of alle friend_id's bestaan in de users-tabel
  const checkFriendsQuery = `
    SELECT id FROM users WHERE id IN (?)
  `;

  db.query(checkFriendsQuery, [friends], (err, results) => {
    if (err) {
      console.error('Fout bij het controleren van vrienden:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het controleren van vrienden.' });
    }

    const validFriendIds = results.map(row => row.id);
    const invalidFriendIds = friends.filter(friendId => !validFriendIds.includes(friendId));

    if (invalidFriendIds.length > 0) {
      return res.status(400).json({ error: `Ongeldige friend_id's: ${invalidFriendIds.join(', ')}` });
    }

    // Maak het leaderboard aan
    const createLeaderboardQuery = `
    INSERT INTO leaderboards (user_id, name, created_at)
    VALUES (?, ?, NOW())
  `;
  
  db.query(createLeaderboardQuery, [userId, "Standaard Naam"], (err, result) => {
    if (err) {
      console.error('Fout bij het aanmaken van het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het aanmaken van het leaderboard.' });
    }

      const leaderboardId = result.insertId;

      const friendValues = validFriendIds.map(friendId => [leaderboardId, friendId]);
      const addFriendsQuery = `
        INSERT INTO leaderboard_friends (leaderboard_id, friend_id)
        VALUES ?
      `;

      db.query(addFriendsQuery, [friendValues], (err) => {
        if (err) {
          console.error('Fout bij het toevoegen van vrienden aan het leaderboard:', err);
          return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van vrienden aan het leaderboard.' });
        }

        res.status(201).json({ leaderboardId });
      });
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
    RANK() OVER (PARTITION BY l.id ORDER BY COALESCE(SUM(p.amount), 0) ASC) AS "rank"
  FROM leaderboards l
  LEFT JOIN leaderboard_friends lf ON l.id = lf.leaderboard_id
  LEFT JOIN users u ON u.id = lf.friend_id
  LEFT JOIN puffs p ON p.user_id = u.id
  WHERE l.id IN (
    SELECT leaderboard_id
    FROM leaderboard_friends
    WHERE friend_id = ?
    UNION
    SELECT id
    FROM leaderboards
    WHERE user_id = ?
  )
  GROUP BY l.id, l.name, u.id, u.first_name
  ORDER BY "rank" ASC;
`;

  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van leaderboards:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van leaderboards.' });
    }

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
    IFNULL(CONCAT('${API_BASE_URL}/images/', u.profile_picture), '${API_BASE_URL}/images/default.png') AS profilePicture,
    COALESCE(SUM(p.puffs_count), 0) AS total_puffs,
    RANK() OVER (ORDER BY COALESCE(SUM(p.puffs_count), 0) ASC) AS rank
  FROM leaderboard_friends lf
  JOIN users u ON u.id = lf.friend_id
  LEFT JOIN puffs p ON p.user_id = u.id
  WHERE lf.leaderboard_id = ?
  GROUP BY u.id, u.first_name, u.profile_picture
`;

  db.query(query, [leaderboardId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van leaderboarddetails:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van leaderboarddetails.' });
    }

    res.status(200).json(results);
  });
});

app.post('/leaderboard/join', (req, res) => {
  const { userId, leaderboardName } = req.body;

  if (!userId || !leaderboardName) {
    return res.status(400).json({ error: 'Gebruiker ID en leaderboard naam zijn verplicht.' });
  }

  // Zoek het leaderboard op basis van de naam
  const findLeaderboardQuery = `
    SELECT id AS leaderboard_id
    FROM leaderboards
    WHERE name = ?
  `;

  // Voeg de gebruiker toe aan het leaderboard
  const addUserToLeaderboardQuery = `
    INSERT INTO leaderboard_friends (leaderboard_id, friend_id)
    VALUES (?, ?)
  `;

  db.query(findLeaderboardQuery, [leaderboardName], (err, results) => {
    if (err) {
      console.error('Fout bij het zoeken van het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het zoeken van het leaderboard.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Leaderboard niet gevonden.' });
    }

    const leaderboardId = results[0].leaderboard_id;

    db.query(addUserToLeaderboardQuery, [leaderboardId, userId], (err) => {
      if (err) {
        console.error('Fout bij het toevoegen van de gebruiker aan het leaderboard:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van de gebruiker aan het leaderboard.' });
      }

      res.status(200).json({ message: 'Succesvol toegevoegd aan het leaderboard.' });
    });
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
      IFNULL(CONCAT('${API_BASE_URL}/images/', u.profile_picture), '${API_BASE_URL}/images/default.png') AS profilePicture,
      COALESCE(SUM(p.amount), 0) AS total_puffs,
      RANK() OVER (ORDER BY COALESCE(SUM(p.amount), 0) ASC) AS user_rank,
      l.user_id AS owner_id -- Voeg de eigenaar van het leaderboard toe
    FROM (
      SELECT friend_id AS user_id FROM leaderboard_friends WHERE leaderboard_id = ?
      UNION
      SELECT user_id FROM leaderboards WHERE id = ?
    ) AS all_users
    JOIN users u ON u.id = all_users.user_id
    LEFT JOIN puffs p ON p.user_id = u.id AND YEARWEEK(p.created_at, 1) = YEARWEEK(CURDATE(), 1)
    JOIN leaderboards l ON l.id = ? -- Voeg de leaderboards-tabel toe om de eigenaar op te halen
    GROUP BY u.id, u.first_name, l.user_id
  `;

  db.query(query, [leaderboardId, leaderboardId, leaderboardId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van leaderboarddetails:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van leaderboarddetails.' });
    }

    const user = results.find(r => r.user_id == userId);
    const userRank = user ? user.user_rank : null;
    const isOwner = results.length > 0 && results[0].owner_id == userId; // Controleer of de ingelogde gebruiker de eigenaar is

    res.status(200).json({ leaderboard: results, userRank, isOwner });
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
  const { userId, icon, title, budget, isActive } = req.body;

  if (!userId || !icon || !title || !budget) {
    return res.status(400).json({ error: 'Alle velden zijn verplicht.' });
  }

  const insertChallengeQuery = `
    INSERT INTO challenges (user_id, icon, title, budget)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertChallengeQuery, [userId, icon, title, budget], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van de uitdaging:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het opslaan van de uitdaging.' });
    }

    const challengeId = result.insertId; // Haal het ID van de nieuw aangemaakte uitdaging op

    if (isActive) {
      const updateUserQuery = `
        UPDATE users
        SET active_challenge_id = ?
        WHERE id = ?
      `;

      db.query(updateUserQuery, [challengeId, userId], (err) => {
        if (err) {
          console.error('Fout bij het bijwerken van active_challenge_id:', err);
          return res.status(500).json({ error: 'Er is een fout opgetreden bij het instellen van de actieve uitdaging.' });
        }

        res.status(201).json({ message: 'Uitdaging succesvol aangemaakt en ingesteld als actief.' });
      });
    } else {
      res.status(201).json({ message: 'Uitdaging succesvol aangemaakt.' });
    }
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
  CASE 
    WHEN c.id = u.active_challenge_id THEN 1
    ELSE 0
  END AS is_active
FROM challenges c
LEFT JOIN puffs p ON p.user_id = c.user_id
LEFT JOIN users u ON u.id = c.user_id
WHERE c.user_id = ?
GROUP BY c.id, c.title, c.icon, c.budget, u.active_challenge_id
ORDER BY is_active DESC, c.created_at DESC
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
      password, -- Voeg het wachtwoord toe aan de query
      CONCAT('${API_BASE_URL}/images/', profile_picture) AS profilePicture
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

    res.status(200).json({
      firstName: results[0].firstName,
      lastName: results[0].lastName,
      email: results[0].email,
      birthDate: results[0].birthDate,
      password: results[0].password, // Voeg het wachtwoord toe aan de response
      profilePicture: results[0].profilePicture || '../assets/images/profile-1.png',
    });
  });
});



app.post('/update-user-data', async (req, res) => {
  const { userId, firstName, lastName, email, birthDate, newPassword } = req.body;

  if (!userId || !firstName || !lastName || !email || !birthDate) {
    return res.status(400).json({ error: 'Alle velden zijn verplicht.' });
  }

  try {
    let query = `
      UPDATE users
      SET first_name = ?, last_name = ?, email = ?, birth_date = ?
    `;
    const params = [firstName, lastName, email, birthDate];

    if (newPassword) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(userId);

    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Fout bij het bijwerken van gebruikersgegevens:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het bijwerken van gebruikersgegevens.' });
      }

      res.status(200).json({ message: 'Gebruikersgegevens succesvol bijgewerkt.' });
    });
  } catch (error) {
    console.error('Fout bij het verwerken van het nieuwe wachtwoord:', error);
    res.status(500).json({ error: 'Interne serverfout bij het bijwerken van gebruikersgegevens.' });
  }
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

app.get('/calculate-savings', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  // Query om `created_at` op te halen uit de `users`-tabel
  const userQuery = `
    SELECT created_at
    FROM users
    WHERE id = ?
  `;

  // Query om `current_usage` op te halen uit de `user_goals`-tabel
  const goalsQuery = `
    SELECT current_usage
    FROM user_goals
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  // Query om het totaal aantal puffs van vandaag te berekenen uit de `puffs`-tabel
  const puffsTodayQuery = `
    SELECT SUM(amount) AS puffs_today
    FROM puffs
    WHERE user_id = ? AND DATE(created_at) = CURDATE()
  `;

  // Query om het totale aantal puffs (`total_puffs`) te berekenen uit de `puffs`-tabel
  const puffsQuery = `
    SELECT SUM(amount) AS total_puffs
    FROM puffs
    WHERE user_id = ?
  `;

  // Voer de queries uit
  db.query(userQuery, [userId], (err, userResults) => {
    if (err) {
      console.error('Fout bij het ophalen van gebruikersgegevens:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van gebruikersgegevens.' });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
    }

    const createdAt = new Date(userResults[0].created_at);
    const today = new Date();
    const rawDays = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));
const daysSinceCreated = Math.max(1, rawDays);
 // Bereken aantal dagen

    db.query(goalsQuery, [userId], (err, goalsResults) => {
      if (err) {
        console.error('Fout bij het ophalen van gebruikersdoelen:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van gebruikersdoelen.' });
      }

      const currentUsage = goalsResults.length > 0 ? goalsResults[0].current_usage : 0;

      db.query(puffsTodayQuery, [userId], (err, puffsTodayResults) => {
        if (err) {
          console.error('Fout bij het ophalen van puffs van vandaag:', err);
          return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van puffs van vandaag.' });
        }

        const puffsToday = puffsTodayResults[0].puffs_today || 0;

        db.query(puffsQuery, [userId], (err, puffsResults) => {
          if (err) {
            console.error('Fout bij het ophalen van puffs:', err);
            return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van puffs.' });
          }

          const totalPuffs = puffsResults[0].total_puffs || 0;

          // Bereken geld bespaard
          const totalSavings = ((currentUsage * daysSinceCreated) - totalPuffs) * 0.01; // Vermenigvuldig met 0,01

          // Bereken puffs vermeden vandaag
          const puffsAvoidedToday = currentUsage - puffsToday; // Begin opnieuw op current_usage en trek puffs van vandaag af

          res.status(200).json({
            totalSavings: totalSavings.toFixed(2), // Geld bespaard
            puffsAvoided: puffsAvoidedToday, // Puffs vermeden vandaag
          });
        });
      });
    });
  });
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

app.get('/suggested-friends', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT 
      u.id AS friendId,
      u.first_name AS firstName,
      u.last_name AS lastName,
      u.email,
      CONCAT('${API_BASE_URL}/images/', u.profile_picture) AS profilePicture
    FROM users u
    WHERE u.id != ? AND u.id NOT IN (
      SELECT friend_id FROM friends WHERE user_id = ?
    )
    LIMIT 4
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

  if (!userId || !period) {
    return res.status(400).json({ error: 'Gebruiker ID en periode zijn verplicht.' });
  }

  try {
    if (period === 'Dag') {
      const query = `
        SELECT 
          SUM(CASE WHEN time_of_day = 'Ochtend (6:00 - 12:00)' THEN amount ELSE 0 END) AS ochtend,
          SUM(CASE WHEN time_of_day = 'Middag (12:00 - 18:00)' THEN amount ELSE 0 END) AS middag,
          SUM(CASE WHEN time_of_day = 'Avond (18:00 - 00:00)' THEN amount ELSE 0 END) AS avond,
          SUM(CASE WHEN time_of_day = 'Nacht (00:00 - 6:00)' THEN amount ELSE 0 END) AS nacht
        FROM puffs
        WHERE user_id = ? AND DATE(created_at) = CURDATE()
      `;
      const previousQuery = `
        SELECT SUM(amount) AS total
        FROM puffs
        WHERE user_id = ? AND DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      `;

      const [currentData] = await new Promise((resolve, reject) => {
        db.query(query, [userId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      const previousTotal = await new Promise((resolve, reject) => {
        db.query(previousQuery, [userId], (err, results) => {
          if (err) return reject(err);
          resolve(results[0].total || 0);
        });
      });

      res.status(200).json({
        ...currentData,
        previousTotal
      });
    }

    else if (period === 'Week') {
      const dataQuery = `
        SELECT 
          DAYOFWEEK(created_at) AS dag,
          SUM(amount) AS totaal
        FROM puffs
        WHERE user_id = ? AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)
        GROUP BY dag
      `;
      const totalQuery = `
        SELECT SUM(amount) AS total
        FROM puffs
        WHERE user_id = ? AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)
      `;
      const previousQuery = `
        SELECT SUM(amount) AS total
        FROM puffs
        WHERE user_id = ? AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE() - INTERVAL 7 DAY, 1)
      `;

      const [dataResult, currentTotalResult, previousTotalResult] = await Promise.all([
        new Promise((resolve, reject) => {
          db.query(dataQuery, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        }),
        new Promise((resolve, reject) => {
          db.query(totalQuery, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0].total || 0);
          });
        }),
        new Promise((resolve, reject) => {
          db.query(previousQuery, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0].total || 0);
          });
        })
      ]);

      const data = Array(7).fill(0);
      dataResult.forEach(({ dag, totaal }) => {
        data[(dag + 5) % 7] = totaal;
      });

      res.status(200).json({
        data,
        currentTotal: currentTotalResult,
        previousTotal: previousTotalResult,
        previousWeek: previousTotalResult
      });
    }

    else if (period === 'Maand') {
      const dataQuery = `
        SELECT 
          WEEK(created_at, 1) AS weeknummer,
          SUM(amount) AS totaal
        FROM puffs
        WHERE user_id = ? AND MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())
        GROUP BY weeknummer
        ORDER BY weeknummer ASC
      `;
      const totalQuery = `
        SELECT SUM(amount) AS total
        FROM puffs
        WHERE user_id = ? AND MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())
      `;
      const previousQuery = `
        SELECT SUM(amount) AS total
        FROM puffs
        WHERE user_id = ? AND MONTH(created_at) = MONTH(CURDATE() - INTERVAL 1 MONTH)
          AND YEAR(created_at) = YEAR(CURDATE() - INTERVAL 1 MONTH)
      `;
    
      const [dataResult, currentTotalResult, previousTotalResult] = await Promise.all([
        new Promise((resolve, reject) => {
          db.query(dataQuery, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        }),
        new Promise((resolve, reject) => {
          db.query(totalQuery, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]?.total || 0);
          });
        }),
        new Promise((resolve, reject) => {
          db.query(previousQuery, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]?.total || 0);
          });
        })
      ]);
    
      // Vul de data aan met lege weken (maximaal 5 weken in een maand)
      const data = Array(5).fill(0);

      // Bepaal de eerste week van de maand uit de resultaten
      const eersteWeekVanMaand = dataResult.length > 0 ? Math.min(...dataResult.map(r => r.weeknummer)) : 0;
      
      // Zet de waarden in de juiste index gebaseerd op weeknummer verschil
      dataResult.forEach(({ weeknummer, totaal }) => {
        const index = weeknummer - eersteWeekVanMaand;
        if (index >= 0 && index < data.length) {
          data[index] = totaal;
        }
      });
      
    
      res.status(200).json({
        data,
        currentTotal: currentTotalResult,
        previousTotal: previousTotalResult,
        previousMonth: previousTotalResult
      });
    
    }

    else {
      res.status(400).json({ error: 'Ongeldige periode opgegeven.' });
    }
  } catch (error) {
    console.error('Fout in /stats route:', error);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});
app.get('/badges', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  // Voorbeeldcriteria
  const criteria = {
    'First Step Hero': (user) => user.appOpened && user.accountCreated && user.firstDayUnderGoal,
    'Groene Dag': (user) => user.daysUnderGoal >= 1,
    'Perfecte Week': (user) => user.consecutiveDaysUnderGoal >= 7,
    'Maand Meester': (user) => user.daysUnderGoal >= 30 && user.noDaysOverGoal,
    'Doel Beuker': (user) => user.sustainableGoals >= 3 && user.healthGoals >= 3 && user.mentalGoals >= 3,
    'Mentale Meester': (user) => user.mentalGoals >= 6 && user.activeDays >= 10,
    'Uitdaging Behaald': (user) => user.challengeStarted && user.goalAmountReached,
    'Dagen Gewonnen': (user) => user.consecutiveDaysUnderGoal >= 5,
    'Gezonde Gewoonten': (user) => user.healthGoals >= 6 && user.daysUnderGoal >= 10,
    'Financiële Focus': (user) => user.moneyGoals >= 6 &&  user.moneySaved >= 25,
    'Leaderboard Legend': (user) => user.firstPlace &&  user.leaderboardDays >= 5,
    'Vrienden Strijder': (user) => user.invitedFriends >= 2,
  };

  // Haal gebruikersgegevens op
  db.query('SELECT * FROM user_progress WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Fout bij het ophalen van gebruikersgegevens:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Geen gegevens gevonden voor deze gebruiker.' });
    }

    const user = results[0];
    const achievedBadges = Object.keys(criteria).filter((badge) => criteria[badge](user));

    res.status(200).json({ badges: achievedBadges });
  });
});

app.post('/earn-badge', (req, res) => {
  const { userId, badgeName } = req.body;

  if (!userId || !badgeName) {
    return res.status(400).json({ error: 'Gebruiker ID en badge naam zijn verplicht.' });
  }

  const query = `
    INSERT INTO user_badges (user_id, badge_name, earned_date)
    VALUES (?, ?, NOW())
  `;

  db.query(query, [userId, badgeName], (err, result) => {
    if (err) {
      console.error('Fout bij het opslaan van de verdiende badge:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het opslaan van de badge.' });
    }

    res.status(201).json({ message: 'Badge succesvol verdiend.' });
  });
});

app.get('/user/progress', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const query = `
    SELECT created_at
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

    const createdAt = results[0].created_at;
    res.status(200).json({ createdAt });
  });
});

app.get('/calculate-streak', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Gebruiker ID is verplicht.' });
  }

  const goalUsageQuery = `
    SELECT goal_usage
    FROM user_goals
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const dailyPuffsQuery = `
    WITH RECURSIVE date_range AS (
      SELECT GREATEST(
        (SELECT DATE(created_at) FROM users WHERE id = ?), 
        CURDATE() - INTERVAL 30 DAY
      ) AS date
      UNION ALL
      SELECT date + INTERVAL 1 DAY
      FROM date_range
      WHERE date < CURDATE()
    )
    SELECT 
      dr.date AS puff_date,
      COALESCE(SUM(p.amount), 0) AS daily_puffs
    FROM date_range dr
    LEFT JOIN puffs p ON DATE(p.created_at) = dr.date AND p.user_id = ?
    GROUP BY dr.date
    ORDER BY dr.date ASC;
  `;

  db.query(goalUsageQuery, [userId], (err, goalResults) => {
    if (err) {
      console.error('Fout bij het ophalen van goal_usage:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van goal_usage.' });
    }

    if (goalResults.length === 0) {
      return res.status(404).json({ error: 'Geen doelen gevonden voor deze gebruiker.' });
    }

    const goalUsage = goalResults[0].goal_usage;

    db.query(dailyPuffsQuery, [userId, userId], (err, puffsResults) => {
      if (err) {
        console.error('Fout bij het ophalen van dagelijkse puffs:', err);
        return res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van dagelijkse puffs.' });
      }

      let streak = 0;

      for (const day of puffsResults) {
        if (day.daily_puffs > goalUsage) {
          streak = 0; // Reset de streak als de gebruiker over de goal gaat
        } else {
          streak++; // Verhoog de streak als de gebruiker onder de goal blijft
        }
      }

      res.status(200).json({ streak });
    });
  });
});

app.delete('/challenges/delete', (req, res) => {
  const { userId, challengeId } = req.body;

  if (!userId || !challengeId) {
    return res.status(400).json({ error: 'Gebruiker ID en uitdaging ID zijn verplicht.' });
  }

  const query = `
    DELETE FROM challenges
    WHERE user_id = ? AND id = ?
  `;

  db.query(query, [userId, challengeId], (err, result) => {
    if (err) {
      console.error('Fout bij het verwijderen van de uitdaging:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het verwijderen van de uitdaging.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Uitdaging niet gevonden of behoort niet tot de gebruiker.' });
    }

    res.status(200).json({ message: 'Uitdaging succesvol verwijderd.' });
  });
});

app.delete('/leaderboard/leave', (req, res) => {
  const { userId, leaderboardId } = req.body;

  if (!userId || !leaderboardId) {
    return res.status(400).json({ error: 'User ID en Leaderboard ID zijn verplicht.' });
  }

  const query = `
    DELETE FROM leaderboard_friends
    WHERE friend_id = ? AND leaderboard_id = ?
  `;

  db.query(query, [userId, leaderboardId], (err, result) => {
    if (err) {
      console.error('Fout bij het verlaten van het leaderboard:', err);
      return res.status(500).json({ error: 'Er is een fout opgetreden bij het verlaten van het leaderboard.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Je bent de eigenaar van dit leaderboard en kunt het niet verlaten.' });
    }

    res.status(200).json({ message: 'Je bent succesvol uit het leaderboard gestapt.' });
  });
});