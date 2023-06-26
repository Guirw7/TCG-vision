const express = require('express');
const userRouter = require('./userPublicRouter');
const deckRouter = require('./deckPublicRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/deck', deckRouter);

module.exports = router;
