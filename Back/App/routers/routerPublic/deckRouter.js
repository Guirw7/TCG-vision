const express = require('express');

const deckController = require('../../controllers/deckController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router.get('/', controllerHandler(deckController.getAllDecks));

module.exports = router;
