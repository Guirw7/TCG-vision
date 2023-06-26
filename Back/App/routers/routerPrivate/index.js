const express = require('express');
const userRouter = require('./userRouter');
const { error404 } = require('../../controllers/error');
const errorHandler = require('../../helpers/errorHandler');

const collectionRouter = require('./collectionRouter');
const deckRouter = require('./deckRouter');

const router = express.Router();

router.use('/private/profil', userRouter);
router.use('/private/collection', collectionRouter);
router.use('/private/deck', deckRouter);
router.use('/private/decks', deckRouter);
router.use('/private/user', deckRouter);

router.use(error404);
router.use(errorHandler);

module.exports = router;
