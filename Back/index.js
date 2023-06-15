// Load environnement variables
const path = require("path");
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env')});

const express = require('express');
const cors = require('cors');
const routerPublic = require('./App/routers/routerPublic');
const routerPrivate = require('./App/routers/routerPrivate');
const logger = require('./App/log');

// creation de l'application
const app = express();

// Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

// Application routers
app.use(routerPublic);
app.use(routerPrivate);

// Demarrage serveur
const PORT = process.env.PORT || 5430;
app.listen(PORT, () => {
  logger.log(`Listening at http://localhost:${PORT} ...`);
});
