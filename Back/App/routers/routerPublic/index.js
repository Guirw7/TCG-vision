const express = require('express');
const userRouter = require('./userRouter');
const deckRouter = require('./deckRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/decks', deckRouter);

module.exports = router;
