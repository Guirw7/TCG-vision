const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const { authenticateToken } = require('../../middlewares/auth');

/* --------------- Controllers ---------------*/
const deckController = require('../../controllers/deckController');

const router = express.Router();

router.post('/', authenticateToken, controllerHandler(deckController.addDeckInDb));
router.get('/:id', authenticateToken, controllerHandler(deckController.getAllDecksByUser));
router.put('/:id', authenticateToken, controllerHandler(deckController.updateDeckInDb));
router.delete('/:userId/deck/:deckId', authenticateToken, controllerHandler(deckController.deleteDeck));

module.exports = router;
