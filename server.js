const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Game state variables
let access = true;
let secretButton = true;
let score = 50;

// Middleware to allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Level 1: Access control
app.get('/level1', (req, res) => {
  if (access) {
    res.json({ message: "Bravo ! Accès autorisé. Passe au niveau 2: /level2" });
  } else {
    res.json({ message: "Accès refusé. Trouve comment mettre access = true dans le backend." });
  }
});

// Level 2: Password challenge
app.get('/level2', (req, res) => {
  const userName = req.query.name;
  const userPass = req.query.pass;
  let users;
  try {
    users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf8'));
  } catch (err) {
    return res.status(500).json({ message: "Erreur de lecture du fichier users.json." });
  }
  const user = users.find(u => u.name === userName);
  if (user && user.password === userPass) {
    res.json({ message: "Mot de passe correct ! Passe au niveau 3: /level3" });
  } else {
    res.json({ message: "Nom ou mot de passe incorrect. Essaie avec ?name=tonnom&pass=tonmotdepasse" });
  }
});

// Level 3: Secret button
app.get('/level3', (req, res) => {
  if (secretButton) {
    res.json({ message: "Bouton secret activé ! Passe au niveau 4: /level4" });
  } else {
    res.json({ message: "Le bouton secret est désactivé. Ajoute secretButton = true dans le backend." });
  }
});

// Level 4: Score challenge
app.get('/level4', (req, res) => {
  if (score > 100) {
    res.json({ message: "Félicitations ! Tu as terminé le jeu !" });
  } else {
    res.json({ message: "Score trop bas. Augmente la variable score > 100." });
  }
});

app.listen(port, () => {
  console.log(`Hack Server Game running at http://localhost:${port}`);
});
