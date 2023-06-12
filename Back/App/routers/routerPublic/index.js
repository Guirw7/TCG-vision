const express = require('express');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/signup', userRouter);

module.exports = router;
