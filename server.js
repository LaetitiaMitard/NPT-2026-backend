const express = require('express');
const path = require('path');
const cors = require('cors');
const users = require('./users.json');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Servir le README.md pour le front
app.get('/README.md', (req, res) => {
    res.sendFile(path.join(__dirname, 'README.md'));
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré et écoutant sur http://localhost:${PORT}`);
    console.log(`Ouvrez http://localhost:${PORT} dans votre navigateur pour l'interface.`);
});


app.post('/api/login', (req, res) => {

    // EXERCICE N°1
    // Afficher le mot de passe dans la console
    const {nom, mdp} = req.body;
    console.log("nom = " + nom);

    // EXERCICE N°2
    // Trouver la méthode pour formater du texte en minuscules via la doc https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String
    const user = users.find(u => u.nom);

    if (!user) {
        return res.status(401).json({success: false, message: 'Identifiant incorrect.'});
    }

    console.log("Utilisateur trouvé : " + user);

    // EXERCICE N°3
    // Ajouter la vérification du mot de passe à l'authentification


    // EXERCICE N°4
    // Ajouter un message d'erreur dans la méthode
    const age = calculerAge(user.ddn);

    // EXERCICE N°5
    // Supprimer le mot de passe et ajouter l'âge dans les données envoyées au client
    const donneesUtilisateur = {
        id: user.id,
        mdp: user.mdp,
        nom: user.nom,
        prenom: user.prenom,
        ddn: user.ddn,
        avatar: user.avatar
    };

    res.json({success: true, message: 'Connexion réussie', user: donneesUtilisateur});
});


// =======================================================
// FONCTION UTILITAIRE : Calcul de l'âge à partir de la date de naissance
// La date est au format 'DD/MM/YYYY'
// =======================================================
const calculerAge = (ddn) => {
    try {
        if (!ddn) return null;

        // Convertir le format DD/MM/YYYY en objet Date
        const parties = ddn.split('/');
        // Note: Le mois est 0-indexé, donc on fait parts[1] - 1
        const dateDeNaissance = new Date(parties[2], parties[1] - 1, parties[0]);

        const aujourdhui = new Date();
        let age = aujourdhui.getFullYear() - dateDeNaissance.getFullYear();
        const ecartMois = aujourdhui.getMonth() - dateDeNaissance.getMonth();

        // Ajuster si l'anniversaire n'est pas encore passé cette année
        if (ecartMois < 0 || (ecartMois === 0 && aujourdhui.getDate() < dateDeNaissance.getDate())) {
            age--;
        }
        return age;
    } catch (e) {
        return null;
    }
};