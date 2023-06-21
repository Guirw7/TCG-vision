const express = require('express');

const deckController = require('../../controllers/deckController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router.get('/', controllerHandler(deckController.getAllDecks));
router.get('/:id', controllerHandler(deckController.getDeckById));

module.exports = router;
