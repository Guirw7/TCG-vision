const express = require('express');
const userRouter = require('./userPublicRouter');
const deckRouter = require('./deckPublicRouter');

const router = express.Router();

<<<<<<< HEAD
router.use('/user', userRouter);
router.use('/decks', deckRouter);
=======
router.use('/public/user', userRouter);
router.use('/public/decks', deckRouter);
>>>>>>> 14a1e955964c2458bf44430bbce8ecef532d7ea9

module.exports = router;
