// CONFIGURATION
// On charge les variables d'environnement (comme le mot de passe de la base de données) depuis le fichier .env
require('dotenv').config();

const express = require('express');
const { neon } = require('@neondatabase/serverless');

const app = express();
const cors = require('cors');
app.use(cors());

// On définit le PORT du serveur (4242 par défaut)
const PORT = process.env.PORT || 4242;

// ROUTES (Les adresses auxquelles on peut accéder)

// Route de test simple (optionnelle)
// app.get('/', async (_, res) => {
//   const sql = neon(`${process.env.DATABASE_URL}`);
//   // On utilise name pour parcourir les données de la table playing_with_neon, EXAMPLE:
//   //   const response = await sql`SELECT name FROM playing_with_neon`; 
//   // On utilise WHERE pour filtrer les données par id et on affiche le nom de la personne qui a l'id 5 
//   // SELECT pour selectionner les données 
//   // FROM pour specifier la table 
//   // WHERE pour filtrer les données EXAMPLE: 
//   // const response = await sql`SELECT name FROM playing_with_neon WHERE id = 5;`; 
//   const response = await sql`SELECT name FROM frontend_skills;`; 
//   console.log(response);
//   res.json(response);
// });

// Route pour lister les thèmes (Frontend, Backend) - Données en dur ici
app.get('/themes', (req, res) => {
  const themes = [
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
  ];
  // On renvoie la liste en format JSON
  res.json(themes);
});

// Route pour récupérer les compétences d'un thème spécifique (via la Base de Données)
// :themeId est un paramètre dynamique (ex: 'frontend' ou 'backend')
app.get('/themes/:themeId/skills', async (req, res) => {
  const { themeId } = req.params; // On récupère 'frontend' ou 'backend' de l'URL
  
  // Connexion à la base de données
  const sql = neon(`${process.env.DATABASE_URL}`);
  
  let result;
  try {
    // Si on demande les skills frontend
    if (themeId === 'frontend') {
      // On fait une requête SQL pour tout sélectionner dans la table 'frontend_skills'
      result = await sql`SELECT * FROM frontend_skills`;
    } 
    // Si on demande les skills backend
    else if (themeId === 'backend') {
      // On fait une requête SQL pour tout sélectionner dans la table 'backend_skills'
      result = await sql`SELECT * FROM backend_skills`;
    } 
    // Si le thème n'existe pas
    else {
      return res.status(404).json({ error: 'Theme not found' });
    }
    
    // On renvoie les résultats de la base de données au frontend
    res.json(result);
  } catch (error) {
    // Si erreur (ex: problème de connexion DB), on l'affiche et on renvoie une erreur 500
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DÉMARRAGE DU SERVEUR
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});