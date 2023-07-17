// Load environnement variables
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

// Require des modules
const express = require('express');
const cors = require('cors');

const imagePath = path.resolve(__dirname, 'card_images');

// Require des routers
const routerPublic = require('./App/routers/routerPublic');
const routerPrivate = require('./App/routers/routerPrivate');

const logger = require('./App/log');

// creation de l'application
const app = express();
app.use('/card_images', express.static(imagePath));

// Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors({
  origin: ('tcg-vision.fr'),
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Authorization, Content-Type',
}));

// Application routers
app.use(routerPublic);
app.use(routerPrivate);

// Demarrage serveur
const PORT = process.env.PORT || 5430;
app.listen(PORT, () => {
  logger.log(`Listening at http://localhost:${PORT} ...`);
});
