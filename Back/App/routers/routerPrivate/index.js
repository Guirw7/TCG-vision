const express = require('express');
const { error404 } = require('../../controllers/error');
const errorHandler = require('../../helpers/errorHandler');

const userRouter = require('./userPrivateRouter');
const deckRouter = require('./deckPrivateRouter');
const collectionRouter = require('./collectionPrivateRouter');

const router = express.Router();

router.use('/private/profil', userRouter);
router.use('/private/collection', collectionRouter);
router.use('/private/deck', deckRouter);
router.use('/private/decks', deckRouter);

router.use(error404);
router.use(errorHandler);

module.exports = router;
