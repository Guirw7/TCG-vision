const express = require('express');
const userRouter = require('./userRouter');
const { error404 } = require('../../controllers/error');
const errorHandler = require('../../helpers/errorHandler');
const collectionRouter = require('./collectionRouter');

const router = express.Router();

router.use('/profil', userRouter);
router.use('/collection', collectionRouter);

router.use(error404);
router.use(errorHandler);

module.exports = router;
