document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const profilScreen = document.getElementById('profil-screen');
    const messageDiv = document.getElementById('message');
    const logoutButton = document.getElementById('logout-button');
    const loginButton = document.getElementById('login-button');

    // ==========================================
    // FONCTION UTILITAIRE DE BASCULEMENT D'ÉCRAN
    // ==========================================
    const showProfile = (user) => {
        document.getElementById('profil-prenom').textContent = user.prenom;
        document.getElementById('profil-nom-complet').textContent = `${user.prenom.toUpperCase()} ${user.nom.toUpperCase()}`;
        document.getElementById('profil-id').textContent = user.id;
        document.getElementById('profil-ddn').textContent = user.ddn;
        document.getElementById('profil-age').textContent = user.age !== null ? `${user.age} ans` : 'Non disponible';

        // Afficher les initiales dans le cercle
        const initialP = user.prenom.charAt(0).toUpperCase();
        const initialN = user.nom.charAt(0).toUpperCase();
        document.getElementById('initials').textContent = initialP + initialN;

        // Basculer l'affichage
        loginScreen.classList.add('hidden');
        profilScreen.classList.remove('hidden');
    };

    const showLogin = () => {
        // Effacer le formulaire et les messages
        loginForm.reset();
        messageDiv.classList.add('hidden');

        // Basculer l'affichage
        profilScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    };

    // ==========================================
    // GESTION DU FORMULAIRE DE CONNEXION
    // ==========================================
    loginForm.addEventListener('submit', async (e) => {
        console.log('login form: ', e.target);
        e.preventDefault();

        const nom = document.getElementById('nom').value.trim();
        const mdp = document.getElementById('mdp').value.trim();

        messageDiv.classList.remove('hidden');
        messageDiv.className = 'mt-4 text-center p-3 rounded-lg text-sm bg-indigo-100 text-indigo-700';
        messageDiv.textContent = 'Connexion en cours...';
        loginButton.disabled = true;

        const credentials = {nom, mdp};

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (data.success) {
                messageDiv.className = 'mt-4 text-center p-3 rounded-lg text-sm bg-green-100 text-green-700';
                messageDiv.textContent = data.message;
                showProfile(data.user);
            } else {
                messageDiv.className = 'mt-4 text-center p-3 rounded-lg text-sm bg-red-100 text-red-700';
                messageDiv.textContent = data.message || 'Erreur de connexion inconnue.';
            }

        } catch (error) {
            messageDiv.className = 'mt-4 text-center p-3 rounded-lg text-sm bg-red-100 text-red-700';
            messageDiv.textContent = 'Erreur de connexion au serveur. Le backend est-il lancé ?';
            console.error('Erreur réseau:', error);
        } finally {
            loginButton.disabled = false;
        }
    });

    // ==========================================
    // GESTION DE LA DÉCONNEXION
    // ==========================================
    logoutButton.addEventListener('click', showLogin);
});