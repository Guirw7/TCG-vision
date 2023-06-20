// Load environnement variables
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

// Require des modules
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const distPath = path.resolve('../Front/dist');

// Require des routers
const routerPublic = require('./App/routers/routerPublic');
const routerPrivate = require('./App/routers/routerPrivate');

const logger = require('./App/log');

// creation de l'application
const app = express();
app.use('/card_images', express.static('card_images'));
app.use(express.static(distPath));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

// Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  next();
});

// On configure les sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: {
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_MAX_AGE, 10),
  },
}));

// Application routers
app.use(routerPublic);
app.use(routerPrivate);

// Demarrage serveur
const PORT = process.env.PORT || 5430;
app.listen(PORT, () => {
  logger.log(`Listening at http://localhost:${PORT} ...`);
});
