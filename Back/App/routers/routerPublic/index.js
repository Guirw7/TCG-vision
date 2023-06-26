const express = require('express');
const userRouter = require('./userRouter');
const deckRouter = require('./deckRouter');

const router = express.Router();

router.use('/public/user', userRouter);
router.use('/public/decks', deckRouter);

module.exports = router;
