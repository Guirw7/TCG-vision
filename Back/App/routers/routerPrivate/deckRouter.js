const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const requireAuth = require('../../middlewares/auth');

/* --------------- Controllers ---------------*/
const deckController = require('../../controllers/deckController');

const router = express.Router();

router.post('/', /* requireAuth, */ controllerHandler(deckController.addDeckInDb));
router.get('/:id', /* requireAuth, */ controllerHandler(deckController.getAllDecksByUser));
router.put('/:id', /* requireAuth, */ controllerHandler(deckController.updateDeckInDb));

module.exports = router;
