app.post('/api/login', (req, res) => {
    // EXERCICE N°1
    // Afficher le mot de passe dans la console
    const {nom, mdp} = req.body;
    console.log("Nom envoyé par le client = " + nom);
    console.log("Mot de passe envoyé par le client = " + mdp);

    // EXERCICE N°2
    // Ajouter la vérification du mot de passe à l'authentification
    const user = users.find(u => u.nom === nom && u.mdp === mdp);

    if (!user) {
        return res.status(401).json({success: false, message: 'Identifiant ou mot de passe incorrect.'});
    }

    // EXERCICE N°3
    // Ajouter un message d'erreur dans la méthode
    const age = calculerAge(user.ddn);

    // EXERCICE N°4
    // Supprimer le mot de passe et ajouter l'âge dans les données envoyées au client
    const donneesUtilisateur = {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        ddn: user.ddn,
        avatar: user.avatar,
        age: age
    };

    res.json({success: true, message: 'Connexion réussie', user: donneesUtilisateur});

    // EXERCICE N°5
    // Trouver la méthode pour formater du texte en minuscules via la doc https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String

    console.log("donneesUtilisateur = " + donneesUtilisateur);
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
        console.error("Erreur de calcul de l'âge:", e);
        return null;
    }
};