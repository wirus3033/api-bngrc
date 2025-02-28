// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importation du middleware CORS
const db = require('./config/db');

dotenv.config();
const app = express();

// Configuration de CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://bngrc-wirus3033s-projects.vercel.app",
    "https://api-bngrc.onrender.com/api/data/"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));




app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.json());

// Importation des routes
const courrierRoutes = require('./routes/courrierRoutes');
// const userRoutes = require('./routes/userRoutes');
const directionRoutes = require('./routes/directionRoures'); 
const authRoutes = require('./routes/userRoutes');
const entrant = require('./routes/courrierEntrant');
const sortant = require('./routes/courrierSortant');
const mounth = require('./routes/stat');
const userRoutes = require('./routes/userRoutes');

const fokontany = require('./routes/fokontany');
const deces =require('./routes/deces');
const regions = require('./routes/region');
const categories = require('./routes/categories');
const data =require('./routes/data');
const dash = require('./routes/dash')

app.use('/api', authRoutes);
// Utilisation des routes
// app.use('/api/courriers', courrierRoutes);
app.use('/api/', userRoutes);
app.use('/api/directions', directionRoutes);
app.use('/api/entrant', entrant);
app.use('/api/sortant', sortant);
app.use('/api/mounth', mounth);
app.use('/api/fokontany', fokontany);
app.use('/api/deces', deces);
app.use('/api/regions',regions);
app.use('/api/categories', categories)
app.use('/api/data', data);
app.use('/api/dash', dash)



// Lancement du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
