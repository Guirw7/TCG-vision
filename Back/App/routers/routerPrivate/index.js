const express = require('express');
const { error404 } = require('../../controllers/error');
const errorHandler = require('../../helpers/errorHandler');

const userRouter = require('./userPrivateRouter');
const collectionRouter = require('./collectionRouter');
const deckRouter = require('./deckPrivateRouter');

const router = express.Router();

router.use('/profil', userRouter);
router.use('/collection', collectionRouter);
router.use('/user', collectionRouter);
router.use('/deck', deckRouter);
router.use('/decks', deckRouter);
router.use('/user', deckRouter);

router.use(error404);
router.use(errorHandler);

module.exports = router;
