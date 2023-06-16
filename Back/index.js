// Load environnement variables
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

// Require des modules
const express = require('express');
const cors = require('cors');
const session = require('express-session');

// Require des routers
const routerPublic = require('./App/routers/routerPublic');
const routerPrivate = require('./App/routers/routerPrivate');

const logger = require('./App/log');

// creation de l'application
const app = express();
app.use(express.static('images'));

// Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors('*'));

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
