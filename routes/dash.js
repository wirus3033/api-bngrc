const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET monthly statistics
router.get('/monthly', async (req, res) => {
    try {
        const query = `
            SELECT 
                MONTH(date_entree) as month,
                COUNT(CASE WHEN date_entree IS NOT NULL THEN 1 END) as entrants,
                (
                    SELECT COUNT(*) 
                    FROM courrier_sortant 
                    WHERE MONTH(date_sortie) = MONTH(ce.date_entree)
                ) as sortants
            FROM courrier_entrant ce
            GROUP BY MONTH(date_entree)
            ORDER BY month;
        `;

        const [results] = await db.promise().query(query);

        // Transform month numbers to month names
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];

        const transformedResults = results.map(row => ({
            month: monthNames[row.month - 1],
            entrants: row.entrants,
            sortants: row.sortants
        }));

        res.json(transformedResults);
    } catch (error) {
        console.error('Error getting monthly statistics:', error);
        res.status(500).json({ 
            message: 'Error fetching monthly statistics',
            error: error.message 
        });
    }
});

  router.get('/count/total', (req, res) => {
    const query = 'SELECT COUNT(*) as total FROM data';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error counting data' });
      } else {
        res.status(200).json({ total: results[0].total });
      }
    });
  });

module.exports = router;
