const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Assurez-vous d'avoir votre configuration de base de données

// Ajouter une nouvelle entrée dans la table data
router.post('/post', (req, res) => {
  const { region_id, categories_id, nombre, date } = req.body;
  
  if (!region_id || !categories_id || nombre === undefined || !date) {
    return res.status(400).json({ error: 'Tous les champs (region_id, categories_id, nombre, date) sont obligatoires.' });
  }

  const query = 'INSERT INTO data (region_id, categories_id, nombre, date) VALUES (?, ?, ?, ?)';
  db.query(query, [region_id, categories_id, nombre, date], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de l’ajout des données.' });
    } else {
      res.status(201).json({ message: 'Données ajoutées avec succès.', id_data: result.insertId });
    }
  });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM data';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des data.' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// Mettre à jour une entrée dans la table data
router.put('/:id', (req, res) => {
  const { region_id, categories_id, nombre, date } = req.body;

  if (!region_id || !categories_id || nombre === undefined || !date) {
    return res.status(400).json({ error: 'Tous les champs (region_id, categories_id, nombre, date) sont obligatoires.' });
  }

  const query = 'UPDATE data SET region_id = ?, categories_id = ?, nombre = ?, date = ? WHERE id_data = ?';
  db.query(query, [region_id, categories_id, nombre, date, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour des données.' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Données mises à jour avec succès.' });
      } else {
        res.status(404).json({ message: 'Données introuvables.' });
      }
    }
  });
});

// Supprimer une entrée dans la table data
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM data WHERE id_data = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression des données.' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Données supprimées avec succès.' });
      } else {
        res.status(404).json({ message: 'Données introuvables.' });
      }
    }
  });
});

module.exports = router;
