const express = require('express');
const userRouter = require('./userPublicRouter');
const deckRouter = require('./deckPublicRouter');
const passwordRouter = require('./resetPassword');

const router = express.Router();

router.use('/public/user', userRouter);
router.use('/public/decks', deckRouter);
router.use('/public/password', passwordRouter);

module.exports = router;
