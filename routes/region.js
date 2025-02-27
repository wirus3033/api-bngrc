const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM regions';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des region.' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM regions WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de la region.' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ message: 'region introuvable.' });
        }
      }
    });
  });



module.exports = router;