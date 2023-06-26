const express = require('express');
const userRouter = require('./userPublicRouter');
const deckRouter = require('./deckPublicRouter');

const router = express.Router();

router.use('/public/user', userRouter);
router.use('/public/decks', deckRouter);

module.exports = router;
