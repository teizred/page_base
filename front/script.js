// On crée une fonction pour aller chercher les compétences
async function chargerCompetences() {
    try {
        // 1. On va chercher les données du BACKEND (API)
        // On récupère d'abord les compétences Frontend
        const reponseFrontend = await fetch('http://localhost:4242/themes/frontend/skills');
        const skillsFrontend = await reponseFrontend.json();
        
        // Puis on récupère les compétences Backend
        const reponseBackend = await fetch('http://localhost:4242/themes/backend/skills');
        const skillsBackend = await reponseBackend.json();

        // 2. On affiche les données dans la page HTML (FRONTEND)
        afficherSkills(skillsFrontend, 'container1-2');
        afficherSkills(skillsBackend, 'container2-2');

    } catch (erreur) {
        console.error("Erreur lors du chargement des compétences :", erreur);
    }
}

// Cette fonction s'occupe de créer le HTML pour chaque compétence
function afficherSkills(listeDeSkills, idDuContainer) {
    // On sélectionne la liste <ul> correspondante dans le HTML
    const container = document.getElementById(idDuContainer);
    // On vide le container au cas où
    container.innerHTML = '';

    // On parcourt chaque compétence de la liste
    for (const skill of listeDeSkills) {
        // On crée un élément <li> pour la compétence
        const li = document.createElement('li');
        li.className = 'skill';

        // On récupère le niveau (ex: "90%")
        // parseInt permet de transformer "90%" en le nombre 90 pour la barre de progression
        const niveauNombre = parseInt(skill.level);

        // On crée le contenu HTML de la compétence
        // On utilise <progress> pour la barre de progression
        // On affiche le niveauNombre suivi de "%" directement
        li.innerHTML = `
            <span>${skill.name}</span>
            <div class="skill-level" style="display: flex; align-items: center; gap: 10px;">
                <progress value="${niveauNombre}" max="100"></progress>
                <span>${niveauNombre}%</span>
            </div>
        `;

        // On ajoute l'élément <li> au container <ul>
        container.appendChild(li);
    }
}

// On lance la fonction principale au chargement de la page
chargerCompetences();