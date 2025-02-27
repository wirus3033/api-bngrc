const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM deces';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des deces.' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM deces WHERE id_deces = ?';
    db.query(query, [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de la deces.' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ message: 'deces introuvable.' });
        }
      }
    });
  });

  router.post('/', (req, res) => {
    const { nom_direction } = req.body;
    if (!nom_direction) {
      return res.status(400).json({ error: 'Le champ nom_direction est obligatoire.' });
    }
  
    const query = 'INSERT INTO deces (nom_direction) VALUES (?)';
    db.query(query, [nom_direction], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l’ajout de la direction.' });
      } else {
        res.status(201).json({ message: 'Direction ajoutée avec succès.', id: result.insertId });
      }
    });
  });

//   router.get('/count/total', (req, res) => {
//     const query = 'SELECT COUNT(*) as total FROM deces';
    
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error counting deces' });
//       } else {
//         res.status(200).json({ total: results[0].total });
//       }
//     });
//   });

  router.get('/count/total', (req, res) => {
    const query = 'SELECT region_id, SUM(nbDeces) as total FROM deces GROUP BY region_id';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error counting deces' });
      } else {
        res.status(200).json(results);
      }
    });
});




module.exports = router;