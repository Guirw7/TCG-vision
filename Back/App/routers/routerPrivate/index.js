const express = require('express');
const { error404 } = require('../../controllers/error');
const errorHandler = require('../../helpers/errorHandler');

const userRouter = require('./userPrivateRouter');
const deckRouter = require('./deckPrivateRouter');
const collectionRouter = require('./collectionPrivateRouter');

const router = express.Router();

router.use('/profil', userRouter);
router.use('/collection', collectionRouter);
router.use('/user', collectionRouter);
router.use('/deck', deckRouter);
router.use('/decks', deckRouter);
router.use('/user', deckRouter);
router.use('/user', userRouter);

router.use(error404);
router.use(errorHandler);

module.exports = router;
