const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');

/* --------------- Controllers ---------------*/
const deckController = require('../../controllers/deckController');

const router = express.Router();

router.post('/', controllerHandler(deckController.addDeckInDb));

module.exports = router;
