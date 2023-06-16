const express = require('express');
const userRouter = require('./userRouter');
const cardRouter = require('./cardRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
